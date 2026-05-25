"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

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
      className="box-border flex min-h-dvh flex-col overflow-hidden bg-brand-cream/35 pt-16 md:pt-30"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 md:px-10 lg:px-14 pb-10 md:pb-14 min-h-0">
        {/* Bloco título — alinhado ao topo da área útil (referência Flashbang) */}
        <div className="mb-8 shrink-0 md:mb-10 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/35 mb-4 md:mb-5">
            — Quem somos
          </p>
          <div className="overflow-hidden pb-[0.12em]">
            <h2
              className="sobre-headline font-serif text-brand-cream leading-[0.95] max-w-[50%]"
              style={{ fontSize: "clamp(20px,6.5vw,56px)" }}
            >
              Reconhecemos as transições e
            </h2>
          </div>
          <div className="overflow-hidden pb-[0.12em]">
            <h2
              className="sobre-headline font-serif italic text-brand-pink leading-[0.95] max-w-[60%]"
              style={{ fontSize: "clamp(20px,6.5vw,56px)" }}
            >
              documentamos cada uma delas
            </h2>
          </div>
        </div>

        {/* Grid: ocupa o restante do viewport */}
        <div className="sobre-body grid min-h-0 flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 content-start">
          <div className="flex min-h-0 flex-col gap-4 md:gap-5">
            <p className="font-sans text-[16px] font-medium leading-snug text-brand-cream md:text-[18px]">
              A Revelô nasceu da paixão por registrar aquilo que não volta: os encontros, as conquistas, a emoção e a energia dos momentos que marcam uma vida inteira.
            </p>
            <p className="font-sans text-[14px] leading-relaxed text-brand-cream/55 md:text-[15px]">
              Ao longo da nossa jornada desenvolvemos um olhar especializado para capturar experiências intensas, humanas e inesquecíveis. Mas nossa essência vai além: estamos presentes em eventos, celebrações e projetos que carregam histórias reais.
            </p>
            <p className="font-sans text-[14px] leading-relaxed text-brand-cream/55 md:text-[15px]">
              Mais do que produzir fotos e vídeos, acreditamos em criar memórias vivas, daquelas que fazem você sentir tudo de novo cada vez que olha. Tudo isso feito por quem escolheu registrar os momentos como a sua missão, unindo arte, paixão e tecnologia pra não deixar nenhuma lembrança sem virar eterna.
            </p>
            <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-widest text-brand-cream/30">
              Part of Atmosfera · Curitiba, BR
            </p>
          </div>

          <div className="flex min-h-0 flex-col divide-y divide-brand-cream/10 mt-[-100px]">
            {[
              { num: "+300", label: "Projetos realizados" },
              { num: "12", label: "Cidades atendidas" },
              { num: "5 anos", label: "De experiência" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-4 py-4 first:pt-0 md:py-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/40">
                  {s.label}
                </span>
                <span
                  className="font-serif italic leading-none text-brand-pink shrink-0"
                  style={{ fontSize: "clamp(22px,2.8vw,40px)" }}
                >
                  {s.num}
                </span>
              </div>
            ))}

            <div className="min-h-0 flex-1 pt-6 md:pt-8">
              <p
                className="font-serif italic leading-snug text-brand-cream/60"
                style={{ fontSize: "clamp(16px,1.8vw,24px)" }}
              >
                &ldquo;Reconhecemos as transições e documentamos cada uma delas.&rdquo;
              </p>
              <div className="mt-4 inline-block bg-brand-red px-4 py-2">
                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-cream">
                  RVLÔ PROD. — Esse é o nosso ponto de vista
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
