"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ExternalLink, Github, Calendar, MapPin, FolderOpen } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  imageUrl?: string;
  role?: string;
  company?: string;
  location?: string;
  period?: string;
  order: number;
}

function toAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="w-full h-48 sm:h-56 md:h-64 bg-muted" />
      <div className="p-6 md:p-8">
        <div className="h-7 bg-muted rounded-lg w-2/3 mb-3" />
        <div className="h-4 bg-muted rounded w-1/3 mb-2" />
        <div className="flex gap-3 mb-4">
          <div className="h-3 bg-muted rounded w-20" />
          <div className="h-3 bg-muted rounded w-28" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-3/4" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded-full w-16" />
          <div className="h-5 bg-muted rounded-full w-20" />
          <div className="h-5 bg-muted rounded-full w-14" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch {
        // leave empty on error
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A collection of projects I&apos;ve built — from client websites to enterprise ERP systems.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen size={64} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">
                Projects will appear here once added via the admin panel.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
                  >
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          {project.role && (
                            <p className="text-sm text-primary/80 font-medium mt-1">
                              {project.role}
                              {project.company && ` at ${project.company}`}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            {project.location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin size={14} /> {project.location}
                              </span>
                            )}
                            {project.period && (
                              <span className="inline-flex items-center gap-1">
                                <Calendar size={14} /> {project.period}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-2">
                          {project.link && (
                            <motion.a
                              href={toAbsoluteUrl(project.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                              aria-label="Live site"
                            >
                              <ExternalLink size={16} />
                            </motion.a>
                          )}
                          {project.github && (
                            <motion.a
                              href={toAbsoluteUrl(project.github)}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                              aria-label="GitHub"
                            >
                              <Github size={16} />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
