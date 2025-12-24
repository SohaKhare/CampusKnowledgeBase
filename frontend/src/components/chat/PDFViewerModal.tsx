'use client';

import { useEffect } from 'react';
import { Source } from '@/types/chat';

interface PDFViewerModalProps {
  source: Source;
  onClose: () => void;
}

export default function PDFViewerModal({ source, onClose }: PDFViewerModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex-1 min-w-0 mr-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {source.title}
            </h3>
            <p className="text-sm text-gray-600 truncate">{source.fileName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* PDF Viewer Area */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-auto">
            {/* Placeholder for PDF - Ready for react-pdf or PDF.js integration */}
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 m-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#1a73e8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  PDF Viewer
                </h4>
                <p className="text-gray-600 mb-1">
                  {source.fileName}
                </p>
                {source.pageNumber && (
                  <p className="text-sm text-gray-500">
                    Page {source.pageNumber}
                  </p>
                )}
              </div>

              {/* Highlighted Excerpt Section */}
              {source.excerpt && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-yellow-900 mb-2">
                        Highlighted Section:
                      </p>
                      <p className="text-gray-800 leading-relaxed">
                        &ldquo;{source.excerpt}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Integration Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h5 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Backend Integration Ready
                </h5>
                <p className="text-sm text-blue-800 mb-3">
                  This PDF viewer is ready to display actual documents. To integrate:
                </p>
                <ul className="text-sm text-blue-700 space-y-1 ml-4">
                  <li>• Install react-pdf: <code className="bg-blue-100 px-1 rounded">npm install react-pdf</code></li>
                  <li>• Or use PDF.js for custom rendering</li>
                  <li>• API should return PDF URL or base64</li>
                  <li>• Scroll to page {source.pageNumber || 1} automatically</li>
                  <li>• Highlight matching text using search functionality</li>
                </ul>
              </div>

              {/* Document Info */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Relevance Score</p>
                  <p className="text-2xl font-bold text-[#1a73e8]">
                    {Math.round(source.relevance * 100)}%
                  </p>
                </div>
                {source.pageNumber && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-500 mb-1">Page Number</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {source.pageNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Side Panel - Document Info */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-auto">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Document Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">File Name</p>
                <p className="text-sm text-gray-900 font-medium break-all">
                  {source.fileName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Document Title</p>
                <p className="text-sm text-gray-900">
                  {source.title}
                </p>
              </div>

              {source.pageNumber && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Page Reference</p>
                  <p className="text-sm text-gray-900 font-medium">
                    Page {source.pageNumber}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 mb-2">Relevance</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1a73e8] rounded-full"
                      style={{ width: `${source.relevance * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {Math.round(source.relevance * 100)}%
                  </span>
                </div>
              </div>

              {source.excerpt && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Excerpt</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      &ldquo;{source.excerpt}&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            Press ESC to close • Click outside to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}
