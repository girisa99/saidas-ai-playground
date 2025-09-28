import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  Merge, 
  FileText, 
  Clock, 
  User,
  MessageSquare,
  Target
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RAGRecommendation {
  id: string;
  conversation_id: string;
  knowledge_base_ids: string[];
  query_context: string;
  recommendations: any;
  next_best_actions: any;
  confidence_score: number;
  healthcare_context: any;
  treatment_recommendations: any;
  clinical_insights: any;
  created_at: string;
  knowledge_base_entry_id: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  status: string;
}

interface RAGReviewModalProps {
  trigger: React.ReactNode;
}

export const RAGReviewModal = ({ trigger }: RAGReviewModalProps) => {
  const [recommendations, setRecommendations] = useState<RAGRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRec, setSelectedRec] = useState<RAGRecommendation | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const { toast } = useToast();

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rag_recommendations')
        .select('*')
        .eq('status', 'pending')
        .order('confidence_score', { ascending: false })
        .order('frequency_count', { ascending: false });

      if (error) throw error;
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to load RAG recommendations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processRecommendation = async (id: string, action: string) => {
    try {
      const { data, error } = await supabase.rpc('process_rag_recommendation', {
        p_recommendation_id: id,
        p_action: action,
        p_review_notes: reviewNotes || null
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Recommendation ${action}d successfully`,
      });

      // Refresh recommendations
      fetchRecommendations();
      setSelectedRec(null);
      setReviewNotes('');
    } catch (error) {
      console.error('Error processing recommendation:', error);
      toast({
        title: "Error",
        description: "Failed to process recommendation",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'merged': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              RAG Recommendations Review
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Knowledge Base Updates
            </h2>
            <p className="text-base text-muted-foreground font-normal">
              Review and approve AI-generated content suggestions from user conversations.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p>Loading recommendations...</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No pending recommendations to review.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="p-6 border border-primary/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(rec.status)}>
                          {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          Confidence: {(rec.confidence_score * 100).toFixed(1)}%
                        </Badge>
                        <Badge variant="outline">
                          KB IDs: {rec.knowledge_base_ids?.length || 0}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        Knowledge Base Improvement
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Conversation: {rec.conversation_id}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Recommendations:</h4>
                    <div className="bg-secondary/50 p-4 rounded-md">
                      <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(rec.recommendations, null, 2)}</pre>
                    </div>
                  </div>

                  {rec.clinical_insights && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Clinical Insights:</h4>
                      <div className="bg-secondary/50 p-4 rounded-md">
                        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(rec.clinical_insights, null, 2)}</pre>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => processRecommendation(rec.id, 'reject')}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRec(rec);
                        setReviewNotes('');
                      }}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Merge className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => processRecommendation(rec.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {selectedRec && (
          <div className="mt-6 p-4 border border-primary/20 rounded-md bg-secondary/20">
            <h3 className="font-semibold mb-2">Review Notes (Optional)</h3>
            <textarea
              className="w-full p-3 border rounded-md resize-none"
              rows={3}
              placeholder="Add review notes or modifications..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
            />
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                onClick={() => setSelectedRec(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => processRecommendation(selectedRec.id, 'approve')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve with Notes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};