"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

const allPhotos: Array<{ title: string; category: string }> = [
  { title: "Ensaio Antecipado", category: "Formatura" },
  { title: "Família Lima", category: "Family" },
  { title: "Família Menezes", category: "Family" },
  { title: "Evento Cultural", category: "Evento" },
  { title: "Colação de Grau", category: "Formatura" },
  { title: "Sessão Outono", category: "Family" },
  { title: "Cerimônia Pós-Pandemia", category: "Formatura" },
  { title: "Família Nunes", category: "Family" },
  { title: "Gala Corporativa", category: "Evento" },
  { title: "Turma de Letras", category: "Formatura" },
  { title: "Família Costa", category: "Family" },
  { title: "Conferência de Inovação", category: "Evento" },
];

export default function FotosPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fpage-hero", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".fpage-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.5,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <Navbar />

      {/* Page hero */}
      <section className="bg-brand-dark-800 pt-36 pb-20 relative overflow-hidden border-b border-brand-cream/10">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 fpage-hero">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-cream/40 mb-6">
            — Galeria completa
          </p>
          <h1
            className="font-sans font-black uppercase text-brand-cream leading-none"
            style={{ fontSize: "clamp(56px,9vw,140px)" }}
          >
            FOTOS
          </h1>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="bg-brand-dark py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 auto-rows-[220px] gap-3 md:grid-cols-3 md:auto-rows-[260px] md:gap-4">
            {allPhotos.map((p, i) => (
              <div key={i} className="fpage-card min-h-0">
                <PhotoCard {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
