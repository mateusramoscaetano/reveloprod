"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-el", {
        y: -16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.3,
      });
    }, ref);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-brand-dark/90 backdrop-blur-md border-b border-brand-cream/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="nav-el">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Revelô" className="h-[17px] md:h-[20px]" />
        </Link>

        {/* Links centrais */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Serviços", href: "#servicos" },
            { label: "Vídeos", href: "/videos" },
            { label: "Fotos", href: "/fotos" },
          ].map((item) => (
            <li key={item.href} className="nav-el">
              <Link
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/60 hover:text-brand-cream transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="#contato"
          className="nav-el bg-brand-red text-brand-cream rounded-none px-5 py-2.5 font-sans font-black uppercase text-[12px] tracking-wider hover:bg-brand-pink hover:text-brand-dark transition-colors duration-300"
        >
          Contato
        </Link>
      </div>
    </nav>
  );
}
