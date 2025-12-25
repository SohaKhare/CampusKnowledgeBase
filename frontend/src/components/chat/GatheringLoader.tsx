"use client";

export default function GatheringLoader() {
  return (
    <div className="flex gap-4 mb-6">
      <div className="w-8 h-8 bg-linear-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5
               S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18
               7.5 18s3.332.477 4.5 1.253"
          />
        </svg>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-2xl px-5 py-3 bg-bg-secondary border border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <span className="animate-pulse">🔍 Gathering information</span>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </div>
          <p className="text-xs mt-1 text-[var(--text-secondary)]">
            Searching syllabus-aligned sources
          </p>
        </div>
      </div>
    </div>
  );
}
