import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactEmailRequest {
  senderName: string;
  senderEmail: string;
  subject?: string;
  message: string;
  contactMethod?: string;
  companyName?: string;
  phoneNumber?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactEmailRequest = await req.json();
    console.log('Contact form submission:', contactData);

    // Validate required fields
    if (!contactData.senderName || !contactData.senderEmail || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: senderName, senderEmail, and message are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create professional HTML email template
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
        <!-- Header -->
        <div style="background-color: #ffffff; border-radius: 8px 8px 0 0; padding: 24px; border-bottom: 3px solid #3b82f6; text-align: center;">
          <div style="display: inline-block; padding: 12px 20px; background-color: #3b82f6; border-radius: 8px; margin-bottom: 8px;">
            <span style="font-size: 24px; font-weight: bold; color: white;">🧞 Genie AI</span>
          </div>
          <div style="font-size: 14px; color: #64748b; font-style: italic;">Innovation through AI</div>
        </div>

        <!-- Content -->
        <div style="background-color: #ffffff; padding: 32px 24px; border-radius: 0 0 8px 8px;">
          <h1 style="color: #1e293b; font-size: 28px; font-weight: bold; margin: 0 0 24px 0; text-align: center;">New Contact Enquiry</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">
            You have received a new contact enquiry through your Genie AI Experimentation Hub website.
          </p>

          <!-- Contact Details -->
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #334155; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Contact Details</h2>
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Name:</span>
              <span style="color: #1e293b; font-size: 14px;">${contactData.senderName}</span>
            </div>
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Email:</span>
              <a href="mailto:${contactData.senderEmail}" style="color: #3b82f6; text-decoration: underline; font-size: 14px;">${contactData.senderEmail}</a>
            </div>

            ${contactData.phoneNumber ? `
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Phone:</span>
              <span style="color: #1e293b; font-size: 14px;">${contactData.phoneNumber}</span>
            </div>
            ` : ''}

            ${contactData.companyName ? `
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Company:</span>
              <span style="color: #1e293b; font-size: 14px;">${contactData.companyName}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Contact Method:</span>
              <span style="color: #1e293b; font-size: 14px;">${contactData.contactMethod || 'Website Contact Form'}</span>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 100px;">Subject:</span>
              <span style="color: #1e293b; font-size: 14px;">${contactData.subject || 'Contact Form Enquiry'}</span>
            </div>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 24px;">
            <h2 style="color: #334155; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Message</h2>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
              <div style="color: #1e293b; font-size: 16px; line-height: 24px; white-space: pre-wrap;">${contactData.message}</div>
            </div>
          </div>

          <!-- Call to Action -->
          <div style="background-color: #fef3cd; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #475569; font-size: 16px; margin: 0 0 12px 0;"><strong>Recommended Actions:</strong></p>
            <ul style="margin: 12px 0; padding-left: 20px;">
              <li style="color: #92400e; font-size: 14px; margin-bottom: 8px;">
                <a href="mailto:${contactData.senderEmail}?subject=Re: ${contactData.subject || 'Contact Form Enquiry'}" style="color: #3b82f6; text-decoration: underline; font-weight: 600;">
                  Reply directly to ${contactData.senderName}
                </a>
              </li>
              <li style="color: #92400e; font-size: 14px; margin-bottom: 8px;">Review their interest in AI solutions and development</li>
              <li style="color: #92400e; font-size: 14px;">Consider scheduling a consultation or demo</li>
            </ul>
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

        <!-- Footer -->
        <div style="text-align: center; padding: 0 24px 24px 24px;">
          <p style="color: #64748b; font-size: 14px; line-height: 20px; margin: 0 0 12px 0;">
            <strong>Genie AI Experimentation Hub</strong><br>
            Saidas - AI Innovation Leader<br>
            936 Villageview Lane, Cary, NC 27519<br>
            <a href="mailto:genieaiexperimentationhub@gmail.com" style="color: #3b82f6; text-decoration: underline;">genieaiexperimentationhub@gmail.com</a>
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin: 0; font-style: italic;">
            This email was automatically generated from your website contact form.
          </p>
        </div>
      </div>
    `;

    // Send email to the business owner
    const emailResponse = await resend.emails.send({
      from: 'Genie AI Hub <genieaiexperimentationhub@gmail.com>',
      to: ['genieaiexperimentationhub@gmail.com'],
      subject: `New Contact Enquiry from ${contactData.senderName}`,
      html: emailHtml,
      replyTo: contactData.senderEmail,
      text: `
New Contact Enquiry from Genie AI Experimentation Hub

From: ${contactData.senderName} (${contactData.senderEmail})
Subject: ${contactData.subject || 'Contact Form Enquiry'}
${contactData.companyName ? `Company: ${contactData.companyName}` : ''}
${contactData.phoneNumber ? `Phone: ${contactData.phoneNumber}` : ''}

Message:
${contactData.message}

Contact Method: ${contactData.contactMethod || 'Website Contact Form'}

---
This email was automatically generated from your website contact form.
Reply directly to this email to respond to ${contactData.senderName}.
      `.trim(),
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email', 
          details: emailResponse.error.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Email sent successfully:', emailResponse.data);

    // Send auto-reply to the contact
    const autoReplyHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; padding: 12px 20px; background-color: #3b82f6; border-radius: 8px; margin-bottom: 8px;">
            <span style="font-size: 24px; font-weight: bold; color: white;">🧞 Genie AI</span>
          </div>
          <div style="font-size: 14px; color: #64748b; font-style: italic;">Innovation through AI</div>
        </div>

        <h1 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">Thank you for your enquiry!</h1>
        
        <p style="color: #475569; font-size: 16px; line-height: 24px;">
          Dear ${contactData.senderName},
        </p>
        
        <p style="color: #475569; font-size: 16px; line-height: 24px;">
          Thank you for reaching out to Genie AI Experimentation Hub. We have received your message and appreciate your interest in our AI-driven development solutions.
        </p>
        
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin: 0 0 12px 0;">Your Message Summary:</h3>
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            <strong>Subject:</strong> ${contactData.subject || 'Contact Form Enquiry'}<br>
            <strong>Contact Method:</strong> ${contactData.contactMethod || 'Website Contact Form'}
          </p>
        </div>
        
        <p style="color: #475569; font-size: 16px; line-height: 24px;">
          <strong>What happens next?</strong>
        </p>
        
        <ul style="color: #475569; font-size: 16px; line-height: 24px;">
          <li>Saidas will personally review your enquiry</li>
          <li>You can expect a response within 24-48 hours</li>
          <li>We'll discuss how AI can transform your development workflow</li>
        </ul>
        
        <p style="color: #475569; font-size: 16px; line-height: 24px;">
          In the meantime, feel free to explore our <a href="https://genieaiexperimentationhub.com" style="color: #3b82f6;">AI Journey</a> and learn more about our innovative approach to AI-driven development.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <div style="text-align: center; color: #64748b; font-size: 14px;">
          <p style="margin: 0;">
            <strong>Genie AI Experimentation Hub</strong><br>
            Saidas - AI Innovation Leader<br>
            936 Villageview Lane, Cary, NC 27519<br>
            <a href="mailto:genieaiexperimentationhub@gmail.com" style="color: #3b82f6;">genieaiexperimentationhub@gmail.com</a>
          </p>
        </div>
      </div>
    `;

    // Send auto-reply
    await resend.emails.send({
      from: 'Genie AI Hub <genieaiexperimentationhub@gmail.com>',
      to: [contactData.senderEmail],
      subject: `Thank you for contacting Genie AI Hub, ${contactData.senderName}!`,
      html: autoReplyHtml,
      text: `
Dear ${contactData.senderName},

Thank you for reaching out to Genie AI Experimentation Hub. We have received your message and appreciate your interest in our AI-driven development solutions.

Your Message Summary:
Subject: ${contactData.subject || 'Contact Form Enquiry'}
Contact Method: ${contactData.contactMethod || 'Website Contact Form'}

What happens next?
- Saidas will personally review your enquiry
- You can expect a response within 24-48 hours
- We'll discuss how AI can transform your development workflow

In the meantime, feel free to explore our website and learn more about our innovative approach to AI-driven development.

Best regards,
Genie AI Experimentation Hub
Saidas - AI Innovation Leader
936 Villageview Lane, Cary, NC 27519
genieaiexperimentationhub@gmail.com
      `.trim(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact email sent successfully',
        emailId: emailResponse.data?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});