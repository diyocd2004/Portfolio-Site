// ─────────────────────────────────────────────────────────────
// content/profile.ts — Single source of truth for all resume data
// ─────────────────────────────────────────────────────────────

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  tools?: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  status: "completed" | "active" | "upcoming";
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  type: "certification" | "achievement";
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string; // icon identifier
}

export interface ProfileData {
  hero: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    linkedinDisplay: string;
    github: string;
  };
  socialLinks: SocialLink[];
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

const profile: ProfileData = {
  hero: {
    name: "Diyo C D",
    firstName: "Diyo",
    lastName: "C D",
    title: "MSc Artificial Intelligence & Cybersecurity",
    tagline:
      "Security analyst and AI practitioner building resilient systems at the intersection of intelligent defense and offensive security.",
    ctaPrimary: "View My Work",
    ctaSecondary: "Download Résumé",
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "I'm a postgraduate student pursuing my MSc in Artificial Intelligence & Cybersecurity at CHRIST (Deemed to be University), Bengaluru — batch 2025–27. My work lives at the intersection of AI-driven defense systems and hands-on offensive security.",
      "With experience spanning web application penetration testing, cloud security architecture, and machine learning for threat detection, I bring a dual perspective: I understand how systems break, and how to build intelligent defenses that adapt before they do.",
      "When I'm not hunting vulnerabilities or training models, you'll find me competing in hackathons, contributing to research on context-aware anomaly detection, or working on my upcoming book chapter on AI-driven defensive systems.",
    ],
  },

  experience: [
    {
      role: "Cyber Security Analyst Intern",
      company: "Tinos Software & Security Solutions LLP",
      location: "Kochi",
      period: "Apr – Jun 2026",
      description:
        "Conducted web application security assessments and vulnerability research for production environments.",
      highlights: [
        "Performed comprehensive web application security testing using industry-standard tools",
        "Identified and reported 10+ vulnerabilities across client applications",
        "Produced detailed vulnerability assessment reports with remediation guidance",
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Nikto"],
    },
    {
      role: "Cybersecurity Intern",
      company: "UptoSkills",
      location: "Remote",
      period: "Mar – Jun 2026",
      description:
        "Hands-on offensive security training and real-world penetration testing exercises.",
      highlights: [
        "Executed penetration testing workflows using Metasploit framework",
        "Performed SQL injection testing and web directory enumeration",
        "Operated exclusively on Kali Linux for all assessment activities",
      ],
      tools: ["Metasploit", "SQLmap", "Gobuster", "Kali Linux"],
    },
    {
      role: "Cloud & Azure Intern",
      company: "Microsoft AICTE Elevate Program",
      location: "Remote",
      period: "Jan – Feb 2026",
      description:
        "Cloud security and infrastructure management on Microsoft Azure.",
      highlights: [
        "Configured Azure Identity and Access Management (IAM) policies",
        "Deployed and managed Azure Virtual Networks with Network Security Groups (NSGs)",
        "Implemented cloud security best practices for enterprise environments",
      ],
      tools: ["Azure IAM", "Virtual Networks", "NSGs"],
    },
  ],

  projects: [
    {
      title: "RespiraCheck",
      description:
        "End-to-end CNN-based medical audio classifier for respiratory disease detection. Built with TensorFlow/Keras and Librosa for audio feature extraction, deployed on Azure App Services for real-time inference.",
      techStack: ["TensorFlow", "Keras", "Librosa", "Python", "Azure App Services"],
      status: "completed",
      link: "#",
      github: "https://github.com/diyocd2004",
    },
    {
      title: "Yaalnits Mart",
      description:
        "Full-stack MERN e-commerce application with comprehensive security hardening against OWASP Top 10 vulnerabilities. Implements secure authentication, input validation, and protection against common web attacks.",
      techStack: ["MongoDB", "Express.js", "React", "Node.js", "OWASP Top 10"],
      status: "completed",
      link: "#",
      github: "https://github.com/diyocd2004",
    },
    {
      title: "AWS Secure Static Hosting",
      description:
        "Production-grade secure static website hosting on AWS with S3 bucket-policy hardening and IAM control enforcement. Demonstrates cloud security best practices for static deployments.",
      techStack: ["AWS S3", "IAM", "Bucket Policies", "CloudFront"],
      status: "completed",
      link: "#",
      github: "https://github.com/diyocd2004",
    },
    {
      title: "Context-Aware Anomaly Detection & SIEM Efficiency",
      description:
        "Active research track investigating adaptive threat-hunting methodologies using context-aware anomaly detection to improve SIEM system efficiency and reduce false positive rates.",
      techStack: ["Python", "Machine Learning", "SIEM", "Threat Intelligence"],
      status: "active",
      link: "#",
    },
    {
      title: "AI-Driven Defensive Systems — Book Chapter",
      description:
        "Upcoming book chapter (lead author) exploring the application of artificial intelligence in building proactive, adaptive defensive security systems within strategic frameworks.",
      techStack: ["Research", "AI/ML", "Cybersecurity", "Academic Publishing"],
      status: "upcoming",
      link: "#",
    },
  ],

  education: [
    {
      degree: "MSc Artificial Intelligence & Cybersecurity",
      institution: "CHRIST (Deemed to be University)",
      location: "Bengaluru",
      period: "2025 – 2027",
      highlights: ["Currently pursuing (Batch 2025–27)"],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Joseph's University",
      location: "Bengaluru",
      period: "2022 – 2025",
      highlights: [
        "First Class Distinction — 75.67% aggregate",
        "7.89 SGPA peak (Semester VI)",
        "AI: 87/100",
        "Cyber Security Lab: A++",
        "Major Project: 47/50 (Grade O)",
      ],
    },
    {
      degree: "12th Standard",
      institution: "St. Joseph's PU College",
      location: "Bengaluru",
      period: "2020 – 2022",
      highlights: ["494/600 — First Class"],
    },
    {
      degree: "10th Standard",
      institution: "St. Joseph's Indian High School",
      location: "Bengaluru",
      period: "2020",
      highlights: ["540/625 — Grade A+"],
    },
  ],

  certifications: [
    {
      title: "Red Hat System Administration I",
      issuer: "Red Hat",
      type: "certification",
    },
    {
      title: "Red Hat System Administration II",
      issuer: "Red Hat",
      type: "certification",
    },
    {
      title: "CompTIA Security+",
      issuer: "Skillsoft",
      type: "certification",
    },
    {
      title: "1st Place — Promptathon, Syntaxia 2026",
      issuer: "St. Joseph's University",
      type: "achievement",
    },
    {
      title: "1st Place — Reel Making, Syntaxia 2026",
      issuer: "St. Joseph's University",
      type: "achievement",
    },
    {
      title: "1st Place — Photography, Syntaxia 2026",
      issuer: "St. Joseph's University",
      type: "achievement",
    },
    {
      title: "3rd Place — Algo Royale, Magnovite 2026",
      issuer: "Christ Kengeri Campus",
      type: "achievement",
    },
  ],

  contact: {
    email: "diyocd2004@gmail.com",
    phone: "+91 63619 43528",
    linkedin: "https://linkedin.com/in/diyocd",
    linkedinDisplay: "linkedin.com/in/diyocd",
    github: "https://github.com/diyocd",
  },

  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/diyocd",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      url: "https://github.com/diyocd",
      icon: "github",
    },
    {
      label: "Email",
      url: "mailto:diyocd2004@gmail.com",
      icon: "mail",
    },
  ],

  meta: {
    title: "Diyo C D — AI & Cybersecurity Portfolio",
    description:
      "Portfolio of Diyo C D — MSc AI & Cybersecurity student, certified penetration tester, and security analyst building resilient systems at the intersection of intelligent defense and offensive security.",
  },
};

export default profile;
