"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { CITIES } from "@/lib/site";

const RADIUS = 2.2;

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Globe() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const wireGeom = useMemo(() => {
    const g = new THREE.SphereGeometry(RADIUS, 36, 24);
    return new THREE.WireframeGeometry(g);
  }, []);

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[RADIUS - 0.01, 64, 48]} />
        <meshBasicMaterial color="#0B2545" transparent opacity={0.95} />
      </mesh>
      <lineSegments ref={wireRef} geometry={wireGeom}>
        <lineBasicMaterial color="#C5A05A" transparent opacity={0.22} />
      </lineSegments>

      {CITIES.map((c) => {
        const p = latLonToVec3(c.lat, c.lon, RADIUS + 0.02);
        return <CityMarker key={c.name} position={p} label={c.name} />;
      })}

      {CITIES.slice(1).map((c, i) => {
        const a = latLonToVec3(CITIES[0].lat, CITIES[0].lon, RADIUS);
        const b = latLonToVec3(c.lat, c.lon, RADIUS);
        return <Arc key={c.name} a={a} b={b} delay={i * 0.5} />;
      })}
    </group>
  );
}

function CityMarker({ position, label }: { position: THREE.Vector3; label: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2 + position.x) * 0.3;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 - Math.sin(clock.elapsedTime * 2 + position.x) * 0.3;
    }
  });
  return (
    <group position={position} aria-label={label}>
      <mesh>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#E8C97A" />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.07, 0.1, 24]} />
        <meshBasicMaterial color="#E8C97A" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Arc({ a, b, delay }: { a: THREE.Vector3; b: THREE.Vector3; delay: number }) {
  const { line, total } = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const len = a.distanceTo(b);
    mid.normalize().multiplyScalar(RADIUS + len * 0.35);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(64);
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: "#C5A05A", transparent: true, opacity: 0.7 });
    const l = new THREE.Line(geom, mat);
    return { line: l, total: pts.length };
  }, [a, b]);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime + delay) % 6;
    const progress = Math.min(1, t / 3);
    const drawCount = Math.floor(progress * total);
    line.geometry.setDrawRange(0, drawCount);
  });

  return <primitive object={line} />;
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Mulberry32 seeded PRNG — keeps render pure and deterministic between SSR + client.
    let s = 0xdeadbeef >>> 0;
    const rnd = () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const r = 3.5 + rnd() * 2;
      const t = rnd() * Math.PI * 2;
      const p = Math.acos(2 * rnd() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial color="#E8C97A" size={0.025} sizeAttenuation transparent opacity={0.7} />
    </Points>
  );
}

export function ThreeGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.4], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E8C97A" />
      <Globe />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
