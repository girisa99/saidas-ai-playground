import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichResponseRendererProps {
  content: string;
}

export const RichResponseRenderer: React.FC<RichResponseRendererProps> = ({ content }) => {
  // Enhanced content processing for richer responses
  const processContent = (rawContent: string): string => {
    return rawContent
      // Convert emojis to larger display
      .replace(/([💡🚀🎯🔥⚡🤖🧞‍♂️✨🩺💊🏥🫀💉🔬])/g, '<span class="text-lg inline-block">$1</span>')
      // Add visual separators for sections
      .replace(/---/g, '\n<div class="border-t border-muted my-4"></div>\n')
      // Enhance bullet points
      .replace(/^• /gm, '🔹 ')
      // Add call-out boxes for important info
      .replace(/\*\*Important:\*\*(.*?)(?=\n\n|\n$|$)/gs, '<div class="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-400 p-3 my-2 rounded-r"><strong>💡 Important:</strong>$1</div>')
      // Add success boxes
      .replace(/\*\*Success:\*\*(.*?)(?=\n\n|\n$|$)/gs, '<div class="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-400 p-3 my-2 rounded-r"><strong>✅ Success:</strong>$1</div>')
      // Add warning boxes
      .replace(/\*\*Warning:\*\*(.*?)(?=\n\n|\n$|$)/gs, '<div class="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-400 p-3 my-2 rounded-r"><strong>⚠️ Warning:</strong>$1</div>');
  };

  const enhancedContent = processContent(content);

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          // Custom components for enhanced content
          div: ({ node, ...props }) => {
            const className = props.className as string;
            if (className?.includes('bg-yellow-50') || className?.includes('bg-green-50') || className?.includes('bg-red-50')) {
              return <div {...props} />;
            }
            return <div {...props} />;
          }
        }}
      >
        {enhancedContent}
      </ReactMarkdown>
    </div>
  );
};