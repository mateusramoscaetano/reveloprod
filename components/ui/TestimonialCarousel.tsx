"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const testimonials = [
  {
    quote: "A Revelô captou exatamente a energia da nossa turma. Cada foto parece um frame de filme.",
    author: "Turma Medicina PUC-PR",
    year: "2024",
  },
  {
    quote: "O Family Day foi o dia mais especial da nossa formatura. Nunca vimos algo assim no mercado.",
    author: "Comissão de Formatura FAG",
    year: "2024",
  },
  {
    quote: "Entrega no prazo, curadoria impecável e um olhar que faz a diferença em cada clique.",
    author: "Atlética Direito PUCPR",
    year: "2023",
  },
  {
    quote: "Profissionais que entendem o momento. Não é só foto, é memória com personalidade.",
    author: "Turma Medicina UP",
    year: "2024",
  },
  {
    quote: "A equipe esteve presente em cada etapa. Do pré-evento à colação, tudo foi registrado com alma.",
    author: "Comissão CESUT",
    year: "2023",
  },
];

interface TestimonialCarouselProps {
  compact?: boolean;
}

export function TestimonialCarousel({ compact = false }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      duration: compact ? 28 : 35,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [compact]);

  const allItems = [...testimonials, ...testimonials];

  return (
    <div className="w-full overflow-x-hidden overflow-y-visible">
      <div ref={trackRef} className="flex gap-3 w-max">
        {allItems.map((t, i) => (
          <div
            key={i}
            className={
              compact
                ? "shrink-0 w-[220px] md:w-[260px] border border-brand-cream/10 bg-brand-dark/40 px-4 py-3 flex flex-col gap-2"
                : "shrink-0 w-[280px] md:w-[320px] border border-brand-cream/10 bg-brand-dark/40 p-6 flex flex-col gap-4"
            }
          >
            <p
              className={
                compact
                  ? "font-serif italic text-[13px] text-brand-cream/75 leading-snug  tracking-wide line-clamp-2"
                  : "font-serif italic text-[15px] md:text-[16px] text-brand-cream/75 tracking leading-relaxed "
              }
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className={compact ? "flex items-baseline justify-between gap-2" : "mt-auto pt-2 border-t border-brand-cream/10"}>
              <p
                className={
                  compact
                    ? "font-sans font-black uppercase text-brand-cream text-[10px] tracking-[0.12em] truncate"
                    : "font-sans font-black uppercase text-brand-cream text-[12px] tracking-[0.12em]"
                }
              >
                {t.author}
              </p>
              <p className="font-mono text-[8px] uppercase tracking-widest text-brand-cream/35 shrink-0">
                {t.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
