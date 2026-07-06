"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profile from "@/content/profile";

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif section-heading text-center mb-16"
        >
          Education
        </motion.h2>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-4 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
              className="h-full w-full origin-top hairline-vertical"
            />
          </div>

          <div className="space-y-8">
            {profile.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div className={`absolute left-2.5 top-6 w-3 h-3 rounded-full z-10
                  border-2 border-[var(--bg-primary)]
                  ${i === 0
                    ? "bg-sakura shadow-[0_0_12px_rgba(255,183,197,0.4)]"
                    : "bg-[var(--text-muted)]"
                  }`}
                />

                <div className="glass-card p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start
                    sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-serif text-lg font-semibold
                        text-[var(--text-primary)]">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-sakura font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {edu.location}
                      </p>
                    </div>
                    <span className="text-xs font-medium tracking-wider uppercase
                      text-[var(--text-muted)] flex-shrink-0 mt-1 sm:mt-0">
                      {edu.period}
                    </span>
                  </div>

                  {edu.highlights.length > 0 && (
                    <ul className="space-y-1.5 mt-3">
                      {edu.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="text-gold mt-0.5 flex-shrink-0">⬥</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline max-w-4xl mx-auto mt-20" />
    </section>
  );
}
