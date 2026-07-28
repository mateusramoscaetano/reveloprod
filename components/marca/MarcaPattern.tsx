import type { CSSProperties } from "react";

type MarcaPatternProps = {
  /** Caminho sob /public (ex.: /marca/pat-2.svg) */
  src?: string;
  className?: string;
  opacity?: number;
  backgroundSize?: CSSProperties["backgroundSize"];
  backgroundPosition?: CSSProperties["backgroundPosition"];
  repeat?: boolean | "x" | "y";
};

export function MarcaPattern({
  src = "/marca/pat-2.svg",
  className = "absolute inset-0",
  opacity = 0.12,
  backgroundSize = "cover",
  backgroundPosition = "center",
  repeat = false,
}: MarcaPatternProps) {
  const repeatClass =
    repeat === true
      ? "bg-repeat"
      : repeat === "x"
        ? "bg-repeat-x"
        : repeat === "y"
          ? "bg-repeat-y"
          : "bg-no-repeat";

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${repeatClass} ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${src}")`,
        backgroundSize,
        backgroundPosition,
      }}
    />
  );
}
