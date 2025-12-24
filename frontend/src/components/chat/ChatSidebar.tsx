'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Session } from '@/types/chat';

interface ChatSidebarProps {
  sessions: Session[];
  onNewSession: (subject: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function ChatSidebar({ sessions, onNewSession, isCollapsed, onToggleCollapse }: ChatSidebarProps) {
  const params = useParams();
  const currentSessionId = params?.sessionId as string;
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  const handleCreateSession = () => {
    if (newSubject.trim()) {
      onNewSession(newSubject.trim());
      setNewSubject('');
      setShowNewSessionModal(false);
    }
  };

  return (
    <>
      <div className={`bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-color)]">
          {!isCollapsed ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">Knowledge Hub</span>
                </Link>
                <button
                  onClick={onToggleCollapse}
                  className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
                  title="Collapse sidebar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setShowNewSessionModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-xl hover:shadow-lg glow-accent transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">New Session</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onToggleCollapse}
                className="w-full flex items-center justify-center mb-3"
                title="Expand sidebar"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-center hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </button>
              <button
                onClick={() => setShowNewSessionModal(true)}
                className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-xl hover:scale-105 transition-all"
                title="New Session"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              Your Sessions
            </h3>
          )}
          <div className="space-y-2">
            {sessions.map((session) => (
              <Link
                key={session.id}
                href={`/chat/${session.id}`}
                className={`block p-3 rounded-xl transition-all ${
                  currentSessionId === session.id
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-glow)]'
                }`}
                title={isCollapsed ? session.subject : undefined}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${currentSessionId === session.id ? 'text-white' : 'text-[var(--accent-primary)]'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-sm">
                        {session.subject}
                      </div>
                      <div className={`text-xs mt-1 ${currentSessionId === session.id ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
                        {session.messageCount} messages
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* New Session Modal */}
      {showNewSessionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 max-w-md w-full mx-4 border border-[var(--border-color)] shadow-[var(--shadow-lg)]">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Create New Subject Session
            </h3>
            <input
              type="text"
              placeholder="e.g., Operating Systems"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateSession()}
              className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent mb-4 transition-theme placeholder:text-[var(--text-secondary)]"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewSessionModal(false)}
                className="flex-1 px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--accent-glow)] transition-theme"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSession}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg hover:scale-105 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
