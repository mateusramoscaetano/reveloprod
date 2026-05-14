import { clsx } from "clsx";

interface ImagePlaceholderProps {
  className?: string;
  label?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  /** Preenche a altura da célula (grid) em vez de usar só proporção fixa */
  fit?: "aspect" | "fill";
}

const ratios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

export function ImagePlaceholder({
  className,
  label,
  aspectRatio = "video",
  fit = "aspect",
}: ImagePlaceholderProps) {
  const sizeClass =
    fit === "fill"
      ? "h-full w-full min-h-[200px] min-w-0 md:min-h-[240px]"
      : ratios[aspectRatio];

  return (
    <div
      className={clsx(
        sizeClass,
        "relative bg-brand-dark-800 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500",
        className
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,237,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,230,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Center mark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-cream/20">
            <div className="h-2 w-2 rounded-full bg-brand-cream/20" />
          </div>
          {label && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cream/30">
              {label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
