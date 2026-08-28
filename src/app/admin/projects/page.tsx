"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectItem {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  category?: string;
  year?: string;
  featured?: boolean;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => (p.id || p._id || p.slug) !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Add, edit, or remove technical projects from your portfolio.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Slug</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Year</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const projId = project.id || project._id || project.slug;

                return (
                  <tr key={projId} className="border-t border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/20 text-primary">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{project.slug}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium border border-border/40">
                        {project.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{project.year || "—"}</td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${projId}`}
                        className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(projId)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-md"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No projects found. Click "New Project" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
