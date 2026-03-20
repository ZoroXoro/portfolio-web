"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FolderKanban, Award, Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { fetchProjects, fetchCertificates } from "@/lib/api";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    fetchProjects()
      .then((data: unknown[]) => setProjectCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
    fetchCertificates()
      .then((data: unknown[]) => setCertCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
  }, []);

  const cards = [
    {
      title: "Projects",
      count: projectCount,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      title: "Certificates",
      count: certCount,
      icon: Award,
      href: "/admin/certificates",
      color: "from-amber-500/20 to-amber-600/10",
    },
    {
      title: "View Portfolio",
      count: null,
      icon: Eye,
      href: "/",
      color: "from-green-500/20 to-green-600/10",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your portfolio content</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link key={card.title} href={card.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-6 rounded-2xl border border-border bg-gradient-to-br ${card.color} hover:border-primary/30 transition-all cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-4">
                <card.icon size={24} className="text-primary" />
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              {card.count !== null && (
                <p className="text-3xl font-bold mt-2">{card.count}</p>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
