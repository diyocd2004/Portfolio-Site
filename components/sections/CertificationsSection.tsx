"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profile from "@/content/profile";

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const completedCerts = profile.certifications.filter(
    (c) => c.type === "certification" && c.status !== "upcoming"
  );
  const upcomingCerts = profile.certifications.filter(
    (c) => c.type === "certification" && c.status === "upcoming"
  );
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
          Certifications & Honors
        </motion.h2>

        {/* Certifications */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 text-center"
          >
            Professional Credentials
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Completed Certifications */}
            {completedCerts.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + i * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card p-5 flex items-start gap-4 hover:border-sakura/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Shield icon */}
                <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center flex-shrink-0 text-crimson">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {cert.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-2">{cert.issuer}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[0.65rem] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ✓ Verified
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Upcoming Certification */}
            {upcomingCerts.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + (completedCerts.length + i) * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card p-5 flex items-start gap-4 border-dashed border-gold/40 hover:border-gold/70 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mb-2">{cert.issuer}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[0.65rem] font-medium bg-gold/15 text-gold border border-gold/30">
                    Target 2026 · In Progress
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements & Honors */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 text-center"
          >
            Awards & Competitions
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="glass-card p-5 flex items-start gap-4 hover:border-gold/50 hover:shadow-[0_4px_25px_rgba(197,160,89,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Trophy icon */}
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      {achievement.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-2">
                    {achievement.issuer} {achievement.event ? `· ${achievement.event}` : ""}
                  </p>
                  {achievement.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[0.65rem] font-medium bg-gold/10 text-gold border border-gold/20">
                      {achievement.badge}
                    </span>
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
