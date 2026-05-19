import type { CSSProperties } from "react";

type MarcaPatternProps = {
  /** Caminho sob /public (ex.: /marca/pat-2.svg) */
  src?: string;
  className?: string;
  opacity?: number;
  backgroundSize?: CSSProperties["backgroundSize"];
  backgroundPosition?: CSSProperties["backgroundPosition"];
};

export function MarcaPattern({
  src = "/marca/pat-2.svg",
  className = "absolute inset-0",
  opacity = 0.12,
  backgroundSize = "cover",
  backgroundPosition = "center",
}: MarcaPatternProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none bg-no-repeat ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${src}")`,
        backgroundSize,
        backgroundPosition,
      }}
    />
  );
}
