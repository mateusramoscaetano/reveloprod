"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".foot-cta span", {
        y: "110%",
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
      gsap.from(".foot-col", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".foot-col", start: "top 85%" },
      });
      gsap.fromTo(
        ".foot-svg-stroke",
        { strokeDashoffset: 800 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contato"
      ref={ref}
      className="relative bg-brand-dark border-t border-brand-cream/10 overflow-hidden"
    >
      {/* SVG decorativo */}
      <div className="pointer-events-none absolute top-10 right-10 hidden lg:block">
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
          <path
            className="foot-svg-stroke"
            d="M15 90 C50 15, 95 130, 140 55 C165 10, 200 75, 208 75"
            stroke="#F2AABB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="800"
            strokeDashoffset="800"
            fill="none"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* CTA grande */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-14 border-b border-brand-cream/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-cream/35 mb-8">
          — Vamos conversar
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="foot-cta">
            <div className="overflow-hidden">
              <span
                className="block font-sans font-black uppercase text-brand-cream leading-[0.86]"
                style={{ fontSize: "clamp(48px,7.5vw,116px)" }}
              >
                TEM UM
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block font-serif italic text-brand-pink leading-[0.92]"
                style={{ fontSize: "clamp(48px,7.5vw,116px)" }}
              >
                projeto em
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block font-sans font-black uppercase text-brand-cream leading-[0.86]"
                style={{ fontSize: "clamp(48px,7.5vw,116px)" }}
              >
                MENTE?
              </span>
            </div>
          </div>
          <a
            href="mailto:ola@revelo.com.br"
            className="self-start md:self-end flex-shrink-0 bg-brand-red text-brand-cream rounded-none px-10 py-6 font-sans font-black uppercase text-[16px] tracking-wider hover:bg-brand-pink hover:text-brand-dark transition-colors duration-300 whitespace-nowrap"
          >
            Fale conosco →
          </a>
        </div>
      </div>

      {/* Três colunas */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Col 1 */}
          <div className="foot-col flex flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Revelô" className="h-[20px] w-auto" />
            <p className="font-sans text-[14px] text-brand-cream/55 leading-relaxed max-w-xs">
              Momentos revelados com alma — fotografia e vídeo para formaturas,
              famílias e eventos.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/25">
              Part of Atmosfera · Desde 2019
            </p>
          </div>

          {/* Col 2 */}
          <div className="foot-col flex flex-col gap-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/35">
              Contato
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:ola@revelo.com.br"
                className="font-sans text-[15px] text-brand-cream/75 hover:text-brand-pink transition-colors duration-200"
              >
                ola@revelo.com.br
              </a>
              <a
                href="https://wa.me/5500000000000"
                className="font-sans text-[15px] text-brand-cream/75 hover:text-brand-pink transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-brand-cream/10">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Vídeos", href: "/videos" },
                { label: "Fotos", href: "/fotos" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/35 hover:text-brand-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div className="foot-col flex flex-col gap-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/35">
              Redes sociais
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Instagram", handle: "@revelo.foto" },
                { label: "YouTube", handle: "Revelô Vídeo" },
                { label: "Pinterest", handle: "Revelô Inspirações" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-9 h-9 border border-brand-cream/20 rounded-full flex items-center justify-center group-hover:border-brand-pink transition-colors duration-300 flex-shrink-0">
                    <span className="font-mono text-[9px] text-brand-cream/35 group-hover:text-brand-pink transition-colors duration-300">
                      {s.label[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-[13px] text-brand-cream/65 group-hover:text-brand-cream transition-colors duration-200">
                      {s.label}
                    </p>
                    <p className="font-mono text-[10px] text-brand-cream/25">
                      {s.handle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra final */}
      <div className="border-t border-brand-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[10px] text-brand-cream/25 uppercase tracking-widest">
            © {new Date().getFullYear()} Revelô. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] text-brand-cream/15 uppercase tracking-widest">
            Feito com cuidado
          </p>
        </div>
      </div>
    </footer>
  );
}
