"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profile from "@/content/profile";

interface Position {
  x: number;
  y: number;
}

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();

    // Calculate position, keeping menu in viewport
    const x = Math.min(e.clientX, window.innerWidth - 220);
    const y = Math.min(e.clientY, window.innerHeight - 200);

    setPosition({ x, y });
    setVisible(true);
  }, []);

  const handleClick = useCallback(() => {
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleContextMenu, handleClick, handleKeyDown]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setVisible(false);
    }, 1200);
  };

  const actions = [
    {
      label: copiedEmail ? "Copied!" : "Copy Email",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      ),
      onClick: copyEmail,
    },
    {
      label: "Download Résumé",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      onClick: () => {
        const a = document.createElement("a");
        a.href = "/resume/DIYO_CD_Resume.pdf";
        a.download = "Diyo_CD_Resume.pdf";
        a.click();
        setVisible(false);
      },
    },
    {
      label: "View Source",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      onClick: () => {
        window.open(profile.contact.github, "_blank");
        setVisible(false);
      },
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -3 }}
          transition={{ duration: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed z-[100] glass rounded-xl overflow-hidden shadow-xl min-w-[200px]"
          style={{ left: position.x, top: position.y }}
          role="menu"
          aria-label="Context menu"
        >
          <div className="py-1.5">
            {/* Header */}
            <div className="px-4 py-2 text-[0.65rem] font-medium tracking-[0.15em]
              uppercase text-[var(--text-muted)] select-none">
              ⚔ Sakura & Steel
            </div>
            <div className="hairline mx-3 mb-1" />

            {actions.map((action, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5
                  text-sm text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)] hover:bg-sakura/8
                  transition-colors duration-150"
                role="menuitem"
              >
                <span className="text-[var(--text-muted)]">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
