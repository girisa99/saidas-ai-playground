import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, AlertTriangle, Clock, Users, Zap } from 'lucide-react';

interface SessionLimits {
  conversationsPerHour: number;
  maxConversationLength: number;
  tokenLimit: number;
}

interface SessionState {
  ipAddress: string | null;
  conversationCount: number;
  currentConversationLength: number;
  tokensUsed: number;
  lastResetTime: number;
  isBlocked: boolean;
  blockReason?: string;
}

interface SessionManagerProps {
  ipAddress: string | null;
  messageCount: number;
  onRestart: () => void;
  onContinue: () => void;
  showControls: boolean;
}

const SESSION_LIMITS: SessionLimits = {
  conversationsPerHour: 10,
  maxConversationLength: 50,
  tokenLimit: 10000
};

const STORAGE_KEY = 'genie-session-state';

export const SessionManager: React.FC<SessionManagerProps> = ({
  ipAddress,
  messageCount,
  onRestart,
  onContinue,
  showControls
}) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    ipAddress: null,
    conversationCount: 0,
    currentConversationLength: 0,
    tokensUsed: 0,
    lastResetTime: Date.now(),
    isBlocked: false
  });

  // Load session state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedState = JSON.parse(stored);
        const now = Date.now();
        const hoursSinceReset = (now - parsedState.lastResetTime) / (1000 * 60 * 60);
        
        // Reset counters if more than 1 hour has passed
        if (hoursSinceReset >= 1) {
          setSessionState(prev => ({
            ...prev,
            ipAddress,
            conversationCount: 0,
            tokensUsed: 0,
            lastResetTime: now,
            isBlocked: false
          }));
        } else {
          setSessionState({
            ...parsedState,
            ipAddress,
            currentConversationLength: messageCount
          });
        }
      } catch (error) {
        console.error('Error parsing session state:', error);
      }
    } else if (ipAddress) {
      setSessionState(prev => ({ ...prev, ipAddress }));
    }
  }, [ipAddress]);

  // Update current conversation length
  useEffect(() => {
    setSessionState(prev => ({
      ...prev,
      currentConversationLength: messageCount
    }));
  }, [messageCount]);

  // Save session state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionState));
  }, [sessionState]);

  // Check limits and update blocked status
  useEffect(() => {
    const isOverLimit = 
      sessionState.conversationCount >= SESSION_LIMITS.conversationsPerHour ||
      sessionState.currentConversationLength >= SESSION_LIMITS.maxConversationLength ||
      sessionState.tokensUsed >= SESSION_LIMITS.tokenLimit;

    if (isOverLimit && !sessionState.isBlocked) {
      let blockReason = '';
      if (sessionState.conversationCount >= SESSION_LIMITS.conversationsPerHour) {
        blockReason = 'Hourly conversation limit reached';
      } else if (sessionState.currentConversationLength >= SESSION_LIMITS.maxConversationLength) {
        blockReason = 'Max conversation length reached';
      } else if (sessionState.tokensUsed >= SESSION_LIMITS.tokenLimit) {
        blockReason = 'Token limit exceeded';
      }

      setSessionState(prev => ({
        ...prev,
        isBlocked: true,
        blockReason
      }));
    }
  }, [sessionState.conversationCount, sessionState.currentConversationLength, sessionState.tokensUsed]);

  const handleStartNewConversation = () => {
    setSessionState(prev => ({
      ...prev,
      conversationCount: prev.conversationCount + 1,
      currentConversationLength: 0,
      tokensUsed: prev.tokensUsed + Math.floor(messageCount * 50) // Estimate tokens
    }));
    onRestart();
  };

  const handleContinueConversation = () => {
    onContinue();
  };

  const getTimeUntilReset = () => {
    const hoursSinceReset = (Date.now() - sessionState.lastResetTime) / (1000 * 60 * 60);
    const minutesLeft = Math.ceil((1 - hoursSinceReset) * 60);
    return Math.max(0, minutesLeft);
  };

  const conversationProgress = (sessionState.conversationCount / SESSION_LIMITS.conversationsPerHour) * 100;
  const lengthProgress = (sessionState.currentConversationLength / SESSION_LIMITS.maxConversationLength) * 100;
  const tokenProgress = (sessionState.tokensUsed / SESSION_LIMITS.tokenLimit) * 100;

  if (sessionState.isBlocked) {
    return (
      <Card className="p-4 bg-destructive/5 border-destructive/20">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <div>
                <strong>Demo Limit Reached</strong>
                <p className="text-sm mt-1">{sessionState.blockReason}</p>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• This is a technology demonstration with usage limits</p>
                <p>• Limits reset in {getTimeUntilReset()} minutes</p>
                <p>• Thank you for exploring our AI capabilities!</p>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page (Limits may still apply)
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!showControls) return null;

  return (
    <Card className="p-4 bg-muted/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Session Status</h4>
          <Badge variant="outline" className="text-xs">
            Demo Version
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-3 w-3" />
              <span className="text-xs font-medium">Conversations</span>
            </div>
            <div className="text-sm">{sessionState.conversationCount}/{SESSION_LIMITS.conversationsPerHour}</div>
            <Progress value={conversationProgress} className="h-1" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs font-medium">Length</span>
            </div>
            <div className="text-sm">{sessionState.currentConversationLength}/{SESSION_LIMITS.maxConversationLength}</div>
            <Progress value={lengthProgress} className="h-1" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" />
              <span className="text-xs font-medium">Tokens</span>
            </div>
            <div className="text-sm">{sessionState.tokensUsed.toLocaleString()}/{SESSION_LIMITS.tokenLimit.toLocaleString()}</div>
            <Progress value={tokenProgress} className="h-1" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStartNewConversation}
            className="flex-1"
            disabled={sessionState.conversationCount >= SESSION_LIMITS.conversationsPerHour}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Session
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleContinueConversation}
            className="flex-1"
            disabled={sessionState.currentConversationLength >= SESSION_LIMITS.maxConversationLength}
          >
            Continue Chat
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• Reset in {getTimeUntilReset()} minutes</p>
          <p>• IP: {sessionState.ipAddress || 'Unknown'}</p>
        </div>
      </div>
    </Card>
  );
};