import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Key, Save, Eye, EyeOff } from 'lucide-react';

export const MapboxTokenManager = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const { data, error } = await supabase
        .from('app_configuration')
        .select('config_value')
        .eq('config_key', 'mapbox_public_token')
        .maybeSingle();

      if (error) throw error;
      if (data) setToken(data.config_value || '');
    } catch (error) {
      console.error('Error loading token:', error);
      toast({
        title: 'Error',
        description: 'Failed to load Mapbox token',
        variant: 'destructive'
      });
    }
  };

  const saveToken = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('app_configuration')
        .update({ config_value: token, updated_at: new Date().toISOString() })
        .eq('config_key', 'mapbox_public_token');

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Mapbox token saved successfully',
      });
    } catch (error) {
      console.error('Error saving token:', error);
      toast({
        title: 'Error',
        description: 'Failed to save Mapbox token',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Mapbox Public Token
        </CardTitle>
        <CardDescription>
          Manage the Mapbox public access token for treatment center maps. This token will be used
          by all users when they view the interactive map. Get your token at{' '}
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Public Token (pk.*)</label>
          <div className="flex gap-2">
            <Input
              type={showToken ? 'text' : 'password'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="pk.eyJ1Ijoi..."
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowToken(!showToken)}
              type="button"
            >
              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: Mapbox public tokens (starting with pk.) are designed to be public and can be safely
            used on the client side.
          </p>
        </div>

        <Button onClick={saveToken} disabled={loading || !token.startsWith('pk.')}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Token'}
        </Button>

        {token && !token.startsWith('pk.') && (
          <p className="text-sm text-destructive">
            ⚠️ Mapbox public tokens must start with "pk."
          </p>
        )}
      </CardContent>
    </Card>
  );
};
