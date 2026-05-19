"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stylized low-poly supercar. Wedge silhouette evoking a Lamborghini/Ferrari
// without copying any specific marque. All geometry built from primitives —
// no external .glb required. Polished champagne-gold paint with clearcoat.

export function Car({ autoRotate: _ }: { autoRotate: boolean }) {
  void _; // OrbitControls already handles auto-rotate at the scene level.
  const groupRef = useRef<THREE.Group>(null);

  const paint = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E8C97A",
        metalness: 0.4,
        roughness: 0.35,
        emissive: "#3a2a08",
        emissiveIntensity: 0.18,
      }),
    []
  );

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd3d8",
        metalness: 0.6,
        roughness: 0.25,
      }),
    []
  );

  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0B2545",
        metalness: 0.2,
        roughness: 0.15,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  const tire = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#15171a",
        roughness: 0.95,
        metalness: 0.05,
      }),
    []
  );

  // Wedge body shape via a custom extruded profile.
  const bodyGeom = useMemo(() => {
    const shape = new THREE.Shape();
    // Side profile of a wedge supercar, drawn as a 2D path.
    shape.moveTo(-2.4, 0); // rear bottom
    shape.lineTo(2.4, 0); // front bottom
    shape.lineTo(2.4, 0.42); // front bumper top
    shape.lineTo(1.55, 0.55); // hood tip
    shape.lineTo(0.5, 1.05); // roof front (steeply raked)
    shape.lineTo(-0.6, 1.05); // roof flat
    shape.lineTo(-1.7, 0.58); // rear deck slope
    shape.lineTo(-2.4, 0.42); // rear bumper
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 1.8,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 6,
      curveSegments: 12,
    });
    geom.center();
    return geom;
  }, []);

  // Greenhouse (cockpit glass) shape — slightly smaller, sits on top.
  const greenhouseGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.6, 0);
    shape.lineTo(0.5, 0);
    shape.lineTo(0.3, 0.4);
    shape.lineTo(-0.4, 0.4);
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 1.55,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
      curveSegments: 8,
    });
    geom.center();
    return geom;
  }, []);

  useFrame((_, dt) => {
    void dt;
    if (!groupRef.current) return;
    // Small idle hover.
    const t = performance.now() * 0.0008;
    groupRef.current.position.y = -0.6 + Math.sin(t) * 0.015;
  });

  const wheels: [number, number, number][] = [
    [1.55, -0.55, 0.95],
    [1.55, -0.55, -0.95],
    [-1.55, -0.55, 0.95],
    [-1.55, -0.55, -0.95],
  ];

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* body */}
      <mesh geometry={bodyGeom} material={paint} castShadow receiveShadow rotation={[0, Math.PI / 2, 0]} />
      {/* greenhouse */}
      <mesh
        geometry={greenhouseGeom}
        material={glass}
        position={[0, 0.85, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      />
      {/* lower body splitter (chrome accent) */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <boxGeometry args={[5, 0.08, 2]} />
        <meshStandardMaterial color="#94741f" metalness={0.55} roughness={0.35} />
      </mesh>
      {/* front headlight strip */}
      <mesh position={[2.05, 0.22, 0]} rotation={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.04, 0.16, 1.6]} />
        <meshStandardMaterial
          color="#fffaea"
          emissive="#E8C97A"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* rear taillight strip */}
      <mesh position={[-2.05, 0.22, 0]} castShadow>
        <boxGeometry args={[0.04, 0.12, 1.6]} />
        <meshStandardMaterial color="#3a0a0a" emissive="#a8101a" emissiveIntensity={0.5} />
      </mesh>
      {/* badges on hood */}
      <mesh position={[1.4, 0.62, 0]} castShadow material={chrome}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 24]} />
      </mesh>
      {/* wheels */}
      {wheels.map((p, i) => (
        <group key={i} position={p}>
          <mesh material={tire} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
          </mesh>
          {/* rim */}
          <mesh material={chrome} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.37, 16]} />
          </mesh>
          {/* spokes */}
          {Array.from({ length: 5 }).map((_, s) => (
            <mesh
              key={s}
              material={chrome}
              rotation={[0, 0, (s / 5) * Math.PI * 2]}
              position={[0, 0, 0.18]}
            >
              <boxGeometry args={[0.04, 0.5, 0.02]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
