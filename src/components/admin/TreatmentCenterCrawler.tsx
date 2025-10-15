import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { crawlTreatmentCenters } from '@/services/treatmentCenterService';
import { Loader2, MapPin, Database, ExternalLink } from 'lucide-react';

export const TreatmentCenterCrawler = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSite, setSelectedSite] = useState<string>('');
  const [customUrl, setCustomUrl] = useState('');
  const [centerType, setCenterType] = useState<'gene_therapy' | 'bmt' | 'oncology' | 'general'>('gene_therapy');
  const [maxPages, setMaxPages] = useState(50);

  const predefinedSites = [
    {
      id: 'asgct',
      name: 'ASGCT Gene Therapy Centers',
      url: 'https://patienteducation.asgct.org/patient-journey/gene-therapy-centers',
      type: 'gene_therapy' as const,
      description: 'American Society of Gene & Cell Therapy treatment centers'
    },
    {
      id: 'carebox',
      name: 'CareBox Health Connect',
      url: 'https://connect.careboxhealth.com/en-US',
      type: 'general' as const,
      description: 'CareBox healthcare provider network'
    },
    {
      id: 'bmtinfonet',
      name: 'BMT InfoNet Centers',
      url: 'https://bmtinfonet.org/transplantcenters',
      type: 'bmt' as const,
      description: 'Blood & Marrow Transplant Information Network'
    }
  ];

  const handleCrawl = async () => {
    const urlToCrawl = selectedSite 
      ? predefinedSites.find(s => s.id === selectedSite)?.url 
      : customUrl;

    if (!urlToCrawl) {
      toast({
        title: 'Error',
        description: 'Please select a site or enter a custom URL',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const sourceName = selectedSite
        ? predefinedSites.find(s => s.id === selectedSite)?.name || 'Custom Source'
        : new URL(urlToCrawl).hostname;

      const result = await crawlTreatmentCenters(
        urlToCrawl,
        centerType,
        sourceName,
        maxPages
      );

      if (result.success) {
        toast({
          title: 'Crawl Started Successfully',
          description: `Processing ${urlToCrawl}. Extracted ${result.data?.centersExtracted || 0} treatment centers from ${result.data?.pagesProcessed || 0} pages.`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Crawl error:', error);
      toast({
        title: 'Crawl Failed',
        description: error instanceof Error ? error.message : 'Failed to crawl treatment centers',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Treatment Center Crawler
        </CardTitle>
        <CardDescription>
          Crawl healthcare websites to extract treatment center data and add to knowledge base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Predefined Sites */}
        <div className="space-y-2">
          <Label>Select Predefined Site</Label>
          <Select value={selectedSite} onValueChange={(value) => {
            setSelectedSite(value);
            const site = predefinedSites.find(s => s.id === value);
            if (site) {
              setCenterType(site.type);
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a healthcare site..." />
            </SelectTrigger>
            <SelectContent>
              {predefinedSites.map((site) => (
                <SelectItem key={site.id} value={site.id}>
                  <div className="flex flex-col py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{site.name}</span>
                      <Badge variant="secondary" className="text-xs">{site.type}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{site.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Site Preview */}
        {selectedSite && (
          <div className="p-3 border rounded-md bg-muted/50">
            <div className="flex items-start gap-2">
              <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {predefinedSites.find(s => s.id === selectedSite)?.name}
                </p>
                <a 
                  href={predefinedSites.find(s => s.id === selectedSite)?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  {predefinedSites.find(s => s.id === selectedSite)?.url}
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Custom URL */}
        <div className="space-y-2">
          <Label htmlFor="custom-url">Custom Website URL</Label>
          <Input
            id="custom-url"
            placeholder="https://example.com/treatment-centers"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              setSelectedSite('');
            }}
          />
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="center-type">Center Type</Label>
            <Select value={centerType} onValueChange={(value: any) => setCenterType(value)}>
              <SelectTrigger id="center-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gene_therapy">Gene Therapy</SelectItem>
                <SelectItem value="bmt">BMT / Transplant</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="general">General Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-pages">Max Pages</Label>
            <Input
              id="max-pages"
              type="number"
              min="1"
              max="100"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value) || 50)}
            />
          </div>
        </div>

        <Button onClick={handleCrawl} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Crawling...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Start Crawl & Extract Centers
            </>
          )}
        </Button>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>What happens during crawl:</strong>
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Crawls website and extracts content</li>
            <li>Adds pages to Universal Knowledge Base</li>
            <li>Uses AI to extract structured center data (name, address, phone, etc.)</li>
            <li>Stores centers in treatment_centers table</li>
            <li>Links centers to knowledge sources for citations</li>
            <li>Enables map visualization and search</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
