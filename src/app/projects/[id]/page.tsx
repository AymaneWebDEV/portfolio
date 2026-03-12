import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Project, { IProject } from "@/models/Project";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProject(slug: string) {
  await connectToDatabase();
  // Using lean() for better performance as we just need the JSON data
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;

  // Convert _id and dates to simple strings/types if needed, 
  // though simplistic access works for properties. 
  // We cast to unknown then IProject to satisfy TS if needed, or just use as is.
  return project as unknown as IProject;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params; // 'id' here is actually the slug based on the link
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-24 px-4 md:px-6">
        <Link href="/#projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {/* Visuals handling */}
            {project.visuals && project.visuals.length > 0 ? (
              <img
                src={project.visuals[0]}
                alt={project.title}
                className="rounded-xl w-full h-auto object-cover border border-border"
              />
            ) : (
              <div className="aspect-video bg-muted rounded-xl mb-8 flex items-center justify-center text-muted-foreground bg-secondary/30">
                No Preview Image
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {/* Category is not in the schema explicitly but we can use 'technologies[0]' or add it. 
                         For now, let's use the first tech as a faux-category or just omit. 
                     */}
              <span className="text-primary font-medium">Project</span>
              <h1 className="text-4xl font-bold mt-2">{project.title}</h1>
            </div>

            <div className="flex gap-4">
              {project.repoLink && (
                <Link href={project.repoLink} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                  <Github className="w-4 h-4" /> Repo
                </Link>
              )}
              {project.demoLink && (
                <Link href={project.demoLink} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Link>
              )}
            </div>

            <div className="prose dark:prose-invert">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="whitespace-pre-line text-muted-foreground">{project.description}</p>

              {project.content && (
                <>
                  <h3 className="text-xl font-semibold mt-6">Details</h3>
                  <div className="text-muted-foreground whitespace-pre-line">{project.content}</div>
                </>
              )}
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <span key={t} className="px-3 py-1 bg-secondary rounded-full text-sm">
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
