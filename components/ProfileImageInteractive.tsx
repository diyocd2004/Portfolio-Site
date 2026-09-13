"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────
   Interactive Profile Avatar — with orbiting elements,
   cherry blossom scatter on hover, and 3D tilt effect
   ──────────────────────────────────────────────────────────── */

interface ScatterPetal {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  style: number; // 1-4 petal style
}

// Floating symbols that orbit around the avatar
const ORBIT_ITEMS = [
  { symbol: "🌸", size: 20, orbit: 145, speed: 20, offset: 0 },
  { symbol: "⛩️", size: 18, orbit: 160, speed: 25, offset: 72 },
  { symbol: "🗡️", size: 16, orbit: 136, speed: 30, offset: 144 },
  { symbol: "🔐", size: 15, orbit: 168, speed: 22, offset: 216 },
  { symbol: "桜", size: 16, orbit: 152, speed: 28, offset: 288 },
];



export default function ProfileImageInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scatterPetals, setScatterPetals] = useState<ScatterPetal[]>([]);
  const [particles, setParticles] = useState<any[]>([]);
  const petalIdRef = useRef(0);

  useEffect(() => {
    // Generate particles client-side to prevent hydration mismatch
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.cos((i * Math.PI * 2) / 12) * (130 + Math.random() * 50),
        y: Math.sin((i * Math.PI * 2) / 12) * (130 + Math.random() * 50),
        size: 3 + Math.random() * 4,
        delay: i * 0.15,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, []);

  // 3D tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Generate scatter petals on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    const newPetals: ScatterPetal[] = [];
    const count = 16 + Math.floor(Math.random() * 8);

    for (let i = 0; i < count; i++) {
      newPetals.push({
        id: petalIdRef.current++,
        angle: (i / count) * 360 + Math.random() * 20 - 10,
        distance: 120 + Math.random() * 160,
        size: 12 + Math.random() * 18,
        duration: 0.8 + Math.random() * 0.6,
        delay: Math.random() * 0.2,
        rotation: Math.random() * 720 - 360,
        style: Math.floor(Math.random() * 4) + 1,
      });
    }

    setScatterPetals(newPetals);

    // Clear after animation
    setTimeout(() => {
      setScatterPetals([]);
    }, 1800);
  }, []);

  return (
    <div className="relative flex-shrink-0">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-56 h-56 md:w-72 md:h-72"
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          animate={{
            boxShadow: isHovered
              ? [
                  "0 0 40px rgba(255,183,197,0.3), 0 0 80px rgba(139,30,63,0.15)",
                  "0 0 60px rgba(255,183,197,0.4), 0 0 100px rgba(139,30,63,0.2)",
                  "0 0 40px rgba(255,183,197,0.3), 0 0 80px rgba(139,30,63,0.15)",
                ]
              : "0 0 20px rgba(255,183,197,0.1)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative rotating rings */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-sakura/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            borderStyle: "dashed",
            borderWidth: "1px",
          }}
        />
        <motion.div
          className="absolute -inset-7 rounded-full border border-gold/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Main avatar frame */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--sakura) 0%, var(--crimson) 50%, var(--gold) 100%)",
            padding: "3px",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[var(--bg-primary)]">
            <Image
              src="/images/avatar.png"
              alt="Diyo C D — Avatar"
              fill
              className="object-cover scale-105"
              priority
              sizes="(max-width: 768px) 256px, 320px"
            />
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isHovered
                  ? "radial-gradient(circle, rgba(255,183,197,0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle, transparent 0%, transparent 70%)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Corner accent marks — Japanese brush strokes */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className="absolute w-6 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, var(--sakura), transparent)",
              top: "50%",
              left: "50%",
              transformOrigin: "left center",
              transform: `rotate(${angle}deg) translateX(${126}px)`,
            }}
            animate={{
              opacity: isHovered ? [0.3, 0.8, 0.3] : 0.2,
              scaleX: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: (angle / 360) * 1.5,
            }}
          />
        ))}

        {/* Orbiting interactive elements */}
        {ORBIT_ITEMS.map((item, i) => (
          <OrbitItem
            key={i}
            {...item}
            isHovered={isHovered}
            containerSize={320}
          />
        ))}

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, var(--sakura), var(--crimson))`,
              top: "50%",
              left: "50%",
              x: p.x,
              y: p.y,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            animate={{
              scale: isHovered ? [1, 0.2, 1] : [0.5, 1, 0.5],
              opacity: isHovered ? [0.6, 0.1, 0.6] : [0.2, 0.5, 0.2],
              x: isHovered ? p.x * 1.8 : p.x,
              y: isHovered ? p.y * 1.8 : p.y,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Scatter petals (burst on hover) */}
      {scatterPetals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute pointer-events-none"
          style={{
            width: petal.size,
            height: petal.size,
            top: "50%",
            left: "50%",
            marginLeft: -petal.size / 2,
            marginTop: -petal.size / 2,
            zIndex: 10,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0.9,
            scale: 0.3,
            rotate: 0,
          }}
          animate={{
            x: Math.cos((petal.angle * Math.PI) / 180) * petal.distance,
            y: Math.sin((petal.angle * Math.PI) / 180) * petal.distance,
            opacity: 0,
            scale: 1,
            rotate: petal.rotation,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            width={petal.size}
            height={petal.size}
          >
            <path
              d="M16 2C16 2 20 8 20 14C20 18 18 20 16 22C14 20 12 18 12 14C12 8 16 2 16 2Z"
              fill={
                petal.style <= 2
                  ? "rgba(255,183,197,0.8)"
                  : "rgba(255,220,230,0.7)"
              }
            />
            <path
              d="M2 16C2 16 8 12 14 12C18 12 20 14 22 16C20 18 18 20 14 20C8 20 2 16 2 16Z"
              fill={
                petal.style <= 2
                  ? "rgba(255,200,210,0.6)"
                  : "rgba(255,183,197,0.7)"
              }
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Orbiting element that flees on hover ── */
function OrbitItem({
  symbol,
  size,
  orbit,
  speed,
  offset,
  isHovered,
}: {
  symbol: string;
  size: number;
  orbit: number;
  speed: number;
  offset: number;
  isHovered: boolean;
  containerSize: number;
}) {
  const [angle, setAngle] = useState(offset);
  const [fled, setFled] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setAngle((prev) => prev + (speed * delta * 360) / speed);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  // Flee on hover
  useEffect(() => {
    if (isHovered) {
      setFled(true);
      const t = setTimeout(() => setFled(false), 800);
      return () => clearTimeout(t);
    }
  }, [isHovered]);

  const currentOrbit = fled ? orbit * 1.6 : orbit;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * currentOrbit;
  const y = Math.sin(rad) * currentOrbit;

  return (
    <motion.div
      className="absolute pointer-events-auto select-none"
      style={{
        fontSize: size,
        top: "50%",
        left: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        lineHeight: 1,
        filter: "drop-shadow(0 0 4px rgba(255,183,197,0.4))",
        zIndex: 5,
      }}
      animate={{
        x,
        y,
        scale: fled ? 1.3 : 1,
        opacity: fled ? 0.4 : 0.75,
      }}
      transition={{
        x: { duration: fled ? 0.5 : 0.1, ease: "easeOut" },
        y: { duration: fled ? 0.5 : 0.1, ease: "easeOut" },
        scale: { duration: 0.3 },
        opacity: { duration: 0.3 },
      }}
      whileHover={{
        scale: 1.5,
        opacity: 1,
        filter: "drop-shadow(0 0 12px rgba(255,183,197,0.8))",
      }}
      title={symbol}
    >
      {symbol}
    </motion.div>
  );
}
