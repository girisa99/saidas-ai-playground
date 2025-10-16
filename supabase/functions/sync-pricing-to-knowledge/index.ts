import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting pricing data sync to knowledge base...');

    // Fetch pricing CSV data
    const response = await fetch(`${supabaseUrl.replace('https://', 'https://ithspbabhmdntioslfqe.')}/storage/v1/object/public/data/product-pricing-journey.csv`);
    
    if (!response.ok) {
      // Try direct file fetch
      const directResponse = await fetch('https://ithspbabhmdntioslfqe.supabase.co/storage/v1/object/public/data/product-pricing-journey.csv');
      if (!directResponse.ok) {
        throw new Error('Failed to fetch pricing CSV');
      }
    }

    const csvText = await response.text();
    const lines = csvText.split('\n');
    const dataLines = lines.slice(1); // Skip header

    console.log(`Processing ${dataLines.length} pricing records...`);

    // Clear existing pricing entries
    const { error: deleteError } = await supabase
      .from('universal_knowledge_base')
      .delete()
      .eq('domain', 'pricing_journey')
      .eq('content_type', 'pricing');

    if (deleteError) {
      console.error('Error clearing old pricing entries:', deleteError);
    }

    let syncedCount = 0;
    const batchSize = 10;

    for (let i = 0; i < dataLines.length; i += batchSize) {
      const batch = dataLines.slice(i, i + batchSize);
      const insertData = [];

      for (const line of batch) {
        if (!line.trim()) continue;

        const fields = parseCSVLine(line);
        if (fields.length < 22) continue;

        const [
          product_name, generic_name, manufacturer, ndc_code, therapeutic_area,
          indication, number_of_doses, wac_price, government_price, commercial_price,
          pap_available, prior_auth_required, phase1_preinfusion, phase2_manufacturing,
          phase3_infusion, phase4_postinfusion, days_to_infusion, insurance_types,
          copay_assistance, rems_required, specialty_pharmacy, inpatient_outpatient
        ] = fields;

        const content = `
# ${product_name} (${generic_name})

**Manufacturer:** ${manufacturer}
**NDC Code:** ${ndc_code}
**Therapeutic Area:** ${therapeutic_area}
**Indication:** ${indication}

## Pricing Information
- **WAC Price:** ${wac_price}
- **Government (340B) Price:** ${government_price}
- **Commercial Price:** ${commercial_price}

**Patient Assistance Program:** ${pap_available}
**Copay Assistance:** ${copay_assistance}

## Coverage Requirements
- Prior Authorization: ${prior_auth_required}
- Insurance Types: ${insurance_types}
- REMS Required: ${rems_required}
- Specialty Pharmacy: ${specialty_pharmacy}
- Administration: ${inpatient_outpatient}

## Treatment Journey Timeline

**Total Timeline:** ${days_to_infusion} from enrollment to treatment

### Phase 1: Pre-Infusion
${phase1_preinfusion}

### Phase 2: Manufacturing
${phase2_manufacturing}

### Phase 3: Infusion/Administration
${phase3_infusion}

### Phase 4: Post-Infusion Monitoring
${phase4_postinfusion}
        `.trim();

        insertData.push({
          finding_name: `${product_name} - Complete Pricing & Journey`,
          description: `Comprehensive pricing, insurance coverage, and treatment journey information for ${product_name}`,
          clinical_significance: content,
          domain: 'pricing_journey',
          content_type: 'pricing',
          is_approved: true,
          quality_score: 95,
          metadata: {
            product_name,
            generic_name,
            manufacturer,
            therapeutic_area,
            wac_price,
            government_price,
            commercial_price,
            ndc_code,
            days_to_treatment: days_to_infusion,
            pap_available: pap_available === 'Yes',
            copay_assistance: copay_assistance === 'Yes',
            prior_auth_required: prior_auth_required.includes('Yes'),
            tags: [
              therapeutic_area.toLowerCase(),
              manufacturer.toLowerCase(),
              'pricing',
              'treatment-journey',
              'insurance',
              'patient-assistance'
            ]
          }
        });
      }

      if (insertData.length > 0) {
        const { error: insertError } = await supabase
          .from('universal_knowledge_base')
          .insert(insertData);

        if (insertError) {
          console.error('Batch insert error:', insertError);
        } else {
          syncedCount += insertData.length;
        }
      }
    }

    console.log(`✅ Successfully synced ${syncedCount} pricing records to knowledge base`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        syncedCount,
        message: `Successfully synced ${syncedCount} pricing records`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error syncing pricing data:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}