"use client";

import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { useState, FormEvent } from "react";
import { useProfile } from "@/context/profile-context";

export default function ContactPage() {
  const profile = useProfile();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null as string | null,
    },
  ];

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: profile.github,
      username: profile.github.replace("https://github.com/", "@"),
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile.linkedin,
      username: profile.name,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${profile.whatsapp}`,
      username: profile.phone,
    },
  ];

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <motion.div
                className="p-8 rounded-2xl border border-border bg-card"
                whileHover={{ borderColor: "hsl(var(--primary) / 0.3)" }}
              >
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" size="lg" disabled={sending}>
                    {submitted ? "Message Sent!" : sending ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </Button>
                </form>
              </motion.div>
            </ScrollReveal>

            {/* Contact Info & Socials */}
            <div className="space-y-8">
              <ScrollReveal direction="right">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.label}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold mb-6">Social Links</h2>
                  <div className="space-y-3">
                    {socials.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 8, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <social.icon size={20} />
                          </div>
                          <div>
                            <p className="font-medium">{social.label}</p>
                            <p className="text-sm text-muted-foreground">{social.username}</p>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="text-muted-foreground group-hover:text-primary transition-colors"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
