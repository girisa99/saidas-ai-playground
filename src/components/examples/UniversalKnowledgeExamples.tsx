import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  searchMedicalImagingKnowledge,
  searchOnboardingTemplates,
  searchRiskAssessmentProtocols,
  searchConversationalKnowledge,
  trackKnowledgeUsage,
  submitKnowledgeFeedback,
  getTopKnowledgeByDomain,
  syncRe3DataRepositories
} from '@/services/universalKnowledgeService';
import type { UniversalKnowledge, KnowledgeDomain } from '@/services/universalKnowledgeService';

/**
 * Example component demonstrating Universal Knowledge Base usage across all domains
 * This shows how to use the same knowledge system for:
 * - Medical Imaging
 * - Patient Onboarding
 * - Clinical Risk Assessment
 * - GenieAI Conversations
 */
export const UniversalKnowledgeExamples = () => {
  const [knowledge, setKnowledge] = useState<UniversalKnowledge[]>([]);
  const [loading, setLoading] = useState(false);
  const [topKnowledge, setTopKnowledge] = useState<any[]>([]);
  const { toast } = useToast();

  // Example 1: Medical Imaging Knowledge Search
  const handleMedicalImagingSearch = async () => {
    setLoading(true);
    try {
      const results = await searchMedicalImagingKnowledge(
        'X-Ray',
        'Chest',
        'pneumonia',
        5
      );
      
      setKnowledge(results);
      
      // Track usage for each result
      if (results.length > 0) {
        await trackKnowledgeUsage({
          knowledge_base_id: results[0].id,
          domain: 'medical_imaging',
          use_case: 'image_analysis',
          query_text: 'chest x-ray pneumonia',
          session_id: 'demo-session'
        });
      }
      
      toast({
        title: "Medical Imaging Knowledge",
        description: `Found ${results.length} relevant findings`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search medical imaging knowledge",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Patient Onboarding Templates
  const handleOnboardingSearch = async () => {
    setLoading(true);
    try {
      const results = await searchOnboardingTemplates('consent form', 5);
      
      setKnowledge(results);
      
      toast({
        title: "Patient Onboarding Templates",
        description: `Found ${results.length} templates and guidelines`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search onboarding templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Example 3: Clinical Risk Assessment Protocols
  const handleRiskAssessmentSearch = async () => {
    setLoading(true);
    try {
      const results = await searchRiskAssessmentProtocols('diabetes', 5);
      
      setKnowledge(results);
      
      toast({
        title: "Risk Assessment Protocols",
        description: `Found ${results.length} risk assessment protocols`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search risk protocols",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Example 4: Conversational AI Knowledge
  const handleConversationalSearch = async () => {
    setLoading(true);
    try {
      const results = await searchConversationalKnowledge(
        'what is medical imaging',
        3
      );
      
      setKnowledge(results);
      
      toast({
        title: "Conversational Knowledge",
        description: `Found ${results.length} FAQs and educational content`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search conversational knowledge",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Example 5: Get Top Performing Knowledge
  const handleGetTopKnowledge = async (domain: KnowledgeDomain) => {
    setLoading(true);
    try {
      const results = await getTopKnowledgeByDomain(domain, 5);
      
      setTopKnowledge(results);
      
      toast({
        title: "Top Performing Knowledge",
        description: `Loaded top 5 entries for ${domain}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get top knowledge",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Example 6: Submit Feedback (Continuous Learning)
  const handleFeedback = async (knowledgeId: string, isHelpful: boolean) => {
    try {
      await submitKnowledgeFeedback(
        'demo-conversation-id',
        0,
        isHelpful ? 'helpful' : 'not_helpful',
        [knowledgeId],
        'medical_imaging', // or the appropriate domain
        undefined,
        isHelpful ? 'This was very helpful!' : 'This needs improvement'
      );
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping improve our knowledge base!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive"
      });
    }
  };

  // Example 7: Sync from re3data.org
  const handleSyncRe3Data = async () => {
    setLoading(true);
    try {
      const result = await syncRe3DataRepositories();
      
      toast({
        title: "Sync Complete",
        description: `Synced ${result.summary?.healthcare_repositories || 0} repositories`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync repositories. Make sure you have admin permissions.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Universal Knowledge Base Examples</CardTitle>
          <CardDescription>
            Demonstrating how to use the same knowledge system across all use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="medical">Medical Imaging</TabsTrigger>
              <TabsTrigger value="onboarding">Patient Onboarding</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="ai">Conversational AI</TabsTrigger>
            </TabsList>

            <TabsContent value="medical" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Medical Imaging Knowledge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Search for imaging findings from authoritative datasets (TCIA, MedPix, NIH, etc.)
                </p>
                <Button onClick={handleMedicalImagingSearch} disabled={loading}>
                  Search: "Chest X-Ray Pneumonia"
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="onboarding" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Patient Onboarding Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find consent forms, intake templates, and onboarding guidelines
                </p>
                <Button onClick={handleOnboardingSearch} disabled={loading}>
                  Search: "Consent Forms"
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Clinical Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access risk scoring systems, outcome predictors, and clinical protocols
                </p>
                <Button onClick={handleRiskAssessmentSearch} disabled={loading}>
                  Search: "Diabetes Risk Protocols"
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Conversational AI Knowledge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Query FAQs and educational content for GenieAI responses
                </p>
                <Button onClick={handleConversationalSearch} disabled={loading}>
                  Search: "What is medical imaging?"
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results Display */}
          {knowledge.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Search Results</h3>
              {knowledge.map((k) => (
                <Card key={k.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{k.finding_name}</CardTitle>
                    <CardDescription>
                      Domain: {k.domain} | Type: {k.content_type} | 
                      Quality: {k.quality_score}/100 | 
                      Used: {k.usage_count} times |
                      Feedback: {(k.feedback_ratio * 100).toFixed(0)}% positive
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{k.description}</p>
                    
                    {/* Feedback Buttons (Continuous Learning) */}
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFeedback(k.id, true)}
                      >
                        👍 Helpful
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFeedback(k.id, false)}
                      >
                        👎 Not Helpful
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Top Performing Knowledge */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Analytics & Monitoring</h3>
            <div className="flex gap-2 flex-wrap">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleGetTopKnowledge('medical_imaging')}
                disabled={loading}
              >
                Top Medical Imaging
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleGetTopKnowledge('patient_onboarding')}
                disabled={loading}
              >
                Top Onboarding
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => handleGetTopKnowledge('clinical_risk')}
                disabled={loading}
              >
                Top Risk Assessment
              </Button>
            </div>

            {topKnowledge.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {topKnowledge.map((k, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-sm">{k.finding_name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1">
                      <p>Usage Count: {k.usage_count}</p>
                      <p>Positive Feedback: {k.positive_feedback}</p>
                      <p>Negative Feedback: {k.negative_feedback}</p>
                      <p>Quality Score: {k.quality_score}/100</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Admin Functions */}
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Admin Functions</h3>
            <Button 
              onClick={handleSyncRe3Data}
              disabled={loading}
              variant="destructive"
            >
              Sync from re3data.org (10,000+ repositories)
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This will sync healthcare repositories from re3data.org. Requires admin permissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};