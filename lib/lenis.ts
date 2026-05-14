import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        const y = typeof value === "number" ? value : Number(value);
        if (Number.isFinite(y)) {
          lenis.scrollTo(y, { immediate: true });
        }
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  const onTicker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTicker);
  gsap.ticker.lagSmoothing(0);

  const originalDestroy = lenis.destroy.bind(lenis);
  lenis.destroy = () => {
    gsap.ticker.remove(onTicker);
    ScrollTrigger.scrollerProxy(document.documentElement);
    originalDestroy();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return lenis;
}
