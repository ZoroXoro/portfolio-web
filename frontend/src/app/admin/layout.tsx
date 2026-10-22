"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthChange, logout } from "@/lib/auth";
import { User } from "firebase/auth";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  UserCircle,
  Inbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileProvider } from "@/context/profile-context";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/messages", label: "Inbox", icon: Inbox },
  { href: "/admin/profile", label: "Profile", icon: UserCircle },
];

const spring = { type: "spring", bounce: 0, visualDuration: 0.3 } as const;

function Brand() {
  return (
    <div className="flex items-baseline gap-3">
      <span className="mark text-xl">ZORO</span>
      <span className="label text-muted-foreground">Admin</span>
    </div>
  );
}

function SidebarContent({
  user,
  pathname,
  onNavigate,
  onLogout,
  indicatorId,
}: {
  user: User;
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
  indicatorId: string;
}) {
  return (
    <>
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {active && (
                <motion.span
                  layoutId={indicatorId}
                  transition={spring}
                  className="absolute inset-0 border-l-2 border-foreground bg-card"
                />
              )}
              <link.icon size={18} className="relative" />
              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 mt-4 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <ExternalLink size={18} />
          View portfolio
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="flex items-center gap-3 px-3 pt-3">
          <span className="grid place-items-center size-8 border border-border bg-card text-xs font-semibold uppercase">
            {user.email?.[0] ?? "?"}
          </span>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
      if (!u && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });
    return unsubscribe;
  }, [router, pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div role="status" aria-label="Loading" className="size-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <ProfileProvider>{children}</ProfileProvider>;
  }

  if (!user) return null;

  const handleLogout = () => logout().then(() => router.push("/admin/login"));

  return (
    <ProfileProvider>
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop: heavier material separates structure from content */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen border-r border-sidebar-border bg-sidebar p-5">
        <div className="mb-8 px-3">
          <Brand />
        </div>
        <SidebarContent user={user} pathname={pathname} onLogout={handleLogout} indicatorId="admin-nav-desktop" />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Brand />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
          className="p-2 hover:bg-accent"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar: scrim fades, drawer enters and leaves from the left edge */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-foreground/40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={spring}
              className="lg:hidden fixed inset-y-0 left-0 z-40 w-72 flex flex-col bg-sidebar border-r border-sidebar-border p-5 pt-20"
            >
              <SidebarContent
                user={user}
                pathname={pathname}
                onNavigate={() => setSidebarOpen(false)}
                onLogout={handleLogout}
                indicatorId="admin-nav-mobile"
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-6 lg:p-10 pt-24 lg:pt-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
    </ProfileProvider>
  );
}
