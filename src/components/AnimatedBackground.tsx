"use client";

import { useEffect, useRef } from "react";

/**
 * Animated background with floating gradient blobs
 * Renders on a canvas for smooth 60fps animations
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create gradient blobs
    const blobs = [
      { x: 20, y: 20, radius: 300, vx: 0.3, vy: 0.2, color1: "rgba(59, 130, 246, 0.08)", color2: "rgba(99, 102, 241, 0.05)" },
      { x: 80, y: 60, radius: 400, vx: -0.2, vy: 0.25, color1: "rgba(168, 85, 247, 0.06)", color2: "rgba(236, 72, 153, 0.04)" },
      { x: 50, y: 40, radius: 250, vx: 0.15, vy: -0.18, color1: "rgba(34, 211, 238, 0.05)", color2: "rgba(59, 130, 246, 0.03)" },
    ];

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, i) => {
        // Update positions
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce
        if (blob.x < 0 || blob.x > 100) blob.vx *= -1;
        if (blob.y < 0 || blob.y > 100) blob.vy *= -1;

        // Draw gradient blob
        const gradient = ctx.createRadialGradient(
          (blob.x / 100) * canvas.width,
          (blob.y / 100) * canvas.height,
          0,
          (blob.x / 100) * canvas.width,
          (blob.y / 100) * canvas.height,
          blob.radius
        );
        gradient.addColorStop(0, blob.color1);
        gradient.addColorStop(1, blob.color2);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          (blob.x / 100) * canvas.width,
          (blob.y / 100) * canvas.height,
          blob.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
