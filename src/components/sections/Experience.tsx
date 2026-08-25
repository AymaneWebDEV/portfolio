"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, GraduationCap, Code2, Server, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { experiences as staticExperiences, ExperienceItem } from "@/lib/data";

const highlights = [
  {
    icon: BadgeCheck,
    title: "AI & Computer Vision",
    description: "Deep Learning, PyTorch, CUDA acceleration & medical diagnostics.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Code2,
    title: "Full-Stack Software Engineering",
    description: "Web & system architectures with React, Next.js, Node & Laravel.",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    icon: Server,
    title: "Cloud & Big Data Infrastructure",
    description: "Distributed analytics pipelines, Spark, Kafka & containerization.",
    gradient: "from-orange-500 to-pink-500",
  },
];

export function Experience() {
  const [timeline, setTimeline] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience");
        if (res.ok) {
          const data = await res.json();
          setTimeline(data.length > 0 ? data : staticExperiences);
        } else {
          setTimeline(staticExperiences);
        }
      } catch {
        setTimeline(staticExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(120,119,198,0.08),transparent)]" />

      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Experience & Academic Background</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Engineering robust applications and applying deep learning to high-impact real-world domains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Core Focus */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert"
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">Technical Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a software engineer specialized in <strong className="text-foreground">Artificial Intelligence</strong>, my experience spans deep learning medical computer vision, distributed data processing, and enterprise web application development.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                  >
                    <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.gradient}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Timeline Line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-10">
                {timeline.map((item, i) => {
                  const Icon = item.type === "work" ? Briefcase : GraduationCap;
                  const isLatestWork = i === 0 && item.organization.toLowerCase().includes("vitaltech");

                  return (
                    <motion.div
                      key={item._id || i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      className="relative pl-14"
                    >
                      {/* Icon */}
                      <div className={`absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 ${isLatestWork ? "border-primary shadow-lg shadow-primary/20" : "border-primary/40"} flex items-center justify-center z-10`}>
                        <Icon className={`w-4 h-4 ${isLatestWork ? "text-primary animate-pulse" : "text-primary"}`} />
                      </div>

                      {/* Content Card */}
                      <div className={`p-6 rounded-2xl border ${isLatestWork ? "border-primary/40 bg-card/80 shadow-lg shadow-primary/5" : "border-border/50 bg-card/50"} backdrop-blur-sm hover:border-primary/30 transition-all space-y-4`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono text-primary font-semibold tracking-wider px-2.5 py-1 rounded-full bg-primary/10">
                            {item.period}
                          </span>
                          {isLatestWork && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400">
                              <Sparkles className="w-3 h-3 text-blue-400" />
                              Latest Internship 2026
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                          <p className="text-base font-medium text-primary/90 mt-0.5">{item.organization}</p>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {/* Bullet achievements / details if present */}
                        {item.details && item.details.length > 0 && (
                          <div className="pt-2 space-y-2 border-t border-border/40">
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Contributions & Technical Accomplishments:</span>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
