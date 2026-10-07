"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, Linkedin, MessageCircle, ArrowDown, MapPin, Sparkles, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/context/profile-context";

const roles = ["Web Developer", "App Developer", "Co-Founder @ Fusionexlabs","Data Analyst", "AI Enthusiast"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const profile = useProfile();

  const socials = [
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: MessageCircle, href: `https://wa.me/${profile.whatsapp}`, label: "WhatsApp" },
  ];

  // Mouse-tracking for interactive tilt on the profile card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 40, 0], y: [0, 40, -20, 0], scale: [1, 0.95, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-cyan-400/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fuchsia-500/10 blur-3xl"
        />
      </div>

      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            <span>Available for work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">Harsh</span>
          </motion.h1>

          {/* Animated role text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-8 sm:h-10 mb-6 overflow-hidden"
          >
            <motion.p
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              onAnimationComplete={() => {
                setTimeout(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2000);
              }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
            >
              {roles[roleIndex]}
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-4"
          >
            I build modern, scalable web and mobile applications.
            Passionate about turning ideas into digital reality with clean code and great design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8 justify-center lg:justify-start"
          >
            <MapPin size={14} />
            <span>Mumbai, India</span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8 justify-center lg:justify-start"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 bg-brand-gradient text-white rounded-full font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
              >
                Get in Touch
              </motion.button>
            </Link>
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-7 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                View Projects
              </motion.button>
            </Link>
            <motion.a
              href={profile.resumeUrl || "/resume.pdf"}
              download="Harsh_Kamble_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <Download size={16} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="glass p-2.5 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary text-muted-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right: Profile image with interactive tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Glow ring behind image */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/50 via-cyan-400/20 to-transparent blur-2xl" />

            {/* Profile image container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border border-white/15 ring-4 ring-primary/20 shadow-2xl shadow-primary/20">
              <Image
                src="/profile.jpeg"
                alt="Harsh Kamble"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-[2.5rem] border border-dashed border-primary/30"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
            </motion.div>

            {/* Floating status badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 sm:bottom-2 sm:right-2 px-4 py-2 glass rounded-full shadow-lg text-sm font-medium"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs tracking-wider uppercase">Scroll down</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
