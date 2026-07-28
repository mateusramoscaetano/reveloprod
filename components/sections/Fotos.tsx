"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { MarcaAsset } from "@/components/marca/MarcaAsset";

const photos = [
  {
    title: "BYD",
    category: "Marca",
    src: "/images/photos/IMG_5197.JPG",
  },
  {
    title: "Réveillon Arcanjos",
    category: "Evento",
    src: "/images/photos/IMG_5530.JPG",
  },
  {
    title: "Folianópolis",
    category: "Evento",
    src: "/images/photos/IMG_3293.JPG",
  },
  {
    title: "Pré-eventos",
    category: "Formatura",
    src: "/images/photos/VAZ_6500.jpg",
  },
  {
    title: "Baile de Formatura",
    category: "Formatura",
    src: "/images/photos/IMG_4565.JPG",
  },
  {
    title: "Colação de Grau",
    category: "Formatura",
    src: "/images/photos/VAZ_2852.JPG",
  },
  {
    title: "Atlética Direito PUCPR",
    category: "Formatura",
    src: "/images/photos/atleticamedpucpr2026_-1499.jpg",
  },
] as const;

export function Fotos() {
  const ref = useRef<HTMLElement>(null);
  const asset1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".foto-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".foto-card").forEach((card) => {
        gsap.from(card, {
          y: 52,
          opacity: 0,
          scale: 0.94,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      gsap.from(".foto-logo", {
        y: 52,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".foto-logo",
          start: "top 90%",
        },
      });

      gsap.from(asset1Ref.current, {
        x: 40,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      gsap.to(asset1Ref.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative bg-brand-dark overflow-hidden py-20 md:py-32">
      <div
        ref={asset1Ref}
        className="pointer-events-none absolute top-[-5%] right-[-4%] z-[1] w-[180px] md:w-[250px] hidden md:block"
      >
        <MarcaAsset asset={1} opacity={0.12} className="w-full mix-blend-soft-light" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <div className="foto-title overflow-hidden">
              <span
                className="block font-sans font-black uppercase text-brand-cream leading-[0.86]"
                style={{ fontSize: "clamp(64px,10vw,152px)" }}
              >
                FOTOS
              </span>
            </div>
          </div>
          <Link
            href="/fotos"
            className="group self-start md:self-end mb-1 bg-brand-red text-brand-cream rounded-none px-8 py-4 font-sans font-black uppercase text-[15px] tracking-wider hover:bg-brand-pink hover:text-brand-dark transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-2"
          >
            Ver todas
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {photos.map((p) => (
            <div key={p.src} className="foto-card">
              <PhotoCard {...p} alt={p.title} />
            </div>
          ))}

          <div className="foto-logo sm:col-span-1 md:col-span-2 flex h-full max-h-[574px] min-h-0 w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/asset-1.svg"
              alt=""
              aria-hidden
              className="h-full w-full max-h-[574px] scale-50 "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
