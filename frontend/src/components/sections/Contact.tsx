'use client';

import { useState } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder - no backend integration
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[var(--bg-primary)] transition-theme">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Have questions or feedback? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-color)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="your.email@somaiya.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Subject"
              type="text"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <Textarea
              label="Message"
              placeholder="Tell us more..."
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            <Button type="submit" size="lg" className="w-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
