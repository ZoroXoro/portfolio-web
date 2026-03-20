"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ExternalLink, Github, Calendar, MapPin } from "lucide-react";
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

// Default projects from resume (used as fallback)
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Himalaya Composites ERP System",
    description:
      "Developed a comprehensive ERP system for Himalaya Composites Pvt Ltd including inventory management, production tracking, and dispatch management. Built a store inventory system to track raw materials used in daily production. Redesigned the company website with an admin panel for seamless updates.",
    tech: ["Python", "Data Analysis", "Web Development", "ERP"],
    role: "Data Analyst & Software Developer",
    company: "Himalaya Composites Pvt Ltd",
    location: "Ahmedabad",
    period: "February 2026 – Ongoing",
    github: "https://github.com/Harsh-kamble",
    order: 0,
  },
  {
    id: "2",
    title: "Dr. Pooja's Rehab & Therapy Centre",
    description:
      "Created a professional website for Dr. Pooja's Clinic featuring an automated chatbot for appointment bookings and providing basic clinic details. The website showcases the doctor's career journey and treatments offered to build trust with patients.",
    tech: ["Next.js", "Firebase", "Chatbot"],
    link: "https://www.drpoojasclinic.com",
    role: "Web Developer",
    company: "Fusionexlabs",
    location: "Mumbai",
    period: "October 2025 – December 2025",
    order: 1,
  },
  {
    id: "3",
    title: "Lolo Fruits - Marketplace App",
    description:
      "Developed the Lolo Fruits website and mobile app — a fruit marketplace where imported fruits and their details are listed for wholesalers. Features a subscription model for accessing detailed product information.",
    tech: ["Flutter", "Firebase", "Web Development"],
    link: "https://www.lolofruits.com",
    role: "Developer",
    company: "Fusionexlabs",
    location: "Mumbai",
    period: "April 2025 – March 2026",
    order: 2,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setProjects(data);
        }
      } catch {
        // Use default projects on error
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
                            href={project.link}
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
                            href={project.github}
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
        </div>
      </section>
    </PageTransition>
  );
}
