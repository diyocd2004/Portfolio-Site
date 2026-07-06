"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SakuraPetalsProps {
  count?: number;
}

export default function SakuraPetals({ count = 80 }: SakuraPetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize petal data
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15 - 2,
        (Math.random() - 0.5) * 10
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: 0.2 + Math.random() * 0.4,
      swaySpeed: 0.5 + Math.random() * 1.5,
      swayAmount: 0.3 + Math.random() * 0.7,
      rotSpeed: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2,
      scale: 0.04 + Math.random() * 0.06,
    }));
  }, [count]);

  // Petal geometry — a small rounded triangle
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.quadraticCurveTo(0.3, 0.3, 0.15, 0);
    shape.quadraticCurveTo(0, -0.1, -0.15, 0);
    shape.quadraticCurveTo(-0.3, 0.3, 0, 0.5);
    const geo = new THREE.ShapeGeometry(shape);
    geo.center();
    return geo;
  }, []);

  // Material with translucency
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFB7C5"),
      emissive: new THREE.Color("#FFB7C5"),
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    petals.forEach((petal, i) => {
      // Drift downward
      petal.position.y -= petal.speed * 0.016;

      // Horizontal sway
      petal.position.x +=
        Math.sin(time * petal.swaySpeed + petal.phase) * petal.swayAmount * 0.008;
      petal.position.z +=
        Math.cos(time * petal.swaySpeed * 0.7 + petal.phase) * 0.003;

      // Rotation
      petal.rotation.x += petal.rotSpeed * 0.01;
      petal.rotation.z += petal.rotSpeed * 0.008;

      // Reset when fallen below view
      if (petal.position.y < -5) {
        petal.position.y = 12 + Math.random() * 3;
        petal.position.x = (Math.random() - 0.5) * 20;
        petal.position.z = (Math.random() - 0.5) * 10;
      }

      dummy.position.copy(petal.position);
      dummy.rotation.copy(petal.rotation);
      dummy.scale.setScalar(petal.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}
