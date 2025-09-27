import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichResponseRendererProps {
  content: string;
}

export const RichResponseRenderer: React.FC<RichResponseRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto rounded-lg my-2"
              loading="lazy"
            />
          ),
          video: ({ node, ...props }) => (
            <video
              {...props}
              className="max-w-full h-auto rounded-lg my-2"
              controls
            />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-primary hover:text-primary-glow transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: ({ node, ...props }: any) => {
            const isInline = !props.className?.includes('language-');
            return isInline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
            ) : (
              <code className="block bg-muted p-3 rounded-lg text-sm" {...props} />
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};