"use client";

import { motion } from "framer-motion";
import profile from "@/content/profile";
import ProfileImageInteractive from "@/components/ProfileImageInteractive";

export default function HeroSection() {
  const { hero } = profile;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
          bg-sakura/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
          bg-crimson/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16
        flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase
              text-sakura mb-4">
              Aspiring Cybersecurity Engineer & AI Practitioner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-serif font-bold mb-6"
          >
            <span className="block">{hero.firstName}</span>
            <span className="block text-sakura">{hero.lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl
              mx-auto lg:mx-0 mb-4 leading-relaxed"
          >
            {hero.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-base text-[var(--text-muted)] max-w-lg
              mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5
                bg-crimson text-parchment font-medium rounded-lg
                hover:bg-crimson/90 transition-all duration-300
                hover:shadow-[0_0_30px_rgba(139,30,63,0.3)]
                active:scale-[0.98]"
            >
              {hero.ctaPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
              </svg>
            </a>
            <a
              href="https://docs.google.com/document/d/1-boHLa56X78CeRSLu_35N9fDeG-uBMbShHY65sUX9aQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5
                border border-[var(--glass-border)] text-[var(--text-primary)]
                font-medium rounded-lg hover:border-sakura/50
                hover:bg-sakura/5 transition-all duration-300
                active:scale-[0.98]"
            >
              {hero.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Interactive Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <div className="scale-90 md:scale-95 origin-center">
            <ProfileImageInteractive />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[var(--text-muted)] flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-sakura" />
        </motion.div>
      </motion.div>
    </section>
  );
}
