import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`bg-[var(--bg-secondary)] rounded-2xl shadow-[var(--shadow-sm)] border border-[var(--border-color)] p-6 transition-theme ${hover ? 'hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
