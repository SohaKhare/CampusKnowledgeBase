"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "top-4 mx-4 md:mx-8 rounded-2xl glass shadow-[var(--shadow-lg)] border border-[var(--border-color)]"
          : "top-0 glass border-b border-[var(--border-color)]"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <div
          className={`flex items-center transition-all duration-300 ${
            isScrolled ? "justify-between" : "justify-between"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                isScrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <svg
                className={`text-white transition-all duration-300 ${
                  isScrolled ? "w-4 h-4" : "w-6 h-6"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            {!isScrolled && (
              <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight transition-all duration-300">
                CK BASE
              </span>
            )}
          </Link>

          {/* Navigation Links - Centered when scrolled */}
          {isLandingPage && (
            <div
              className={`hidden md:flex items-center transition-all duration-300 ${
                isScrolled
                  ? "absolute left-1/2 -translate-x-1/2 gap-6"
                  : "gap-8"
              }`}
            >
              <a
                href="#features"
                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all font-medium ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all font-medium ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all font-medium ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all font-medium ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all font-medium ${
                  isScrolled ? "text-sm" : "text-base"
                }`}
              >
                Contact
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isLandingPage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className={`rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--accent-glow)] transition-all duration-300 group ${
                isScrolled ? "p-1.5" : "p-2 sm:p-2.5"
              }`}
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className={`text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-all ${
                    isScrolled ? "w-4 h-4" : "w-5 h-5"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className={`text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-all ${
                    isScrolled ? "w-4 h-4" : "w-5 h-5"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  size={isScrolled ? "sm" : "md"}
                  onClick={() => router.push("/chat")}
                  className="hidden sm:flex"
                >
                  Chat
                </Button>
                <button
                  onClick={() => router.push("/chat")}
                  className="sm:hidden p-2 text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-colors"
                  aria-label="Chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </button>

                <button
                  onClick={handleLogout}
                  className={`rounded-xl border border-red-400 text-red-400 hover:bg-red-400/10 transition-all ${
                    isScrolled ? "px-2 sm:px-3 py-1.5 text-xs sm:text-sm" : "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  }`}
                >
                  <span className="hidden sm:inline">Logout</span>
                  <svg className="sm:hidden w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link href="/login">
                <Button size={isScrolled ? "sm" : "md"}>
                  <span className="hidden sm:inline">{isScrolled ? "Login" : "Get Started"}</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isLandingPage && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <div className="flex flex-col space-y-3 px-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-all font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-all font-medium"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-all font-medium"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-all font-medium"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg transition-all font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
