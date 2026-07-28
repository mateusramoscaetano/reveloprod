"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PhotoCard } from "@/components/ui/PhotoCard";
import type { GalleryPhoto } from "@/lib/gallery-photos";

interface FotosGalleryProps {
  photos: GalleryPhoto[];
}

export function FotosGallery({ photos }: FotosGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fpage-card").forEach((card) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [photos]);

  return (
    <div ref={ref} className="fotos-grid grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.src} className="fpage-card">
          <PhotoCard src={photo.src} alt={photo.alt} />
        </div>
      ))}
    </div>
  );
}
