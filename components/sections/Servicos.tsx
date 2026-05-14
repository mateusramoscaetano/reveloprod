"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const tickerItems = [
  { label: "FORMATURAS", accent: false },
  { label: "FAMILY", accent: true },
  { label: "EVENTOS", accent: false },
  { label: "FORMATURAS", accent: true },
  { label: "FAMILY", accent: false },
  { label: "EVENTOS", accent: true },
];

const cards = [
  {
    num: "01",
    title: "FORMATURAS",
    desc: "Do ensaio antecipado à festa — cada etapa documentada com cuidado editorial. Entregamos história, não só foto.",
  },
  {
    num: "02",
    title: "FAMILY",
    desc: "Sessões que capturam vínculo e dinâmica reais. Sem poses ensaiadas — só o que vale lembrar.",
  },
  {
    num: "03",
    title: "EVENTOS",
    desc: "Corporativos, sociais ou íntimos. Cobertura completa em foto e vídeo com olhar editorial.",
  },
];

export function Servicos() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.from(".serv-card", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".serv-card",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    const track = trackRef.current;
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track?.addEventListener("mouseenter", pause);
    track?.addEventListener("mouseleave", resume);

    return () => {
      ctx.revert();
      track?.removeEventListener("mouseenter", pause);
      track?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const allItems = [...tickerItems, ...tickerItems];

  return (
    <section
      id="servicos"
      ref={ref}
      className="relative bg-brand-dark overflow-hidden pb-20 md:pb-32"
    >
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/40 mb-6">
          — O que fazemos
        </p>
        <div className="serv-header overflow-hidden pb-[0.22em]">
          <div className="overflow-hidden pb-[0.18em]">
            <span
              className="block font-sans font-black uppercase text-brand-cream leading-[0.92]"
              style={{ fontSize: "clamp(64px,10vw,152px)" }}
            >
              SERVIÇOS
            </span>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="overflow-hidden border-y border-brand-cream/10 py-4 mb-16">
        <div ref={trackRef} className="flex whitespace-nowrap">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center flex-shrink-0 px-10 group cursor-default"
            >
              <span
                className={`font-sans font-black uppercase leading-none select-none transition-colors duration-200 ${item.accent
                    ? "text-brand-pink group-hover:text-brand-cream"
                    : "text-brand-cream/50 group-hover:text-brand-pink"
                  }`}
                style={{ fontSize: "clamp(40px,5.5vw,80px)" }}
              >
                {item.label}
              </span>
              <span className="ml-10 font-mono text-brand-cream/15 text-[20px]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards de detalhe */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-cream/10">
          {cards.map((c) => (
            <div
              key={c.num}
              className="serv-card group px-0 md:px-10 py-10 md:py-0 first:md:pl-0 last:md:pr-0 hover:bg-brand-dark-800 md:hover:bg-transparent transition-colors duration-200"
            >
              <p className="font-mono text-[10px] text-brand-cream/25 uppercase tracking-widest mb-5">
                {c.num}
              </p>
              <h3
                className="font-sans font-black uppercase text-brand-cream leading-none mb-5 group-hover:text-brand-pink transition-colors duration-300"
                style={{ fontSize: "clamp(28px,3vw,40px)" }}
              >
                {c.title}
              </h3>
              <p className="font-sans text-[15px] text-brand-cream/55 leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
