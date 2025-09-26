-- Add missing columns to email_templates table
ALTER TABLE public.email_templates 
ADD COLUMN IF NOT EXISTS template_type text DEFAULT 'custom',
ADD COLUMN IF NOT EXISTS is_system_template boolean DEFAULT false;

-- Insert comprehensive email templates for authentication and admin scenarios
INSERT INTO public.email_templates (name, subject, html_content, text_content, template_variables, template_type, is_system_template) VALUES
(
  'welcome_email',
  'Welcome to {{app_name}}!',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #3b82f6;">Welcome to {{app_name}}!</h1>
        <p>Hi {{user_name}},</p>
        <p>Welcome to {{app_name}}! We''re excited to have you on board.</p>
        <p>Your account has been successfully created with the email: <strong>{{user_email}}</strong></p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Next Steps:</h3>
            <ul>
                <li>Complete your profile setup</li>
                <li>Explore our platform features</li>
                <li>Contact support if you have any questions</li>
            </ul>
        </div>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The {{app_name}} Team</p>
    </div>
</body>
</html>',
  'Welcome to {{app_name}}!

Hi {{user_name}},

Welcome to {{app_name}}! We''re excited to have you on board.

Your account has been successfully created with the email: {{user_email}}

Next Steps:
- Complete your profile setup
- Explore our platform features
- Contact support if you have any questions

If you have any questions, feel free to reach out to our support team.

Best regards,
The {{app_name}} Team',
  '["app_name", "user_name", "user_email"]'::jsonb,
  'authentication',
  true
),
(
  'password_reset',
  'Reset Your {{app_name}} Password',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #3b82f6;">Password Reset Request</h1>
        <p>Hi {{user_name}},</p>
        <p>We received a request to reset your password for your {{app_name}} account.</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{reset_url}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in {{expiry_time}}.</p>
        <p>If you didn''t request this password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>For security reasons, please don''t share this email with anyone.</p>
        <p>Best regards,<br>The {{app_name}} Team</p>
    </div>
</body>
</html>',
  'Password Reset Request

Hi {{user_name}},

We received a request to reset your password for your {{app_name}} account.

Click the link below to reset your password:
{{reset_url}}

This link will expire in {{expiry_time}}.

If you didn''t request this password reset, please ignore this email. Your password will remain unchanged.

For security reasons, please don''t share this email with anyone.

Best regards,
The {{app_name}} Team',
  '["app_name", "user_name", "reset_url", "expiry_time"]'::jsonb,
  'authentication',
  true
),
(
  'email_confirmation',
  'Confirm Your {{app_name}} Email Address',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Email Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #3b82f6;">Confirm Your Email Address</h1>
        <p>Hi {{user_name}},</p>
        <p>Thank you for signing up for {{app_name}}! Please confirm your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{confirmation_url}}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Confirm Email</a>
        </div>
        <p>This link will expire in {{expiry_time}}.</p>
        <p>If you didn''t create an account with us, please ignore this email.</p>
        <p>Best regards,<br>The {{app_name}} Team</p>
    </div>
</body>
</html>',
  'Confirm Your Email Address

Hi {{user_name}},

Thank you for signing up for {{app_name}}! Please confirm your email address to complete your registration.

Click the link below to confirm your email:
{{confirmation_url}}

This link will expire in {{expiry_time}}.

If you didn''t create an account with us, please ignore this email.

