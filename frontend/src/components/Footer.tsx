import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-12 px-6 transition-theme">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-[var(--text-primary)]">Campus Knowledge Base</span>
            </div>
            <p className="text-[var(--text-secondary)] max-w-md">
              Your AI-powered study companion for KJ Somaiya College of Engineering. 
              Study smarter with verified campus knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/chat" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] text-center text-[var(--text-secondary)]">
          <p>© 2024 KJ Somaiya Knowledge Hub. Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
