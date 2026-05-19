"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MarcaAsset } from "@/components/marca/MarcaAsset";

const metrics = [
  { value: 300, suffix: "+", label: "Projetos realizados" },
  { value: 12, suffix: "", label: "Cidades atendidas" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 5, suffix: " anos", label: "De experiência" },
];

export function Metricas() {
  const ref = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const asset1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".met-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });

      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: metrics[i].value,
            duration: 2.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.from(".met-block", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".met-block", start: "top 80%" },
      });

      gsap.from(asset1Ref.current, {
        opacity: 0,
        x: -30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.to(asset1Ref.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    // Hover pulse nas métricas
    const blocks = ref.current?.querySelectorAll<HTMLElement>(".met-block") ?? [];
    const handlers: Array<{ el: HTMLElement; onEnter: () => void; onLeave: () => void }> = [];

    blocks.forEach((block, i) => {
      const numEl = counterRefs.current[i];

      const onEnter = () => {
        if (numEl) {
          gsap.to(numEl, { scale: 1.1, duration: 0.25, ease: "power2.out" });
        }
        gsap.to(block, { y: -4, duration: 0.3, ease: "power2.out" });
      };

      const onLeave = () => {
        if (numEl) {
          gsap.to(numEl, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        }
        gsap.to(block, { y: 0, duration: 0.4, ease: "power2.out" });
      };

      block.addEventListener("mouseenter", onEnter);
      block.addEventListener("mouseleave", onLeave);
      handlers.push({ el: block, onEnter, onLeave });
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
      className="relative bg-brand-dark-800 overflow-hidden py-20 md:py-32 border-t border-brand-cream/8"
    >
      {/* Asset-1: decorativo lado direito */}
      <div
        ref={asset1Ref}
        className="pointer-events-none absolute right-[-3%] top-[50%] -translate-y-1/2 z-[1] w-[160px] md:w-[220px] hidden md:block"
      >
        <MarcaAsset asset={1} opacity={0.07} className="w-full mix-blend-soft-light" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">

        <p className="met-label font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/35 mb-16">
          — Em números
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-cream/10">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="met-block px-6 md:px-10 first:pl-0 group cursor-default"
            >
              {/* Número */}
              <div className="mb-3 flex items-end gap-1 leading-none">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="font-sans font-black text-brand-cream group-hover:text-brand-pink transition-colors duration-400 inline-block"
                  style={{ fontSize: "clamp(48px,6vw,96px)", lineHeight: 1 }}
                >
                  0
                </span>
                <span
                  className="font-serif italic text-brand-pink pb-2 transition-colors duration-300 group-hover:text-brand-cream"
                  style={{ fontSize: "clamp(24px,3vw,48px)" }}
                >
                  {m.suffix}
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/40 transition-colors duration-300 group-hover:text-brand-cream/60">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
