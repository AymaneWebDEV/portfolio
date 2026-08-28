"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Pencil, X, Briefcase, GraduationCap } from "lucide-react";

interface ExperienceItem {
  id?: string;
  _id?: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  details?: string[];
  order_index?: number;
  order?: number;
}

const emptyForm = {
  type: "work" as "work" | "education",
  title: "",
  organization: "",
  period: "",
  description: "",
  details: "",
  tags: "",
  order_index: 0,
};

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/experience");
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const getItemId = (item: ExperienceItem) => item.id || item._id || "";

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item: ExperienceItem) => {
    setForm({
      type: item.type,
      title: item.title,
      organization: item.organization,
      period: item.period,
      description: item.description,
      details: Array.isArray(item.details) ? item.details.join("\n") : "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      order_index: item.order_index ?? item.order ?? 0,
    });
    setEditingId(getItemId(item));
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      type: form.type,
      title: form.title,
      organization: form.organization,
      period: form.period,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      details: form.details.split("\n").map((d) => d.trim()).filter(Boolean),
      order_index: Number(form.order_index) || 0,
    };

    try {
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        fetchItems();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save");
      }
    } catch {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => getItemId(i) !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Experience & Education</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your career timeline</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId ? "Edit Entry" : "New Entry"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "work" | "education" })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                  >
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Order Index</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Role / Degree Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Deep Learning & Computer Vision Intern"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Organization / School</label>
                  <input
                    type="text"
                    required
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. VitalTech Maroc"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    placeholder="e.g. 2026 or 2024 - 2025"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Executive Summary Description</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the experience..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Accomplishments (One bullet per line)
                </label>
                <textarea
                  rows={4}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Engineered an automated video processing pipeline...&#10;Trained a Logistic Regression meta-learner ensemble..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Tags / Technologies (Comma-separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="PyTorch, CUDA, OpenCV, Streamlit"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg text-sm border border-border hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
          <p className="mb-2 text-sm">No experience entries found</p>
          <button onClick={openNew} className="text-primary text-sm font-medium hover:underline">
            Add your first one →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const itemId = getItemId(item);
            return (
              <div key={itemId} className="flex items-center gap-4 p-4 border border-border bg-card rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {item.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-primary" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground font-medium">· {item.organization}</span>
                  </div>
                  <p className="text-xs text-primary font-mono mt-0.5">{item.period}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(itemId)}
                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
