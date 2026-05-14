import { ImagePlaceholder } from "./ImagePlaceholder";

interface VideoCardProps {
  title: string;
  category: string;
  year?: string;
}

export function VideoCard({ title, category, year }: VideoCardProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden">
      <ImagePlaceholder aspectRatio="video" label="vídeo" />

      {/* Hover: apenas vinheta — título e categoria só na faixa fixa (sem duplicar) */}
      <div
        className="pointer-events-none absolute inset-0 bg-brand-dark/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative z-10 border-t border-brand-cream/10 bg-brand-dark-800 p-4">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-brand-cream/40">
          {category}
        </p>
        <h3 className="font-sans text-[16px] font-bold uppercase text-brand-cream">
          {title}
        </h3>
        {year && (
          <p className="mt-1 font-mono text-[11px] text-brand-cream/50">{year}</p>
        )}
      </div>
    </div>
  );
}
