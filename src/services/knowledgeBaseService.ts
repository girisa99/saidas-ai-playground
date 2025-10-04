import { supabase } from '@/integrations/supabase/client';
import { 
  KnowledgeDomain, 
  ContentType,
  searchUniversalKnowledge,
  trackKnowledgeUsage 
} from './universalKnowledgeService';

/**
 * Universal Knowledge Base Service
 * Single entry point for all knowledge base operations
 * Routes everything through universal_knowledge_base table
 */

export interface KnowledgeEntry {
  title: string;
  content: string;
  domain: KnowledgeDomain;
  contentType: ContentType;
  tags?: string[];
  metadata?: Record<string, any>;
  sourceType: 'manual_entry' | 'url' | 'document' | 'pdf' | 'api' | 'crawl';
  sourceUrl?: string;
  fileName?: string;
  fileType?: string;
}

/**
 * Add knowledge from any source (URL, PDF, API, crawl, manual)
 * All routes through universal_knowledge_base
 */
export const addKnowledgeEntry = async (entry: KnowledgeEntry): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const { data, error } = await supabase
      .from('universal_knowledge_base')
      .insert({
        finding_name: entry.title,
        description: entry.content,
        domain: entry.domain,
        content_type: entry.contentType,
        metadata: {
          ...entry.metadata,
          tags: entry.tags || [],
          source_type: entry.sourceType,
          source_url: entry.sourceUrl,
          file_name: entry.fileName,
          file_type: entry.fileType,
          created_at: new Date().toISOString()
        },
        clinical_context: {},
        quality_score: 75,
        is_approved: true
      })
      .select('id')
      .single();

    if (error) throw error;

    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error adding knowledge entry:', error);
    return { success: false, error };
  }
};

/**
 * Add knowledge from URL (fetch and parse)
 */
export const addKnowledgeFromUrl = async (
  url: string,
  domain: KnowledgeDomain,
  contentType: ContentType,
  tags?: string[]
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    // Fetch content from URL (you can enhance this with actual fetching logic)
    const response = await fetch(url);
    const content = await response.text();

    return await addKnowledgeEntry({
      title: `Content from ${new URL(url).hostname}`,
      content,
      domain,
      contentType,
      tags,
      sourceType: 'url',
      sourceUrl: url
    });
  } catch (error) {
    console.error('Error adding knowledge from URL:', error);
    return { success: false, error };
  }
};

/**
 * Add knowledge from document/PDF
 */
export const addKnowledgeFromDocument = async (
  file: File,
  title: string,
  domain: KnowledgeDomain,
  contentType: ContentType,
  tags?: string[]
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    // Read file content (you can enhance this with PDF parsing)
    const content = await file.text();

    return await addKnowledgeEntry({
      title,
      content,
      domain,
      contentType,
      tags,
      sourceType: file.type.includes('pdf') ? 'pdf' : 'document',
      fileName: file.name,
      fileType: file.type
    });
  } catch (error) {
    console.error('Error adding knowledge from document:', error);
    return { success: false, error };
  }
};

/**
 * Add knowledge from API response
 */
export const addKnowledgeFromApi = async (
  apiResponse: any,
  title: string,
  domain: KnowledgeDomain,
  contentType: ContentType,
  tags?: string[]
): Promise<{ success: boolean; id?: string; error?: any }> => {
  try {
    const content = typeof apiResponse === 'string' 
      ? apiResponse 
      : JSON.stringify(apiResponse, null, 2);

    return await addKnowledgeEntry({
      title,
      content,
      domain,
      contentType,
      tags,
      sourceType: 'api',
      metadata: { api_response: true }
    });
  } catch (error) {
    console.error('Error adding knowledge from API:', error);
    return { success: false, error };
  }
};

/**
 * Search knowledge with RAG support
 */
export const searchKnowledgeWithRag = async (
  query: string,
  domain?: KnowledgeDomain,
  contentType?: ContentType,
  limit: number = 10
): Promise<any[]> => {
  try {
    if (domain) {
      return await searchUniversalKnowledge(domain, query, contentType, limit);
    }

    // Search across all domains
    const { data, error } = await supabase
      .from('universal_knowledge_base')
      .select('*')
      .textSearch('description', query)
      .eq('is_approved', true)
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error searching knowledge with RAG:', error);
    return [];
  }
};

/**
 * Update knowledge entry
 */
export const updateKnowledgeEntry = async (
  id: string,
  updates: Partial<KnowledgeEntry>
): Promise<{ success: boolean; error?: any }> => {
  try {
    const updateData: any = {};
    
    if (updates.title) updateData.finding_name = updates.title;
    if (updates.content) updateData.description = updates.content;
    if (updates.domain) updateData.domain = updates.domain;
    if (updates.contentType) updateData.content_type = updates.contentType;
    
    if (updates.tags || updates.metadata || updates.sourceType || updates.sourceUrl) {
      updateData.metadata = {
        tags: updates.tags,
        source_type: updates.sourceType,
        source_url: updates.sourceUrl,
        ...updates.metadata,
        updated_at: new Date().toISOString()
      };
    }

    const { error } = await supabase
      .from('universal_knowledge_base')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating knowledge entry:', error);
    return { success: false, error };
  }
};

/**
 * Delete knowledge entry
 */
export const deleteKnowledgeEntry = async (id: string): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('universal_knowledge_base')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting knowledge entry:', error);
    return { success: false, error };
  }
};

/**
 * Track usage when knowledge is used in RAG/agents/conversations
 */
export const trackKnowledgeUsageSimple = async (
  knowledgeId: string,
  domain: KnowledgeDomain,
  useCase: string,
  userId?: string,
  sessionId?: string
): Promise<void> => {
  await trackKnowledgeUsage({
    knowledge_base_id: knowledgeId,
    domain,
    use_case: useCase,
    user_id: userId,
    session_id: sessionId
  });
};
