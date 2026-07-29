"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

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

const LOOP_DURATION = 14;

export function TestimonialCarousel({ compact = false }: TestimonialCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.registerPlugin(Draggable, InertiaPlugin);

    const getHalf = () => track.scrollWidth / 2;

    const wrapX = (x: number) => {
      const half = getHalf();
      if (!half) return x;
      return gsap.utils.wrap(-half, 0, x);
    };

    const syncPosition = (x: number) => {
      positionRef.current = wrapX(x);
      gsap.set(track, { x: positionRef.current });
      return positionRef.current;
    };

    const tick = () => {
      if (pausedRef.current) return;

      const half = getHalf();
      if (!half) return;

      const speed = half / LOOP_DURATION;
      positionRef.current -= speed * (gsap.ticker.deltaRatio() / 60);

      if (positionRef.current <= -half) {
        positionRef.current += half;
      }

      gsap.set(track, { x: positionRef.current });
    };

    gsap.ticker.add(tick);

    const [draggable] = Draggable.create(track, {
      type: "x",
      inertia: true,
      cursor: compact ? "default" : "grab",
      activeCursor: "grabbing",
      onPress() {
        pausedRef.current = true;
      },
      onDrag() {
        syncPosition(this.x);
        this.update();
      },
      onThrowUpdate() {
        syncPosition(this.x);
        this.update();
      },
      onRelease() {
        syncPosition(gsap.getProperty(track, "x") as number);
        this.update();
        if (!this.isThrowing) {
          pausedRef.current = false;
        }
      },
      onThrowComplete() {
        syncPosition(gsap.getProperty(track, "x") as number);
        this.update();
        pausedRef.current = false;
      },
    });

    const onResize = () => {
      syncPosition(positionRef.current);
      draggable.update();
    };

    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tick);
      draggable.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [compact]);

  const allItems = [...testimonials, ...testimonials];

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden ${compact ? "" : "cursor-grab active:cursor-grabbing"}`}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-4 py-2 will-change-transform select-none touch-pan-y md:gap-6"
      >
        {allItems.map((t, i) => (
          <div
            key={i}
            className={
              compact
                ? "flex w-[220px] shrink-0 flex-col gap-2 border border-brand-cream/10 bg-brand-dark/40 px-4 py-3 md:w-[260px]"
                : "flex w-[min(85vw,400px)] shrink-0 flex-col gap-5 border border-brand-cream/15 bg-brand-cream/5 px-8 py-8 md:w-[400px]"
            }
          >
            <p
              className={
                compact
                  ? "line-clamp-2 font-serif text-[13px] leading-snug tracking-wide text-brand-cream/75"
                  : "font-serif text-[18px] leading-relaxed text-brand-cream/90 italic md:text-[20px]"
              }
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div
              className={
                compact
                  ? "flex items-baseline justify-between gap-2"
                  : "mt-auto border-t border-brand-cream/10 pt-2"
              }
            >
              <p
                className={
                  compact
                    ? "truncate font-sans text-[10px] font-black uppercase tracking-[0.12em] text-brand-cream"
                    : "font-sans text-[12px] font-black uppercase tracking-[0.12em] text-brand-cream"
                }
              >
                {t.author}
              </p>
              <p className="shrink-0 font-mono text-[8px] uppercase tracking-widest text-brand-cream/35">
                {t.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
