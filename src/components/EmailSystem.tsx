import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send, Inbox, Archive } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
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
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    html_content: '',
    text_content: '',
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

      const response = await supabase.functions.invoke('send-email', {
        body: {
          to: emailForm.to.split(',').map(email => email.trim()),
          subject: emailForm.subject,
          text: emailForm.text,
          html: emailForm.html || undefined,
          template_id: emailForm.template_id || undefined,
        }
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Success",
        description: "Email sent successfully!",
      });

      setEmailForm({ to: '', subject: '', text: '', html: '', template_id: '' });
      fetchSentEmails();
    } catch (error: any) {
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
      const { error } = await supabase
        .from('email_templates')
        .insert([templateForm]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Email template created successfully!",
      });

      setTemplateForm({ name: '', subject: '', html_content: '', text_content: '' });
      fetchTemplates();
    } catch (error: any) {
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
    const { error } = await supabase
      .from('received_emails')
      .update({ is_read: true })
      .eq('id', emailId);

    if (!error) {
      fetchReceivedEmails();
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Email System</h1>
        <p className="text-muted-foreground">
          Complete email management powered by Supabase backend
        </p>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="send" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Email
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Inbox className="h-4 w-4" />
            Received
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send New Email</CardTitle>
              <CardDescription>
                Send emails using your Supabase backend with Resend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">To (comma-separated)</label>
                <Input
                  placeholder="recipient@example.com, another@example.com"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="Email subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Text Content</label>
                <Textarea
                  placeholder="Plain text email content"
                  value={emailForm.text}
                  onChange={(e) => setEmailForm({ ...emailForm, text: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">HTML Content (optional)</label>
                <Textarea
                  placeholder="<h1>HTML email content</h1>"
                  value={emailForm.html}
                  onChange={(e) => setEmailForm({ ...emailForm, html: e.target.value })}
                  rows={4}
                />
              </div>

              {templates.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Use Template (optional)</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={emailForm.template_id}
                    onChange={(e) => setEmailForm({ ...emailForm, template_id: e.target.value })}
                  >
                    <option value="">Select a template...</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button onClick={sendEmail} disabled={loading || !emailForm.to || !emailForm.subject}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Email Template</CardTitle>
                <CardDescription>
                  Create reusable email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Template name"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                />
                <Textarea
                  placeholder="HTML content with {{variables}}"
                  value={templateForm.html_content}
                  onChange={(e) => setTemplateForm({ ...templateForm, html_content: e.target.value })}
                  rows={4}
                />
                <Button onClick={createTemplate} disabled={loading || !templateForm.name}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Templates</CardTitle>
              </CardHeader>
              <CardContent>
                {templates.length === 0 ? (
                  <p className="text-muted-foreground">No templates yet</p>
                ) : (
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <div key={template.id} className="p-3 border rounded">
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.subject}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Sent Emails</CardTitle>
              <CardDescription>
                Track your sent email history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sentEmails.length === 0 ? (
                <p className="text-muted-foreground">No sent emails yet</p>
              ) : (
                <div className="space-y-3">
                  {sentEmails.map((email) => (
                    <div key={email.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{email.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            To: {email.to_emails.join(', ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(email.sent_at).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={email.status === 'sent' ? 'default' : email.status === 'failed' ? 'destructive' : 'secondary'}>
                          {email.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Received Emails</CardTitle>
              <CardDescription>
                Emails received via webhook integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {receivedEmails.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No received emails yet</p>
                  <p className="text-sm text-muted-foreground">
                    Configure your email provider to send webhooks to:
                  </p>
                  <code className="text-sm bg-muted p-2 rounded mt-2 block">
                    https://ithspbabhmdntioslfqe.supabase.co/functions/v1/receive-email
                  </code>
                </div>
              ) : (
                <div className="space-y-3">
                  {receivedEmails.map((email) => (
                    <div 
                      key={email.id} 
                      className={`p-4 border rounded cursor-pointer transition-colors ${
                        !email.is_read ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => markAsRead(email.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{email.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            From: {email.from_email}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {email.text_content.substring(0, 100)}...
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(email.received_at).toLocaleString()}
                          </p>
                        </div>
                        {!email.is_read && (
                          <Badge variant="default">New</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};