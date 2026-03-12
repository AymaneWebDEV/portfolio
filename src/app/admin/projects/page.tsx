"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
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
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-t border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{project.slug}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-secondary text-xs font-semibold">
                    N/A
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="p-2 hover:bg-secondary rounded-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/projects/${project._id}`}
                    className="p-2 hover:bg-secondary rounded-md"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
