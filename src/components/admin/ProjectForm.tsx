"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { IProject } from "@/models/Project";

interface ProjectFormProps {
  project?: Partial<IProject>;
  isNew?: boolean;
}

export default function ProjectForm({ project, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    content: project?.content || "",
    tech: project?.technologies?.join(", ") || "",
    repoLink: project?.repoLink || "",
    demoLink: project?.demoLink || "",
    featured: project?.featured || false,
  });
  const [images, setImages] = useState<string[]>(project?.visuals || []);

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
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isNew ? "/api/projects" : `/api/projects/${(project as any)._id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...formData,
        technologies: formData.tech.split(",").map((t) => t.trim()).filter(Boolean),
        visuals: images,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Something went wrong");
      }
    } catch {
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-background border border-border text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <textarea
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
        <textarea
          required
          rows={10}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`${inputClass} font-mono`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
        <input
          type="text"
          placeholder="React, Next.js, MongoDB..."
          value={formData.tech}
          onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Repo Link</label>
          <input
            type="url"
            placeholder="https://github.com/..."
            value={formData.repoLink}
            onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Demo Link</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={formData.demoLink}
            onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Images</label>

        {/* Image Preview Grid */}
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
                    Thumbnail
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {/* File Upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload from PC</>
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

          {/* URL input for manual entry */}
          <div className="flex-1 flex gap-2">
            <input
              type="url"
              placeholder="Or paste image URL..."
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
              className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Upload images from your PC (stored on Cloudinary) or paste URLs. The first image is the project thumbnail.
        </p>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="featured" className="text-sm font-medium">Featured project</label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isNew ? "Create Project" : "Update Project"}
        </button>
      </div>
    </form>
  );
}
