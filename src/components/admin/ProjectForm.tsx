"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";

interface ProjectFormProps {
  project?: any;
  isNew?: boolean;
}

const CATEGORIES = [
  "AI & Deep Learning",
  "Full Stack",
  "Big Data & Cloud",
  "Frontend",
  "DevOps",
  "Software Engineering",
];

export default function ProjectForm({ project, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    category: project?.category || "AI & Deep Learning",
    year: project?.year || "2026",
    description: project?.description || "",
    content: project?.content || "",
    tech: project?.technologies?.join(", ") || project?.tech?.join(", ") || "",
    repo_link: project?.repo_link || project?.repoLink || "",
    demo_link: project?.demo_link || project?.demoLink || "",
    featured: project?.featured || false,
  });
  const [images, setImages] = useState<string[]>(project?.visuals || (project?.image ? [project.image] : []));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        } else {
          const err = await res.json();
          alert(err.error || "Upload failed");
        }
      } catch {
        alert("Upload failed. Is Cloudinary configured?");
      }
    }

    setImages((prev) => [...prev, ...newUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectId = project?.id || project?._id || project?.slug;
      const url = isNew ? "/api/projects" : `/api/projects/${projectId}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        year: formData.year,
        description: formData.description,
        content: formData.content,
        technologies: formData.tech.split(",").map((t: string) => t.trim()).filter(Boolean),
        visuals: images,
        repo_link: formData.repo_link || null,
        demo_link: formData.demo_link || null,
        featured: formData.featured,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        window.location.href = "/admin/projects";
      } else {
        const err = await res.json();
        alert(err.error || "Something went wrong");
      }
    } catch {
      alert("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            required
            placeholder="ThyroVision AI"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
              setFormData({
                ...formData,
                title,
                slug: isNew ? slug : formData.slug,
              });
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL ID)</label>
          <input
            type="text"
            required
            placeholder="thyrovision-ai"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={inputClass}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            placeholder="2026"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <textarea
          required
          rows={3}
          placeholder="Brief summary of the problem, solution, and outcomes..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Content / Architecture Details</label>
        <textarea
          required
          rows={8}
          placeholder="Detailed breakdown of key features, algorithms, pipeline, and evaluation metrics..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`${inputClass} font-mono`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
        <input
          type="text"
          placeholder="Python, PyTorch, CUDA, OpenCV, Streamlit, scikit-learn..."
          value={formData.tech}
          onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Repository Link</label>
          <input
            type="url"
            placeholder="https://github.com/AymaneWebDEV/..."
            value={formData.repo_link}
            onChange={(e) => setFormData({ ...formData, repo_link: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Demo / Live Link</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={formData.demo_link}
            onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Image Management */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Visuals & Screenshots</label>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-3">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                <img src={url} alt={`Project image ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    Cover Image
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload Image</>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />

          <div className="flex-1 flex gap-2">
            <input
              type="url"
              placeholder="Or paste image URL (e.g. /projects/sample.jpg or https://...)..."
              id="manual-url"
              className={`${inputClass} flex-1`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = e.currentTarget;
                  if (input.value.trim()) {
                    setImages((prev) => [...prev, input.value.trim()]);
                    input.value = "";
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("manual-url") as HTMLInputElement;
                if (input?.value.trim()) {
                  setImages((prev) => [...prev, input.value.trim()]);
                  input.value = "";
                }
              }}
              className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted transition-colors flex items-center gap-1"
            >
              <ImageIcon className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="featured" className="text-sm font-medium">Highlight as Featured Project</label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isNew ? "Create Project" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
