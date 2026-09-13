"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import profile from "@/content/profile";

const statusLabels: Record<string, string> = {
  completed: "Completed",
  active: "In Progress",
  upcoming: "Upcoming",
};

const statusIcons: Record<string, string> = {
  completed: "✓",
  active: "◉",
  upcoming: "◎",
};

const categories = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "cyber", label: "Cyber Security" },
  { id: "cloud", label: "Cloud & Web" },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = profile.projects.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai-ml") return project.category === "ai-ml";
    if (activeCategory === "cyber") {
      return (
        project.category === "cyber" ||
        project.title.toLowerCase().includes("prompt") ||
        project.description.toLowerCase().includes("security") ||
        project.techStack.some((t) => t.toLowerCase().includes("security") || t.toLowerCase().includes("adversarial"))
      );
    }
    if (activeCategory === "cloud") {
      return project.category === "cloud" || project.category === "fullstack";
    }
    return true;
  });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif section-heading text-center mb-6"
        >
          Projects
        </motion.h2>

        <p className="text-sm text-[var(--text-muted)] text-center max-w-lg mx-auto mb-10">
          Featured projects spanning adversarial AI testing, medical deep learning, cloud security hardening, and full-stack engineering.
        </p>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-crimson text-parchment shadow-[0_0_20px_rgba(139,30,63,0.35)]"
                  : "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-sakura/40 hover:text-[var(--text-primary)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="glass-card p-6 md:p-8 flex flex-col hover:border-sakura/40 hover:shadow-[0_4px_30px_rgba(247,168,184,0.1)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[0.65rem] font-medium uppercase tracking-wider text-sakura block mb-1">
                    {project.category === "ai-ml"
                      ? "Artificial Intelligence & ML"
                      : project.category === "cloud"
                      ? "Cloud Architecture"
                      : project.category === "fullstack"
                      ? "Full-Stack Development"
                      : "Cybersecurity"}
                  </span>
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl font-semibold text-[var(--text-primary)] hover:text-sakura transition-colors inline-flex items-center gap-2 group/title"
                    >
                      <span>{project.title}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-40 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all text-sakura flex-shrink-0"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                  )}
                </div>
                <span className={`status-badge status-${project.status} flex-shrink-0`}>
                  <span className="text-[0.65rem]">{statusIcons[project.status]}</span>
                  {statusLabels[project.status]}
                </span>
              </div>

              {/* GitHub / Demo Buttons */}
              {(project.link || project.github) && (
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium 
                        bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                        text-[var(--text-primary)] hover:border-sakura/50 hover:bg-sakura/10 
                        hover:text-sakura transition-all duration-300 shadow-sm cursor-pointer z-10"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                      </svg>
                      <span>View GitHub Repo</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium 
                        bg-crimson/10 border border-crimson/30 text-crimson 
                        hover:bg-crimson hover:text-parchment transition-all duration-300 shadow-sm"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              )}

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="hairline max-w-4xl mx-auto mt-20" />
    </section>
  );
}
