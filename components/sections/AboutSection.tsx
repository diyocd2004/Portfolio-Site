"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import profile from "@/content/profile";

export default function AboutSection() {
  const { about } = profile;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding relative"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Heading + decorative element */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <h2 className="font-serif section-heading mb-6">
                {about.heading}
              </h2>

              {/* Decorative brush stroke */}
              <div className="hidden lg:block mt-12">
                <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-10">
                  <circle
                    cx="60" cy="60" r="55"
                    fill="none"
                    stroke="var(--sakura)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <text
                    x="60" y="65"
                    textAnchor="middle"
                    fill="var(--crimson)"
                    fontSize="18"
                    fontFamily="var(--font-serif)"
                    opacity="0.6"
                  >
                    武士
                  </text>
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Right: Bio paragraphs */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.12,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { value: "4", label: "Internships" },
                { value: "4+", label: "Key Projects" },
                { value: "6+", label: "Honors & Prizes" },
                { value: "4+", label: "Certifications" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-4 text-center sm:text-left transition-all duration-300 hover:border-sakura/40 hover:-translate-y-0.5 group"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-sakura group-hover:text-gold transition-colors mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="hairline max-w-4xl mx-auto mt-20" />
    </section>
  );
}
