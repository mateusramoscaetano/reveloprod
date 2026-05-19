import type { CSSProperties } from "react";

interface MarcaAssetProps {
  asset: 1 | 2 | 3;
  className?: string;
  style?: CSSProperties;
  opacity?: number;
}

export function MarcaAsset({ asset, className = "", style, opacity = 1 }: MarcaAssetProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/marca/asset-${asset}.svg`}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, ...style }}
    />
  );
}
