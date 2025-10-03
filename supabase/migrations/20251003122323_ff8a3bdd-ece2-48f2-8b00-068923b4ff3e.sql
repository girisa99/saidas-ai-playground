-- Add missing columns to genie_conversations table
ALTER TABLE public.genie_conversations
ADD COLUMN IF NOT EXISTS context text,
ADD COLUMN IF NOT EXISTS user_email text,
ADD COLUMN IF NOT EXISTS user_name text,
ADD COLUMN IF NOT EXISTS session_start timestamp with time zone,
ADD COLUMN IF NOT EXISTS session_end timestamp with time zone,
ADD COLUMN IF NOT EXISTS ip_address text,
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- Create index on context for faster filtering
CREATE INDEX IF NOT EXISTS idx_genie_conversations_context 
ON public.genie_conversations(context);

-- Create index on user_email for analytics
CREATE INDEX IF NOT EXISTS idx_genie_conversations_user_email 
ON public.genie_conversations(user_email);

-- Create index on ip_address for geographic analytics
CREATE INDEX IF NOT EXISTS idx_genie_conversations_ip_address 
ON public.genie_conversations(ip_address);

-- Update existing records to have default context
UPDATE public.genie_conversations
SET context = 'general'
WHERE context IS NULL;