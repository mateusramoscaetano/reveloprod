"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { MarcaPattern } from "@/components/marca/MarcaPattern";
import { MarcaAsset } from "@/components/marca/MarcaAsset";

const photos: Array<{ title: string; category: string }> = [
  { title: "Ensaio Antecipado", category: "Formatura" },
  { title: "Família Lima", category: "Family" },
  { title: "Família Menezes", category: "Family" },
  { title: "Evento Cultural", category: "Evento" },
  { title: "Colação de Grau", category: "Formatura" },
  { title: "Sessão Outono", category: "Family" },
];

export function Fotos() {
  const ref = useRef<HTMLElement>(null);
  const asset1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".foto-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".foto-card").forEach((card) => {
        gsap.from(card, {
          y: 52,
          opacity: 0,
          scale: 0.94,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      gsap.from(asset1Ref.current, {
        x: 40,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.to(asset1Ref.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-brand-dark overflow-hidden py-20 md:py-32">
      <MarcaPattern
        className="absolute inset-0 z-0 mix-blend-soft-light"
        opacity={0.1}
        backgroundPosition="right top"
      />

      {/* Asset-1: decorativo canto superior-direito */}
      <div
        ref={asset1Ref}
        className="pointer-events-none absolute top-[-5%] right-[-4%] z-[1] w-[180px] md:w-[250px] hidden md:block"
      >
        <MarcaAsset asset={1} opacity={0.12} className="w-full mix-blend-soft-light" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/40 mb-5">
              — Galeria
            </p>
            <div className="foto-title overflow-hidden">
              <span
                className="block font-sans font-black uppercase text-brand-cream leading-[0.86]"
                style={{ fontSize: "clamp(64px,10vw,152px)" }}
              >
                FOTOS
              </span>
            </div>
          </div>
          <Link
            href="/fotos"
            className="group self-start md:self-end mb-1 bg-brand-red text-brand-cream rounded-none px-8 py-4 font-sans font-black uppercase text-[15px] tracking-wider hover:bg-brand-pink hover:text-brand-dark transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-2"
          >
            Ver todas
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Grid alinhado — mesma altura por linha */}
        <div className="grid grid-cols-2 auto-rows-[220px] gap-3 md:grid-cols-3 md:auto-rows-[260px] md:gap-4">
          {photos.map((p, i) => (
            <div key={i} className="foto-card min-h-0">
              <PhotoCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
