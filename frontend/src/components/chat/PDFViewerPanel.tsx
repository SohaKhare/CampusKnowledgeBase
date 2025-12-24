'use client';

import { useState } from 'react';
import { Source } from '@/types/chat';

interface PDFViewerPanelProps {
  source: Source | null;
  onClose: () => void;
}

export default function PDFViewerPanel({ source, onClose }: PDFViewerPanelProps) {
  if (!source) return null;

  return (
    <div className="h-full bg-[var(--bg-secondary)] border-l border-[var(--border-color)] flex flex-col transition-theme">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)] transition-theme">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {source.title}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] truncate">{source.fileName}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-[var(--accent-glow)] flex items-center justify-center transition-theme flex-shrink-0"
          title="Close panel"
        >
          <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--bg-primary)] transition-theme">
        <div className="p-6">
          {/* PDF Info */}
          <div className="bg-[var(--bg-secondary)] rounded-lg shadow-[var(--shadow-sm)] border border-[var(--border-color)] p-4 mb-4 transition-theme">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)]">PDF Viewer</h4>
                {source.pageNumber && (
                  <p className="text-sm text-[var(--text-secondary)]">Page {source.pageNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Highlighted Excerpt */}
          {source.excerpt && (
            <div className="bg-[var(--accent-glow)] border-l-4 border-[var(--accent-primary)] rounded-r-lg p-4 mb-4 transition-theme">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-[var(--accent-primary)] mb-1">
                    Highlighted Section:
                  </p>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    &ldquo;{source.excerpt}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Document Details */}
          <div className="bg-[var(--bg-secondary)] rounded-lg shadow-[var(--shadow-sm)] border border-[var(--border-color)] p-4 mb-4 transition-theme">
            <h5 className="text-xs font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wide">
              Document Details
            </h5>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">File Name</p>
                <p className="text-sm text-[var(--text-primary)] font-medium break-all">
                  {source.fileName}
                </p>
              </div>
              {source.pageNumber && (
                <div>
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Page Reference</p>
                  <p className="text-sm text-[var(--text-primary)] font-semibold">
                    Page {source.pageNumber}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-2">Relevance Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all"
                      style={{ width: `${source.relevance * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {Math.round(source.relevance * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Info */}
          <div className="bg-[var(--accent-glow)] border border-[var(--accent-primary)] rounded-lg p-4 transition-theme">
            <h5 className="text-xs font-semibold text-[var(--accent-primary)] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Backend Integration Ready
            </h5>
            <p className="text-xs text-[var(--text-secondary)] mb-2">
              Install react-pdf to display actual documents:
            </p>
            <code className="text-xs bg-[var(--bg-primary)] border border-[var(--border-color)] px-2 py-1 rounded block text-[var(--text-primary)]">
              npm install react-pdf
            </code>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] transition-theme">
        <button className="w-full px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg hover:scale-105 transition-all text-sm font-medium flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}
