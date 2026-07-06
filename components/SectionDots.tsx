"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
      role="navigation"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${label}`}
          aria-current={activeSection === id ? "true" : undefined}
        >
          {/* Label tooltip */}
          <span
            className="absolute right-8 px-2 py-1 rounded text-xs font-medium
              bg-[var(--glass-bg)] text-[var(--text-secondary)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              whitespace-nowrap pointer-events-none"
          >
            {label}
          </span>

          {/* Hanko dot */}
          <span
            className={`
              w-3 h-3 rounded-full border-[1.5px] transition-all duration-400
              ${activeSection === id
                ? "bg-crimson border-crimson scale-110"
                : "border-[var(--text-muted)] hover:border-sakura hover:scale-110"
              }
            `}
          />
        </button>
      ))}
    </div>
  );
}
