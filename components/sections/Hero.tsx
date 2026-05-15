"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function AnalogCamera() {
  return (
    <div
      className="floating-cam pointer-events-none select-none"
      style={{ perspective: "700px" }}
    >
      <div
        style={{
          width: "172px",
          height: "116px",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateY(-20deg) rotateX(8deg)",
          filter:
            "drop-shadow(0 28px 40px rgba(0,0,0,0.55)) drop-shadow(0 8px 12px rgba(0,0,0,0.3))",
        }}
      >
        {/* Corpo principal */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(145deg, #f5f2eb 0%, #e8e4dc 60%, #d8d4cc 100%)",
            borderRadius: "10px",
          }}
        />
        {/* Topo escuro */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "26px",
            background:
              "linear-gradient(180deg, #1a1a1a 0%, #222 100%)",
            borderRadius: "10px 10px 0 0",
          }}
        />
        {/* Botão disparador — sobressai do topo */}
        <div
          style={{
            position: "absolute",
            top: "-7px",
            right: "32px",
            width: "18px",
            height: "12px",
            background:
              "linear-gradient(180deg, #e83233 0%, #c02020 100%)",
            borderRadius: "4px 4px 2px 2px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
          }}
        />
        {/* Flash */}
        <div
          style={{
            position: "absolute",
            top: "7px",
            left: "14px",
            width: "26px",
            height: "13px",
            background:
              "linear-gradient(135deg, #e83233 0%, #c02020 100%)",
            borderRadius: "3px",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2)",
          }}
        />
        {/* Visor */}
        <div
          style={{
            position: "absolute",
            top: "7px",
            right: "18px",
            width: "16px",
            height: "11px",
            background: "#0a1220",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "2px",
            boxShadow: "inset 0 1px 3px rgba(100,150,255,0.15)",
          }}
        />
        {/* Lente — anel externo */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "42%",
            transform: "translate(-50%, -35%)",
            width: "64px",
            height: "64px",
            background:
              "radial-gradient(circle at 40% 35%, #3a3a4a, #111)",
            borderRadius: "50%",
            border: "5px solid #222",
            boxShadow:
              "0 0 0 2px rgba(255,255,255,0.07), inset 0 3px 6px rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Lente — anel médio */}
          <div
            style={{
              width: "42px",
              height: "42px",
              background:
                "radial-gradient(circle at 38% 32%, #1a2540, #030810)",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Lente — pupila */}
            <div
              style={{
                width: "22px",
                height: "22px",
                background:
                  "radial-gradient(circle at 40% 35%, #1a3a8a22, #00000099)",
                borderRadius: "50%",
              }}
            />
            {/* Highlight especular */}
            <div
              style={{
                position: "absolute",
                top: "7px",
                left: "9px",
                width: "11px",
                height: "6px",
                background: "rgba(255,255,255,0.28)",
                borderRadius: "50%",
                transform: "rotate(-35deg)",
              }}
            />
          </div>
        </div>
        {/* Label marca */}
        <div
          style={{
            position: "absolute",
            bottom: "9px",
            right: "12px",
            fontFamily: "monospace",
            fontSize: "7px",
            color: "rgba(13,13,13,0.4)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          atmosfera
        </div>
        {/* Estria de textura no corpo */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            bottom: "4px",
            right: "6px",
            width: "4px",
            background:
              "repeating-linear-gradient(180deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px)",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30px",
            bottom: "4px",
            right: "14px",
            width: "4px",
            background:
              "repeating-linear-gradient(180deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 4px)",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Texto reveal
      gsap.from(".hero-line", {
        y: "115%",
        duration: 1,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.2,
      });

      // Footer + foto reveal
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

      // Câmera: entrada
      gsap.from(".floating-cam", {
        scale: 0,
        opacity: 0,
        rotation: -20,
        duration: 1,
        ease: "back.out(1.4)",
        delay: 1.1,
      });

      // Câmera: float contínuo
      gsap.to(".floating-cam", {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".floating-cam > div", {
        rotationZ: 3,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax do fundo RVLÔ
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

      // Parallax suave da câmera no scroll
      gsap.to(".floating-cam", {
        y: "-=60",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
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

      {/* Fundo decorativo — "RVLÔ" em Kathy Style, paralax */}
      <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end pb-0">
        <p
          className="font-serif text-brand-dark/10 whitespace-nowrap leading-none select-none tracking-tight"
          style={{ fontSize: "34vw", lineHeight: 0.8 }}
        >
          RVLÔ
        </p>
      </div>

      {/* Câmera 3D flutuante */}
      <div className="pointer-events-none absolute z-30 right-[6%] md:right-[37%] top-[18%] md:top-[22%]">
        <AnalogCamera />
      </div>

      {/* Conteúdo principal — 2 colunas no desktop */}
      <div className="relative z-20 flex-1 flex flex-col md:flex-row">
        {/* Lado texto */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14 py-6 md:py-10">
          <div className="overflow-hidden">
            <h1
              className="hero-line font-sans-tight font-black uppercase text-brand-cream leading-[0.95]"
              style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
            >
              SE ENTREGUE
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              className="hero-line font-sans-tight font-black uppercase text-brand-cream leading-[0.95]"
              style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
            >
              POR COMPLETO
            </h1>
          </div>

          <div className="overflow-hidden flex flex-wrap items-baseline leading-none">
            <h1
              className="hero-line font-sans-tight font-black uppercase text-brand-cream leading-[0.95] mr-[0.2em]"
              style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
            >
              AO
            </h1>
            <h1
              className="hero-line font-serif text-brand-cream leading-[0.95] mr-[0.2em]"
              style={{ fontSize: "clamp(40px,7.8vw,116px)", fontStyle: "normal" }}
            >
              MELHOR
            </h1>
            <h1
              className="hero-line font-sans-tight font-black uppercase text-brand-cream leading-[0.95]"
              style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
            >
              QUE
            </h1>
          </div>

          <div className="overflow-hidden flex flex-wrap items-baseline leading-none">
            <h1
              className="hero-line font-sans-tight font-black uppercase text-brand-cream leading-[0.95] mr-[0.2em]"
              style={{ fontSize: "clamp(38px,7.2vw,95px)" }}
            >
              SE PODE
            </h1>
            <h1
              className="hero-line font-serif text-brand-dark leading-[0.95]"
              style={{ fontSize: "clamp(40px,7.8vw,116px)", fontStyle: "normal" }}
            >
              FAZER.
            </h1>
          </div>
        </div>

        {/* Foto placeholder — coluna direita */}
        <div className="hero-photo relative w-full md:w-[40%] lg:w-[38%] min-h-[56vw] md:min-h-0 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          {/* Label sutil */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none">
            <div
              className="mb-3 flex items-center justify-center rounded-full"
              style={{
                width: 40,
                height: 40,
                border: "1px solid rgba(240,237,230,0.1)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.2 }}
              >
                <path
                  d="M1 5.5C1 4.67 1.67 4 2.5 4h1.086l.707-1.414A1 1 0 0 1 5.191 2h5.618a1 1 0 0 1 .898.586L12.414 4H13.5C14.33 4 15 4.67 15 5.5v7A1.5 1.5 0 0 1 13.5 14h-11A1.5 1.5 0 0 1 1 12.5v-7Z"
                  stroke="#f0ede6"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="9" r="2.5" stroke="#f0ede6" strokeWidth="1.2" />
              </svg>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-cream/15">
              foto principal
            </span>
          </div>
          {/* Linha decorativa esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-brand-cream/5 hidden md:block" />
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
