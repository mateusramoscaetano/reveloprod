"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initLenis, scrollToHash, scrollToTop } from "@/lib/lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = initLenis();

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

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

  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return <>{children}</>;
}
