/**
 * Label Studio Service
 * 
 * Manages Label Studio project configurations and conversation annotation workflows.
 * Enables human-in-the-loop quality improvement for AI responses.
 */

import { supabase } from '@/integrations/supabase/client';

export interface LabelStudioProject {
  id: string;
  name: string;
  project_id: string;
  api_url: string;
  description?: string;
  domain?: string;
  annotation_config?: Record<string, any>;
  is_active: boolean;
  auto_log_conversations: boolean;
  quality_threshold: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationAnnotation {
  id: string;
  conversation_id: string;
  label_studio_project_id: string;
  label_studio_task_id: string;
  quality_score?: number;
  annotations?: Record<string, any>;
  annotator_notes?: string;
  is_approved_for_training: boolean;
  annotated_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get all active Label Studio projects
 */
export async function getActiveLabelStudioProjects(domain?: string): Promise<LabelStudioProject[]> {
  try {
    let query = supabase
      .from('label_studio_projects' as any)
      .select('*')
      .eq('is_active', true);

    if (domain) {
      query = query.eq('domain', domain);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;
    return (data as any[]) || [];
  } catch (error) {
    console.error('Failed to fetch Label Studio projects:', error);
    return [];
  }
}

/**
 * Get a specific Label Studio project by ID
 */
export async function getLabelStudioProject(projectId: string): Promise<LabelStudioProject | null> {
  try {
    const { data, error } = await supabase
      .from('label_studio_projects' as any)
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error) throw error;
    return data as any;
  } catch (error) {
    console.error('Failed to fetch Label Studio project:', error);
    return null;
  }
}

/**
 * Create a new Label Studio project configuration
 */
export async function createLabelStudioProject(
  project: Omit<LabelStudioProject, 'id' | 'created_at' | 'updated_at'>
): Promise<LabelStudioProject | null> {
  try {
    const { data, error } = await supabase
      .from('label_studio_projects' as any)
      .insert(project as any)
      .select()
      .single();

    if (error) throw error;
    return data as any;
  } catch (error) {
    console.error('Failed to create Label Studio project:', error);
    return null;
  }
}

/**
 * Update an existing Label Studio project
 */
export async function updateLabelStudioProject(
  id: string,
  updates: Partial<LabelStudioProject>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('label_studio_projects' as any)
      .update(updates as any)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to update Label Studio project:', error);
    return false;
  }
}

/**
 * Delete a Label Studio project
 */
export async function deleteLabelStudioProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('label_studio_projects' as any)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete Label Studio project:', error);
    return false;
  }
}

/**
 * Log a conversation to Label Studio for annotation
 */
