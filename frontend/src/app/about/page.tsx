"use client";

import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  Languages,
  Briefcase,
  MapPin,
  Mail,
  Dumbbell,
  Music,
} from "lucide-react";

const skills = {
  technical: [
    "Python", "JavaScript", "HTML/CSS", "Flutter", "React", "Express",
    "Node.js", "Git & GitHub", "MongoDB", "SQL", "MERN Stack",
    "Web Development", "App Development", "FastAPI", "Machine Learning",
    "LangChain", "LangGraph", "R", "Power BI",
  ],
  soft: [
    "Team Collaboration", "Strategic Planning", "Problem Solving",
    "Communication", "Team Management",
  ],
};

const education = [
  {
    degree: "BSc. Computer Science",
    institution: "Patkar Varde College, Mumbai",
    period: "2022 - 2025",
  },
  {
    degree: "H.S.C.",
    institution: "Bhavans College, Mumbai",
    period: "2020 - 2022",
  },
  {
    degree: "S.S.C.",
    institution: "MVM Educational Campus, Mumbai",
    period: "2009 - 2020",
  },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Native" },
  { name: "Marathi", level: "Native" },
  { name: "German", level: "A2 Level" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={16} /> Mumbai, India
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail size={16} /> harshworks20@gmail.com
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                I&apos;m a dedicated Web and App Developer and Co-Founder of{" "}
                <span className="text-foreground font-semibold">Fusionexlabs</span>, a software
                development agency delivering modern digital solutions for diverse clients. I have
                hands-on experience creating responsive websites and mobile apps, with strong
                communication and collaboration skills. Passionate about continuous learning, I aim
                to deepen my expertise in AI and Machine Learning to build intelligent, future-ready
                applications.
              </p>
            </div>
          </ScrollReveal>

          <Separator className="mb-16" />

          {/* Skills */}
          <div className="mb-16">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="text-primary" size={28} />
                Technical Skills
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.technical.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 className="text-xl font-semibold mb-4 text-muted-foreground">Soft Skills</h3>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <Separator className="mb-16" />

          {/* Education */}
          <div className="mb-16">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="text-primary" size={28} />
                Education
              </h2>
            </ScrollReveal>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <ScrollReveal key={edu.degree} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <Badge variant="secondary" className="mt-2 sm:mt-0 w-fit">
                      {edu.period}
                    </Badge>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <Separator className="mb-16" />

          {/* Awards & Languages side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Awards */}
            <div>
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                  <Award className="text-primary" size={28} />
                  Awards
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <h3 className="font-semibold text-lg">
                    DIPAM Intercollegiate Project Competition
                  </h3>
                  <p className="text-muted-foreground">2nd Prize — December 2024</p>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Languages */}
            <div>
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                  <Languages className="text-primary" size={28} />
                  Languages
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((lang, i) => (
                  <ScrollReveal key={lang.name} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-xl border border-border bg-card text-center"
                    >
                      <h3 className="font-semibold">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground">{lang.level}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Fun Facts */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card"
              >
                <Dumbbell size={20} className="text-primary" />
                <span className="text-sm font-medium">Gym Enthusiast</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card"
              >
                <Music size={20} className="text-primary" />
                <span className="text-sm font-medium">Hip-Hop Music Fan</span>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
