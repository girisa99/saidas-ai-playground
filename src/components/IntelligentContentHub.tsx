import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedGammaIntegration } from './EnhancedGammaIntegration';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, Palette, Zap } from 'lucide-react';

export const IntelligentContentHub: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Intelligent Visual Content Creation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your ideas into professional visual content using AI-powered analysis, 
            custom flow diagrams, and seamless Gamma integration.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your content to suggest optimal visual formats and presentation styles
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Visual Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Create custom flow diagrams, journey maps, and process visualizations with our interactive canvas
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gamma Integration</h3>
              <p className="text-sm text-muted-foreground">
                Seamlessly generate professional presentations and infographics with Gamma AI
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <EnhancedGammaIntegration
            title="AI Journey Mapping"
            contentType="journey"
            initialContent="AI experimentation enables organizations to transform their development processes through intelligent automation, machine learning integration, and data-driven decision making."
          />

          <EnhancedGammaIntegration
            title="Workflow Visualization"
            contentType="workflow"
            initialContent="Implementation workflow includes assessment, planning, development, testing, deployment, and optimization phases with continuous feedback loops."
          />
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-to-r from-primary/10 via-background to-primary/10">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <Badge variant="secondary">New Feature</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Modal Content Generation</h3>
              <p className="text-muted-foreground mb-4">
                Combine AI analysis, visual canvas editing, and Gamma presentations in one unified workflow
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>• Intelligent content detection</span>
                <span>• Custom visual flows</span>
                <span>• Professional presentations</span>
                <span>• Export to multiple formats</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};