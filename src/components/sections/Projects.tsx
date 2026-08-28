"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Loader2, Sparkles, Brain, Database, Layers, Server } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { projects as staticProjects, ProjectItem } from "@/lib/data";

const categories = ["All", "Featured", "AI & Deep Learning", "Big Data & Cloud", "Full Stack", "DevOps"];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjectsList(data.length > 0 ? data : staticProjects);
        } else {
          setProjectsList(staticProjects);
        }
      } catch (error) {
        setProjectsList(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projectsList.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(120,119,198,0.06),transparent)]" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Portfolio Showcase</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-base">
              Explore key technical projects spanning Artificial Intelligence, Deep Learning, Cloud Systems, and Full-Stack Engineering.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                  filter === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const is2026 = project.year === "2026";
              const isAI = project.category === "AI & Deep Learning";

              return (
                <motion.div
                  key={project._id || project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "group relative rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between",
                    is2026 ? "border-primary/40 ring-1 ring-primary/20" : "border-border/60 hover:border-primary/30"
                  )}
                >
                  {/* Card Header Visual */}
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 flex items-center justify-center border-b border-border/40">
                    {project.visuals?.[0] && !project.visuals[0].includes("placeholder") ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.visuals[0]}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                        <div className="relative z-10 flex flex-col items-center text-center gap-2 group-hover:scale-105 transition-transform duration-300">
                          {isAI ? (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                              <Brain className="w-7 h-7 text-white" />
                            </div>
                          ) : project.category === "Big Data & Cloud" ? (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                              <Database className="w-7 h-7 text-white" />
                            </div>
                          ) : project.category === "DevOps" ? (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                              <Server className="w-7 h-7 text-white" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                              <Layers className="w-7 h-7 text-white" />
                            </div>
                          )}
                          <span className="text-xs font-mono tracking-wider text-muted-foreground/90 uppercase">{project.category}</span>
                        </div>
                      </>
                    )}

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
                      {is2026 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
                          <Sparkles className="w-3 h-3" /> 2026 Project
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <div className="flex gap-1 shrink-0">
                          {project.repoLink && (
                            <Link href={project.repoLink} target="_blank" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors" aria-label="GitHub Repo">
                              <Github className="w-4 h-4" />
                            </Link>
                          )}
                          {project.demoLink && project.demoLink !== "#" && (
                            <Link href={project.demoLink} target="_blank" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors" aria-label="Demo Link">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-secondary/80 text-secondary-foreground text-[11px] font-medium border border-border/40">
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-0.5 rounded-md bg-secondary/80 text-secondary-foreground text-[11px] font-medium border border-border/40">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/link pt-1"
                      >
                        View Project Breakdown <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
