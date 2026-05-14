"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const metrics = [
  { value: 300, suffix: "+", label: "Projetos realizados" },
  { value: 12, suffix: "", label: "Cidades atendidas" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 5, suffix: " anos", label: "De experiência" },
];

export function Metricas() {
  const ref = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-brand-dark-800 overflow-hidden py-20 md:py-32 border-t border-brand-cream/8"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">

        <p className="met-label font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/35 mb-16">
          — Em números
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-cream/10">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="met-block px-6 md:px-10 first:pl-0 group"
            >
              {/* Número */}
              <div className="mb-3 flex items-end gap-1 leading-none">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="font-sans font-black text-brand-cream group-hover:text-brand-pink transition-colors duration-400"
                  style={{ fontSize: "clamp(48px,6vw,96px)", lineHeight: 1 }}
                >
                  0
                </span>
                <span
                  className="font-serif italic text-brand-pink pb-2"
                  style={{ fontSize: "clamp(24px,3vw,48px)" }}
                >
                  {m.suffix}
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/40">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
