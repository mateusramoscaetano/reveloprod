"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MarcaAsset } from "@/components/marca/MarcaAsset";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const asset3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
      gsap.from(".hero-photo", {
        opacity: 0,
        scaleY: 0.96,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        transformOrigin: "top center",
      });

      gsap.from(".hero-marca-deco", {
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.65,
      });

      gsap.from(asset3Ref.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.9,
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

      gsap.to(".hero-marca-deco", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Asset-3: slow infinite rotation + parallax on scroll
      gsap.to(asset3Ref.current, {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      gsap.to(asset3Ref.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, section);

    // Magnetic CTA
    const cta = ctaRef.current;
    let xTo: ReturnType<typeof gsap.quickTo> | null = null;
    let yTo: ReturnType<typeof gsap.quickTo> | null = null;

    const onCtaMove = (e: MouseEvent) => {
      if (!cta) return;
      if (!xTo) xTo = gsap.quickTo(cta, "x", { duration: 0.4, ease: "power3.out" });
      if (!yTo) yTo = gsap.quickTo(cta, "y", { duration: 0.4, ease: "power3.out" });
      const r = cta.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.28);
      yTo((e.clientY - r.top - r.height / 2) * 0.38);
    };

    const onCtaLeave = () => {
      gsap.to(cta, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
    };

    cta?.addEventListener("mousemove", onCtaMove);
    cta?.addEventListener("mouseleave", onCtaLeave);

    return () => {
      ctx.revert();
      cta?.removeEventListener("mousemove", onCtaMove);
      cta?.removeEventListener("mouseleave", onCtaLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-red pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0%, transparent 60%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.45'/%3E%3C/svg%3E")
          `,
          backgroundSize: "cover, cover, 180px 180px",
          opacity: 0.62,
          mixBlendMode: "overlay",
        }}
      />

      <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center md:justify-start pb-0">
        <img
          src="/marca/rvlo-black.svg"
          alt=""
          width={278}
          height={131}
          decoding="async"
          draggable={false}
          className="w-[min(185vw,1600px)] max-w-none h-auto shrink-0 select-none object-contain object-bottom opacity-10 translate-y-[5%] md:translate-x-[-2%] lg:translate-x-[-4%]"
        />
      </div>

      {/* Asset-3: decorativo canto inferior-esquerdo com rotação lenta */}
      <div
        ref={asset3Ref}
        className="pointer-events-none absolute top-[-22%] left-[-7%] z-3 w-[220px] md:w-[320px]"
      >
        <MarcaAsset asset={3} opacity={0.13} className="w-full mix-blend-soft-light" />
      </div>



      <div className="relative z-20 flex-1 flex flex-col md:flex-row">
        <div
          className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14 py-6 md:py-10"
          style={{
            fontSize: "clamp(2rem, 5.2vw + 0.55rem, 4.75rem)",
            lineHeight: 1.06,
          }}
        >
          <div className="flex flex-col gap-y-2 md:gap-y-2.5">
            <div className="overflow-hidden">
              <h1 className="hero-line font-sans-tight font-black uppercase tracking-tight text-brand-cream leading-[inherit] text-[1.5em]">
                REVELAMOS
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-line font-serif italic text-brand-cream leading-[inherit] text-[1.5em] pb-[0.06em]">
                aquilo
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-line font-sans-tight font-black uppercase tracking-tight text-brand-cream leading-[inherit] text-[1em]">
                QUE SE É
              </h1>
            </div>

            <div className="overflow-hidden">
              <div className="flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1">
                <h1 className="hero-line font-serif italic text-brand-cream leading-[inherit] text-[1.5em] shrink-0 pb-[0.06em]">
                  incapaz
                </h1>
                <h1 className="hero-line font-sans-tight font-black uppercase tracking-tight text-brand-dark leading-[inherit] text-[1em] min-w-0">
                  DE ENXERGAR.
                </h1>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="relative z-20 hero-bottom border-t border-brand-cream/10 px-6 md:px-10 py-4 flex justify-between items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-cream/40">
          Formaturas · Family · Eventos · Estúdios · Marcas · Corporativos
        </span>
        <a
          ref={ctaRef}
          href="#contato"
          className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/60 hover:text-brand-cream transition-colors group inline-flex items-center gap-1"
        >
          fale conosco
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
