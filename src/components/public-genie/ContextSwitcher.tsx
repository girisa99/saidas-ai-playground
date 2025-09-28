import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowRightLeft, Zap, Heart, MessageCircle } from 'lucide-react';

type Context = 'technology' | 'healthcare';

interface ContextSwitcherProps {
  currentContext: Context | null;
  onContextSwitch: (newContext: Context) => void;
  onTopicSelect: (topic: string) => void;
  availableTopics: {
    technology: string[];
    healthcare: string[];
  };
}

export const ContextSwitcher: React.FC<ContextSwitcherProps> = ({
  currentContext,
  onContextSwitch,
  onTopicSelect,
  availableTopics
}) => {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);

  const handleContextSwitch = (newContext: Context) => {
    setSelectedContext(newContext);
    setShowSwitcher(true);
  };

  const handleConfirmSwitch = () => {
    if (selectedContext) {
      onContextSwitch(selectedContext);
      setShowSwitcher(false);
      setSelectedContext(null);
    }
  };

  const handleTopicSelection = (topic: string) => {
    onTopicSelect(topic);
    setShowSwitcher(false);
    setSelectedContext(null);
  };

  return (
    <>
      {/* Context Switch Buttons */}
      <div className="flex gap-2 p-2 bg-muted/30 rounded-lg">
        <Button
          variant={currentContext === 'technology' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleContextSwitch('technology')}
          className="flex-1 text-xs"
        >
          <Zap className="h-3 w-3 mr-1" />
          Tech
        </Button>
        <Button
          variant={currentContext === 'healthcare' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleContextSwitch('healthcare')}
          className="flex-1 text-xs"
        >
          <Heart className="h-3 w-3 mr-1" />
          Health
        </Button>
        {currentContext && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSwitcher(true)}
            className="px-2"
            title="Switch context"
          >
            <ArrowRightLeft className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Context Switch Dialog */}
      <Dialog open={showSwitcher} onOpenChange={setShowSwitcher}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Switch Conversation Context
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedContext && (
              <div className="space-y-3">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    Switching to {selectedContext === 'technology' ? '🚀 Technology' : '🏥 Healthcare'}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Choose a specific topic or continue with general conversation
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {availableTopics[selectedContext].map((topic) => (
                    <Button
                      key={topic}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTopicSelection(topic)}
                      className="text-xs p-2 h-auto whitespace-normal text-left justify-start"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {!selectedContext && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  What would you like to discuss?
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedContext('technology')}
                  >
                    <div className="text-center space-y-2">
                      <Zap className="h-8 w-8 text-blue-500 mx-auto" />
                      <h3 className="font-medium text-sm">Technology</h3>
                      <p className="text-xs text-muted-foreground">
                        AI, automation, development, and tech trends
                      </p>
                    </div>
                  </Card>

                  <Card 
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedContext('healthcare')}
                  >
                    <div className="text-center space-y-2">
                      <Heart className="h-8 w-8 text-red-500 mx-auto" />
                      <h3 className="font-medium text-sm">Healthcare</h3>
                      <p className="text-xs text-muted-foreground">
                        Wellness, medical topics, and health guidance
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSwitcher(false)}>
              Cancel
            </Button>
            {selectedContext && (
              <Button onClick={handleConfirmSwitch}>
                Continue with {selectedContext === 'technology' ? 'Technology' : 'Healthcare'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};