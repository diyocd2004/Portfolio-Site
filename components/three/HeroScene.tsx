"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import SakuraPetals from "./SakuraPetals";
import KatanaGuardian from "./KatanaGuardian";

interface HeroSceneProps {
  scrollProgress: number; // 0-1, how far past the hero the user has scrolled
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render canvas if scrolled past hero or reduced motion
  if (scrollProgress > 1.2 || reducedMotion) return null;

  const petalCount = isMobile ? 40 : 80;
  const opacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-3, 2, 4]} intensity={0.3} color="#FFB7C5" />

          <SakuraPetals count={petalCount} />
          {!isMobile && <KatanaGuardian />}

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
