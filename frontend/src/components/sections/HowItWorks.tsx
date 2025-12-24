export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: (
        <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      title: 'Sign Up',
      description: 'Create your account and get instant access to the knowledge hub'
    },
    {
      number: '02',
      icon: (
        <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Start a Session',
      description: 'Create subject-specific chat sessions for organized learning'
    },
    {
      number: '03',
      icon: (
        <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Ask Questions',
      description: 'Get instant, accurate answers from verified campus resources'
    },
    {
      number: '04',
      icon: (
        <svg className="w-8 h-8 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Excel in Studies',
      description: 'Master concepts, ace exams, and achieve academic excellence'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[var(--bg-primary)] transition-theme">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Get started in minutes and transform your study experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-[var(--shadow-md)] border border-[var(--border-color)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:scale-105">
                <div className="bg-[var(--accent-glow)] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
