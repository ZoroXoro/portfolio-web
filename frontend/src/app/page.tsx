"use client";

import HeroSection from "@/components/hero-section";
import ScrollReveal from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ArrowRight, Code2, Smartphone, Database, Brain } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/page-transition";

const highlights = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building modern, responsive websites with Next.js, React, and the MERN stack.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Cross-platform mobile apps with Flutter and Firebase for scalable solutions.",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Analyzing data and building inventory & ERP systems with Python and Power BI.",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Exploring LangChain, LangGraph, and ML to build intelligent applications.",
  },
];

const techStack = [
  "Python", "JavaScript", "React", "Next.js", "Node.js", "Express",
  "Flutter", "MongoDB", "Firebase", "SQL", "Git", "FastAPI",
  "LangChain", "Power BI", "HTML/CSS", "Tailwind",
];

export default function HomePage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <HeroSection />

      {/* What I Do Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What I Do
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              From concept to deployment — I build digital solutions that make a difference.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Tech Stack
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium cursor-default hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
