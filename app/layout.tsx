import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Diyo C D — AI & Cybersecurity Portfolio",
  description:
    "Portfolio of Diyo C D — MSc AI & Cybersecurity student, certified penetration tester, and security analyst building resilient systems at the intersection of intelligent defense and offensive security.",
  keywords: [
    "Diyo C D",
    "cybersecurity",
    "AI",
    "penetration testing",
    "portfolio",
    "security analyst",
    "CHRIST University",
  ],
  authors: [{ name: "Diyo C D" }],
  openGraph: {
    title: "Diyo C D — AI & Cybersecurity Portfolio",
    description:
      "Security analyst and AI practitioner building resilient systems at the intersection of intelligent defense and offensive security.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen washi-grain">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
