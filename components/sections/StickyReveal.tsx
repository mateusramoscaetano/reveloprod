"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SobreNos } from "./SobreNos";
import { Servicos } from "./Servicos";

const COL = { x1: 0, x2: 22, x3: 45, x4: 65 };

export function StickyReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const servicosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const state = { ty: 100, s1: 100, s2: 100, s3: 100, s4: 100 };

    const updateClip = () => {
      if (!servicosRef.current) return;
      const { ty, s1, s2, s3, s4 } = state;
      servicosRef.current.style.transform = `translateY(${ty}%)`;
      servicosRef.current.style.clipPath = [
        `polygon(`,
        `0% 100%, 100% 100%,`,
        `100% ${s4}%, ${COL.x4}% ${s4}%,`,
        `${COL.x4}% ${s3}%, ${COL.x3}% ${s3}%,`,
        `${COL.x3}% ${s2}%, ${COL.x2}% ${s2}%,`,
        `${COL.x2}% ${s1}%, 0% ${s1}%`,
        `)`,
      ].join(" ");
    };

    const clearRevealStyles = () => {
      if (!servicosRef.current) return;
      servicosRef.current.style.transform = "";
      servicosRef.current.style.clipPath = "";
      servicosRef.current.style.willChange = "";
    };

    updateClip();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            onUpdate: updateClip,
            onComplete: clearRevealStyles,
          });

          tl.to(state, { ty: 35, duration: 1.1, ease: "power2.out" }, 0)
            .to(state, { s4: 0, duration: 0.95, ease: "power3.out" }, 0)
            .to(state, { s2: 0, duration: 0.85, ease: "power2.out" }, 0.15)
            .to(state, { s3: 0, duration: 0.8, ease: "power3.out" }, 0.35)
            .to(state, { s1: 0, duration: 0.75, ease: "power2.out" }, 0.55)
            .to(state, { ty: 0, duration: 0.95, ease: "power2.inOut" }, 0.6)
            .from(
              ".serv-card",
              {
                y: 32,
                opacity: 0,
                duration: 0.45,
                stagger: 0.05,
                ease: "power3.out",
              },
              1.35
            );

          ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: isMobile ? "+=115%" : "+=165%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: isMobile ? 0.55 : 0.85,
            animation: tl,
            invalidateOnRefresh: true,
            onLeave: clearRevealStyles,
          });
        }
      );
    }, wrapperRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      clearRevealStyles();
    };
  }, []);

  return (
    <div ref={wrapperRef} data-sticky-reveal className="relative">
      {/* Sobre: fixo no topo da seção enquanto Serviços rola por cima */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-0 h-screen overflow-hidden">
        <SobreNos />
      </div>

      {/* Serviços: altura natural — permite rolar todos os cards após o reveal */}
      <div
        ref={servicosRef}
        className="relative z-10 min-h-screen"
        style={{ willChange: "clip-path, transform" }}
      >
        <Servicos />
      </div>
    </div>
  );
}
