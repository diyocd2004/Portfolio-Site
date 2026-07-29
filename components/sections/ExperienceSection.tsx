"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import profile from "@/content/profile";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif section-heading text-center mb-16"
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px
            md:-translate-x-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full w-full origin-top hairline-vertical"
              style={{ opacity: 0.4 }}
            />
          </div>

          {/* Experience entries */}
          <div className="space-y-12">
            {profile.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12
                  ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                  pl-12 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-1/2 top-6 w-3 h-3
                  rounded-full bg-sakura border-2 border-[var(--bg-primary)]
                  md:-translate-x-1/2 z-10 shadow-[0_0_12px_rgba(255,183,197,0.4)]" />

                {/* Date label (opposite side on desktop) */}
                <div className={`hidden md:flex md:w-1/2 items-start pt-4
                  ${i % 2 === 0 ? "justify-end pr-12" : "justify-start pl-12"}`}>
                  <span className="text-sm font-medium tracking-wider uppercase
                    text-[var(--text-muted)]">
                    {exp.period}
                  </span>
                </div>

                {/* Card */}
                <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="glass-card p-6 md:p-8">
                    <span className="md:hidden text-xs font-medium tracking-wider
                      uppercase text-[var(--text-muted)] mb-2 block">
                      {exp.period}
                    </span>

                    <h3 className="font-serif text-xl font-semibold mb-1
                      text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-sakura font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mb-4">
                      {exp.location}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="text-sakura mt-1 flex-shrink-0">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.tools && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.tools.map((tool) => (
                          <span key={tool} className="tech-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Certificate Button */}
                    {exp.certificateImage && (
                      <button
                        onClick={() => setLightboxImage(exp.certificateImage!)}
                        className="inline-flex items-center gap-2 px-4 py-2 mt-2
                          text-xs font-medium uppercase tracking-wider
                          border border-gold/30 rounded-lg
                          text-gold hover:bg-gold/10 hover:border-gold/50
                          transition-all duration-300 group"
                      >
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:scale-110 transition-transform"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline max-w-4xl mx-auto mt-20" />

      {/* ─── Certificate Lightbox ─── */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center
            bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden
              shadow-2xl border border-[var(--glass-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full
                bg-black/60 backdrop-blur-sm flex items-center justify-center
                text-white hover:bg-black/80 transition-colors"
              aria-label="Close certificate viewer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Certificate image */}
            <img
              src={lightboxImage}
              alt="Internship Certificate"
              className="w-full h-auto max-h-[85vh] object-contain bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
