"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MarcaAsset } from "@/components/marca/MarcaAsset";

const items = [
  {
    title: "Olhar editorial",
    desc: "Estética de nível de revista, com a naturalidade de quem viveu o momento.",
  },
  {
    title: "Entrega no prazo",
    desc: "Compromisso com timeline claro — sem surpresas.",
  },
  {
    title: "Identidade própria",
    desc: "Paleta e tratamento consistentes, reconhecíveis à primeira vista.",
  },
  {
    title: "Atendimento próximo",
    desc: "Briefing antes, presença durante, suporte depois.",
  },
  {
    title: "Alta resolução",
    desc: "Arquivos prontos para impressão, redes e recordação.",
  },
];

export function Diferenciais() {
  const ref = useRef<HTMLElement>(null);
  const asset3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dif-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });
      gsap.from(".dif-row", {
        x: -50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dif-row", start: "top 80%" },
      });

      gsap.from(asset3Ref.current, {
        opacity: 0,
        scale: 0.88,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });

      gsap.to(asset3Ref.current, {
        rotation: 360,
        duration: 120,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      gsap.to(asset3Ref.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    // Hover interativo nas linhas de diferenciais
    const rows = ref.current?.querySelectorAll<HTMLElement>(".dif-row") ?? [];
    const handlers: Array<{ el: HTMLElement; onEnter: () => void; onLeave: () => void }> = [];

    rows.forEach((row) => {
      const check = row.querySelector<HTMLElement>(".dif-check");

      const onEnter = () => {
        gsap.to(row, { x: 10, duration: 0.35, ease: "power2.out" });
        if (check) {
          gsap.to(check, { rotation: 20, scale: 1.35, duration: 0.3, ease: "back.out(2)" });
        }
      };

      const onLeave = () => {
        gsap.to(row, { x: 0, duration: 0.45, ease: "power2.out" });
        if (check) {
          gsap.to(check, { rotation: 0, scale: 1, duration: 0.35, ease: "power2.out" });
        }
      };

      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      handlers.push({ el: row, onEnter, onLeave });
    });

    return () => {
      ctx.revert();
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-brand-red overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Asset-3: canto esquerdo com rotação lenta */}
      <div
        ref={asset3Ref}
        className="pointer-events-none absolute top-[-15%] left-[-10%] z-[1] w-[260px] md:w-[380px] hidden md:block"
      >
        <MarcaAsset asset={3} opacity={0.1} className="w-full mix-blend-soft-light" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">

        {/* Título */}
        <div className="mb-10 md:mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/50 mb-4 md:mb-5">
            — Por que a Revelô
          </p>
          <div className="dif-title">
            <div className="overflow-hidden">
              <span
                className="block font-sans font-black uppercase text-brand-cream leading-[0.86]"
                style={{ fontSize: "clamp(56px,9vw,140px)" }}
              >
                O QUE NOS
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block font-serif italic text-brand-pink leading-[0.92]"
                style={{ fontSize: "clamp(56px,9vw,140px)" }}
              >
                diferencia
              </span>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div
              key={i}
              className="dif-row flex items-start gap-6 md:gap-12 py-6 md:py-8 border-b border-dashed border-brand-cream/20 group cursor-default"
            >
              <span className="dif-check font-mono text-brand-pink text-[14px] flex-shrink-0 mt-1 w-5 inline-block">✓</span>
              <div className="flex flex-col md:flex-row gap-2 md:gap-16 flex-1 md:items-baseline">
                <h3
                  className="font-sans font-black uppercase text-brand-cream flex-shrink-0 md:w-72 group-hover:text-brand-pink transition-colors duration-300 leading-tight"
                  style={{ fontSize: "clamp(18px,2vw,26px)" }}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-[15px] text-brand-cream/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
