"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { VideoCard } from "@/components/ui/VideoCard";
import { MarcaAsset } from "@/components/marca/MarcaAsset";
import { featuredVideos } from "@/lib/videos";

export function Videos() {
  const ref = useRef<HTMLElement>(null);
  const asset2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vid-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 38%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.utils.toArray<HTMLElement>(".vid-card").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      gsap.from(asset2Ref.current, {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.to(asset2Ref.current, {
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-brand-cream overflow-hidden py-20 md:py-32">
      <div
        ref={asset2Ref}
        className="pointer-events-none absolute left-[-4%] top-[8%] z-[1] w-[200px] md:w-[280px] hidden md:block"
      >
        <MarcaAsset asset={2} opacity={0.09} className="w-full mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <div className="vid-title overflow-hidden pb-[0.22em]">
              <span
                className="block font-sans font-black uppercase text-brand-dark leading-[0.92]"
                style={{ fontSize: "clamp(64px,10vw,152px)" }}
              >
                VÍDEOS
              </span>
            </div>
          </div>
          <Link
            href="/videos"
            className="group self-start md:self-end mb-1 bg-brand-dark text-brand-cream rounded-none px-8 py-4 font-sans font-black uppercase text-[15px] tracking-wider hover:bg-brand-red transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-2"
          >
            Ver todos
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredVideos.map((v) => (
            <div key={v.id} className="vid-card">
              <VideoCard {...v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
