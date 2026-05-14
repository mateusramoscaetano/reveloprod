"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { VideoCard } from "@/components/ui/VideoCard";

const videos = [
  { title: "Turma de Medicina 2024", category: "Formatura", year: "2024" },
  { title: "Família Rodrigues", category: "Family", year: "2024" },
  { title: "Congresso Nacional de Design", category: "Evento", year: "2023" },
  { title: "Turma de Direito 2023", category: "Formatura", year: "2023" },
];

export function Videos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vid-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 38%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(".vid-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vid-card",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-brand-cream overflow-hidden py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-dark/40 mb-5">
              — Nossos vídeos
            </p>
            <div className="vid-title overflow-hidden pb-[0.22em]">
              <span
                className="block font-sans font-black uppercase text-brand-dark leading-[0.92]"
                style={{ fontSize: "clamp(64px,10vw,152px)" }}
              >
                VÍDEOS
              </span>
            </div>
          </div>
          <Link
            href="/videos"
            className="self-start md:self-end mb-1 bg-brand-dark text-brand-cream rounded-none px-8 py-4 font-sans font-black uppercase text-[15px] tracking-wider hover:bg-brand-red transition-colors duration-300 whitespace-nowrap"
          >
            Ver todos →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((v, i) => (
            <div key={i} className="vid-card">
              <VideoCard {...v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
