"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── 3D Particle Canvas ─────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; hue: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const COUNT = 80;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 60 + 200, // blue-purple range
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(220, 80%, 65%, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}

/* ─── Typing Effect ───────────────────────────────────── */
function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.substring(0, text.length + 1));
        if (text.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        setText(word.substring(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

/* ─── Magnetic Button ──────────────────────────────────── */
function MagneticButton({ children, className, ...props }: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={reset}>
      <Link ref={ref} className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ─── Floating Orbs ────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -120, 80, 0], y: [0, 100, -60, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/8 to-blue-500/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 60, -100, 0], y: [0, -40, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-3xl"
      />
    </div>
  );
}

/* ─── Main Hero ────────────────────────────────────────── */
export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Backgrounds */}
      <ParticleField />
      <FloatingOrbs />

      {/* Subtle Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial fade */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_80%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container px-4 md:px-6 flex flex-col items-center text-center space-y-5 relative z-10"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 group-hover:opacity-60 blur transition-opacity" />
          <div className="relative px-3 py-1 rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm text-xs font-medium flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Opportunities
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants}>
          <p className="text-base text-muted-foreground font-medium tracking-wide">
            Hi, I&apos;m <span className="text-foreground font-semibold">Ahmed Aymane Harty</span>
          </p>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[1.1]"
        >
          AI, DevOps &
          <br />
          Full-Stack <TypingText words={["Developer", "Engineer", "Architect", "Creator"]} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-[550px] text-muted-foreground text-sm md:text-base leading-relaxed"
        >
          Crafting <span className="text-foreground font-medium">scalable applications</span> and exploring the frontiers of{" "}
          <span className="text-foreground font-medium">Artificial Intelligence</span>.
        </motion.p>



        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
          <MagneticButton
            href="#contact"
            className={cn(
              "group relative inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold overflow-hidden",
              "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25",
              "hover:shadow-xl hover:shadow-blue-500/30 transition-shadow"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Get in Touch
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </MagneticButton>

          <MagneticButton
            href="/cv.pdf"
            target="_blank"
            className={cn(
              "group relative inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all",
              "border border-border/60 bg-background/50 backdrop-blur-sm",
              "hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
            Download CV
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="text-muted-foreground w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
