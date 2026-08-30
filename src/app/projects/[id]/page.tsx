import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, ExternalLink, Brain, Database, Server, Layers } from "lucide-react";
import { projects as fallbackProjects, ProjectItem } from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getProject(slugOrId: string): Promise<ProjectItem | null> {
  // 1. Query Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const isUUID = UUID_REGEX.test(slugOrId);
      const query = supabase.from("projects").select("*");
      const { data, error } = isUUID
        ? await query.eq("id", slugOrId).maybeSingle()
        : await query.eq("slug", slugOrId).maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          _id: data.id,
          title: data.title,
          slug: data.slug,
          category: data.category || "AI & Deep Learning",
          description: data.description,
          content: data.content,
          technologies: data.technologies || [],
          tech: data.technologies || [],
          visuals: data.visuals || [],
          image: data.visuals?.[0] || undefined,
          repoLink: data.repo_link || undefined,
          demoLink: data.demo_link || undefined,
          featured: data.featured,
          year: data.year || "2026",
        };
      }
    } catch (err) {
      console.warn("Supabase lookup error in project detail page, falling back to static data.");
    }
  }

  // 2. Fallback to static data
  const staticMatch = fallbackProjects.find(
    (p) => p.slug === slugOrId || p._id === slugOrId || p.id === slugOrId
  );

  return staticMatch || null;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const isAI = project.category === "AI & Deep Learning";
  const heroVisual = project.visuals?.[0] || project.image;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-24 px-4 md:px-6 max-w-5xl">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Visual Header / Banner */}
          <div className="md:col-span-5 space-y-6">
            <div className="aspect-video md:aspect-square rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900 border border-border flex flex-col items-center justify-center p-6 relative overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

              {heroVisual && !heroVisual.includes("placeholder") ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={heroVisual}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-primary-foreground/90 uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  {isAI ? (
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/40">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  ) : project.category === "Big Data & Cloud" ? (
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center shadow-xl shadow-orange-500/40">
                      <Database className="w-10 h-10 text-white" />
                    </div>
                  ) : project.category === "DevOps" ? (
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/40">
                      <Server className="w-10 h-10 text-white" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-xl shadow-pink-500/40">
                      <Layers className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">{project.category}</span>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.repoLink && (
                <Link
                  href={project.repoLink}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-primary/50 text-sm font-semibold transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" /> Source Code
                </Link>
              )}
              {project.demoLink && project.demoLink !== "#" && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Link>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {project.category}
                </span>
                {project.year && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {project.year}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{project.title}</h1>
            </div>

            <div className="p-5 rounded-2xl bg-card/60 border border-border/60">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Executive Summary</h3>
              <p className="text-base text-foreground leading-relaxed">{project.description}</p>
            </div>

            {project.content && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-foreground">Detailed Technical Architecture</h3>
                <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line bg-card/40 p-6 rounded-2xl border border-border/40 font-sans">
                  {project.content.trim()}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium border border-border/40">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
