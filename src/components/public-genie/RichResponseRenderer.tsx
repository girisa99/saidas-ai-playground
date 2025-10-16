import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { VisualJourneyMap, JourneyStep } from './VisualJourneyMap';

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

export const RichResponseRenderer: React.FC<RichResponseRendererProps> = ({ content, oncologyProducts }) => {
  // Remove Google Maps content first
  const cleanedContent = removeGoogleMapsContent(content);
  
  // Parse journey map data if present in content (support both 3 and 4 backticks)
  const journeyMapData = useMemo(() => {
    // Try 4 backticks first (correct format)
    let journeyMatch = cleanedContent.match(/````journey-map\n([\s\S]*?)\n````/);
    
    // Fallback to 3 backticks for backward compatibility
    if (!journeyMatch) {
      journeyMatch = cleanedContent.match(/```journey-map\n([\s\S]*?)\n```/);
    }
    
    if (journeyMatch) {
      try {
        const journeyData = JSON.parse(journeyMatch[1]);
        return journeyData as { title?: string; steps: JourneyStep[]; context?: 'healthcare' | 'technology' };
      } catch (e) {
        console.error('Failed to parse journey map data:', e);
        return null;
      }
    }
    return null;
  }, [cleanedContent]);

  // Remove journey map code block from cleaned content for rendering (support both formats)
  const cleanContent = cleanedContent.replace(/````journey-map\n[\s\S]*?\n````/g, '').replace(/```journey-map\n[\s\S]*?\n```/g, '');

  // Enhance content formatting for better readability and add citations support
  const enhancedContent = cleanContent
    .replace(/^• /gm, '🔹 ')
    .replace(/\*\*(.*?)\*\*/g, '**$1**') // Ensure bold formatting is preserved
    // Support citation format: [1], [2], etc.
    .replace(/\[(\d+)\]/g, '<sup class="citation">[$1]</sup>')
    // Support reference links format: [Source: URL]
    .replace(/\[Source:\s*(https?:\/\/[^\]]+)\]/g, '📎 [Reference Link]($1)')
    // Support PDF references
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

      {/* Therapy Products Cards */}
      {oncologyProducts && oncologyProducts.length > 0 && (
        <div className="not-prose mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="text-xl">💊</span>
            Therapy Products
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {oncologyProducts.map((product, idx) => (
              <div key={idx} className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
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