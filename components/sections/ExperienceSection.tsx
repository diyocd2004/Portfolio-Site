"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profile from "@/content/profile";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
                      <div className="flex flex-wrap gap-2">
                        {exp.tools.map((tool) => (
                          <span key={tool} className="tech-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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
