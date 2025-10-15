import { supabase } from '@/integrations/supabase/client';

export interface TreatmentCenter {
  id: string;
  name: string;
  center_type: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  email?: string;
  specialties?: string[];
  therapeutic_areas?: string[];
  products_drugs?: string[];
  manufacturers?: string[];
  key_providers?: string[];
  clinical_trials?: string;
  trial_sponsors?: string[];
  capacity_info?: string;
  nci_designated?: string;
  fact_accredited?: boolean;
  patient_services?: string[];
  accreditations?: string[];
  metadata?: Record<string, any>;
  source_url?: string;
  source_name?: string;
  is_verified?: boolean;
  created_at?: string;
}

// Parse CSV line handling quoted fields
const parseCSVLine = (line: string): string[] => {
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
};

/**
 * Crawl treatment center websites and extract structured data
 */
export const crawlTreatmentCenters = async (
  url: string,
  centerType: 'gene_therapy' | 'bmt' | 'oncology' | 'general',
  sourceName: string,
  maxPages: number = 50
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('crawl-treatment-centers', {
      body: {
        url,
        centerType,
        sourceName,
        maxPages
      }
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error crawling treatment centers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to crawl treatment centers'
    };
  }
};

/**
 * Search treatment centers by location, type, or specialty
 */
export const searchTreatmentCenters = async (filters: {
  centerType?: string;
  state?: string;
  city?: string;
  specialty?: string;
  therapeuticArea?: string;
  product?: string;
  manufacturer?: string;
  provider?: string;
  clinicalTrial?: string;
  nciDesignated?: boolean;
  factAccredited?: boolean;
  country?: string;
  searchText?: string;
  limit?: number;
}): Promise<TreatmentCenter[]> => {
  try {
    let query = supabase
      .from('treatment_centers')
      .select('*')
      .order('name');

    if (filters.centerType) {
      query = query.eq('center_type', filters.centerType);
    }

    if (filters.state) {
      query = query.eq('state', filters.state);
    }

    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    if (filters.country) {
      query = query.eq('country', filters.country);
    }

    if (filters.specialty) {
      query = query.contains('specialties', [filters.specialty]);
    }

    if (filters.therapeuticArea) {
      query = query.contains('therapeutic_areas', [filters.therapeuticArea]);
    }

    if (filters.product) {
      query = query.contains('products_drugs', [filters.product]);
    }

    if (filters.manufacturer) {
      query = query.contains('manufacturers', [filters.manufacturer]);
    }

    if (filters.provider) {
      query = query.or(`key_providers.cs.{${filters.provider}}`);
    }

    if (filters.clinicalTrial) {
      query = query.ilike('clinical_trials', `%${filters.clinicalTrial}%`);
    }

    if (filters.nciDesignated !== undefined) {
      query = query.not('nci_designated', 'is', null);
    }

    if (filters.factAccredited !== undefined) {
      query = query.eq('fact_accredited', filters.factAccredited);
    }

    if (filters.searchText) {
      query = query.or(`name.ilike.%${filters.searchText}%,city.ilike.%${filters.searchText}%,state.ilike.%${filters.searchText}%,therapeutic_areas.cs.{${filters.searchText}}`);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data as TreatmentCenter[]) || [];
  } catch (error) {
    console.error('Error searching treatment centers:', error);
    return [];
  }
};

/**
 * Get treatment centers with geographic coordinates for map display
 */
export const getTreatmentCentersForMap = async (
  centerType?: string
): Promise<TreatmentCenter[]> => {
  try {
    let query = supabase
      .from('treatment_centers')
      .select('*')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null);

    if (centerType) {
      query = query.eq('center_type', centerType);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data as TreatmentCenter[]) || [];
  } catch (error) {
    console.error('Error fetching centers for map:', error);
    return [];
  }
};

/**
 * Log citation when a knowledge source is used in AI response
 */
export const logKnowledgeCitation = async (
  knowledgeBaseId: string,
  conversationId: string,
  citedInResponse: string,
  citationContext?: Record<string, any>
): Promise<void> => {
  try {
    await supabase
      .from('knowledge_citations')
      .insert({
        knowledge_base_id: knowledgeBaseId,
        conversation_id: conversationId,
        cited_in_response: citedInResponse,
        citation_context: citationContext || {}
      });
  } catch (error) {
    console.error('Error logging citation:', error);
  }
};

/**
 * Get citation statistics for a knowledge source
 */
export const getCitationStats = async (
  knowledgeBaseId: string
): Promise<{ total: number; recent: any[] }> => {
  try {
    const { count } = await supabase
      .from('knowledge_citations')
      .select('*', { count: 'exact', head: true })
      .eq('knowledge_base_id', knowledgeBaseId);

    const { data: recent } = await supabase
      .from('knowledge_citations')
      .select('*')
      .eq('knowledge_base_id', knowledgeBaseId)
      .order('created_at', { ascending: false })
      .limit(10);

    return {
      total: count || 0,
      recent: recent || []
    };
  } catch (error) {
    console.error('Error fetching citation stats:', error);
    return { total: 0, recent: [] };
  }
};

/**
 * Get most cited knowledge sources
 */
export const getMostCitedSources = async (
  domain?: string,
  limit: number = 10
): Promise<any[]> => {
  try {
    let query = supabase
      .from('universal_knowledge_base')
      .select('*')
      .not('citation_count', 'is', null)
      .order('citation_count', { ascending: false })
      .limit(limit);

    if (domain) {
      query = query.eq('domain', domain);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching most cited sources:', error);
    return [];
  }
};

/**
 * Load enhanced treatment centers from CSV file
 */
export const loadEnhancedCenters = async (): Promise<any[]> => {
  try {
    const response = await fetch('/data/treatment-centers-enhanced.csv');
    const text = await response.text();
    const lines = text.trim().split('\n');
    
    // Skip header
    const dataLines = lines.slice(1);
    
    return dataLines.map(line => {
      const fields = parseCSVLine(line);
      return {
        name: fields[0],
        address: fields[1],
        city: fields[2],
        state: fields[3],
        zip_code: fields[4],
        phone: fields[5],
        website: fields[6],
        email: fields[7],
        key_providers: fields[8],
        therapeutic_areas: fields[9],
        products_drugs: fields[10],
        manufacturers: fields[11],
        clinical_trials: fields[12],
        trial_sponsors: fields[13],
        capacity: fields[14],
        nci_designated: fields[15],
        fact_accredited: fields[16],
        patient_services: fields[17]
      };
    });
  } catch (error) {
    console.error('Error loading enhanced centers:', error);
    return [];
  }
};
