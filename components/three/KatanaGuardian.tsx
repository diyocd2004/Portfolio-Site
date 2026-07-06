"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function KatanaGuardian() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(new THREE.Quaternion());
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
  const { camera } = useThree();

  // Plane for unprojecting mouse to 3D world space
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), -2), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse2D = useRef(new THREE.Vector2(0, 0));
  const intersectPoint = useMemo(() => new THREE.Vector3(), []);

  // Track mouse position
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      mouse2D.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse2D.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Unproject mouse to 3D
    raycaster.setFromCamera(mouse2D.current, camera);
    raycaster.ray.intersectPlane(plane, intersectPoint);
    mouseWorld.current.copy(intersectPoint);

    // Calculate target look direction
    const direction = new THREE.Vector3()
      .subVectors(mouseWorld.current, groupRef.current.position)
      .normalize();

    // Calculate rotation to look at mouse
    const lookQuat = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const rotMatrix = new THREE.Matrix4().lookAt(
      groupRef.current.position,
      mouseWorld.current,
      up
    );
    lookQuat.setFromRotationMatrix(rotMatrix);

    // Offset so the blade points toward mouse instead of the z-axis
    const offset = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      -Math.PI / 2
    );
    lookQuat.multiply(offset);

    targetRotation.current.copy(lookQuat);

    // Slerp toward target (damping)
    groupRef.current.quaternion.slerp(targetRotation.current, 0.06);

    // Gentle floating bob
    const time = performance.now() * 0.001;
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Blade */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.04, 1.6, 0.01]} />
        <meshStandardMaterial
          color="#d4d4d8"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Blade edge highlight */}
      <mesh position={[0.025, 0.8, 0]}>
        <boxGeometry args={[0.005, 1.5, 0.008]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Tsuba (guard) — flattened ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16]} />
        <meshStandardMaterial
          color="#C9A65C"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Handle (tsuka) */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.03, 0.035, 0.9, 8]} />
        <meshStandardMaterial
          color="#8B1E3F"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Handle wrap pattern (diamond ito) */}
      {[0.15, 0.35, 0.55].map((y, i) => (
        <mesh key={i} position={[0, -y, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.06, 0.02, 0.06]} />
          <meshStandardMaterial
            color="#C9A65C"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Pommel (kashira) */}
      <mesh position={[0, -0.9, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#C9A65C"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
