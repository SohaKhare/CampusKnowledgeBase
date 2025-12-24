import { Source } from '@/types/chat';

interface SourceCardProps {
  source: Source;
  onClick?: () => void;
}

export default function SourceCard({ source, onClick }: SourceCardProps) {
  const relevancePercentage = Math.round(source.relevance * 100);
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-[var(--accent-glow)] rounded-lg p-3 border border-[var(--accent-primary)] hover:bg-[var(--bg-secondary)] transition-theme cursor-pointer text-left hover:shadow-[var(--shadow-md)] hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate">
              {source.title}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] truncate">{source.fileName}</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-3 text-xs">
        {source.pageNumber && (
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>page {source.pageNumber}</span>
          </div>
        )}
        
        {/* Relevance Bar */}
        <div className="flex items-center gap-2 flex-1">
          <span className="text-[var(--text-secondary)]">Relevance:</span>
          <div className="flex-1 h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all"
              style={{ width: `${relevancePercentage}%` }}
            />
          </div>
          <span className="text-[var(--text-primary)] font-medium">{relevancePercentage}%</span>
        </div>
      </div>

      {/* Excerpt */}
      {source.excerpt && (
        <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
          <p className="text-xs text-[var(--text-secondary)] italic line-clamp-2">
            &ldquo;{source.excerpt}&rdquo;
          </p>
        </div>
      )}
    </button>
  );
}
