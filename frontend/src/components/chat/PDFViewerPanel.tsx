'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Source } from '@/types/chat';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerPanelProps {
  source: Source | null;
  onClose: () => void;
}

export default function PDFViewerPanel({ source, onClose }: PDFViewerPanelProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(source?.pageNumber || 1);
  const [scale, setScale] = useState<number>(1.0);
  const [pdfError, setPdfError] = useState<string | null>(null);

  if (!source) return null;

  // Get JWT token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Construct PDF URL - assuming backend serves PDFs
  const pdfUrl = source.filePath 
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/pdf/${encodeURIComponent(source.fileName)}`
    : null;

  // Configure PDF.js to include JWT token in headers
  const pdfOptions = pdfUrl && token ? {
    url: pdfUrl,
    httpHeaders: {
      'Authorization': `Bearer ${token}`
    }
  } : pdfUrl;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
    // Jump to the referenced page
    if (source.pageNumber) {
      setPageNumber(source.pageNumber);
    }
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setPdfError('Failed to load PDF. The file may not be available.');
  };

  const handleDownload = () => {
    if (pdfUrl && token) {
      // Open with auth header by creating a temporary link with token in URL
      // Or fetch and create blob URL
      fetch(pdfUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = source.fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(err => console.error('Download failed:', err));
    }
  };

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
        {/* PDF Navigation */}
        {pdfUrl && numPages > 0 && (
          <div className="sticky top-0 z-10 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 py-2 flex items-center justify-between gap-4 transition-theme">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1}
                className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded hover:bg-[var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-theme"
              >
                ←
              </button>
              <span className="text-sm text-[var(--text-primary)]">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                disabled={pageNumber >= numPages}
                className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded hover:bg-[var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-theme"
              >
                →
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.25))}
                className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded hover:bg-[var(--accent-glow)] text-sm transition-theme"
              >
                -
              </button>
              <span className="text-sm text-[var(--text-primary)] min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(Math.min(2.0, scale + 0.25))}
                className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded hover:bg-[var(--accent-glow)] text-sm transition-theme"
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Highlighted Excerpt - Show above PDF */}
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

          {/* PDF Viewer */}
          {pdfOptions ? (
            <div className="bg-[var(--bg-secondary)] rounded-lg shadow-[var(--shadow-sm)] border border-[var(--border-color)] p-4 mb-4 flex justify-center transition-theme">
              {pdfError ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-[var(--text-secondary)]">{pdfError}</p>
                </div>
              ) : (
                <Document
                  file={pdfOptions}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]"></div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
                      </div>
                    }
                  />
                </Document>
              )}
            </div>
          ) : (
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
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] transition-theme">
        <button 
          onClick={handleDownload}
          disabled={!pdfOptions || !token}
          className="w-full px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg hover:scale-105 transition-all text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}
