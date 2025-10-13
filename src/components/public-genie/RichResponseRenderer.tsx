import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

export const RichResponseRenderer: React.FC<RichResponseRendererProps> = ({ content, oncologyProducts }) => {
  // Enhance content formatting for better readability
  const enhancedContent = content
    .replace(/^• /gm, '🔹 ')
    .replace(/\*\*(.*?)\*\*/g, '**$1**'); // Ensure bold formatting is preserved

  return (
    <div className="space-y-4">
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
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto rounded-lg my-3 shadow-md hover:shadow-lg transition-shadow"
              loading="lazy"
            />
          ),
          video: ({ node, ...props }) => (
            <video
              {...props}
              className="max-w-full h-auto rounded-lg my-3 shadow-md"
              controls
            />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-primary hover:text-primary-glow transition-colors underline decoration-dotted hover:decoration-solid"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
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
              <table className="min-w-full border border-muted rounded-lg" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="bg-muted/50 px-3 py-2 text-left font-semibold border-b border-muted" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 border-b border-muted/30" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="my-2 leading-relaxed" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-muted-foreground" {...props} />
          )
        }}
      >
        {enhancedContent}
      </ReactMarkdown>
      </div>
    </div>
  );
};