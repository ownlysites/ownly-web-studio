"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Parametric t-shirt mesh. A torso silhouette built with LatheGeometry sweep,
// plus simple "sleeves" via BoxGeometry. Fabric material is matte cotton with
// a subtle bump. Front gets a canvas-rendered Ownly mark print.

function makeOwnlyTexture() {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  // Off-white shirt background
  ctx.fillStyle = "#f4ede0";
  ctx.fillRect(0, 0, 1024, 1024);
  // Soft weave noise (seeded, deterministic so render stays pure)
  let s = 0x9e3779b1 >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const img = ctx.getImageData(0, 0, 1024, 1024);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rnd() - 0.5) * 8;
    img.data[i] = Math.min(255, Math.max(0, img.data[i] + n));
    img.data[i + 1] = Math.min(255, Math.max(0, img.data[i + 1] + n));
    img.data[i + 2] = Math.min(255, Math.max(0, img.data[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);

  // Ownly mark — chest print, hex with inner diamond
  ctx.save();
  ctx.translate(512, 470);
  // Hex
  ctx.fillStyle = "#0B2545";
  ctx.beginPath();
  const r = 110;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  // Inner gold mark
  ctx.fillStyle = "#C5A05A";
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(46, 0);
  ctx.lineTo(0, 60);
  ctx.lineTo(-46, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Wordmark
  ctx.fillStyle = "#0B2545";
  ctx.font = "700 36px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("OWNLY", 512, 640);
  ctx.font = "700 14px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#94741f";
  ctx.fillText("WEB · STUDIO", 512, 668);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export function TShirt({ autoRotate: _ }: { autoRotate: boolean }) {
  void _;

  const texture = useMemo(() => makeOwnlyTexture(), []);

  const fabric = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#f4ede0",
      roughness: 0.92,
      metalness: 0,
      map: texture ?? null,
    });
    return mat;
  }, [texture]);

  // Torso silhouette via LatheGeometry: profile from hem (y=-0.9) up to neck.
  const torsoGeom = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // (radius, height)
    points.push(new THREE.Vector2(0.85, -0.95));
    points.push(new THREE.Vector2(0.86, -0.4));
    points.push(new THREE.Vector2(0.78, 0.0));
    points.push(new THREE.Vector2(0.74, 0.35));
    points.push(new THREE.Vector2(0.82, 0.8));
    points.push(new THREE.Vector2(0.62, 1.15));
    points.push(new THREE.Vector2(0.32, 1.25));
    points.push(new THREE.Vector2(0.28, 1.32));
    const g = new THREE.LatheGeometry(points, 48);
    g.computeVertexNormals();
    return g;
  }, []);

  // Sleeve caps — short stubs to give visible shoulder shape
  const sleeveGeom = useMemo(() => {
    const g = new THREE.CapsuleGeometry(0.27, 0.42, 6, 16);
    return g;
  }, []);

  return (
    <group position={[0, -0.05, 0]} scale={1.05}>
      <mesh geometry={torsoGeom} material={fabric} castShadow receiveShadow />
      {/* Sleeves left/right */}
      <mesh
        geometry={sleeveGeom}
        material={fabric}
        position={[0.85, 0.78, 0]}
        rotation={[0, 0, Math.PI / 2.1]}
        castShadow
      />
      <mesh
        geometry={sleeveGeom}
        material={fabric}
        position={[-0.85, 0.78, 0]}
        rotation={[0, 0, -Math.PI / 2.1]}
        castShadow
      />
      {/* Collar ring */}
      <mesh position={[0, 1.28, 0]}>
        <torusGeometry args={[0.3, 0.04, 12, 36]} />
        <meshStandardMaterial color="#e2d6c0" roughness={0.9} />
      </mesh>
    </group>
  );
}
