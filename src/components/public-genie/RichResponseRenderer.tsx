import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { VisualJourneyMap, JourneyStep } from './VisualJourneyMap';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Image as ImageIcon, Download, CheckCircle2 } from 'lucide-react';
import { logger } from '@/lib/logger';

interface RichResponseRendererProps {
  content: string;
  oncologyProducts?: Array<{
    product: string;
    therapy_category?: string;
    dose?: string;
    ndc?: string;
    modality?: string;
    application?: string;
    manufacturer?: string;
    storage?: string;
    special_handling?: string;
  }>;
  triageData?: {
    best_format?: 'text' | 'list' | 'table' | 'card' | 'html' | 'map' | 'infographic' | 'steps' | 'video' | 'pdf';
    complexity?: string;
    domain?: string;
  } | null;
}

// Remove Google Maps links and embeds from content
const removeGoogleMapsContent = (text: string): string => {
  // Remove Google Maps embed iframes
  text = text.replace(/<iframe[^>]*src=["']https?:\/\/(www\.)?google\.com\/maps[^>]*>.*?<\/iframe>/gi, '');
  
  // Remove Google Maps markdown links
  text = text.replace(/\[([^\]]*)\]\(https?:\/\/(www\.)?google\.com\/maps[^\)]*\)/gi, '');
  
  // Remove Google Maps raw URLs
  text = text.replace(/https?:\/\/(www\.)?google\.com\/maps[^\s<)]*/gi, '');
  
  return text;
};

