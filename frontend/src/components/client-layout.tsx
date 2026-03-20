"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Download } from "lucide-react";
import { ProfileProvider } from "@/context/profile-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ProfileProvider>
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}

      {/* Floating Resume Download Button */}
      {!isAdmin && (
        <a
          href="/resume.pdf"
          download
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium text-sm group"
          aria-label="Download Resume"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Resume</span>
        </a>
      )}
    </ProfileProvider>
  );
}
