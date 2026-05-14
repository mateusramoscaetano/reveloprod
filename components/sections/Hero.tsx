"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: "115%",
        duration: 1,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".hero-bottom", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.to(".hero-bg", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-red pt-14"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.62,
          mixBlendMode: "overlay",
        }}
      />

      {/* Fundo decorativo — "RVLÔ" em Kathy Style, paralax */}
      <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end pb-0">
        <p
          className="font-serif text-brand-dark/10 whitespace-nowrap leading-none select-none tracking-tight"
          style={{ fontSize: "34vw", lineHeight: 0.8 }}
        >
          RVLÔ
        </p>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14 py-6">
        {/* Linha 1 — NHG sans heavy */}
        <div className="overflow-hidden">
          <h1
            className="hero-line font-sans font-black uppercase text-brand-cream leading-[0.87]"
            style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
          >
            SE ENTREGUE
          </h1>
        </div>

        {/* Linha 2 */}
        <div className="overflow-hidden relative">
          <h1
            className="hero-line font-sans font-black uppercase text-brand-cream leading-[0.87]"
            style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
          >
            POR COMPLETO
          </h1>
        </div>

        {/* Linha 3 — "AO" NHG + "MELHOR" Kathy Style + "QUE" NHG */}
        <div className="overflow-hidden flex flex-wrap items-baseline leading-none">
          <h1
            className="hero-line font-sans font-black uppercase text-brand-cream leading-[0.87] mr-[0.2em]"
            style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
          >
            AO
          </h1>
          <h1
            className="hero-line font-serif text-brand-cream leading-[0.87] mr-[0.2em]"
            style={{ fontSize: "clamp(40px,7.8vw,116px)", fontStyle: "normal" }}
          >
            MELHOR
          </h1>
          <h1
            className="hero-line font-sans font-black uppercase text-brand-cream leading-[0.87]"
            style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
          >
            QUE
          </h1>
        </div>

        {/* Linha 4 — "SE PODE" NHG + "FAZER" Kathy Style em preto */}
        <div className="overflow-hidden flex flex-wrap items-baseline leading-none">
          <h1
            className="hero-line font-sans font-black uppercase text-brand-cream leading-[0.87] mr-[0.2em]"
            style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
          >
            SE PODE
          </h1>
          <h1
            className="hero-line font-serif text-brand-dark leading-[0.87]"
            style={{ fontSize: "clamp(40px,7.8vw,116px)", fontStyle: "normal" }}
          >
            FAZER.
          </h1>
        </div>
      </div>

      {/* Rodapé */}
      <div className="relative z-20 hero-bottom border-t border-brand-cream/10 px-6 md:px-10 py-4 flex justify-between items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-cream/40">
          Formaturas · Family · Eventos
        </span>
        <a
          href="#contato"
          className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/60 hover:text-brand-cream transition-colors"
        >
          fale conosco →
        </a>
      </div>
    </section>
  );
}
