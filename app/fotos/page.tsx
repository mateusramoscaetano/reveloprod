import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FotosGallery } from "@/components/sections/FotosGallery";
import { MarcaPattern } from "@/components/marca/MarcaPattern";
import { getGalleryPhotos } from "@/lib/gallery-photos";

export default function FotosPage() {
  const photos = getGalleryPhotos();

  return (
    <div>
      <Navbar />

      <section className="bg-brand-dark-800 pt-36 pb-20 relative overflow-hidden border-b border-brand-cream/10">
        <MarcaPattern
          className="absolute inset-0 z-0 mix-blend-soft-light"
          opacity={0.1}
          backgroundSize="100% auto"
          backgroundPosition="center top"
        />
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <h1
            className="font-sans font-black uppercase text-brand-cream leading-none"
            style={{ fontSize: "clamp(56px,9vw,140px)" }}
          >
            FOTOS
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-cream/40">
            {photos.length} imagens
          </p>
        </div>
      </section>

      <section className="bg-brand-dark py-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <FotosGallery photos={photos} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
