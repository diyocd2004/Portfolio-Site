// ─────────────────────────────────────────────────────────────
// content/profile.ts — Single source of truth for all portfolio data
// ─────────────────────────────────────────────────────────────

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  tools?: string[];
  certificateImage?: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  status: "completed" | "active" | "upcoming";
  category?: "ai-ml" | "cyber" | "cloud" | "fullstack";
  link?: string;
  github?: string;
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
  status?: "completed" | "upcoming";
  badge?: string;
  event?: string;
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
    githubDisplay: string;
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
      "Aspiring Cybersecurity Engineer & AI Practitioner — exploring the integration of AI into cybersecurity to build resilient, intelligent defense systems at the intersection of offensive security and adaptive threat detection.",
    ctaPrimary: "View My Work",
    ctaSecondary: "Download Resume",
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "I'm a postgraduate student pursuing my MSc in Artificial Intelligence & Cybersecurity at CHRIST (Deemed to be University), Bengaluru — batch 2025–27. My work lives at the intersection of AI-driven defense systems and hands-on offensive security.",
      "With experience spanning web application penetration testing, cloud security architecture, and machine learning for threat detection, I bring a dual perspective: I understand how systems break, and how to build intelligent defenses that adapt before they do. I'm actively exploring how AI can be integrated into cybersecurity — from context-aware anomaly detection to automated threat hunting — to create smarter, faster, and more proactive security systems.",
      "When I'm not auditing applications or training deep learning models, you'll find me competing in hackathons and startup pitch competitions (winning 1st place at AIKYAM), experimenting with offensive security tools, and collaborating on intelligent defense systems.",
    ],
  },

  experience: [
    {
      role: "Cybersecurity & Ethical Hacking Intern",
      company: "Next Afield – Solutions and Networks",
      location: "Remote (Virtual Internship)",
      period: "Apr – Jul 2026",
      description:
        "Comprehensive virtual internship covering multiple domains of information security with hands-on practical labs and cybersecurity projects.",
      highlights: [
        "Performed web application security assessments & OWASP Top 10 vulnerability testing using Burp Suite and OWASP ZAP",
        "Conducted vulnerability assessments and penetration testing in lab environments using Nmap, Wireshark, and Kali Linux",
        "Gained hands-on exposure to SOC operations, threat detection, incident response, and security monitoring fundamentals",
        "Produced comprehensive security assessment reports with actionable vulnerability remediation guidance",
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Wireshark", "Nmap", "Kali Linux"],
      certificateImage: "/images/NextAfield Certificate.png",
    },
    {
      role: "Cyber Security Analyst Intern",
      company: "Tinos Software & Security Solutions LLP",
      location: "Kochi",
      period: "Apr – Jun 2026",
      description:
        "Conducted web application security assessments and vulnerability research for production environments.",
      highlights: [
        "Performed comprehensive web application security testing using industry-standard tools",
        "Identified and reported security vulnerabilities across client web applications",
        "Produced detailed vulnerability assessment reports with remediation guidance",
      ],
      tools: ["Burp Suite", "OWASP ZAP", "Nikto"],
      certificateImage: "/images/tinos.jpg",
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
      certificateImage: "/images/Uptoskills.jpg",
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
      certificateImage: "/images/Microsoft Elevate.png",
    },
  ],

  projects: [
    {
      title: "PromptWars",
      description:
        "Interactive AI Security challenge platform and research system for testing LLM vulnerabilities, indirect prompt injection vectors, jailbreaking resistance, and model guardrail enforcement.",
      techStack: ["Python", "NLP", "Adversarial AI", "LLM Security", "FastAPI"],
      status: "completed",
      category: "ai-ml",
      github: "https://github.com/diyocd2004/PromptWars",
    },
    {
      title: "RespiraCheck",
      description:
        "End-to-end CNN-based medical audio classifier for respiratory disease detection. Built with TensorFlow/Keras and Librosa for audio feature extraction, deployed on Azure App Services for real-time inference.",
      techStack: ["TensorFlow", "Keras", "Librosa", "Python", "Azure App Services"],
      status: "completed",
      category: "ai-ml",
      github: "https://github.com/diyocd2004/RespiraCheck-Intership-Project",
    },
    {
      title: "AWS Secure Static Hosting",
      description:
        "Production-grade secure static website hosting on AWS with S3 bucket-policy hardening and IAM control enforcement. Demonstrates cloud security best practices for static deployments.",
      techStack: ["AWS S3", "IAM", "Bucket Policies", "CloudFront"],
      status: "completed",
      category: "cloud",
      github: "https://github.com/diyocd2004/AWS-Cloud-Project",
    },
    {
      title: "Yaalnits Mart",
      description:
        "Full-stack MERN e-commerce application developed as the BCA 3rd Year Final Project (Grade O — 47/50). Features secure authentication, input validation, product catalog management, cart system, and order processing with a responsive storefront UI.",
      techStack: ["MongoDB", "Express.js", "React", "Node.js"],
      status: "completed",
      category: "fullstack",
      github: "https://github.com/diyocd2004/Yaalnits_Mart",
    },
  ],

  education: [
    {
      degree: "MSc Artificial Intelligence & Cybersecurity",
      institution: "CHRIST (Deemed to be University)",
      location: "Bengaluru",
      period: "2025 – 2027",
      highlights: [
        "Currently pursuing (Batch 2025–27)",
        "Specialization: AI Security, Penetration Testing & Threat Detection",
      ],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Joseph's University",
      location: "Bengaluru",
      period: "2022 – 2025",
      highlights: [
        "First Class — 74.40% aggregate",
        "7.89 SGPA peak (Semester VI)",
        "AI: 87/100 · Cyber Security Lab: A++",
        "Major Project: 47/50 (Grade O)",
      ],
    },
    {
      degree: "12th Standard",
      institution: "St. Joseph's PU College",
      location: "Bengaluru",
      period: "2020 – 2022",
      highlights: ["494/600 — 82.33% — First Class"],
    },
    {
      degree: "10th Standard",
      institution: "St. Joseph's Indian High School",
      location: "Bengaluru",
      period: "2020",
      highlights: ["540/625 — 86.40% — Grade A+"],
    },
  ],

  certifications: [
    {
      title: "Red Hat System Administration I",
      issuer: "Red Hat",
      type: "certification",
      status: "completed",
      badge: "Verified",
    },
    {
      title: "Red Hat System Administration II",
      issuer: "Red Hat",
      type: "certification",
      status: "completed",
      badge: "Verified",
    },
    {
      title: "AWS Academy Graduate — Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      type: "certification",
      status: "completed",
      badge: "Verified",
    },
    {
      title: "Certified Penetration Tester",
      issuer: "Cybersecurity Certification",
      type: "certification",
      status: "completed",
      badge: "Certified",
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      type: "certification",
      status: "upcoming",
      badge: "Upcoming / In-Progress",
    },
    {
      title: "1st Prize (Overall Winner) — AIKYAM Startup Pitch",
      issuer: "Acharya Institute of Engineering",
      type: "achievement",
      badge: "1st Prize",
      event: "AIKYAM 2026",
    },
    {
      title: "2nd Prize (Runner-Up) — AIKYAM Stress Interview",
      issuer: "Acharya Institute of Engineering",
      type: "achievement",
      badge: "2nd Prize",
      event: "AIKYAM 2026",
    },
    {
      title: "1st Place — Promptathon",
      issuer: "St. Joseph's University",
      type: "achievement",
      badge: "1st Place",
      event: "Syntaxia 2026",
    },
    {
      title: "1st Place — Reel Making",
      issuer: "St. Joseph's University",
      type: "achievement",
      badge: "1st Place",
      event: "Syntaxia 2026",
    },
    {
      title: "1st Place — Photography",
      issuer: "St. Joseph's University",
      type: "achievement",
      badge: "1st Place",
      event: "Syntaxia 2026",
    },
    {
      title: "3rd Place — Algo Royale",
      issuer: "Christ Kengeri Campus",
      type: "achievement",
      badge: "3rd Place",
      event: "Magnovite 2026",
    },
  ],

  contact: {
    email: "diyocd2004@gmail.com",
    phone: "+91 63619 43528",
    linkedin: "https://linkedin.com/in/diyocd",
    linkedinDisplay: "linkedin.com/in/diyocd",
    github: "https://github.com/diyocd2004",
    githubDisplay: "github.com/diyocd2004",
  },

  socialLinks: [
    {
      label: "GitHub",
      url: "https://github.com/diyocd2004",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/diyocd",
      icon: "linkedin",
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
      "Portfolio of Diyo C D — MSc AI & Cybersecurity student, certified penetration tester, and aspiring cybersecurity engineer building resilient systems at the intersection of intelligent defense and offensive security.",
  },
};

export default profile;
