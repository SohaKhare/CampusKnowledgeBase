import Link from 'next/link';
import Button from '../Button';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 light-pattern-hero dark:dark-gradient-hero transition-theme">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-glow)] rounded-full border border-[var(--border-color)]">
            <svg className="w-5 h-5 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-sm font-medium text-[var(--accent-primary)]">KJ Somaiya College of Engineering</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">Study Smarter,</span>
            <br />
            <span className="text-[var(--text-primary)]">Not Harder</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
            Your personal AI study assistant powered by verified campus knowledge.
            <br />
            Get instant answers, ace your exams, and master every subject.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button size="lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Learning Now
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Explore Features
              </Button>
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 text-center shadow-[var(--shadow-md)] border border-[var(--border-color)] transition-theme">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">24/7</div>
            <div className="text-[var(--text-secondary)] font-medium">Available</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 text-center shadow-[var(--shadow-md)] border border-[var(--border-color)] transition-theme">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">100%</div>
            <div className="text-[var(--text-secondary)] font-medium">Verified Data</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 text-center shadow-[var(--shadow-md)] border border-[var(--border-color)] transition-theme">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">∞</div>
            <div className="text-[var(--text-secondary)] font-medium">Sessions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
