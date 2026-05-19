"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Torus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.35;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.08);
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.1, 0.34, 200, 32]} />
      <meshStandardMaterial color="#C5A05A" roughness={0.18} metalness={0.85} emissive="#94741f" emissiveIntensity={0.18} />
    </mesh>
  );
}

export function TorusScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "linear-gradient(135deg, #0B2545, #1B3C73)" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 4]} intensity={1.1} color="#E8C97A" />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#1B3C73" />
      <Torus />
    </Canvas>
  );
}
