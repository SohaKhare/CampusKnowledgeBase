import Card from '../Card';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The multi-session feature is a game-changer. I study DBMS, OS, and CN simultaneously without confusion.",
      name: "Rahul Verma",
      year: "Third Year, IT",
      avatar: "RV"
    },
    {
      quote: "Finally, a study tool that actually understands our syllabus! The answers are accurate and exam-focused.",
      name: "Ananya Iyer",
      year: "Second Year, Electronics",
      avatar: "AI"
    },
    {
      quote: "This knowledge hub saved my semester! I could clarify complex DSA concepts at 2 AM before my exam.",
      name: "Priya Sharma",
      year: "Final Year, Computer Engineering",
      avatar: "PS"
    },
    {
      quote: "The best part? It's available 24/7. Perfect for last-minute doubt clearing before exams!",
      name: "Sneha Desai",
      year: "Third Year, Computer Engineering",
      avatar: "SD"
    },
    {
      quote: "I use it for every subject now. The verified information gives me confidence in my preparations.",
      name: "Vikram Singh",
      year: "Second Year, IT",
      avatar: "VS"
    },
    {
      quote: "From struggling with thermodynamics to acing my viva - this AI assistant made all the difference.",
      name: "Arjun Patel",
      year: "Final Year, Mechanical",
      avatar: "AP"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-[var(--bg-primary)] transition-theme">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Real experiences from KJ Somaiya students who transformed their learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-[var(--bg-secondary)]">
              <div className="text-6xl text-[var(--accent-primary)] font-serif mb-4 leading-none">&ldquo;</div>
              
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">{testimonial.name}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{testimonial.year}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