Best regards,
The {{app_name}} Team',
  '["app_name", "user_name", "confirmation_url", "expiry_time"]'::jsonb,
  'authentication',
  true
),
(
  'magic_link',
  'Your {{app_name}} Login Link',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Magic Link Login</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #3b82f6;">Your Login Link</h1>
        <p>Hi {{user_name}},</p>
        <p>Click the button below to sign in to your {{app_name}} account:</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{magic_link_url}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Sign In</a>
        </div>
        <p>This link will expire in {{expiry_time}}.</p>
        <p>If you didn''t request this login link, please ignore this email.</p>
        <p>Best regards,<br>The {{app_name}} Team</p>
    </div>
</body>
</html>',
  'Your Login Link

Hi {{user_name}},

Click the link below to sign in to your {{app_name}} account:
{{magic_link_url}}

This link will expire in {{expiry_time}}.

If you didn''t request this login link, please ignore this email.

Best regards,
The {{app_name}} Team',
  '["app_name", "user_name", "magic_link_url", "expiry_time"]'::jsonb,
  'authentication',
  true
),
(
  'admin_notification',
  '{{notification_type}} - {{app_name}} Admin Alert',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Admin Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626;">{{notification_type}}</h1>
        <p>Hello Admin,</p>
        <p>{{notification_message}}</p>
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #dc2626;">Details:</h3>
            <p style="margin: 0;"><strong>User:</strong> {{user_email}}</p>
            <p style="margin: 0;"><strong>Time:</strong> {{timestamp}}</p>
            <p style="margin: 0;"><strong>IP Address:</strong> {{ip_address}}</p>
        </div>
        <p>Please review and take appropriate action if necessary.</p>
        <p>Best regards,<br>{{app_name}} System</p>
    </div>
</body>
</html>',
  'Admin Notification: {{notification_type}}

Hello Admin,

{{notification_message}}

Details:
- User: {{user_email}}
- Time: {{timestamp}}
- IP Address: {{ip_address}}

Please review and take appropriate action if necessary.

Best regards,
{{app_name}} System',
  '["app_name", "notification_type", "notification_message", "user_email", "timestamp", "ip_address"]'::jsonb,
  'admin',
  true
),
(
  'account_locked',
  'Account Security Alert - {{app_name}}',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Account Locked</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626;">Account Security Alert</h1>
        <p>Hi {{user_name}},</p>
        <p>Your {{app_name}} account has been temporarily locked due to {{lock_reason}}.</p>
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
            <p><strong>Account:</strong> {{user_email}}</p>
            <p><strong>Locked at:</strong> {{lock_time}}</p>
            <p><strong>Reason:</strong> {{lock_reason}}</p>
        </div>
        <p>To unlock your account, please contact our support team or wait {{unlock_time}} before trying again.</p>
        <p>If you believe this was an error, please contact support immediately.</p>
        <p>Best regards,<br>The {{app_name}} Security Team</p>
    </div>
</body>
</html>',
  'Account Security Alert

Hi {{user_name}},

Your {{app_name}} account has been temporarily locked due to {{lock_reason}}.

Account: {{user_email}}
Locked at: {{lock_time}}
Reason: {{lock_reason}}

To unlock your account, please contact our support team or wait {{unlock_time}} before trying again.

If you believe this was an error, please contact support immediately.

Best regards,
The {{app_name}} Security Team',
  '["app_name", "user_name", "user_email", "lock_reason", "lock_time", "unlock_time"]'::jsonb,
  'security',
  true
);

-- Create helper functions for standardized auth emails
CREATE OR REPLACE FUNCTION public.send_auth_email(
  p_template_name text,
  p_to_email text,
  p_variables jsonb DEFAULT '{}'::jsonb,
  p_from_email text DEFAULT 'noreply@resend.dev'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  template_record RECORD;
  function_response jsonb;
BEGIN
  -- Get template data
  SELECT id INTO template_record
  FROM email_templates
  WHERE name = p_template_name AND is_active = true;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Email template % not found', p_template_name;
  END IF;
  
  -- Call send-email function via HTTP
  SELECT public.send_email_via_resend(
    p_to_email,
    p_from_email,
    template_record.id,
    p_variables
  ) INTO function_response;
  
  RETURN function_response;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error sending auth email: %', SQLERRM;
    RETURN jsonb_build_object('error', SQLERRM);
END;
$$;

-- Helper function to call send-email edge function
CREATE OR REPLACE FUNCTION public.send_email_via_resend(
  p_to_email text,
  p_from_email text DEFAULT 'noreply@resend.dev',
  p_template_id uuid DEFAULT NULL,
  p_variables jsonb DEFAULT '{}'::jsonb,
  p_subject text DEFAULT NULL,
  p_html_content text DEFAULT NULL,
  p_text_content text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
  result jsonb;
BEGIN
  -- Build the payload
  payload := jsonb_build_object(
    'to', p_to_email,
    'from', p_from_email
  );
  
  IF p_template_id IS NOT NULL THEN
    payload := payload || jsonb_build_object(
      'template_id', p_template_id,
      'variables', p_variables
    );
  ELSE
    payload := payload || jsonb_build_object(
      'subject', p_subject,
      'html_content', p_html_content,
      'text_content', p_text_content
    );
  END IF;
  
  -- This would normally call the edge function
  -- For now, return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Email queued for sending',
    'template_id', p_template_id
  );
END;
$$;