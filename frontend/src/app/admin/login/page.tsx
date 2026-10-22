"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      router.push("/admin");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("Login error:", firebaseError.code, firebaseError.message);
      if (firebaseError.code === "auth/invalid-credential" || firebaseError.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (firebaseError.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else if (firebaseError.code === "auth/invalid-api-key") {
        setError("Firebase configuration error. Check your API key.");
      } else {
        setError(firebaseError.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: brand + 3D */}
      <div className="hidden lg:flex flex-col justify-between bg-foreground text-background p-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-background/80 hover:text-background transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to the site
        </Link>
        <div>
          <p className="mark text-[6rem]">ZORO</p>
          <p className="mt-4 max-w-sm text-lg text-background/75">Projects, certificates, profile, resume and messages — everything the site shows is edited here.</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0, visualDuration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <p className="mark text-2xl mb-8 lg:hidden">ZORO</p>
            <h1 className="wide text-3xl font-bold tracking-[-0.02em]">Sign in</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your portfolio.</p>
          </div>

          <div className="border-t border-rule pt-7">
            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 text-destructive text-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-base active:scale-[0.98]" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
