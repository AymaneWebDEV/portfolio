"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { Loader2 } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: Props) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params using state or effect since it's a promise in Next.js 15+ (and compatible with 14 in some modes)
  // For simplicity component-side unwrapping:

  useEffect(() => {
    // Self-invoking async to handle params promise
    (async () => {
      const { id } = await params;
      fetch(`/api/projects/${id}`)
        .then(res => res.json())
        .then(data => {
          setProject(data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    })();
  }, [params]);

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
  }

  if (!project || project.error) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
