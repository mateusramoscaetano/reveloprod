import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StickyReveal } from "@/components/sections/StickyReveal";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Videos } from "@/components/sections/Videos";
import { Fotos } from "@/components/sections/Fotos";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StickyReveal />
      
        <Videos />
        <Fotos />
        <Depoimentos />
        <Diferenciais />
      </main>
      <Footer />
    </>
  );
}
