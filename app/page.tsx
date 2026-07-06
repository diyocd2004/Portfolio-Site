"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SectionDots from "@/components/SectionDots";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ContextMenu from "@/components/ContextMenu";
import CherryBlossomPetals from "@/components/CherryBlossomPetals";

export default function Home() {
  return (
    <>
      <CherryBlossomPetals />
      <ContextMenu />
      <Navbar />
      <SectionDots />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
