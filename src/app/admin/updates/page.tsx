"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { IUpdate } from "@/models/Update"; // We'll just use the Interface for types

interface UpdateItem {
  _id: string;
  title: string;
  content: string;
  category: "blog" | "update" | "achievement";
  createdAt: string;
}

export default function AdminUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "update",
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api/updates");
      if (res.ok) {
        const data = await res.json();
        setUpdates(data);
      }
    } catch (error) {
      console.error("Failed to fetch updates");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/updates/${editingId}` : "/api/updates";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormOpen(false);
        setEditingId(null);
        setFormData({ title: "", content: "", category: "update" });
        fetchUpdates();
      }
    } catch (error) {
      console.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/updates/${id}`, { method: "DELETE" });
      setUpdates(updates.filter(u => u._id !== id));
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  const handleEdit = (update: UpdateItem) => {
    setEditingId(update._id);
    setFormData({
      title: update.title,
      content: update.content,
      category: update.category,
    });
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Updates</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: "", content: "", category: "update" });
            setFormOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> New Update
        </button>
      </div>

      {formOpen && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-background border border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-background border border-border"
                >
                  <option value="update">Update</option>
                  <option value="blog">Blog</option>
                  <option value="achievement">Achievement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
              <textarea
                required
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-background border border-border font-mono text-sm"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {updates.map((update) => (
          <div key={update._id} className="p-4 rounded-xl border border-border bg-card flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 rounded-full">{update.category}</span>
                <span className="text-xs text-muted-foreground">{new Date(update.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold">{update.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{update.content}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(update)}
                className="p-2 hover:bg-secondary rounded-md"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(update._id)}
                className="p-2 hover:bg-red-500/10 text-red-500 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {!loading && updates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No updates found. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}
