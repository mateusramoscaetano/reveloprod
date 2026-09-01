"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type VideoPlayerHandle = {
  start: () => void;
};

type VideoPlayerOverlayProps = {
  src: string;
  title: string;
  onClose: () => void;
};

function VolumeOnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H3v6h3l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6a8.5 8.5 0 010 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H3v6h3l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M16 9l5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="white" />
    </svg>
  );
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export const VideoPlayerOverlay = forwardRef<VideoPlayerHandle, VideoPlayerOverlayProps>(
  function VideoPlayerOverlay({ src, title, onClose }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const closingRef = useRef(false);
    const fullscreenActiveRef = useRef(false);
    const [muted, setMuted] = useState(true);
    const [needsTap, setNeedsTap] = useState(false);

    const close = useCallback(() => {
      if (closingRef.current) return;
      closingRef.current = true;
      fullscreenActiveRef.current = false;

      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      onClose();
    }, [onClose]);

    const playVideo = useCallback(() => {
      const video = videoRef.current;
      if (!video) return false;

      video.muted = true;
      setMuted(true);

      const attempt = video.play();
      if (!attempt) return true;

      attempt
        .then(() => setNeedsTap(false))
        .catch(() => setNeedsTap(true));

      return true;
    }, []);

    const enterFullscreen = useCallback(async () => {
      if (isTouchDevice()) return;

      const container = containerRef.current;
      if (!container?.requestFullscreen) return;

      try {
        await container.requestFullscreen();
        fullscreenActiveRef.current = true;
      } catch {
        fullscreenActiveRef.current = false;
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        start() {
          const video = videoRef.current;
          if (!video) {
            setNeedsTap(true);
            return;
          }

          closingRef.current = false;
          video.currentTime = 0;

          if (!video.src) {
            video.src = src;
          }

          const played = playVideo();
          if (!played) {
            setNeedsTap(true);
          }

          void enterFullscreen();
        },
      }),
      [enterFullscreen, playVideo, src]
    );

    useEffect(() => {
      document.body.style.overflow = "hidden";

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };

      const onFullscreenChange = () => {
        if (!document.fullscreenElement && fullscreenActiveRef.current && !closingRef.current) {
          close();
        }
        if (document.fullscreenElement) {
          fullscreenActiveRef.current = true;
        }
      };

      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("fullscreenchange", onFullscreenChange);

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("fullscreenchange", onFullscreenChange);
      };
    }, [close]);

    function toggleMute(e: React.MouseEvent) {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      const next = !video.muted;
      video.muted = next;
      setMuted(next);
    }

    function handleTapPlay(e: React.MouseEvent | React.PointerEvent) {
      e.preventDefault();
      e.stopPropagation();
      playVideo();
    }

    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        ref={containerRef}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        style={{ height: "100dvh", width: "100vw" }}
      >
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />

        {needsTap && (
          <button
            type="button"
            onPointerUp={handleTapPlay}
            onClick={handleTapPlay}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 touch-manipulation"
            aria-label="Tocar vídeo"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red">
              <PlayIcon />
            </div>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 md:p-8">
          <p className="font-sans text-sm font-bold uppercase tracking-wider text-brand-cream/80 md:text-base">
            {title}
          </p>
        </div>

        <button
          type="button"
          onClick={close}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-dark/70 text-brand-cream backdrop-blur-sm transition-colors hover:bg-brand-red hover:border-brand-red md:right-8 md:top-8 touch-manipulation"
          aria-label="Fechar vídeo"
        >
          <CloseIcon />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-dark/70 text-brand-cream backdrop-blur-sm transition-colors hover:bg-brand-red hover:border-brand-red md:bottom-8 md:right-8 touch-manipulation"
          aria-label={muted ? "Ativar som" : "Desativar som"}
        >
          {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
      </div>,
      document.body
    );
  }
);
