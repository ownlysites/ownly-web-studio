"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Energy drink can with canvas-rendered label. Uses generic premium-energy-drink
// styling (silver body + bold blue wordmark) so we don't infringe Celsius IP.
// The proportions match a standard 12oz slim can.

function makeCanLabel() {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return null;

  // Brushed silver vertical gradient
  const bg = ctx.createLinearGradient(0, 0, 0, 1024);
  bg.addColorStop(0, "#dfe3e7");
  bg.addColorStop(0.5, "#f5f6f8");
  bg.addColorStop(1, "#c8ccd2");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 2048, 1024);

  // Vertical brushed-metal streaks
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = "#0a0a0a";
  for (let i = 0; i < 2048; i += 2) {
    const w = Math.random() < 0.5 ? 1 : 2;
    ctx.fillRect(i, 0, w, 1024);
  }
  ctx.globalAlpha = 1;

  // Bold blue accent band
  ctx.fillStyle = "#0085c8";
  ctx.fillRect(0, 240, 2048, 24);
  ctx.fillRect(0, 760, 2048, 24);

  // Wordmark — repeated around the can
  const wordmark = "OWNLY ENERGY";
  ctx.fillStyle = "#0B2545";
  ctx.font = "900 168px Inter, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(wordmark, 1024, 480);
  ctx.font = "700 56px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#0085c8";
  ctx.fillText("LIVE · FIT · ZERO SUGAR", 1024, 600);

  // Vertical "12 FL OZ" along right edge
  ctx.save();
  ctx.translate(1900, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#0B2545";
  ctx.font = "700 36px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("12 FL OZ · 355 mL", 0, 0);
  ctx.restore();

  // Vertical batch code along left edge
  ctx.save();
  ctx.translate(148, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#0B2545";
  ctx.font = "600 22px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillText("LOT · A2026-05 · BEST BY 11/26", 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  // Wrap horizontal so it goes around the cylinder.
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

export function Can({ autoRotate: _ }: { autoRotate: boolean }) {
  void _;

  const labelTex = useMemo(() => makeCanLabel(), []);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTex ?? null,
        metalness: 0.35,
        roughness: 0.3,
      }),
    [labelTex]
  );

  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd3d8",
        metalness: 0.55,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group position={[0, -0.1, 0]}>
      {/* Slim 12oz can: 1.5 tall, radius 0.55. */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.56, 0.56, 1.7, 64, 1, false]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.86, 0]} castShadow>
        <cylinderGeometry args={[0.53, 0.56, 0.04, 48]} />
        <primitive object={capMat} attach="material" />
      </mesh>
      {/* Top lip ring */}
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.53, 0.012, 8, 48]} />
        <primitive object={capMat} attach="material" />
      </mesh>
      {/* Pull tab */}
      <mesh position={[0.18, 0.91, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.09, 0.012, 6, 18]} />
        <primitive object={capMat} attach="material" />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.86, 0]} castShadow>
        <cylinderGeometry args={[0.56, 0.53, 0.04, 48]} />
        <primitive object={capMat} attach="material" />
      </mesh>
      {/* Condensation droplets — tiny spheres scattered around the body.
          Deterministic placement keeps the render pure. */}
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i / 32) * Math.PI * 2 + (i % 3) * 0.4;
        const y = -0.6 + ((i * 13) % 11) * 0.13;
        const r = 0.57 + ((i * 7) % 5) * 0.001;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const size = 0.012 + ((i * 11) % 7) * 0.0015;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 6, 6]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.55}
              roughness={0.1}
              metalness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
