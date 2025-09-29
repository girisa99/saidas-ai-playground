-- Create storage bucket for knowledge base files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'knowledge-files', 
  'knowledge-files', 
  false, 
  20971520, -- 20MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/json', 'text/plain', 'text/html', 'image/jpeg', 'image/png', 'image/webp',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
) ON CONFLICT (id) DO NOTHING;

-- Add new columns to knowledge_base table for enhanced functionality
ALTER TABLE knowledge_base 
ADD COLUMN IF NOT EXISTS content_url TEXT,
ADD COLUMN IF NOT EXISTS content_html TEXT,
ADD COLUMN IF NOT EXISTS file_path TEXT,
ADD COLUMN IF NOT EXISTS file_name TEXT,
ADD COLUMN IF NOT EXISTS file_size INTEGER,
ADD COLUMN IF NOT EXISTS file_type TEXT,
ADD COLUMN IF NOT EXISTS is_static BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS parent_static_entry TEXT;

-- Create RLS policies for knowledge files storage
CREATE POLICY "Admins can upload knowledge files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'knowledge-files' AND 
  auth.uid() IS NOT NULL AND 
  (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      JOIN roles r ON r.id = ur.role_id 
      WHERE ur.user_id = auth.uid() 
      AND r.name IN ('superAdmin', 'onboardingTeam')
    )
  )
);

CREATE POLICY "Admins can view knowledge files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'knowledge-files' AND 
  auth.uid() IS NOT NULL AND 
  (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      JOIN roles r ON r.id = ur.role_id 
      WHERE ur.user_id = auth.uid() 
      AND r.name IN ('superAdmin', 'onboardingTeam')
    )
  )
);

CREATE POLICY "Admins can delete knowledge files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'knowledge-files' AND 
  auth.uid() IS NOT NULL AND 
  (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      JOIN roles r ON r.id = ur.role_id 
      WHERE ur.user_id = auth.uid() 
      AND r.name IN ('superAdmin', 'onboardingTeam')
    )
  )
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category_type ON knowledge_base(category, source_type);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_static ON knowledge_base(is_static) WHERE is_static = true;