export async function logConversationToLabelStudio(
  conversationId: string,
  projectId: string,
  taskData: Record<string, any>
): Promise<{ success: boolean; taskId?: string; error?: string }> {
  try {
    const project = await getLabelStudioProject(projectId);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    // Call Label Studio API to create task
    const response = await fetch(`${project.api_url}/api/projects/${projectId}/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${import.meta.env.VITE_LABEL_STUDIO_API_KEY || ''}`
      },
      body: JSON.stringify([taskData])
    });

    if (!response.ok) {
      throw new Error(`Label Studio API returned ${response.status}`);
    }

    const result = await response.json();
    const taskId = result.task_ids?.[0] || result[0]?.id;

    // Record in our database
    await supabase.from('conversation_annotations' as any).insert({
      conversation_id: conversationId,
      label_studio_project_id: project.id,
      label_studio_task_id: taskId,
      annotations: { task_data: taskData }
    } as any);

    return { success: true, taskId };
  } catch (error) {
    console.error('Failed to log conversation to Label Studio:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Retrieve annotations for a conversation from Label Studio
 */
export async function getConversationAnnotations(
  conversationId: string
): Promise<ConversationAnnotation[]> {
  try {
    const { data, error } = await supabase
      .from('conversation_annotations' as any)
      .select('*, label_studio_projects(*)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as any[]) || [];
  } catch (error) {
    console.error('Failed to fetch conversation annotations:', error);
    return [];
  }
}

/**
 * Sync completed annotations from Label Studio
 */
export async function syncAnnotationsFromLabelStudio(
  projectId: string
): Promise<{ synced: number; errors: number }> {
  try {
    const project = await getLabelStudioProject(projectId);
    if (!project) {
      return { synced: 0, errors: 1 };
    }

    // Fetch completed tasks from Label Studio
    const response = await fetch(
      `${project.api_url}/api/projects/${projectId}/export?exportType=JSON`,
      {
        headers: {
          'Authorization': `Token ${import.meta.env.VITE_LABEL_STUDIO_API_KEY || ''}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Label Studio API returned ${response.status}`);
    }

    const tasks = await response.json();
    let synced = 0;
    let errors = 0;

    for (const task of tasks) {
      if (!task.annotations || task.annotations.length === 0) {
        continue; // Skip tasks without annotations
      }

      const latestAnnotation = task.annotations[task.annotations.length - 1];
      
      try {
        // Update or insert annotation
        await supabase
          .from('conversation_annotations' as any)
          .upsert({
            label_studio_task_id: task.id.toString(),
            label_studio_project_id: project.id,
            annotations: latestAnnotation.result,
            quality_score: extractQualityScore(latestAnnotation.result),
            annotator_notes: latestAnnotation.result?.notes,
            is_approved_for_training: checkTrainingApproval(latestAnnotation.result),
            annotated_at: latestAnnotation.completed_at || new Date().toISOString()
          } as any, {
            onConflict: 'label_studio_task_id'
          });

        synced++;
      } catch (err) {
        console.error('Failed to sync annotation:', err);
        errors++;
      }
    }

    return { synced, errors };
  } catch (error) {
    console.error('Failed to sync annotations from Label Studio:', error);
    return { synced: 0, errors: 1 };
  }
}

/**
 * Extract quality score from annotation results
 */
function extractQualityScore(annotationResult: any): number | undefined {
  if (!annotationResult) return undefined;
  
  // Look for rating or quality_score in annotation results
  for (const item of annotationResult) {
    if (item.type === 'rating' || item.from_name === 'quality_score') {
      return item.value?.rating || item.value?.score;
    }
  }
  
  return undefined;
}

/**
 * Check if annotation is approved for training
 */
function checkTrainingApproval(annotationResult: any): boolean {
  if (!annotationResult) return false;
  
  // Look for approval checkbox in annotations
  for (const item of annotationResult) {
    if (item.from_name === 'approved_for_training' || item.type === 'choices') {
      return item.value?.choices?.includes('approved') || item.value === true;
    }
  }
  
  return false;
}

/**
 * Get annotation statistics for a project
 */
export async function getProjectAnnotationStats(
  projectId: string
): Promise<{
  total: number;
  annotated: number;
  approved_for_training: number;
  average_quality: number;
}> {
  try {
    const { data, error } = await supabase
      .from('conversation_annotations' as any)
      .select('quality_score, is_approved_for_training')
      .eq('label_studio_project_id', projectId);

    if (error) throw error;

    const annotations = (data as any[]) || [];
    const total = annotations.length;
    const annotated = annotations.filter((a: any) => a.quality_score !== null).length;
    const approved = annotations.filter((a: any) => a.is_approved_for_training).length;
    const avgQuality = annotations
      .filter((a: any) => a.quality_score !== null)
      .reduce((sum: number, a: any) => sum + (a.quality_score || 0), 0) / (annotated || 1);

    return {
      total,
      annotated,
      approved_for_training: approved,
      average_quality: avgQuality
    };
  } catch (error) {
    console.error('Failed to get annotation stats:', error);
    return {
      total: 0,
      annotated: 0,
      approved_for_training: 0,
      average_quality: 0
    };
  }
}
