import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Sparkles, 
  Brain, 
  Palette, 
  Wand2, 
  Eye, 
  Download,
  Share,
  RefreshCw,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { ContentAnalysisEngine } from './ContentAnalysisEngine';
import { VisualFlowCanvas } from './VisualFlowCanvas';

interface EnhancedGammaIntegrationProps {
  title?: string;
  initialContent?: string;
  contentType?: 'journey' | 'workflow' | 'infographic' | 'timeline' | 'comparison' | 'process';
  onContentGenerated?: (content: any) => void;
}

export const EnhancedGammaIntegration: React.FC<EnhancedGammaIntegrationProps> = ({
  title = 'AI Visual Content Generator',
  initialContent = '',
  contentType,
  onContentGenerated
}) => {
  const [content, setContent] = useState(initialContent);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('analyze');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedAssets, setGeneratedAssets] = useState<string[]>([]);

  const handleAnalysisComplete = (analysis: any) => {
    setAnalysisResult(analysis);
    setActiveTab('generate');
    
    // Auto-generate prompt based on analysis
    const prompt = generatePromptFromAnalysis(analysis);
    setCustomPrompt(prompt);
  };

  const generatePromptFromAnalysis = (analysis: any) => {
    const basePrompts = {
      journey: `Create a comprehensive customer journey map showing the ${analysis.contentType} process. Include key touchpoints: ${analysis.keyEntities.join(', ')}. Focus on user experience and emotional journey stages.`,
      workflow: `Design a detailed workflow diagram illustrating the ${analysis.actionItems.join(', ')} process. Show decision points, parallel processes, and key stakeholders involved.`,
      infographic: `Generate an engaging infographic presenting ${analysis.keyEntities.join(', ')} with clear visual hierarchy, icons, and data visualization elements.`,
      timeline: `Create a timeline visualization showing the progression of ${analysis.keyEntities.join(', ')} with key milestones and evolutionary stages.`,
      comparison: `Design a comparison chart highlighting differences between ${analysis.keyEntities.slice(0, 3).join(' vs ')} with clear pros/cons and feature matrices.`,
      process: `Illustrate a step-by-step process diagram for ${analysis.actionItems.join(', ')} with clear sequential flow and decision points.`
    };

    return basePrompts[analysis.contentType as keyof typeof basePrompts] || basePrompts.workflow;
  };

  const generateWithGamma = async () => {
    if (!customPrompt.trim()) {
      toast.error("Please provide a prompt for content generation");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate Gamma API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Open Gamma with enhanced parameters
      const gammaUrl = `https://gamma.app/create?prompt=${encodeURIComponent(customPrompt)}&type=${analysisResult?.contentType || 'presentation'}&style=professional`;
      window.open(gammaUrl, '_blank');
      
      toast.success("Gamma presentation opened! Generate your visual content there.");
      
      // Simulate generated assets
      const mockAssets = [
        'gamma-presentation.pdf',
        'visual-flow-export.png',
        'infographic-design.svg'
      ];
      setGeneratedAssets(mockAssets);
      
      onContentGenerated?.({
        prompt: customPrompt,
        contentType: analysisResult?.contentType,
        assets: mockAssets
      });

    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVisualFlow = async () => {
    setActiveTab('canvas');
    toast.info("Switched to visual canvas. Generate your flow diagram here!");
  };

  const generateAIImage = async () => {
    if (!customPrompt.trim()) {
      toast.error("Please provide a prompt for image generation");
      return;
    }

    setIsGenerating(true);
    
    try {
      // This would call Lovable's image generation
      toast.info("AI image generation would be implemented here with the imagegen tool");
      
      // Simulate image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockImageUrl = 'generated-visual.png';
      setGeneratedAssets(prev => [...prev, mockImageUrl]);
      
      toast.success("AI image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate AI image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analyze" className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                Analyze
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-1">
                <Wand2 className="w-4 h-4" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="canvas" className="flex items-center gap-1">
                <Palette className="w-4 h-4" />
                Canvas
              </TabsTrigger>
              <TabsTrigger value="assets" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Assets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyze" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content-input">Content to Analyze</Label>
                  <Textarea
                    id="content-input"
                    placeholder="Paste your content here for intelligent analysis..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                  />
                </div>

                <ContentAnalysisEngine
                  content={content}
                  title={title}
                  onAnalysisComplete={handleAnalysisComplete}
                  autoAnalyze={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              {analysisResult && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {analysisResult.contentType}
                    </Badge>
                    <Badge variant="outline">
                      {analysisResult.confidence}% confidence
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {analysisResult.recommendedTool}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Recommended visuals: {analysisResult.suggestedVisuals.slice(0, 2).join(', ')}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-prompt">Generation Prompt</Label>
                  <Textarea
                    id="custom-prompt"
                    placeholder="Describe what you want to generate..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button 
                    onClick={generateWithGamma}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Generate with Gamma
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={generateVisualFlow}
                    className="flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    Create Flow Diagram
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={generateAIImage}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    AI Image
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="canvas" className="space-y-4">
              <VisualFlowCanvas
                contentType={analysisResult?.contentType || contentType || 'workflow'}
                data={analysisResult}
                onSave={(canvasData) => {
                  setGeneratedAssets(prev => [...prev, 'canvas-export.png']);
                  toast.success("Canvas saved to assets!");
                }}
                autoGenerate={!!analysisResult}
              />
            </TabsContent>

            <TabsContent value="assets" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Generated Assets</h3>
                  <Badge variant="secondary">{generatedAssets.length} files</Badge>
                </div>

                {generatedAssets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No assets generated yet. Create content in other tabs first.</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {generatedAssets.map((asset, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Download className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{asset}</p>
                              <p className="text-sm text-muted-foreground">
                                Generated • Ready for download
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};