export const RichResponseRenderer: React.FC<RichResponseRendererProps> = ({ content, oncologyProducts, triageData }) => {
  // Remove Google Maps content first
  const cleanedContent = removeGoogleMapsContent(content);
  
  logger.log('🎨 Rendering response with format:', triageData?.best_format);
  
  // Detect content type based on triage or auto-detection
  const contentType = useMemo(() => {
    if (triageData?.best_format) return triageData.best_format;
    
    // Auto-detect based on content patterns
    if (cleanedContent.match(/````?journey-map/)) return 'map';
    if (cleanedContent.match(/````?process-steps/)) return 'steps';
    if (cleanedContent.match(/\|[^\n]+\|/gm)?.length >= 3) return 'table';
    if (cleanedContent.match(/https?:\/\/.*\.(pdf|PDF)/)) return 'pdf';
    if (cleanedContent.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/)) return 'video';
    if (cleanedContent.match(/!\[.*?\]\(.*?\)/)) return 'infographic';
    
    return 'text';
  }, [cleanedContent, triageData]);
  
  // Parse journey map data
  const journeyMapData = useMemo(() => {
    const journeyMatch = cleanedContent.match(/````?journey-map\n([\s\S]*?)\n````?/);
    if (journeyMatch) {
      try {
        return JSON.parse(journeyMatch[1]) as { title?: string; steps: JourneyStep[]; context?: 'healthcare' | 'technology' };
      } catch (e) {
        logger.error('Failed to parse journey map data:', e);
      }
    }
    return null;
  }, [cleanedContent]);
  
  // Parse process steps data
  const processStepsData = useMemo(() => {
    const stepsMatch = cleanedContent.match(/````?process-steps\n([\s\S]*?)\n````?/);
    if (stepsMatch) {
      try {
        return JSON.parse(stepsMatch[1]) as { title?: string; steps: Array<{ number: number; title: string; description: string; status?: 'completed' | 'current' | 'upcoming' }> };
      } catch (e) {
        logger.error('Failed to parse process steps:', e);
      }
    }
    return null;
  }, [cleanedContent]);
  
  // Parse table data
  const tableData = useMemo(() => {
    if (contentType !== 'table') return null;
    
    const lines = cleanedContent.split('\n').filter(line => line.trim());
    const tableLines = lines.filter(line => line.includes('|'));
    
    if (tableLines.length < 2) return null;
    
    const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
    const rows = tableLines.slice(2).map(row => 
      row.split('|').map(cell => cell.trim()).filter(Boolean)
    );
    
    return { headers, rows };
  }, [cleanedContent, contentType]);
  
  // Extract videos
  const videos = useMemo(() => {
    const videoMatches = cleanedContent.matchAll(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([^\s)]+)/g);
    return Array.from(videoMatches).map(match => {
      const url = match[0];
      const videoId = match[3].split('&')[0];
      return {
        url,
        embedUrl: match[2].includes('youtube') || match[2].includes('youtu.be') 
          ? `https://www.youtube.com/embed/${videoId}`
          : `https://player.vimeo.com/video/${videoId}`
      };
    });
  }, [cleanedContent]);
  
  // Extract PDFs
  const pdfs = useMemo(() => {
    const pdfMatches = cleanedContent.matchAll(/\[(.*?)\]\((https?:\/\/.*?\.pdf)\)/gi);
    return Array.from(pdfMatches).map(match => ({
      title: match[1] || 'Download PDF',
      url: match[2]
    }));
  }, [cleanedContent]);

  // Remove special code blocks and clean content
  let cleanContent = cleanedContent
    .replace(/````?journey-map\n[\s\S]*?\n````?/g, '')
    .replace(/````?process-steps\n[\s\S]*?\n````?/g, '');

  // Enhance content formatting
  const enhancedContent = cleanContent
    .replace(/^• /gm, '🔹 ')
    .replace(/\*\*(.*?)\*\*/g, '**$1**')
    .replace(/\[(\d+)\]/g, '<sup class="citation">[$1]</sup>')
    .replace(/\[Source:\s*(https?:\/\/[^\]]+)\]/g, '📎 [Reference Link]($1)')
    .replace(/\[PDF:\s*([^\]]+)\]/g, '📄 [View PDF: $1]');

  return (
    <div className="space-y-4">
      {/* Journey Map Visualization */}
      {journeyMapData && (
        <VisualJourneyMap 
          steps={journeyMapData.steps}
          title={journeyMapData.title}
          context={journeyMapData.context}
        />
      )}

      {/* Process Steps Visualization */}
      {processStepsData && (
        <div className="not-prose mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">{processStepsData.title || 'Process Steps'}</h3>
          <div className="space-y-3">
            {processStepsData.steps.map((step, idx) => (
              <Card key={idx} className={step.status === 'completed' ? 'border-green-500/50' : step.status === 'current' ? 'border-primary' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500 text-white' : 
                      step.status === 'current' ? 'bg-primary text-primary-foreground' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{step.title}</CardTitle>
                      <CardDescription className="mt-1 text-sm">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Video Embeds */}
      {videos.length > 0 && (
        <div className="not-prose mb-6 space-y-4">
          {videos.map((video, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden border border-border">
              <div className="bg-muted px-3 py-2 flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Video Resource</span>
              </div>
              <div className="aspect-video">
                <iframe
                  src={video.embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Downloads */}
      {pdfs.length > 0 && (
        <div className="not-prose mb-6">
          <div className="space-y-2">
            {pdfs.map((pdf, idx) => (
              <a
                key={idx}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <FileText className="h-5 w-5 text-red-500" />
                <span className="flex-1 font-medium">{pdf.title}</span>
                <Download className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Render as Table */}
      {contentType === 'table' && tableData && (
        <div className="not-prose mb-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.headers.map((header, idx) => (
                  <TableHead key={idx} className="font-semibold">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.rows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <TableCell key={cellIdx}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Therapy Products Cards */}
      {oncologyProducts && oncologyProducts.length > 0 && (
        <div className="not-prose mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="text-xl">💊</span>
            Therapy Products
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {oncologyProducts.map((product, idx) => (
              <div key={idx} className="border border-border rounded-lg p-4 bg-background hover:shadow-md transition-shadow">
                <div className="font-semibold text-base text-foreground mb-2">{product.product}</div>
                {product.therapy_category && (
                  <div className="inline-block px-2 py-1 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {product.therapy_category}
                  </div>
                )}
                <div className="space-y-1 text-sm text-muted-foreground">
                  {product.dose && <div><span className="font-medium text-foreground">Dose:</span> {product.dose}</div>}
                  {product.ndc && <div><span className="font-medium text-foreground">NDC:</span> {product.ndc}</div>}
                  {product.modality && <div><span className="font-medium text-foreground">Route:</span> {product.modality}</div>}
                  {product.application && <div><span className="font-medium text-foreground">Indication:</span> {product.application}</div>}
                  {product.manufacturer && <div><span className="font-medium text-foreground">Manufacturer:</span> {product.manufacturer}</div>}
                  {product.storage && <div><span className="font-medium text-foreground">Storage:</span> {product.storage}</div>}
                  {product.special_handling && <div className="mt-2 pt-2 border-t border-border"><span className="font-medium text-foreground">Special Handling:</span> {product.special_handling}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Markdown Content */}
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-primary prose-strong:text-foreground">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
          img: ({ node, ...props }) => {
            const isPDF = props.src?.toLowerCase().endsWith('.pdf');
            if (isPDF) {
              return (
                <div className="my-3 p-4 border border-border rounded-lg bg-muted/30">
                  <a 
                    href={props.src} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
                  >
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-medium">{props.alt || 'View PDF Document'}</p>
                      <p className="text-xs text-muted-foreground">Click to open in new tab</p>
                    </div>
                  </a>
                </div>
              );
            }
            return (
              <img
                {...props}
                className="max-w-full h-auto rounded-lg my-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                loading="lazy"
                onClick={() => window.open(props.src, '_blank')}
                title="Click to view full size"
              />
            );
          },
          video: ({ node, ...props }) => (
            <video
              {...props}
              className="max-w-full h-auto rounded-lg my-3 shadow-md"
              controls
              preload="metadata"
            >
              <p className="text-sm text-muted-foreground">Your browser doesn't support video playback.</p>
            </video>
          ),
          a: ({ node, ...props }) => {
            const isPDF = props.href?.toLowerCase().endsWith('.pdf');
            const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(props.href || '');
            const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(props.href || '');
            const isYouTube = props.href?.includes('youtube.com') || props.href?.includes('youtu.be');
            
            // Handle YouTube links with a safe thumbnail preview (avoids embed "Video unavailable")
            if (isYouTube) {
              const rawHref = typeof props.href === 'string' ? props.href.trim() : '';
              const normalizedHref = rawHref
                ? (/^https?:\/\//i.test(rawHref) ? rawHref : `https://${rawHref.replace(/^\/\//, '')}`)
                : '';
              const videoId = normalizedHref.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
              if (videoId) {
                const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                return (
                  <div className="my-4">
                    <a
                      href={normalizedHref}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-glow transition-colors underline font-medium mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>🎥</span>
                      {props.children || 'Watch on YouTube'}
                    </a>
                    <a
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group aspect-video w-full rounded-lg overflow-hidden shadow-lg relative"
                      aria-label="Open video on YouTube"
                    >
                      <img
                        src={thumb}
                        alt="YouTube video thumbnail"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors grid place-items-center">
                        <div className="w-14 h-14 rounded-full bg-background/80 border border-border grid place-items-center shadow-md">
                          <span className="text-primary text-xl">▶</span>
                        </div>
                      </div>
                    </a>
                    <p className="text-xs text-muted-foreground mt-2">If the embed is blocked by the publisher, use the link above to watch on YouTube.</p>
                  </div>
                );
              }
            }
            
            if (isPDF || isImage || isVideo) {
              return (
                <a
                  {...props}
                  className="inline-flex items-center gap-1 text-primary hover:text-primary-glow transition-colors underline decoration-dotted hover:decoration-solid font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPDF && <span>📄</span>}
                  {isImage && <span>🖼️</span>}
                  {isVideo && <span>🎥</span>}
                  {props.children}
                </a>
              );
            }
            
            // Fallback: ensure link text is clickable and URL is normalized
            const raw = typeof props.href === 'string' ? props.href.trim() : '';
            const href = raw ? (/^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/\//, '')}`) : '';
            if (!href) {
              return <span className="text-muted-foreground">{props.children} <em>(link unavailable)</em></span>;
            }
            return (
              <a
                href={href}
                className="text-primary hover:text-primary-glow transition-colors underline decoration-dotted hover:decoration-solid"
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.children}
              </a>
            );
          },
          code: ({ node, ...props }: any) => {
            const isInline = !props.className?.includes('language-');
            return isInline ? (
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono border" {...props} />
            ) : (
              <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto border shadow-inner" {...props} />
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 bg-muted/30 py-2 rounded-r" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-1" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="space-y-1 my-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="space-y-1 my-3" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full table-auto border border-muted rounded-lg" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="bg-muted/50 px-3 py-2 text-left font-semibold border-b border-muted break-words align-top text-xs md:text-sm" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 border-b border-muted/30 break-words align-top text-xs md:text-sm" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-2 leading-relaxed" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-muted-foreground" {...props} />
          ),
          sup: ({ node, ...props }) => (
            <sup className="text-primary font-medium ml-0.5" {...props} />
          )
        }}
      >
        {enhancedContent}
      </ReactMarkdown>
      </div>
    </div>
  );
};