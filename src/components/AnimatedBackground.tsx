"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ─── Floating Geometric Shape ─────────────────────────────── */
function FloatingShape({
  position,
  geometry,
  color,
  speed,
  distort,
  scale,
  rotationSpeed,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "torusKnot" | "dodecahedron";
  color: string;
  speed: number;
  distort: number;
  scale: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.15;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.1;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.05;
    }
  });

  const geometryElement = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometryElement}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.25}
          distort={distort}
          speed={1.5}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ─── Wireframe Orbiting Shape ─────────────────────────────── */
function WireframeOrbit({
  radius,
  speed,
  color,
  scale,
}: {
  radius: number;
  speed: number;
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.7) * 1.5;
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ─── Ambient Particles ────────────────────────────────────── */
function AmbientParticles({ count, color }: { count: number; color: string }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.015;
      mesh.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.04} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Scene ────────────────────────────────────────────────── */
function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Adaptive colors
  const primary = isDark ? "#3b82f6" : "#2563eb";
  const purple = isDark ? "#a855f7" : "#7c3aed";
  const cyan = isDark ? "#22d3ee" : "#06b6d4";
  const pink = isDark ? "#ec4899" : "#db2777";
  const particleColor = isDark ? "#6366f1" : "#3b82f6";

  return (
    <>
      {/* Ambient + directional lights */}
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.2 : 0.25} />
      <pointLight position={[-5, -5, 5]} intensity={isDark ? 0.15 : 0.1} color={primary} />

      {/* Floating Geometric Shapes — brought closer and spread nicely */}
      <FloatingShape position={[-4, 2.5, -3]} geometry="icosahedron" color={primary} speed={1.2} distort={0.3} scale={2.0} rotationSpeed={0.4} />
      <FloatingShape position={[5, -1.5, -4]} geometry="octahedron" color={purple} speed={0.8} distort={0.4} scale={2.5} rotationSpeed={0.3} />
      <FloatingShape position={[-3, -2.5, -2.5]} geometry="torus" color={cyan} speed={1.5} distort={0.2} scale={1.6} rotationSpeed={0.5} />
      <FloatingShape position={[4, 3, -5]} geometry="torusKnot" color={pink} speed={0.6} distort={0.3} scale={1.8} rotationSpeed={0.25} />
      <FloatingShape position={[0.5, -4, -3.5]} geometry="dodecahedron" color={primary} speed={1.0} distort={0.35} scale={1.5} rotationSpeed={0.35} />
      <FloatingShape position={[-6, 0, -5]} geometry="icosahedron" color={purple} speed={0.9} distort={0.25} scale={3.0} rotationSpeed={0.2} />
      <FloatingShape position={[6.5, 0.5, -4]} geometry="torus" color={cyan} speed={1.3} distort={0.2} scale={1.3} rotationSpeed={0.45} />
      <FloatingShape position={[0, 4, -2]} geometry="octahedron" color={pink} speed={0.7} distort={0.3} scale={1.2} rotationSpeed={0.35} />

      {/* Wireframe orbiting shapes — add depth */}
      <WireframeOrbit radius={6} speed={0.15} color={primary} scale={1.8} />
      <WireframeOrbit radius={9} speed={0.08} color={purple} scale={2.2} />
      <WireframeOrbit radius={4} speed={0.2} color={cyan} scale={1.0} />

      {/* Ambient floating particles */}
      <AmbientParticles count={300} color={particleColor} />
    </>
  );
}

/* ─── Main Exported Component ──────────────────────────────── */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
