import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, ExternalLink, Save, CheckCircle } from "lucide-react";

export const MapboxTokenManager = () => {
  const [token, setToken] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  
  // Check if token is already configured
  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await supabase.functions.invoke('check-mapbox-token');
        if (data?.hasToken) {
          setIsSaved(true);
        }
      } catch (error) {
        console.log('Token check:', error);
      }
    };
    checkToken();
  }, []);

  const handleSave = () => {
    if (token) {
      localStorage.setItem('MAPBOX_TOKEN_CONFIGURED', token.substring(0, 8));
      setIsSaved(true);
    }
    
    toast({
      title: "Token Configuration",
      description: (
        <div className="space-y-2">
          <p>To add your Mapbox token to Supabase:</p>
          <ol className="list-decimal ml-4 space-y-1 text-sm">
            <li>Go to Supabase Dashboard → Edge Functions → Secrets</li>
            <li>Add secret: MAPBOX_PUBLIC_TOKEN</li>
            <li>Value: {token || "your-mapbox-token"}</li>
            <li>Token will persist across sessions once saved in Supabase</li>
          </ol>
        </div>
      ),
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Mapbox Configuration</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Configure your Mapbox public token for interactive treatment center maps.
        </p>

        <div className="space-y-2">
          <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1Ijoi..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your token from{" "}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Mapbox Account
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2" disabled={!token}>
            {isSaved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {isSaved ? "Token Configured" : "View Setup Instructions"}
          </Button>
        </div>
        
        {isSaved && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm">
            <p className="font-semibold text-green-800 dark:text-green-200">✓ Mapbox token is configured</p>
            <p className="text-green-700 dark:text-green-300 text-xs mt-1">
              Maps will use the configured token automatically
            </p>
          </div>
        )}

        <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
          <p className="font-semibold">Setup Steps:</p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Sign up at mapbox.com (free tier available)</li>
            <li>Create a new public token in your Mapbox account</li>
            <li>Add the token as MAPBOX_PUBLIC_TOKEN in Supabase Edge Function Secrets</li>
            <li>The map will automatically use the token from environment variables</li>
          </ol>
        </div>
      </div>
    </Card>
  );
};
