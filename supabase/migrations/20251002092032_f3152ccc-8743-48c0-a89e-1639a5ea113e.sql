-- ============================================================================
-- SECURITY FIX: Restrict workflow_node_types to Authenticated Users Only
-- ============================================================================
-- Remove public access to system architecture details

-- Drop the public SELECT policy
DROP POLICY IF EXISTS "Public can view active workflow node types" ON public.workflow_node_types;

-- Add authenticated-only SELECT policy
CREATE POLICY "authenticated_view_workflow_node_types"
ON public.workflow_node_types
FOR SELECT
TO authenticated
USING (true);

COMMENT ON TABLE public.workflow_node_types IS 'System workflow node types - authenticated users only. Public Genie functionality is separate and unaffected.';