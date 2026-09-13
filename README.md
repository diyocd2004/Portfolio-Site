# Diyo C D — AI & Cybersecurity Portfolio

A modern, high-performance personal portfolio website showcasing work at the intersection of **Artificial Intelligence Security**, **Vulnerability Assessment & Penetration Testing (VAPT)**, and **Cloud Infrastructure Hardening**.

Designed with a bespoke **Japanese Sakura aesthetic** — blending deep obsidian tones with crimson, sakura pink, and gold accents, dynamic interactive canvas cherry blossoms, an interactive 3D avatar, and enterprise-grade contact form delivery.

---

## 🌟 Overview & Identity

- **Owner:** Diyo C D
- **Role:** Aspiring Cybersecurity Engineer & AI Practitioner
- **Education:** MSc in Artificial Intelligence & Cybersecurity, CHRIST (Deemed to be University), Bengaluru (2025–2027) · BCA, St. Joseph's University (2022–2025)
- **Certifications:** Certified Penetration Tester · Red Hat System Administration I & II · AWS Academy Cloud Foundations · *CompTIA Security+ (Upcoming / Target 2026)*
- **Live Deployment:** [https://diyocd.vercel.app](https://diyocd.vercel.app)
- **GitHub Repository:** [https://github.com/diyocd2004/Portfolio-Site](https://github.com/diyocd2004/Portfolio-Site)

---

## ⚡ Tech Stack & Architecture

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom variables
- **Motion & Interactions:** [Framer Motion](https://www.framer.com/motion/) (Scroll triggers, spring physics, layout animations)
- **3D & Canvas Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), HTML5 Canvas
- **Deployment Platform:** [Vercel](https://vercel.com/)

---

## 🎨 Key Features & Design Highlights

### 1. Sakura Visual Identity
- **Curated Palette:** Obsidian background with Crimson (`#8b1e3f`), Sakura Pink (`#f7a8b8`), and Antique Gold (`#c5a059`).
- **Typography:** Classical serif typography (**Playfair Display**) paired with crisp modern sans-serif (**Manrope**).
- **Hanko Seal:** Red digital seal signature logo (`DC`) with traditional Japanese Kanji accents.
- **Canvas Cherry Blossoms:** Lightweight, smooth canvas-rendered petal animations floating organically across the screen.

### 2. Interactive 3D Avatar
- Custom profile component with mouse-tracking 3D tilt, burst petal physics on hover, decorative rotating rings, and orbiting symbols (`🌸`, `⛩️`, `🗡️`, `🔐`, `桜`).
- Proportions scaled for visual balance across both desktop and mobile viewports.

### 3. Interactive Project Catalog
- Real-time **category filtering** (*All Projects*, *AI & ML*, *Cyber Security*, *Cloud & Web*).
- Direct, clickable GitHub repository links on both project titles and dedicated repository buttons:
  - **[PromptWars](https://github.com/diyocd2004/PromptWars):** Adversarial AI security testing system for prompt injection vectors and LLM guardrails.
  - **[RespiraCheck](https://github.com/diyocd2004/RespiraCheck-Intership-Project):** CNN-based deep learning respiratory sound classifier deployed on Azure.
  - **[AWS Secure Static Hosting](https://github.com/diyocd2004/AWS-Cloud-Project):** Production AWS infrastructure with hardened S3 bucket policies and IAM least-privilege enforcement.
  - **[Yaalnits Mart](https://github.com/diyocd2004/Yaalnits_Mart):** Full-stack MERN e-commerce web application with secure auth and cart checkout (Grade O — 47/50).

### 4. Experience & Honors Showcase
- **4 Industry Internships:** Detailed timeline covering Next Afield (VAPT / SOC), Tinos Software (Web App Security), UptoSkills (Penetration Testing), and Microsoft AICTE Elevate (Cloud / Azure IAM).
- **Awards & Competitions:**
  - **1st Prize (Overall Winner)** — AIKYAM Startup Pitch (Acharya Institute of Engineering)
  - **2nd Prize (Runner-Up)** — AIKYAM Stress Interview (Acharya Institute of Engineering)
  - **1st Place** — Promptathon (Syntaxia 2026 · St. Joseph's University)
  - **1st Place** — Reel Making (Syntaxia 2026 · St. Joseph's University)
  - **1st Place** — Photography (Syntaxia 2026 · St. Joseph's University)
  - **3rd Place** — Algo Royale (Magnovite 2026 · Christ Kengeri Campus)

### 5. Production Contact Endpoint (`/api/contact`)
- Hardened server-side endpoint relaying messages directly to `diyocd2004@gmail.com` via FormSubmit.co.
- **Dynamic Origin Resolution:** Automatically detects request origin/referer so submissions succeed both on `localhost:3000` and in production on `diyocd.vercel.app`.
- **Bot & Spam Protection:** Hidden honeypot field (`_honeypot`) traps and drops automated spam bots.
- **In-Memory Rate Limiting:** Enforces a 5 request/minute threshold per IP address to safeguard against abuse.
- **Sanitization & Validation:** Validates required fields, email syntax, and length limits.

---

## 📁 Project Structure

```text
sakura-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Secure contact endpoint with rate-limiting & honeypot
│   ├── globals.css              # Sakura design tokens, glassmorphism, keyframes
│   ├── layout.tsx               # Root layout with fonts, metadata, and theme provider
│   └── page.tsx                 # Main single-page portfolio view
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx      # Hero banner, domain tags, CTA buttons, and avatar
│   │   ├── AboutSection.tsx     # Bio overview, philosophy, and interactive stats
│   │   ├── ExperienceSection.tsx# Interactive internship timeline & certificates
│   │   ├── ProjectsSection.tsx  # Project cards with category filters & GitHub links
│   │   ├── EducationSection.tsx # Academic degrees and coursework details
│   │   ├── CertificationsSection.tsx # Verified credentials & competition prizes
│   │   └── ContactSection.tsx   # Direct contact form & social profile links
│   ├── CherryBlossomPetals.tsx  # Canvas falling petals animation
│   ├── ContextMenu.tsx          # Custom right-click menu with Japanese katana styling
│   ├── Footer.tsx               # Minimalist footer with quick navigation
│   ├── Navbar.tsx               # Hanko seal logo, navigation links, and theme toggle
│   ├── ProfileImageInteractive.tsx # 3D tilt avatar with orbiting elements
│   ├── SectionDots.tsx          # Side navigation dots with active section tracking
│   └── ThemeProvider.tsx        # Dark / Light theme context with persistence
├── content/
│   └── profile.ts               # Centralized single source of truth for resume data
├── public/
│   └── images/                  # Avatars, certificates, and media assets
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and npm scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/diyocd2004/Portfolio-Site.git
   cd Portfolio-Site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Verification Commands

- **Type Check:**
  ```bash
  npx tsc --noEmit
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Start Production Server:**
  ```bash
  npm run start
  ```

---

## 📬 Contact & Connect

- **Email:** [diyocd2004@gmail.com](mailto:diyocd2004@gmail.com)
- **LinkedIn:** [linkedin.com/in/diyocd](https://linkedin.com/in/diyocd)
- **GitHub:** [github.com/diyocd2004](https://github.com/diyocd2004)

---

*Crafted with precision, intelligent defense principles, and Japanese aesthetic elegance.*
