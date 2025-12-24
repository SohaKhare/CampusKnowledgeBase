export interface Session {
  id: string;
  subject: string;
  messageCount: number;
  createdAt: Date;
}

export interface Source {
  id: string;
  fileName: string;
  title: string;
  pageNumber?: number;
  relevance: number; // 0-1 score
  excerpt?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
}
