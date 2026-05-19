"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface PhotoCardProps {
  title: string;
  category: string;
}

export function PhotoCard({ title, category }: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  function onEnter() {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { transformPerspective: 700 });
    rXTo.current = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
    rYTo.current = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el || !rXTo.current || !rYTo.current) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    rXTo.current(nx * 8);
    rYTo.current(-ny * 5);
  }

  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  }

  return (
    <div
      ref={cardRef}
      className="group relative h-full min-h-0 cursor-pointer overflow-hidden rounded-none border border-brand-cream/5"
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <ImagePlaceholder aspectRatio="square" fit="fill" label="foto" />

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="translate-y-3 font-mono text-[10px] uppercase tracking-widest text-brand-pink transition-transform duration-500 group-hover:translate-y-0 mb-1">
            {category}
          </p>
          <h3 className="translate-y-3 font-serif text-[22px] italic text-brand-cream transition-transform duration-500 delay-[40ms] group-hover:translate-y-0">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
