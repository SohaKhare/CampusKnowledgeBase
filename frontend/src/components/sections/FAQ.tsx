'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is KJ Somaiya Knowledge Hub?",
      answer: "KJ Somaiya Knowledge Hub is an AI-powered study assistant that uses RAG (Retrieval-Augmented Generation) technology to provide accurate answers based on verified university data, syllabus, and course materials. Think of it as your personal GPT trained specifically on KJ Somaiya campus knowledge."
    },
    {
      question: "How does the multi-session feature work?",
      answer: "You can create separate chat sessions for each subject you're studying. Each session maintains its own conversation history, allowing you to seamlessly switch between subjects without losing context. This is perfect for organizing your study materials and preparing for multiple exams simultaneously."
    },
    {
      question: "Is the information verified and accurate?",
      answer: "Yes! All answers are based on official university syllabus, course materials, lecture notes, and verified academic resources from KJ Somaiya. We continuously update our knowledge base to ensure accuracy and relevance to your curriculum."
    },
    {
      question: "Can I use this for exam preparation?",
      answer: "Absolutely! The Knowledge Hub is designed specifically for exam preparation. You can ask subject-specific questions, clarify doubts, review concepts, and practice problems. The AI provides exam-focused answers that align with your syllabus and previous year patterns."
    },
    {
      question: "Is there a limit to the number of questions I can ask?",
      answer: "No limits! You have unlimited access to ask as many questions as you need across unlimited sessions. Study at your own pace and ask questions 24/7 whenever you need help."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-[var(--bg-primary)] transition-theme">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Everything you need to know about your AI study companion
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-md)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--accent-glow)] transition-theme"
              >
                <span className="font-semibold text-lg text-[var(--text-primary)] pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[var(--accent-primary)] transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-6 pb-5 text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
