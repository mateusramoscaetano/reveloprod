import { ImagePlaceholder } from "./ImagePlaceholder";

interface PhotoCardProps {
  title: string;
  category: string;
}

export function PhotoCard({ title, category }: PhotoCardProps) {
  return (
    <div className="group relative h-full min-h-0 cursor-pointer overflow-hidden rounded-none border border-brand-cream/5">
      <ImagePlaceholder
        aspectRatio="square"
        fit="fill"
        label="foto"
      />

      {/* Gradient + info */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-pink mb-1">
            {category}
          </p>
          <h3 className="font-serif text-[22px] italic text-brand-cream">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
