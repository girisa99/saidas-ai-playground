import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Clock, Mail, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AccessRequest {
  id: string;
  user_email: string;
  ip_address: string;
  request_reason: string;
  status: 'pending' | 'approved' | 'denied';
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  admin_notes?: string;
}

export const AccessRequestManager: React.FC = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadAccessRequests();
  }, []);

  const loadAccessRequests = async () => {
    try {
      // Use direct query instead of typed client to avoid type conflicts
      const { data, error } = await supabase
        .from('access_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Cast the data to our interface
      const typedData = data as AccessRequest[];
      setRequests(typedData || []);
    } catch (error) {
      console.error('Error loading access requests:', error);
      toast({
        title: "Error",
        description: "Failed to load access requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewRequest = async (requestId: string, action: 'approve' | 'deny') => {
    try {
      setReviewingId(requestId);
      
      const { error } = await supabase.functions.invoke('manage-access-request', {
        body: {
          request_id: requestId,
          action,
          admin_notes: adminNotes,
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Access request ${action}d successfully`,
        variant: "default"
      });

      await loadAccessRequests();
      setAdminNotes('');
    } catch (error) {
      console.error('Error reviewing request:', error);
      toast({
        title: "Error",
        description: `Failed to ${action} request`,
        variant: "destructive"
      });
    } finally {
      setReviewingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      denied: 'bg-red-100 text-red-800'
    };
    
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <Check className="w-3 h-3" />,
      denied: <X className="w-3 h-3" />
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {icons[status as keyof typeof icons]}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Access Request Management</h2>
      </div>

      {requests.length === 0 ? (
        <Card className="p-8 text-center">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">No Access Requests</h3>
          <p className="text-sm text-muted-foreground">All users are within their normal limits</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{request.user_email}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    IP: {request.ip_address} • Requested: {new Date(request.requested_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Reason:</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {request.request_reason}
                  </p>
                </div>

                {request.admin_notes && (
                  <div>
                    <h4 className="font-medium mb-2">Admin Notes:</h4>
                    <p className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                      {request.admin_notes}
                    </p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="space-y-3 pt-4 border-t">
                    <Textarea
                      placeholder="Add admin notes (optional)"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleReviewRequest(request.id, 'approve')}
                        disabled={reviewingId === request.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve Access
                      </Button>
                      <Button
                        onClick={() => handleReviewRequest(request.id, 'deny')}
                        disabled={reviewingId === request.id}
                        variant="destructive"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Deny Request
                      </Button>
                    </div>
                  </div>
                )}

                {request.reviewed_at && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Reviewed on {new Date(request.reviewed_at).toLocaleString()}
                    {request.reviewed_by && ` by ${request.reviewed_by}`}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};