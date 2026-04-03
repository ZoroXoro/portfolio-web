"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Save, Loader2, CheckCircle, FileUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fetchProfile, updateProfile, uploadResume } from "@/lib/api";

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    name: "Harsh Kamble",
    title: "Web & App Developer",
    bio: "",
    email: "harshworks20@gmail.com",
    phone: "+91 7039140235",
    location: "Mumbai, India",
    github: "https://github.com/Harsh-kamble",
    linkedin: "https://www.linkedin.com/in/harsh-kamble",
    whatsapp: "917039140235",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<"idle" | "success" | "error">("idle");
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then((data: Record<string, string>) => {
        if (data && Object.keys(data).length > 0) {
          setForm((prev) => ({ ...prev, ...data }));
          if (data.resumeUrl) setHasResume(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setResumeUploading(true);
    setResumeStatus("idle");
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      await uploadResume(formData);
      setResumeStatus("success");
      setHasResume(true);
      setResumeFile(null);
      setTimeout(() => setResumeStatus("idle"), 4000);
    } catch {
      setResumeStatus("error");
      setTimeout(() => setResumeStatus("idle"), 4000);
    } finally {
      setResumeUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Update your personal information</p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-semibold text-lg">Personal Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                placeholder="Write a short bio..."
                className="mt-1"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-semibold text-lg">Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-semibold text-lg">Social Links</h2>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>WhatsApp Number (with country code, no +)</Label>
              <Input
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="917039140235"
                className="mt-1"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Resume</h2>
              {hasResume && (
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <CheckCircle size={12} /> Resume uploaded
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a PDF to replace the downloadable resume on your portfolio.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="max-w-xs"
              />
              <Button
                type="button"
                onClick={handleResumeUpload}
                disabled={!resumeFile || resumeUploading}
                className="gap-2"
              >
                {resumeUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <FileUp size={16} />
                )}
                {resumeUploading ? "Uploading..." : "Upload Resume"}
              </Button>
            </div>
            {resumeStatus === "success" && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle size={14} /> Resume updated successfully!
              </p>
            )}
            {resumeStatus === "error" && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> Upload failed. Check the file size (max 4MB).
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="gap-2" size="lg">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle size={16} />
            ) : (
              <Save size={16} />
            )}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
