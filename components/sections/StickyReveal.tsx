"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SobreNos } from "./SobreNos";
import { Servicos } from "./Servicos";

// Column x-boundaries (left edge of each column), right-to-left reveal order
// Widths: col4=35%, col3=20%, col2=23%, col1=22%
const COL = { x1: 0, x2: 22, x3: 45, x4: 65 };

export function StickyReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const servicosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ty: translateY do elemento (100 = completamente abaixo do viewport, 0 = no lugar)
    // s1..s4: borda superior de cada coluna no clip-path (% da altura do elemento)
    // Coluna visível quando: ty + si < 100 (elemento sobe o suficiente pra coluna cruzar o fundo da tela)
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

    updateClip();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onUpdate: updateClip });

      // Fase 1: ty desce de 100→50 enquanto cada si cai de 100→0 em ordens diferentes.
      // Cada coluna cruza o fundo da tela (ty+si<100) em momentos distintos → escada.
      tl.to(state, { ty: 50, duration: 2.5, ease: "power1.inOut" }, 0)
        .to(state, { s4: 0, duration: 1.5, ease: "power3.out" }, 0)
        .to(state, { s2: 0, duration: 1.4, ease: "power2.out" }, 0.4)
        .to(state, { s3: 0, duration: 1.3, ease: "power3.out" }, 0.85)
        .to(state, { s1: 0, duration: 1.2, ease: "power2.out" }, 1.3)
        // Fase 2: todas niveladas, elemento sobe junto até preencher o viewport
        .to(state, { ty: 0, duration: 1.5, ease: "power2.inOut" }, 2.8)
        // Cards entram quando o reveal está completo
        .from(".serv-card", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }, 4.1);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=320%",
        pin: true,
        anticipatePin: 1,
        scrub: 1.5,
        animation: tl,
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (servicosRef.current) {
        servicosRef.current.style.clipPath = "";
        servicosRef.current.style.transform = "";
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} data-sticky-reveal className="relative min-h-screen overflow-hidden">
      {/* SobreNos: pinned background layer */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <SobreNos />
      </div>

      {/* Servicos: foreground, revealed by the staircase clip-path */}
      <div
        ref={servicosRef}
        className="relative z-10 min-h-screen"
        style={{ willChange: "clip-path" }}
      >
        <Servicos />
      </div>
    </div>
  );
}
