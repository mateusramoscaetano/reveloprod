"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { VideoCard } from "@/components/ui/VideoCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MarcaPattern } from "@/components/marca/MarcaPattern";

const allVideos = [
  { title: "Turma de Medicina 2024", category: "Formatura", year: "2024" },
  { title: "Família Rodrigues", category: "Family", year: "2024" },
  { title: "Congresso Nacional de Design", category: "Evento", year: "2023" },
  { title: "Turma de Direito 2023", category: "Formatura", year: "2023" },
  { title: "Família Almeida", category: "Family", year: "2023" },
  { title: "Lançamento Corporativo", category: "Evento", year: "2023" },
  { title: "Turma de Engenharia 2022", category: "Formatura", year: "2022" },
  { title: "Família Cardoso", category: "Family", year: "2022" },
];

export default function VideosPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vpage-hero", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".vpage-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
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
      <section className="bg-brand-red pt-36 pb-20 relative overflow-hidden">
        <MarcaPattern
          className="absolute inset-0 z-0 mix-blend-overlay"
          opacity={0.18}
          backgroundPosition="20% 50%"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 vpage-hero relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-cream/60 mb-6">
            — Galeria completa
          </p>
          <h1
            className="font-sans font-black uppercase text-brand-cream leading-none"
            style={{ fontSize: "clamp(56px,9vw,140px)" }}
          >
            VÍDEOS
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-brand-cream py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((v, i) => (
              <div key={i} className="vpage-card">
                <VideoCard {...v} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
