import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log('Starting treatment centers import...');
    
    const { csvData, clearExisting } = await req.json();
    
    if (!csvData) {
      return new Response(
        JSON.stringify({ success: false, error: 'No CSV data provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Clear existing data if requested
    if (clearExisting) {
      console.log('Clearing existing treatment centers...');
      const { error: deleteError } = await supabaseClient
        .from('treatment_centers')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteError) {
        console.error('Error clearing existing data:', deleteError);
      }
    }

    // Parse CSV (tolerant to column count variations)
    const expectedColumns = [
      'name', 'address', 'city', 'state', 'zip_code', 'phone', 'website',
      'email', 'key_providers', 'therapeutic_areas', 'products_drugs',
      'manufacturers', 'clinical_trials', 'trial_sponsors', 'capacity_info',
      'nci_designated', 'fact_accredited', 'patient_services'
    ];

    // Simple CSV line parser handling quotes and escaped quotes
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    // Build records tolerant to extra/missing fields per line
    const lines = csvData.split(/\r?\n/);
    const records: any[] = [];
    let buffer = '';
    for (let i = 1; i < lines.length; i++) { // skip header line
      let line = lines[i];
      if (!line) continue;
      if (buffer) {
        line = buffer + '\n' + line;
        buffer = '';
      }
      let fields = parseCSVLine(line);
      const quoteCount = (line.match(/"/g) || []).length;
      if (quoteCount % 2 !== 0) {
        buffer = line;
        continue;
      }
      if (fields.length < expectedColumns.length) {
        while (fields.length < expectedColumns.length && i + 1 < lines.length) {
          i++;
          line += '\n' + lines[i];
          fields = parseCSVLine(line);
          const qc = (line.match(/"/g) || []).length;
          if (qc % 2 !== 0) continue;
        }
      }
      if (fields.length > expectedColumns.length) {
        const head = fields.slice(0, expectedColumns.length - 1);
        const tail = fields.slice(expectedColumns.length - 1).join(',').trim();
        fields = [...head, tail];
      }
      const obj: Record<string, string> = {};
      expectedColumns.forEach((key, idx) => {
        obj[key] = fields[idx] ?? '';
      });
      records.push(obj);
    }

    console.log(`Parsed ${records.length} centers from CSV`);

    // Helper function to parse array fields
    const parseArrayField = (value: string): string[] => {
      if (!value || value.trim() === '') return [];
      return value.split(',').map(v => v.trim()).filter(v => v.length > 0);
    };

    // Geocoding function using OpenStreetMap Nominatim (free, no API key)
    const geocodeAddress = async (address: string, city: string, state: string, zip: string): Promise<{ lat: number | null, lon: number | null }> => {
      try {
        const query = `${address}, ${city}, ${state} ${zip}, USA`;
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1`,
          {
            headers: {
              'User-Agent': 'Genie-AI-Healthcare-Platform/1.0'
            }
          }
        );

        if (!response.ok) {
          console.error(`Geocoding failed for ${query}: ${response.status}`);
          return { lat: null, lon: null };
        }

        const results = await response.json();
        if (results && results.length > 0) {
          return {
            lat: parseFloat(results[0].lat),
            lon: parseFloat(results[0].lon)
          };
        }
        
        // Delay to respect rate limiting (1 req/sec for Nominatim)
        await new Promise(resolve => setTimeout(resolve, 1100));
        
        return { lat: null, lon: null };
      } catch (error) {
        console.error(`Geocoding error for ${city}, ${state}:`, error);
        return { lat: null, lon: null };
      }
    };

    // Determine center type based on therapeutic areas
    const determineCenterType = (therapeuticAreas: string[]): string => {
      const areas = therapeuticAreas.map(a => a.toLowerCase()).join(' ');
      if (areas.includes('car-t') || areas.includes('gene therapy') || areas.includes('crispr')) {
        return 'gene_therapy';
      } else if (areas.includes('bmt') || areas.includes('stem cell transplant') || areas.includes('transplant')) {
        return 'bmt';
      } else if (areas.includes('oncology') || areas.includes('cancer') || areas.includes('myeloma') || areas.includes('lymphoma')) {
        return 'oncology';
      }
      return 'general';
    };

    // Extract country from address/state
    const determineCountry = (state: string): string => {
      const internationalStates = ['ON', 'BC', 'AB', 'QC']; // Canadian provinces
      if (internationalStates.includes(state)) return 'Canada';
      if (state === 'PR') return 'Puerto Rico';
      if (state === 'GU') return 'Guam';
      if (['AK', 'HI'].includes(state)) return 'USA'; // Explicitly USA for Alaska/Hawaii
      if (state.length === 2 && /^[A-Z]{2}$/.test(state)) return 'USA'; // All other 2-letter codes are US states
      return 'USA'; // Default
    };

    const centersToInsert = [];
    let geocodedCount = 0;

    // Process each record
    for (const record of records) {
      const therapeuticAreas = parseArrayField(record.therapeutic_areas);
      const centerType = determineCenterType(therapeuticAreas);
      const country = determineCountry(record.state);

      // Skip blocking geocoding during initial import (geocode in background)
      const lat = null as number | null;
      const lon = null as number | null;

      // if lat/lon were computed here, we'd increment geocodedCount; background task will handle it
      const centerData = {
        name: record.name,
        center_type: centerType,
        address: record.address || null,
        city: record.city || null,
        state: record.state || null,
        zip_code: record.zip_code || null,
        country: country,
        latitude: lat,
        longitude: lon,
        phone: record.phone || null,
        website: record.website || null,
        email: record.email || null,
        key_providers: parseArrayField(record.key_providers),
        therapeutic_areas: therapeuticAreas,
        products_drugs: parseArrayField(record.products_drugs),
        manufacturers: parseArrayField(record.manufacturers),
        clinical_trials: record.clinical_trials || null,
        trial_sponsors: parseArrayField(record.trial_sponsors),
        capacity_info: record.capacity_info || null,
        nci_designated: record.nci_designated || null,
        fact_accredited: record.fact_accredited?.toLowerCase() === 'yes',
        patient_services: parseArrayField(record.patient_services),
        specialties: therapeuticAreas, // Also store in specialties for backward compatibility
        source_name: 'Comprehensive Treatment Centers Database 2025',
        source_url: null,
        is_verified: true,
        metadata: {
          imported_at: new Date().toISOString(),
          source_file: 'expanded_therapy_centers_1.csv',
          total_specialties: therapeuticAreas.length,
          has_clinical_trials: !!record.clinical_trials,
          nci_status: record.nci_designated
        }
      };

      centersToInsert.push(centerData);
    }

    console.log(`Prepared ${centersToInsert.length} centers for insertion (geocoding scheduled in background)`);

    // Insert in batches of 50 to avoid timeout
    const batchSize = 50;
    let insertedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < centersToInsert.length; i += batchSize) {
      const batch = centersToInsert.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(centersToInsert.length / batchSize)}`);

      const { data, error } = await supabaseClient
        .from('treatment_centers')
        .insert(batch)
        .select('id,name,address,city,state,zip_code');

      if (error) {
        console.error(`Batch insert error:`, error);
        errorCount += batch.length;
      } else {
        insertedCount += data?.length ?? batch.length;
      }
    }

    // Background geocoding (non-blocking)
    const backgroundGeocode = async () => {
      try {
        console.log('Background geocoding started...');
        let count = 0;
        for (const c of centersToInsert) {
          const { lat, lon } = await geocodeAddress(
            c.address || '',
            c.city || '',
            c.state || '',
            c.zip_code || ''
          );
          if (lat && lon) count++;
          await supabaseClient
            .from('treatment_centers')
            .update({ latitude: lat, longitude: lon })
            .eq('name', c.name)
            .eq('address', c.address)
            .eq('city', c.city)
            .eq('state', c.state)
            .eq('zip_code', c.zip_code);
          await new Promise(res => setTimeout(res, 1100));
        }
        console.log(`Background geocoding finished for ${count} centers`);
      } catch (e) {
        console.error('Background geocoding error:', e);
      }
    };

    // @ts-ignore
    EdgeRuntime.waitUntil(backgroundGeocode());

    console.log(`Import completed: ${insertedCount} inserted, ${errorCount} errors, geocoded scheduled`);

    return new Response(
      JSON.stringify({
        success: true,
        inserted: insertedCount,
        errors: errorCount,
        geocoded: 0,
        total: records.length,
        geocodingScheduled: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
