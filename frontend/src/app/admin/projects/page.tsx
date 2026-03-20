"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { fetchProjects, createProject, updateProject, deleteProject } from "@/lib/api";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  imageUrl: string;
  role?: string;
  company?: string;
  location?: string;
  period?: string;
  order: number;
}

const emptyProject = {
  title: "",
  description: "",
  tech: "",
  link: "",
  github: "",
  role: "",
  company: "",
  location: "",
  period: "",
  order: "0",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadProjects = () => {
    fetchProjects()
      .then((data: Project[]) => Array.isArray(data) && setProjects(data))
      .catch(() => {});
  };

  useEffect(() => { loadProjects(); }, []);

  const openCreate = () => {
    setForm(emptyProject);
    setEditingId(null);
    setImageFile(null);
    setShowForm(true);
  };

  const openEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      link: project.link || "",
      github: project.github || "",
      role: project.role || "",
      company: project.company || "",
      location: project.location || "",
      period: project.period || "",
      order: String(project.order),
    });
    setEditingId(project.id);
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("tech", JSON.stringify(form.tech.split(",").map((t) => t.trim()).filter(Boolean)));
      formData.append("link", form.link);
      formData.append("github", form.github);
      formData.append("role", form.role);
      formData.append("company", form.company);
      formData.append("location", form.location);
      formData.append("period", form.period);
      formData.append("order", form.order);
      if (imageFile) formData.append("image", imageFile);

      if (editingId) {
        await updateProject(editingId, formData);
        showToast("success", "Project updated successfully!");
      } else {
        await createProject(formData);
        showToast("success", "Project created successfully!");
      }
      setShowForm(false);
      loadProjects();
    } catch (err) {
      console.error(err);
      showToast("error", err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(id);
    try {
      await deleteProject(id);
      showToast("success", "Project deleted successfully!");
      loadProjects();
    } catch (err) {
      console.error(err);
      showToast("error", err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Add Project
        </Button>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-6 overflow-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl p-6 mt-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Project" : "New Project"}
                </h2>
                <button onClick={() => setShowForm(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Order</Label>
                    <Input
                      type="number"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Tech Stack (comma separated)</Label>
                  <Input
                    value={form.tech}
                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                    placeholder="React, Next.js, Firebase"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Role / Designation</Label>
                    <Input
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. Web Developer"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Fusionexlabs"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Period</Label>
                    <Input
                      value={form.period}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                      placeholder="e.g. October 2025 – December 2025"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      value={form.link}
                      onChange={(e) => setForm({ ...form, link: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={form.github}
                      onChange={(e) => setForm({ ...form, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Project Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {editingId ? "Update" : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tech?.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => openEdit(project)} className="gap-1">
                <Pencil size={14} /> Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground gap-1"
                onClick={() => handleDelete(project.id)}
                disabled={deleting === project.id}
              >
                {deleting === project.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                Delete
              </Button>
            </div>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>No projects yet. Click &quot;Add Project&quot; to create one.</p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-6 left-1/2 z-[60] flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-500"
                : "bg-red-500/10 border-red-500/30 text-red-500"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="font-medium text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
