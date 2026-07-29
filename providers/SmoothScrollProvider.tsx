"use client";
import { useEffect } from "react";
import { initLenis, scrollToHash } from "@/lib/lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = initLenis();

    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#") return;
      scrollToHash(hash);
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
