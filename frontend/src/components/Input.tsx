import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-theme ${className}`}
        {...props}
      />
    </div>
  );
}
