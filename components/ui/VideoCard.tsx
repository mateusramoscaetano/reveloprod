"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface VideoCardProps {
  title: string;
  category: string;
  year?: string;
}

export function VideoCard({ title, category, year }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  function onEnter(e: React.MouseEvent<HTMLDivElement>) {
    const cursor = cursorRef.current;
    const card = cardRef.current;
    if (!cursor || !card) return;
    const r = card.getBoundingClientRect();
    gsap.set(cursor, { x: e.clientX - r.left - 32, y: e.clientY - r.top - 32, scale: 0 });
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
    xTo.current = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card || !xTo.current || !yTo.current) return;
    const r = card.getBoundingClientRect();
    xTo.current(e.clientX - r.left - 32);
    yTo.current(e.clientY - r.top - 32);
  }

  function onLeave() {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
  }

  return (
    <div
      ref={cardRef}
      className="group relative cursor-none overflow-hidden"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <ImagePlaceholder aspectRatio="video" label="vídeo" />

      {/* Custom play cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red"
        style={{ top: 0, left: 0, opacity: 0 }}
      >
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="white" />
        </svg>
      </div>

      {/* Hover vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-brand-dark/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative z-10 border-t border-brand-cream/10 bg-brand-dark-800 p-4">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-brand-cream/40 transition-colors duration-300 group-hover:text-brand-pink/60">
          {category}
        </p>
        <h3 className="font-sans text-[16px] font-bold uppercase text-brand-cream transition-colors duration-300 group-hover:text-brand-pink">
          {title}
        </h3>
        {year && (
          <p className="mt-1 font-mono text-[11px] text-brand-cream/50">{year}</p>
        )}
      </div>
    </div>
  );
}
