"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Briefcase, GraduationCap, Code2, Server, Loader2 } from "lucide-react";

interface ExperienceItem {
  _id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description: "End-to-end development with modern stacks.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Container orchestration, CI/CD, and infrastructure.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BadgeCheck,
    title: "AI & Data Science",
    description: "Building intelligent solutions with Python & ML.",
    gradient: "from-orange-500 to-red-500",
  },
];

/* Fallback data when DB is empty */
const fallbackTimeline: ExperienceItem[] = [
  {
    _id: "fallback-1",
    type: "work",
    title: "Freelance Full-Stack Developer",
    organization: "Self-employed",
    period: "Present",
    description: "Developing custom web solutions and e-commerce platforms for diverse clients. Managing end-to-end deployment and maintenance.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    _id: "fallback-2",
    type: "education",
    title: "Application Development & AI Student",
    organization: "University",
    period: "2024 – 2026 (Expected)",
    description: "Specialized training in Software Engineering, Artificial Intelligence, and System Administration.",
    tags: ["Python", "ML", "Docker", "DevOps"],
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
          setTimeline(data.length > 0 ? data : fallbackTimeline);
        } else {
          setTimeline(fallbackTimeline);
        }
      } catch {
        setTimeline(fallbackTimeline);
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
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Background</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Bridging the gap between robust application engineering and intelligent systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Highlights */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a <strong className="text-foreground">Full-Stack Developer</strong> and AI Student,
                my journey is defined by a deep curiosity for how things work — from silicon to the cloud.
                I advocate for clean architecture, type safety, and user-centric design.
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

          {/* Right: Timeline */}
          <div className="relative">
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
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      className="relative pl-14"
                    >
                      {/* Icon */}
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center z-10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors space-y-3">
                        <span className="text-xs font-mono text-primary tracking-wider">{item.period}</span>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.organization}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
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
