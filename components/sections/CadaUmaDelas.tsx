"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Seção "Cada uma delas" — replica o padrão visual central do manual:
 * letras gigantes RVLÔ em Kathy Style como plano de fundo,
 * fotos posicionadas dentro/ao redor dos letterforms.
 * Até as fotos chegarem, usa placeholders coloridos com a mesma composição.
 */
export function CadaUmaDelas() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cada-tag", {
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".cada-headline span", {
        y: "110%", duration: 1, stagger: 0.06, ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".cada-letter", {
        scale: 0.94, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".cada-letter", start: "top 78%" },
      });
      // Paralax nas fotos placeholder
      gsap.to(".cada-photo-1", {
        y: -40, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".cada-photo-2", {
        y: 40, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-brand-red overflow-hidden min-h-0 py-16 md:py-20"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Letras RVLÔ gigantes — plano de fundo */}
      <div
        className="cada-letter absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        <p
          className="font-serif text-brand-dark/20 whitespace-nowrap leading-none tracking-tight"
          style={{ fontSize: "clamp(160px,28vw,460px)" }}
        >
          RVLÔ
        </p>
      </div>

      {/* Fotos placeholder posicionadas sobre as letras */}
      {/* Foto 1 — sobre o R/V */}
      <div
        className="cada-photo-1 absolute bg-brand-dark-800 border border-brand-cream/10"
        style={{
          zIndex: 2,
          top: "18%",
          left: "8%",
          width: "clamp(140px,22vw,340px)",
          aspectRatio: "3/4",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-brand-cream/20">foto</p>
        </div>
      </div>

      {/* Foto 2 — sobre o L/Ó */}
      <div
        className="cada-photo-2 absolute bg-brand-dark-800 border border-brand-cream/10"
        style={{
          zIndex: 2,
          top: "28%",
          right: "7%",
          width: "clamp(160px,26vw,400px)",
          aspectRatio: "4/3",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-brand-cream/20">foto</p>
        </div>
      </div>

      {/* Texto sobre as letras */}
      <div
        className="relative z-10 flex flex-col items-center px-6 pb-10 pt-8 text-center md:px-10 md:pb-14 md:pt-10 mx-auto max-w-4xl"
      >
        <p className="cada-tag font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 mb-6 md:mb-8">
          — Esse é o nosso ponto de vista
        </p>

        <div className="cada-headline mb-3">
          <div className="overflow-hidden">
            <span
              className="block font-sans font-black uppercase text-brand-cream leading-none"
              style={{ fontSize: "clamp(14px,1.8vw,26px)", letterSpacing: "0.4em" }}
            >
              RECONHECEMOS
            </span>
          </div>
        </div>

        <div className="cada-headline">
          <div className="overflow-hidden">
            <span
              className="block font-serif text-brand-cream leading-none"
              style={{ fontSize: "clamp(48px,8vw,128px)" }}
            >
              AS TRANSIÇÕES
            </span>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-12">
          {["DOCUMENTAMOS", "CADA", "UMA", "DELAS"].map((w) => (
            <span
              key={w}
              className="font-sans font-black uppercase text-brand-cream/60"
              style={{ fontSize: "clamp(10px,1vw,14px)", letterSpacing: "0.3em" }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
