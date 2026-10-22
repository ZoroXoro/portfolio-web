"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Inbox, Mail, Trash2, Loader2, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchConnections, deleteConnection } from "@/lib/api";
import { timestampToDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: unknown;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchConnections()
      .then((data: Message[]) => setMessages(Array.isArray(data) ? data : []))
      .catch((err) => {
        setMessages([]);
        setError(err instanceof Error ? err.message : "Failed to load messages");
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This can't be undone.")) return;
    setDeleting(id);
    setError("");
    try {
      await deleteConnection(id);
      setMessages((prev) => prev?.filter((m) => m.id !== id) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
    } finally {
      setDeleting(null);
    }
  };

  const q = query.trim().toLowerCase();
  const visible = (messages ?? []).filter(
    (m) => !q || [m.name, m.email, m.message].some((f) => f?.toLowerCase().includes(q))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="wide text-3xl font-bold tracking-[-0.02em]">Inbox</h1>
          <p className="text-muted-foreground mt-1">
            Messages from your contact form{messages ? ` · ${messages.length} total` : ""}
          </p>
        </div>
        <div className="relative sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages"
            className="pl-9 h-10"
            aria-label="Search messages"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2  bg-destructive/10 px-4 py-3 mb-6 text-sm text-destructive">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      {messages === null ? (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="border border-border bg-card text-center py-20">
          <Inbox size={48} className="mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">{q ? "No messages match your search." : "No messages yet."}</p>
        </div>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence initial={false}>
            {visible.map((m) => {
              const date = timestampToDate(m.createdAt);
              return (
                <motion.li
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", bounce: 0, visualDuration: 0.3 }}
                  className="border border-border bg-card p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid place-items-center size-10 shrink-0  border border-border bg-background text-sm font-semibold uppercase">
                      {m.name?.[0] ?? "?"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <div className="min-w-0">
                          <p className="font-medium">{m.name}</p>
                          <a href={`mailto:${m.email}`} className="text-sm text-foreground underline underline-offset-4 hover:underline break-all">
                            {m.email}
                          </a>
                        </div>
                        {date && (
                          <time dateTime={date.toISOString()} className="text-xs text-muted-foreground font-mono">
                            {date.toLocaleString()}
                          </time>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                      <div className="mt-4 flex gap-2">
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message")}`}
                          className="inline-flex items-center gap-1.5 bg-primary px-3 h-8 text-sm font-medium text-primary-foreground hover:brightness-110 transition active:scale-[0.97]"
                        >
                          <Mail size={14} /> Reply
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1.5 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(m.id)}
                          disabled={deleting === m.id}
                        >
                          {deleting === m.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
