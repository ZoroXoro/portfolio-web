"use client";

import { useEffect, useState } from "react";
import PageTransition from "@/components/page-transition";
import ScrollReveal from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Award, X, ZoomIn, FileText, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  fileType?: string;
  order: number;
}

function CertificateSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-5">
        <div className="h-5 bg-muted rounded w-3/4 mb-2" />
        <div className="h-3 bg-muted rounded w-1/2 mb-3" />
        <div className="h-5 bg-muted rounded-full w-20" />
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/certificates`);
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        }
      } catch {
        // leave empty on error
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Certificates</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional certifications and achievements. Upload and manage certificates through the admin panel.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CertificateSkeleton key={i} />
              ))}
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-20">
              <Award size={64} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">
                Certificates will appear here once uploaded via the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, i) => (
                <ScrollReveal key={cert.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                    onClick={() => {
                      if (!cert.imageUrl) return;
                      if (cert.fileType === "pdf") {
                        window.open(cert.imageUrl, "_blank");
                      } else {
                        setSelectedCert(cert);
                      }
                    }}
                  >
                    {/* Certificate Image / PDF */}
                    {cert.imageUrl ? (
                      cert.fileType === "pdf" ? (
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center">
                          <div className="text-center">
                            <FileText size={56} className="mx-auto text-red-500/60 mb-3" />
                            <p className="text-sm text-muted-foreground font-medium">PDF Certificate</p>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <ExternalLink
                              size={32}
                              className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                          <img
                            src={cert.imageUrl}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <ZoomIn
                              size={32}
                              className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Award size={48} className="text-primary/40" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      {cert.issuer && (
                        <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      )}
                      {cert.date && (
                        <Badge variant="secondary" className="text-xs">
                          {cert.date}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{selectedCert.title}</h3>
                {selectedCert.issuer && (
                  <p className="text-zinc-400">{selectedCert.issuer}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
