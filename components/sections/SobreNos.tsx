"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

export function SobreNos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sobre-headline", {
        y: "105%",
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 68%" },
      });
      gsap.from(".sobre-body > *", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sobre-body", start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={ref}
      className="box-border flex h-dvh flex-col overflow-hidden bg-brand-cream/35 pt-14 md:pt-16"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col justify-center px-6 ">
        <div className="sobre-body grid w-full shrink-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {/* Coluna esquerda — 50% */}
          <div className="flex min-w-0 flex-col gap-4 md:gap-5">
            <div className="shrink-0 text-left">
              <div className="overflow-hidden pb-[0.08em]">
                <h2
                  className="sobre-headline font-serif text-brand-cream leading-[0.95]"
                  style={{ fontSize: "clamp(18px,4.5vw,48px)" }}
                >
                  Reconhecemos as transições e
                </h2>
              </div>
              <div className="overflow-hidden pb-[0.08em]">
                <h2
                  className="sobre-headline font-serif italic text-brand-pink leading-[0.95]"
                  style={{ fontSize: "clamp(18px,4.5vw,48px)" }}
                >
                  documentamos cada uma delas
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-3">
              <p className="font-sans text-[14px] font-medium leading-snug text-brand-cream md:text-[16px]">
                A Revelô nasceu da vontade de registrar aquilo que passa despercebido, o gesto antes da pose, a reação real no meio do protocolo do dia.
              </p>
              <p className="font-sans text-[13px] leading-relaxed text-brand-cream/55 md:text-[14px]">
                Usamos moda, cinema e música como ferramenta de olhar, não como estilo aplicado por cima do resultado. É esse repertório que guia cada decisão de imagem, em formatura, evento ou marca.
              </p>
              <p className="font-sans text-[13px] leading-relaxed text-brand-cream/55 md:text-[14px]">
                Mais do que produzir fotos e vídeos, prestamos atenção no que ninguém pediu pra ser notado. É isso que transforma o resultado numa memória que você queira guardar, não só mais um registro do dia.
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-brand-cream/30">
                Part of Atmosfera · Curitiba, BR
              </p>
            </div>
          </div>

          {/* Coluna direita — 50% */}
          <div className="flex min-w-0 flex-col gap-2.5 md:gap-3">
            <div className="w-full min-h-[200px] flex-1 overflow-hidden border border-brand-cream/10 md:min-h-[280px] lg:min-h-[320px]">
              <ImagePlaceholder aspectRatio="video" fit="fill" label="vídeo" />
            </div>

            <div className="inline-block w-fit max-w-full bg-brand-red px-3 py-1.5 md:px-4 md:py-2">
              <p className="font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-brand-cream">
                RVLÔ PROD. Esse é o nosso ponto de vista
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 shrink-0 w-full border-t border-brand-cream/10 pt-2 pb-3 md:mt-4 md:pb-4">
        <TestimonialCarousel compact />
      </div>
    </section>
  );
}
