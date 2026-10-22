"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FolderKanban, Award, Inbox, FileText, ArrowUpRight, Plus, UserCircle, Eye } from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/context/profile-context";
import { fetchProjects, fetchCertificates, fetchConnections } from "@/lib/api";
import { timestampToDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: unknown;
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default function AdminDashboard() {
  const profile = useProfile();
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [certCount, setCertCount] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data: unknown[]) => setProjectCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setProjectCount(0));
    fetchCertificates()
      .then((data: unknown[]) => setCertCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setCertCount(0));
    fetchConnections()
      .then((data: Message[]) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]));
  }, []);

  const stats = [
    { title: "Projects", value: projectCount, icon: FolderKanban, href: "/admin/projects" },
    { title: "Certificates", value: certCount, icon: Award, href: "/admin/certificates" },
    { title: "Messages", value: messages?.length ?? null, icon: Inbox, href: "/admin/messages" },
    {
      title: "Resume",
      value: profile.resumeUrl ? "Uploaded" : "Default",
      icon: FileText,
      href: "/admin/profile",
    },
  ];

  const actions = [
    { label: "Add project", icon: Plus, href: "/admin/projects" },
    { label: "Upload certificate", icon: Award, href: "/admin/certificates" },
    { label: "Edit profile", icon: UserCircle, href: "/admin/profile" },
    { label: "View portfolio", icon: Eye, href: "/" },
  ];

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0, visualDuration: 0.4 }}
        className="flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-5"
      >
        <div>
          <h1 className="wide text-3xl font-bold tracking-[-0.02em]">
            {greeting()}, {profile.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">What&apos;s live on the portfolio right now.</p>
        </div>
        <a href="/" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:no-underline">
          Open the site <ArrowUpRight size={15} aria-hidden />
        </a>
      </motion.div>

      {/* Stats */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
        {stats.map((card) => (
          <li key={card.title} className="border-r border-b border-border">
          <Link href={card.href} className="group block h-full bg-card p-5 transition-colors hover:bg-accent">
            <div className="flex items-center justify-between mb-6">
              <card.icon size={18} className="text-muted-foreground" aria-hidden />
              <ArrowUpRight size={15} aria-hidden className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <p className="wide text-3xl font-bold tabular-nums">
              {card.value ?? <span className="inline-block h-8 w-10 bg-muted animate-pulse align-middle" />}
            </p>
            <p className="label text-muted-foreground mt-1">{card.title}</p>
          </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
        {/* Quick actions */}
        <section aria-labelledby="actions-title">
          <h2 id="actions-title" className="font-semibold border-t border-rule pt-4 mb-2">Quick actions</h2>
          <ul>
            {actions.map((a) => (
              <li key={a.label} className="border-b border-border">
                <Link href={a.href} className="flex items-center gap-3 py-3 text-sm font-medium hover:underline">
                  <a.icon size={16} aria-hidden className="text-muted-foreground" />
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent messages */}
        <section aria-labelledby="recent-title">
          <div className="flex items-center justify-between border-t border-rule pt-4 mb-2">
            <h2 id="recent-title" className="font-semibold">Recent messages</h2>
            <Link href="/admin/messages" className="text-sm font-semibold underline underline-offset-4 hover:no-underline">
              View all
            </Link>
          </div>
          {messages === null ? (
            <div className="space-y-2 pt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-14 bg-muted animate-pulse" />
              ))}
            </div>
          ) : messages.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8">No messages yet. They&apos;ll land here from the contact form.</p>
          ) : (
            <ul>
              {messages.slice(0, 4).map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3 border-b border-border">
                  <span className="grid place-items-center size-9 shrink-0 border border-border bg-card text-xs font-semibold uppercase">
                    {m.name?.[0] ?? "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium truncate">{m.name}</p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {timestampToDate(m.createdAt)?.toLocaleDateString() ?? ""}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{m.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
