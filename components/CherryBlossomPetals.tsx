"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────
   Cherry Blossom Petals — ported from CodePen (nicecue/gOpppqE)
   Pure DOM-based petal falling effect, runs site-wide.
   ──────────────────────────────────────────────────────────── */

interface PetalData {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  xSpeedVariation: number;
  ySpeed: number;
  rotation: {
    axis: "X" | "Y" | "Z";
    value: number;
    speed: number;
    x: number;
  };
}

const PETAL_CLASSES = [
  "petal-style1",
  "petal-style2",
  "petal-style3",
  "petal-style4",
];

export default function CherryBlossomPetals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const NUM_PETALS = 30;
    const GRAVITY = 0.8;
    const WIND_MAX_SPEED = 4;

    let windMagnitude = 0.2;
    let windDuration = 0;
    let timer = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const placeholder = document.createElement("div");
    placeholder.style.transformStyle = "preserve-3d";
    placeholder.style.width = width + "px";
    placeholder.style.height = height + "px";
    container.appendChild(placeholder);

    const petals: PetalData[] = [];

    function resetPetal(p: PetalData, initial: boolean = false) {
      p.x = initial ? Math.random() * width : width + Math.random() * width * 0.5;
      p.y = initial ? Math.random() * height : -50 - Math.random() * 50;
      p.z = Math.random() * 200;

      if (!initial && p.x > width) {
        p.x = width + 50;
        p.y = (Math.random() * height) / 2;
      }

      p.rotation.speed = Math.random() * 10;
      const randomAxis = Math.random();
      if (randomAxis > 0.5) {
        p.rotation.axis = "X";
      } else if (randomAxis > 0.25) {
        p.rotation.axis = "Y";
        p.rotation.x = Math.random() * 180 + 90;
      } else {
        p.rotation.axis = "Z";
        p.rotation.x = Math.random() * 360 - 180;
        p.rotation.speed = Math.random() * 3;
      }

      p.xSpeedVariation = Math.random() * 0.8 - 0.4;
      p.ySpeed = Math.random() + GRAVITY;
    }

    function calculateWindSpeed(t: number, y: number) {
      const a = (windMagnitude / 2) * ((height - (2 * y) / 3) / height);
      return (
        a * Math.sin((2 * Math.PI) / windDuration * t + (3 * Math.PI) / 2) + a
      );
    }

    function updatePetal(p: PetalData) {
      const petalWindSpeed = calculateWindSpeed(timer, p.y);
      const xSpeed = petalWindSpeed + p.xSpeedVariation;

      p.x -= xSpeed;
      p.y += p.ySpeed;
      p.rotation.value += p.rotation.speed;

      let t = `translateX(${p.x}px) translateY(${p.y}px) translateZ(${p.z}px) rotate${p.rotation.axis}(${p.rotation.value}deg)`;
      if (p.rotation.axis !== "X") {
        t += ` rotateX(${p.rotation.x}deg)`;
      }
      p.el.style.transform = t;

      if (p.x < -50 || p.y > height + 50) {
        resetPetal(p, false);
      }
    }

    function updateWind() {
      windMagnitude = Math.random() * WIND_MAX_SPEED;
      windDuration = windMagnitude * 50 + (Math.random() * 20 - 10);
    }

    // Create petals
    for (let i = 0; i < NUM_PETALS; i++) {
      const cls = PETAL_CLASSES[Math.floor(Math.random() * PETAL_CLASSES.length)];
      const el = document.createElement("div");
      el.className = `petal ${cls}`;
      el.style.position = "absolute";
      el.style.backfaceVisibility = "visible";

      const petal: PetalData = {
        el,
        x: 0,
        y: 0,
        z: 0,
        xSpeedVariation: 0,
        ySpeed: 0,
        rotation: { axis: "X", value: 0, speed: 0, x: 0 },
      };

      placeholder.appendChild(el);
      resetPetal(petal, true);
      petals.push(petal);
    }

    function frame() {
      if (timer === windDuration) {
        updateWind();
        timer = 0;
      }

      for (let i = 0; i < petals.length; i++) {
        updatePetal(petals[i]);
      }

      timer++;
      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);

    // Handle resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      placeholder.style.width = width + "px";
      placeholder.style.height = height + "px";
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="blossom_container"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
