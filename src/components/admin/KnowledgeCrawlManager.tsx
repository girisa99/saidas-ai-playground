import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Link, FileText, Image, Video } from 'lucide-react';
import { TreatmentCenterCrawler } from './TreatmentCenterCrawler';

export const KnowledgeCrawlManager = () => {
  const { toast } = useToast();
  const [crawlUrl, setCrawlUrl] = useState('');
  const [domain, setDomain] = useState('conversational');
  const [contentType, setContentType] = useState('educational_content');
  const [maxPages, setMaxPages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'pdf'>('image');

  const handleCrawl = async () => {
    if (!crawlUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a URL to crawl',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('crawl-knowledge-source', {
        body: {
          url: crawlUrl,
          domain,
          contentType,
          maxPages,
          recursive: false,
          tags: ['web-crawl', domain]
        }
      });

      if (error) throw error;

      toast({
        title: 'Crawl Started',
        description: `Successfully started crawling ${crawlUrl}. Processing ${data.pagesProcessed || 'multiple'} pages.`,
      });

      setCrawlUrl('');
    } catch (error) {
      console.error('Crawl error:', error);
      toast({
        title: 'Crawl Failed',
        description: error instanceof Error ? error.message : 'Failed to start crawl',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaProcess = async () => {
    if (!mediaUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a media URL',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-media-knowledge', {
        body: {
          url: mediaUrl,
          mediaType,
          domain,
          contentType,
          tags: [mediaType, domain]
        }
      });

      if (error) throw error;

      toast({
        title: 'Media Processed',
        description: `Successfully processed ${mediaType} and added to knowledge base`,
      });

      setMediaUrl('');
    } catch (error) {
      console.error('Media processing error:', error);
      toast({
        title: 'Processing Failed',
        description: error instanceof Error ? error.message : 'Failed to process media',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Treatment Center Crawler */}
      <TreatmentCenterCrawler />

      {/* Web Crawling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Web Page Crawling
          </CardTitle>
          <CardDescription>
            Crawl websites to automatically extract and add content to the knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crawl-url">Website URL</Label>
            <Input
              id="crawl-url"
              placeholder="https://example.com"
              value={crawlUrl}
              onChange={(e) => setCrawlUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger id="domain">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversational">Conversational AI</SelectItem>
                  <SelectItem value="medical_imaging">Medical Imaging</SelectItem>
                  <SelectItem value="patient_onboarding">Patient Onboarding</SelectItem>
                  <SelectItem value="clinical_risk">Clinical Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="content-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational_content">Educational Content</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="guideline">Guideline</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-pages">Max Pages to Crawl</Label>
            <Input
              id="max-pages"
              type="number"
              min="1"
              max="100"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value) || 10)}
            />
          </div>

          <Button onClick={handleCrawl} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crawling...
              </>
            ) : (
              'Start Crawl'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Media Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Media Content Processing
          </CardTitle>
          <CardDescription>
            Process images, videos, and PDFs with AI-powered extraction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="media-type">Media Type</Label>
            <Select value={mediaType} onValueChange={(value) => setMediaType(value as any)}>
              <SelectTrigger id="media-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Image (OCR + Vision AI)
                  </div>
                </SelectItem>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video (Transcript + Summary)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF (Text Extraction)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-url">Media URL</Label>
            <Input
              id="media-url"
              placeholder={
                mediaType === 'image' 
                  ? 'https://example.com/image.png'
                  : mediaType === 'video'
                  ? 'https://youtube.com/watch?v=...'
                  : 'https://example.com/document.pdf'
              }
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />
          </div>

          <Button onClick={handleMediaProcess} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Process Media'
            )}
          </Button>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Supported formats:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Images: JPG, PNG, WEBP</Badge>
              <Badge variant="secondary">Videos: YouTube, Vimeo</Badge>
              <Badge variant="secondary">Documents: PDF</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
