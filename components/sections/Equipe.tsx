"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Image from "next/image";

const lucas = {
  name: "Lucas Vaz",
  role: "Founder & Creative Lead",
  bio: "Lucas Vaz é fotógrafo e à frente da direção criativa da Revelo Prod, produtora com atuação diversificada no universo de eventos, moda e entretenimento. Seu portfólio vai de comissões de formatura de medicina, acompanhando turmas de instituições como PUC-PR, FAG, CESUT e UP desde os primeiros encontros até a colação de grau, a produções para atléticas universitárias, grandes eventos, estúdios para campanhas de marcas e eventos esportivos.",
  instagram: "https://instagram.com/olucasvaz",
  handle: "@olucasvaz",
  image: "/images/staff/vaz.png",
};

const team = [
  { name: "Amanda Santos", role: "Head Fotográfico" },
  { name: "Martim Lopes", role: "Operação Fotográfica" },
  { name: "Nayara Hegele", role: "Designer" },
  { name: "Fernanda Camargo", role: "Atendimento" },
  { name: "Jaqueline Stefanes", role: "Editora de Imagem" },
];

export function Equipe() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".equipe-title span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
      });
      gsap.from(".equipe-featured", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".equipe-featured", start: "top 80%" },
      });
      gsap.from(".equipe-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".equipe-grid", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipe"
      ref={ref}
      className="relative bg-brand-cream overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-14">
        <div className="mb-12 md:mb-16">
          <div className="equipe-title overflow-hidden">
            <span
              className="block font-sans font-black uppercase text-brand-dark leading-[0.86]"
              style={{ fontSize: "clamp(56px,9vw,140px)" }}
            >
              A EQUIPE
            </span>
          </div>
          <div className="equipe-title overflow-hidden mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/revelo-wordmark.svg"
              alt="Revelô"
              className="block h-[clamp(64px,9.5vw,112px)] w-auto"
            />
          </div>
        </div>

        <div className="equipe-featured grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-20">
          <div className="overflow-hidden border border-brand-dark/10">
            <Image src={lucas.image} alt={lucas.name} width={500} height={500} className="w-full h-full"/>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">
                {lucas.role}
              </p>
              <h3
                className="font-sans font-black uppercase text-brand-dark leading-none"
                style={{ fontSize: "clamp(32px,4vw,56px)" }}
              >
                {lucas.name}
              </h3>
            </div>
            <p className="font-sans text-[15px] md:text-[16px] text-brand-dark/70 leading-relaxed">
              {lucas.bio}
            </p>
            <a
              href={lucas.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brand-red hover:text-brand-dark transition-colors duration-200 self-start"
            >
              {lucas.handle}
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="equipe-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="equipe-card group border border-brand-dark/10 overflow-hidden"
            >
              <ImagePlaceholder aspectRatio="portrait" label="equipe" />
              <div className="p-5 bg-brand-cream">
                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-dark/40 mb-1">
                  {member.role}
                </p>
                <h4 className="font-sans font-black uppercase text-brand-dark text-[18px] group-hover:text-brand-red transition-colors duration-300">
                  {member.name}
                </h4>
              </div>
            </div>
          ))}
          <div className="equipe-card overflow-hidden">
            <div className="aspect-[3/4] flex flex-col items-center justify-center gap-6 bg-brand-cream px-8 py-10">
              {Array.from({ length: 3 }).map((_, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src="/marca/rvlo-black.svg"
                  alt=""
                  aria-hidden
                  className="w-full max-w-[min(100%,200px)] h-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
