import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, RotateCw, Trash2, PlayCircle, Settings2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { GenieDeployment } from '@/services/deploymentService';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    confidence?: number;
    latency?: number;
  };
}

interface DeploymentTesterProps {
  deployments: GenieDeployment[];
}

export const DeploymentTester: React.FC<DeploymentTesterProps> = ({ deployments }) => {
  const [selectedDeploymentId, setSelectedDeploymentId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [conversationId, setConversationId] = useState<string>('');

  const selectedDeployment = deployments.find(d => d.id === selectedDeploymentId);

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedDeploymentId) {
      toast.error('Please select a deployment and enter a message');
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const startTime = Date.now();

    try {
      const { data, error } = await supabase.functions.invoke('deployment-chat', {
        body: {
          deploymentId: selectedDeploymentId,
          message: input,
          conversationId: conversationId || undefined,
          sessionId,
        },
      });

      const latency = Date.now() - startTime;

      if (error) {
        throw error;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        metadata: {
          model: data.model,
          tokensUsed: data.tokensUsed,
          confidence: data.confidence,
          latency,
        },
      };

      setMessages(prev => [...prev, assistantMessage]);
      toast.success('Response received');
    } catch (error: any) {
      console.error('Test error:', error);
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversationId('');
    toast.success('Chat cleared');
  };

  const handleQuickTest = async () => {
    const testMessage = 'Hello, can you help me?';
    setInput(testMessage);
    
    // Small delay to show the input update
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Deployment Testing Interface
            </CardTitle>
            <CardDescription>
              Test your deployments before embedding them externally
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleQuickTest} disabled={!selectedDeploymentId}>
              <PlayCircle className="w-4 h-4 mr-1" />
              Quick Test
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearChat} disabled={messages.length === 0}>
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deployment Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Deployment to Test</label>
          <Select value={selectedDeploymentId} onValueChange={setSelectedDeploymentId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a deployment..." />
            </SelectTrigger>
            <SelectContent>
              {deployments.filter(d => d.is_enabled !== false).map(deployment => (
                <SelectItem key={deployment.id} value={deployment.id}>
                  <div className="flex items-center gap-2">
                    <span>{deployment.name}</span>
                    <Badge variant={deployment.deployment_status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {deployment.deployment_status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedDeployment && (
          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Configuration Preview</div>
                <div className="text-xs text-muted-foreground">
                  {selectedDeployment.description || 'No description'}
                </div>
              </div>
              <Badge variant={selectedDeployment.is_enabled !== false ? 'default' : 'destructive'}>
                {selectedDeployment.is_enabled !== false ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground">Version:</span>
                <div className="font-mono">v{selectedDeployment.version}</div>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Total Conversations:</span>
                <div className="font-mono">{selectedDeployment.total_conversations}</div>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat Interface</TabsTrigger>
            <TabsTrigger value="config">Configuration Details</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="h-[400px] rounded-lg border bg-background p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Settings2 className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">Select a deployment and start testing</p>
                  <p className="text-xs mt-2">Messages will appear here as you chat</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.metadata && (
                            <>
                              {message.metadata.model && (
                                <Badge variant="outline" className="text-xs">
                                  {message.metadata.model}
                                </Badge>
                              )}
                              {message.metadata.tokensUsed && (
                                <span>{message.metadata.tokensUsed} tokens</span>
                              )}
                              {message.metadata.latency && (
                                <span>{message.metadata.latency}ms</span>
                              )}
                              {message.metadata.confidence && (
                                <span>{(message.metadata.confidence * 100).toFixed(0)}% confidence</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex items-center gap-2">
                          <RotateCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder={selectedDeploymentId ? "Type your test message..." : "Select a deployment first..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                disabled={!selectedDeploymentId || loading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!selectedDeploymentId || loading || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {selectedDeployment && selectedDeployment.is_enabled === false && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">This deployment is disabled. Enable it to test functionality.</span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            {selectedDeployment ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 pr-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Deployment Information</h4>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <div className="font-medium mt-1">{selectedDeployment.name}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Version:</span>
                          <div className="font-medium mt-1">v{selectedDeployment.version}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-medium mt-1 capitalize">{selectedDeployment.deployment_status}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Enabled:</span>
                          <div className="font-medium mt-1 flex items-center gap-2">
                            {selectedDeployment.is_enabled !== false ? (
                              <><CheckCircle2 className="w-4 h-4 text-green-500" /> Yes</>
                            ) : (
                              <><AlertCircle className="w-4 h-4 text-red-500" /> No</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">AI Configuration</h4>
                    <div className="rounded-lg border p-4">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(selectedDeployment.configuration || {}, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Usage Statistics</h4>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Conversations:</span>
                          <div className="font-medium mt-1">{selectedDeployment.total_conversations}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Tokens:</span>
                          <div className="font-medium mt-1">{selectedDeployment.total_tokens_used.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Confidence:</span>
                          <div className="font-medium mt-1">
                            {selectedDeployment.avg_confidence_score 
                              ? `${(selectedDeployment.avg_confidence_score * 100).toFixed(1)}%` 
                              : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Used:</span>
                          <div className="font-medium mt-1">
                            {selectedDeployment.last_used_at 
                              ? new Date(selectedDeployment.last_used_at).toLocaleDateString() 
                              : 'Never'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Session Information</h4>
                    <div className="rounded-lg border p-4 space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Session ID:</span>
                        <div className="font-mono text-xs mt-1 break-all">{sessionId}</div>
                      </div>
                      {conversationId && (
                        <div>
                          <span className="text-muted-foreground">Conversation ID:</span>
                          <div className="font-mono text-xs mt-1 break-all">{conversationId}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Select a deployment to view configuration details
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
