"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, X, Save, Loader2, Award, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "@/lib/api";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  fileType?: string;
  order: number;
}

const emptyForm = { title: "", issuer: "", date: "", order: "0" };

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadCerts = () => {
    fetchCertificates()
      .then((data: Certificate[]) => Array.isArray(data) && setCerts(data))
      .catch(() => {});
  };

  useEffect(() => { loadCerts(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    setShowForm(true);
  };

  const openEdit = (cert: Certificate) => {
    setForm({
      title: cert.title,
      issuer: cert.issuer || "",
      date: cert.date || "",
      order: String(cert.order),
    });
    setEditingId(cert.id);
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("issuer", form.issuer);
      formData.append("date", form.date);
      formData.append("order", form.order);
      if (imageFile) formData.append("image", imageFile);

      if (editingId) {
        await updateCertificate(editingId, formData);
        showToast("success", "Certificate updated successfully!");
      } else {
        await createCertificate(formData);
        showToast("success", "Certificate uploaded successfully!");
      }
      setShowForm(false);
      loadCerts();
    } catch (err) {
      console.error(err);
      showToast("error", err instanceof Error ? err.message : "Failed to save certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    setDeleting(id);
    try {
      await deleteCertificate(id);
      showToast("success", "Certificate deleted successfully!");
      loadCerts();
    } catch (err) {
      console.error(err);
      showToast("error", err instanceof Error ? err.message : "Failed to delete certificate");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">Upload and manage your certificates</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Add Certificate
        </Button>
      </div>

      {/* Form Modal */}
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
              className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 mt-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Certificate" : "New Certificate"}
                </h2>
                <button onClick={() => setShowForm(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. Power BI Certification"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Issuer</Label>
                    <Input
                      value={form.issuer}
                      onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                      placeholder="e.g. Microsoft"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="e.g. January 2025"
                      className="mt-1"
                    />
                  </div>
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
                <div>
                  <Label>Certificate File *</Label>
                  <Input
                    type="file"
                    accept="image/*,.pdf,application/pdf"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1"
                    required={!editingId}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload an image or PDF of your certificate
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {editingId ? "Update" : "Upload"}
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

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-border bg-card overflow-hidden group"
          >
            {cert.imageUrl ? (
              cert.fileType === "pdf" ? (
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-red-500/70 mb-2" />
                    <p className="text-xs text-muted-foreground">PDF Certificate</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )
            ) : (
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <Award size={48} className="text-muted-foreground/30" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold">{cert.title}</h3>
              {cert.issuer && (
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              )}
              {cert.date && (
                <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
              )}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => openEdit(cert)} className="gap-1 flex-1">
                  <Pencil size={14} /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground gap-1 flex-1"
                  onClick={() => handleDelete(cert.id)}
                  disabled={deleting === cert.id}
                >
                  {deleting === cert.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {certs.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Award size={48} className="mx-auto mb-4 opacity-30" />
          <p>No certificates yet. Click &quot;Add Certificate&quot; to upload one.</p>
        </div>
      )}

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
