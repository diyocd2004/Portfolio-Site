"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profile from "@/content/profile";

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const certs = profile.certifications.filter((c) => c.type === "certification");
  const achievements = profile.certifications.filter((c) => c.type === "achievement");

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif section-heading text-center mb-16"
        >
          Certifications & Achievements
        </motion.h2>

        {/* Certifications */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-medium tracking-[0.15em] uppercase
              text-[var(--text-muted)] mb-6 text-center"
          >
            Certifications
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card p-5 flex items-start gap-4"
              >
                {/* Shield icon */}
                <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center
                  justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm font-medium tracking-[0.15em] uppercase
              text-[var(--text-muted)] mb-6 text-center"
          >
            Achievements
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.08,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card p-5 flex items-start gap-4"
              >
                {/* Trophy icon */}
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center
                  justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">
                    {achievement.issuer}
                  </p>
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
