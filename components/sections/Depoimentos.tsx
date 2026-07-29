"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

export function Depoimentos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".depo-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".depo-carousel", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".depo-carousel", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-dvh flex-col items-center justify-center overflow-hidden border-y border-brand-cream/10 bg-brand-dark px-0"
    >
      <div className="flex w-full flex-col gap-6 md:gap-8">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14">
          <div className="depo-title overflow-hidden">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/40">
              O que dizem sobre nós
            </span>
          </div>
          <div className="depo-title overflow-hidden">
            <span
              className="block font-sans font-black uppercase leading-[0.9] text-brand-cream"
              style={{ fontSize: "clamp(40px,7vw,96px)" }}
            >
              Depoimentos
            </span>
          </div>
        </div>

        <div className="depo-carousel w-screen overflow-hidden">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
