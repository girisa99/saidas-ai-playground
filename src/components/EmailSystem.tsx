import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthEmailService } from '@/lib/auth-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send, FileText, Inbox, Archive, Shield, Users, Bell } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
  template_type?: string;
  is_system_template?: boolean;
}

interface SentEmail {
  id: string;
  to_emails: string[];
  subject: string;
  status: string;
  sent_at: string;
}

interface ReceivedEmail {
  id: string;
  from_email: string;
  subject: string;
  text_content: string;
  received_at: string;
  is_read: boolean;
}

export const EmailSystem = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);
  const [receivedEmails, setReceivedEmails] = useState<ReceivedEmail[]>([]);

  // Send email form state
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    text: '',
    html: '',
    template_id: '',
  });

  // Template form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    templateType: 'custom'
  });

  // Quick auth email state
  const [quickEmail, setQuickEmail] = useState({
    type: 'welcome_email',
    to: '',
    variables: {}
  });

  useEffect(() => {
    fetchTemplates();
    fetchSentEmails();
    fetchReceivedEmails();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch email templates",
        variant: "destructive",
      });
    } else {
      setTemplates(data || []);
    }
  };

  const fetchSentEmails = async () => {
    const { data, error } = await supabase
      .from('sent_emails')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch sent emails",
        variant: "destructive",
      });
    } else {
      setSentEmails(data || []);
    }
  };

  const fetchReceivedEmails = async () => {
    const { data, error } = await supabase
      .from('received_emails')
      .select('*')
      .order('received_at', { ascending: false })
      .limit(10);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch received emails",
        variant: "destructive",
      });
    } else {
      setReceivedEmails(data || []);
    }
  };

  const sendEmail = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to send emails",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: emailForm.to,
          subject: emailForm.subject,
          text_content: emailForm.text,
          html_content: emailForm.html,
          template_id: emailForm.template_id || null,
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Email sent successfully!",
      });

      setEmailForm({
        to: '',
        subject: '',
        text: '',
        html: '',
        template_id: '',
      });

      fetchSentEmails();
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          name: newTemplate.name,
          subject: newTemplate.subject,
          html_content: newTemplate.htmlContent,
          text_content: newTemplate.textContent,
          template_type: newTemplate.templateType
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Template created successfully!",
      });

      setNewTemplate({
        name: '',
        subject: '',
        htmlContent: '',
        textContent: '',
        templateType: 'custom'
      });

      fetchTemplates();
    } catch (error: any) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create template",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (emailId: string) => {
    try {
      const { error } = await supabase
        .from('received_emails')
        .update({ is_read: true })
        .eq('id', emailId);

      if (error) {
        throw error;
      }

      fetchReceivedEmails();
    } catch (error: any) {
      console.error('Error marking email as read:', error);
    }
  };

  const sendQuickAuthEmail = async () => {
    setLoading(true);
    try {
      const variables = {
        app_name: "Healthcare AI Platform",
        user_name: quickEmail.to,
        user_email: quickEmail.to,
        ...quickEmail.variables
      };

      switch (quickEmail.type) {
        case 'welcome_email':
          await AuthEmailService.sendWelcomeEmail(quickEmail.to, variables);
          break;
        case 'password_reset':
          await AuthEmailService.sendPasswordResetEmail(
            quickEmail.to, 
            `${window.location.origin}/auth/reset`,
            variables
          );
          break;
        case 'email_confirmation':
          await AuthEmailService.sendEmailConfirmation(
            quickEmail.to,
            `${window.location.origin}/auth/confirm`,
            variables
          );
          break;
        case 'magic_link':
          await AuthEmailService.sendMagicLink(
            quickEmail.to,
            `${window.location.origin}/auth/callback`,
            variables
          );
          break;
        case 'admin_notification':
          await AuthEmailService.sendAdminNotification(
            quickEmail.to,
            "System Alert",
            "Test admin notification",
            quickEmail.to,
            variables
          );
          break;
        case 'account_locked':
          await AuthEmailService.sendAccountLockedEmail(
            quickEmail.to,
            "Multiple failed login attempts",
            "24 hours",
            variables
          );
          break;
        default:
          throw new Error('Unknown email type');
      }

      toast({
        title: "Success",
        description: "Auth email sent successfully!",
      });

      setQuickEmail({ type: 'welcome_email', to: '', variables: {} });
    } catch (error: any) {
      console.error('Error sending auth email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send auth email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Email Management System
          </CardTitle>
          <CardDescription>
            Send emails, manage templates, and view email history with Resend integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="send">Send Email</TabsTrigger>
              <TabsTrigger value="auth">Auth Emails</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Email
                  </CardTitle>
                  <CardDescription>
                    Send custom emails or use existing templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Input
                        id="to"
                        type="email"
                        placeholder="recipient@example.com"
                        value={emailForm.to}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="template">Template (Optional)</Label>
                      <Select 
                        value={emailForm.template_id} 
                        onValueChange={(value) => setEmailForm(prev => ({ ...prev, template_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No template</SelectItem>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Email subject"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="text">Text Content</Label>
                    <Textarea
                      id="text"
                      placeholder="Plain text email content"
                      value={emailForm.text}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, text: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="html">HTML Content (Optional)</Label>
                    <Textarea
                      id="html"
                      placeholder="HTML email content"
                      value={emailForm.html}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, html: e.target.value }))}
                      rows={6}
                    />
                  </div>

                  <Button onClick={sendEmail} disabled={loading || !emailForm.to || !emailForm.subject}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auth">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentication & Admin Emails
                  </CardTitle>
                  <CardDescription>
                    Send standardized authentication and administrative emails using pre-built templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email-type">Email Type</Label>
                      <Select 
                        value={quickEmail.type} 
                        onValueChange={(value) => setQuickEmail(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome_email">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Welcome Email
                            </div>
                          </SelectItem>
                          <SelectItem value="password_reset">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Password Reset
                            </div>
                          </SelectItem>
                          <SelectItem value="email_confirmation">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Confirmation
                            </div>
                          </SelectItem>
                          <SelectItem value="magic_link">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Magic Link
                            </div>
                          </SelectItem>
                          <SelectItem value="admin_notification">
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Admin Notification
                            </div>
                          </SelectItem>
                          <SelectItem value="account_locked">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" />
                              Account Locked
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="quick-email-to">Recipient Email</Label>
                      <Input
                        id="quick-email-to"
                        type="email"
                        placeholder="recipient@example.com"
                        value={quickEmail.to}
                        onChange={(e) => setQuickEmail(prev => ({ ...prev, to: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Email Preview</h4>
                    <div className="text-sm text-muted-foreground">
                      {quickEmail.type === 'welcome_email' && 'Sends a welcome email to new users with next steps and platform introduction.'}
                      {quickEmail.type === 'password_reset' && 'Sends a secure password reset link with expiration time.'}
                      {quickEmail.type === 'email_confirmation' && 'Sends an email confirmation link for new registrations.'}
                      {quickEmail.type === 'magic_link' && 'Sends a passwordless login link for quick access.'}
                      {quickEmail.type === 'admin_notification' && 'Sends administrative alerts with user details and context.'}
                      {quickEmail.type === 'account_locked' && 'Notifies users when their account has been temporarily locked.'}
                    </div>
                  </div>

                  <Button 
                    onClick={sendQuickAuthEmail} 
                    disabled={loading || !quickEmail.to}
                    className="w-full"
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Send className="mr-2 h-4 w-4" />
                    Send {quickEmail.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create New Template
                  </CardTitle>
                    <CardDescription>
                      Create reusable email templates with variables and HTML content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          placeholder="Enter template name"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="template-subject">Subject</Label>
                        <Input
                          id="template-subject"
                          placeholder="Email subject"
                          value={newTemplate.subject}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="template-type">Template Type</Label>
                        <Select 
                          value={newTemplate.templateType} 
                          onValueChange={(value) => setNewTemplate(prev => ({ ...prev, templateType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom</SelectItem>
                            <SelectItem value="authentication">Authentication</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="template-html">HTML Content</Label>
                      <Textarea
                        id="template-html"
                        placeholder="HTML template content (use {{variable}} for dynamic content)"
                        value={newTemplate.htmlContent}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, htmlContent: e.target.value }))}
                        rows={8}
                      />
                    </div>

                    <div>
                      <Label htmlFor="template-text">Text Content</Label>
                      <Textarea
                        id="template-text"
                        placeholder="Plain text version (optional)"
                        value={newTemplate.textContent}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, textContent: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <Button 
                      onClick={createTemplate} 
                      disabled={loading || !newTemplate.name || !newTemplate.subject}
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Existing Templates</CardTitle>
                    <CardDescription>
                      Manage your email templates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {templates.map((template) => (
                        <div key={template.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{template.name}</h3>
                              <p className="text-sm text-muted-foreground">{template.subject}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {template.is_system_template && (
                                <Badge variant="secondary">System</Badge>
                              )}
                              {template.template_type && (
                                <Badge variant="outline">{template.template_type}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sent">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Archive className="h-5 w-5" />
                    Sent Emails
                  </CardTitle>
                  <CardDescription>
                    View your sent email history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sentEmails.map((email) => (
                      <div key={email.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{email.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              To: {email.to_emails.join(', ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(email.sent_at).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant={email.status === 'sent' ? 'default' : 'destructive'}>
                            {email.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="received">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Inbox className="h-5 w-5" />
                    Received Emails
                  </CardTitle>
                  <CardDescription>
                    View received emails and webhooks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {receivedEmails.map((email) => (
                      <div key={email.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">{email.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              From: {email.from_email}
                            </p>
                            <p className="text-sm mt-2">{email.text_content?.substring(0, 200)}...</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(email.received_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!email.is_read && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => markAsRead(email.id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Badge variant={email.is_read ? 'secondary' : 'default'}>
                              {email.is_read ? 'Read' : 'Unread'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSystem;