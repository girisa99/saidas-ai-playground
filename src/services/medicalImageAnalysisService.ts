import { supabase } from '@/integrations/supabase/client';

export interface MedicalImageAnalysisRequest {
  imageData: string; // base64 encoded image
  modality?: string; // CT, MRI, X-Ray, Ultrasound, Mammography, ECG
  bodyPart?: string;
  clinicalContext?: string;
  userEmail?: string;
  sessionId?: string;
  aiModel?: string;
}

export interface MedicalImageAnalysisResponse {
  success: boolean;
  analysis?: string;
  ragContext?: {
    retrievedCount: number;
    datasets: string[];
    topFindings: string[];
  };
  error?: string;
}

/**
 * Analyze medical images using RAG-enhanced AI vision models
 * Leverages authoritative medical imaging datasets (TCIA, ADNI, NIH, etc.)
 */
export const analyzeMedicalImage = async (
  request: MedicalImageAnalysisRequest
): Promise<MedicalImageAnalysisResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-medical-image', {
      body: request
    });

    if (error) {
      console.error('Medical image analysis error:', error);
      throw error;
    }

    return data as MedicalImageAnalysisResponse;
  } catch (error) {
    console.error('Failed to analyze medical image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Analysis failed'
    };
  }
};

/**
 * Search medical imaging knowledge base
 */
export const searchMedicalKnowledge = async (
  query: string,
  modality?: string
): Promise<any[]> => {
  try {
    // Now using universal_knowledge_base with domain filter
    const { data, error } = await supabase
      .from('universal_knowledge_base')
      .select('*')
      .eq('domain', 'medical_imaging')
      .ilike('metadata->>modality', modality || 'X-Ray')
      .order('quality_score', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Knowledge search error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to search knowledge base:', error);
    return [];
  }
};

/**
 * Get user's vision analysis history
 */
export const getUserAnalysisHistory = async (
  userEmail: string
): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('vision_analysis_logs')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Failed to fetch analysis history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch analysis history:', error);
    return [];
  }
};
