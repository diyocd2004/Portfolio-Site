"use client";

import { motion } from "framer-motion";
import profile from "@/content/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6">
      <div className="hairline max-w-4xl mx-auto mb-12" />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center
        justify-between gap-6">
        {/* Left: Copyright */}
        <div className="text-sm text-[var(--text-muted)] text-center sm:text-left">
          <span>© {new Date().getFullYear()} {profile.hero.name}.</span>
          <span className="hidden sm:inline"> All rights reserved.</span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4">
          {profile.socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center
                text-[var(--text-muted)] hover:text-sakura
                hover:bg-sakura/10 transition-all duration-300"
              aria-label={link.label}
            >
              <SocialIcon type={link.icon} />
            </motion.a>
          ))}
        </div>

        {/* Right: Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)]
            hover:text-[var(--text-primary)] transition-colors"
          aria-label="Back to top"
        >
          <span className="hidden sm:inline">Back to top</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "github":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
        </svg>
      );
    case "mail":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}
