"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface PhotoCardProps {
  title?: string;
  category?: string;
  src?: string;
  alt?: string;
}

export function PhotoCard({ title, category, src, alt }: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const tiltXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const tiltYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const hasMeta = Boolean(title || category);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const applyTilt = () => {
      el.style.transform = `perspective(700px) rotateY(${tilt.current.x}deg) rotateX(${tilt.current.y}deg)`;
    };

    const config = { duration: 0.5, ease: "power3.out", onUpdate: applyTilt };

    tiltXTo.current = gsap.quickTo(tilt.current, "x", config);
    tiltYTo.current = gsap.quickTo(tilt.current, "y", config);

    return () => {
      gsap.killTweensOf(tilt.current);
      tilt.current.x = 0;
      tilt.current.y = 0;
      el.style.transform = "";
      tiltXTo.current = null;
      tiltYTo.current = null;
    };
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el || !tiltXTo.current || !tiltYTo.current) return;

    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    tiltXTo.current(nx * 8);
    tiltYTo.current(-ny * 5);
  }

  function onLeave() {
    tiltXTo.current?.(0);
    tiltYTo.current?.(0);
  }

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-none border border-brand-cream/5 bg-brand-dark-800"
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? title ?? "Foto Revelô"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <ImagePlaceholder aspectRatio="portrait" fit="fill" label="foto" />
      )}

      {hasMeta && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {category && (
              <p className="translate-y-3 font-mono text-[10px] uppercase tracking-widest text-brand-pink transition-transform duration-500 group-hover:translate-y-0 mb-1">
                {category}
              </p>
            )}
            {title && (
              <h3 className="translate-y-3 font-serif text-[22px] italic text-brand-cream transition-transform duration-500 delay-[40ms] group-hover:translate-y-0">
                {title}
              </h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
