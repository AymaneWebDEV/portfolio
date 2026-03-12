"use client";

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Project</h1>
      <ProjectForm isNew={true} />
    </div>
  );
}
