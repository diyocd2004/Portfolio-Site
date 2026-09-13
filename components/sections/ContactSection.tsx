"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import profile from "@/content/profile";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honeypot: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Email, and Message).");
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
      return;
    }

    setFormStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", _honeypot: "" });
        setTimeout(() => setFormStatus("idle"), 8000);
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try emailing directly.");
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 6000);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please check your connection or email directly.");
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-serif section-heading mb-6 inline-block"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-[var(--text-secondary)] text-lg mb-12 max-w-lg mx-auto"
          >
            Interested in collaborating, discussing security assessments, or exploring opportunities?
            Feel free to send a message.
          </motion.p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {/* Email */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={copyEmail}
            className="glass-card p-6 text-center group cursor-pointer hover:border-sakura/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sakura/10
              flex items-center justify-center group-hover:bg-sakura/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="var(--sakura)" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
              </svg>
            </div>
            <div className="text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">
              Email
            </div>
            <div className="text-sm text-[var(--text-primary)] font-medium">
              {copied ? "Copied!" : profile.contact.email}
            </div>
          </motion.button>

          {/* GitHub */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 text-center group hover:border-crimson/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-crimson/10
              flex items-center justify-center group-hover:bg-crimson/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </div>
            <div className="text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">
              GitHub
            </div>
            <div className="text-sm text-[var(--text-primary)] font-medium">
              {profile.contact.githubDisplay}
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 text-center group hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10
              flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div className="text-xs text-[var(--text-muted)] mb-1 uppercase tracking-wider">
              LinkedIn
            </div>
            <div className="text-sm text-[var(--text-primary)] font-medium">
              {profile.contact.linkedinDisplay}
            </div>
          </motion.a>
        </div>

        {/* ─── Message Me Form ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl mb-2 text-center">
              Message Me
            </h3>
            <p className="text-sm text-[var(--text-muted)] text-center mb-8">
              Send me a message directly — I&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field (hidden from users, traps bots) */}
              <input
                type="text"
                name="_honeypot"
                value={formData._honeypot}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]
                      text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                      focus:outline-none focus:border-sakura/50 focus:ring-1 focus:ring-sakura/30
                      transition-all duration-300 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]
                      text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                      focus:outline-none focus:border-sakura/50 focus:ring-1 focus:ring-sakura/30
                      transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]
                    text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-sakura/50 focus:ring-1 focus:ring-sakura/30
                    transition-all duration-300 text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]
                    text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-sakura/50 focus:ring-1 focus:ring-sakura/30
                    transition-all duration-300 text-sm resize-none"
                />
              </div>

              {formStatus === "success" && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center font-medium">
                  ✓ Thank you! Your message has been sent directly to Diyo (diyocd2004@gmail.com).
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-4 rounded-lg bg-crimson/10 border border-crimson/30 text-sakura text-sm text-center font-medium">
                  ✕ {errorMessage || "Failed to send message. Please check required fields or email directly."}
                </div>
              )}

              {/* Submit */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="inline-flex items-center gap-2 px-10 py-3.5
                    bg-crimson text-parchment font-medium rounded-lg
                    hover:bg-crimson/90 transition-all duration-300
                    hover:shadow-[0_0_30px_rgba(139,30,63,0.3)]
                    active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formStatus === "sending" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
