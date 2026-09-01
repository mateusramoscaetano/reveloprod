"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { videoSources, type Video } from "@/lib/videos";
import { VideoPlayerOverlay, type VideoPlayerHandle } from "./VideoPlayerOverlay";

type VideoCardProps = Pick<Video, "id" | "title" | "category" | "year" | "previewAt"> & {
  showMeta?: boolean;
  className?: string;
};

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="white" />
    </svg>
  );
}

export function VideoCard({
  id,
  title,
  category,
  year,
  previewAt,
  showMeta = true,
  className = "",
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<VideoPlayerHandle>(null);
  const { src } = videoSources(id);

  function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    flushSync(() => setOpen(true));
    playerRef.current?.start();
  }

  function handlePreviewReady(e: React.SyntheticEvent<HTMLVideoElement>) {
    if (!previewAt) return;
    e.currentTarget.currentTime = previewAt;
  }

  return (
    <>
      <button
        type="button"
        className={`group relative w-full cursor-pointer overflow-hidden text-left touch-manipulation ${className}`}
        onClick={handleOpen}
        aria-label={`Assistir ${title}`}
      >
        <div
          className={`relative w-full overflow-hidden bg-brand-dark ${
            showMeta ? "aspect-video" : "h-full min-h-[200px]"
          }`}
        >
          <video
            className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            src={src}
            onLoadedMetadata={handlePreviewReady}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-dark/20 transition-colors duration-300 group-hover:bg-brand-dark/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red shadow-lg transition-transform duration-300 group-hover:scale-110">
              <PlayIcon />
            </div>
          </div>
        </div>

        {showMeta && (
          <div className="border-t border-brand-cream/10 bg-brand-dark-800 p-4">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-brand-cream/40 transition-colors duration-300 group-hover:text-brand-pink/60">
              {category}
            </p>
            <h3 className="font-sans text-[16px] font-bold uppercase text-brand-cream transition-colors duration-300 group-hover:text-brand-pink">
              {title}
            </h3>
            {year && (
              <p className="mt-1 font-mono text-[11px] text-brand-cream/50">{year}</p>
            )}
          </div>
        )}
      </button>

      {open && (
        <VideoPlayerOverlay
          ref={playerRef}
          src={src}
          title={title}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
