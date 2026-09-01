import videoFiles from "./video-files.json";

export type Video = {
  id: string;
  title: string;
  category: string;
  year: string;
  featured?: boolean;
  previewAt?: number;
};

export const videos: Video[] = [
  {
    id: "medpuc-86-curta",
    title: "MEDPUC 86",
    category: "Estúdio",
    year: "2025",
    featured: true,
  },
  {
    id: "medicina-up-18",
    title: "Medicina UP 18",
    category: "Family",
    year: "2025",
    featured: true,
  },
  {
    id: "family-day-guarapuava",
    title: "Family Day Guarapuava",
    category: "Evento",
    year: "2025",
    featured: true,
    previewAt: 2,
  },
  {
    id: "medpuc-82",
    title: "MEDPUC 82",
    category: "Aftermovie",
    year: "2025",
    featured: true,
  },
  {
    id: "medpuc-86-longa",
    title: "MEDPUC 86",
    category: "Estúdio",
    year: "2025",
  },
  {
    id: "medpuc-86-colacao",
    title: "MEDPUC 86",
    category: "Colação",
    year: "2025",
  },
  {
    id: "fpp-t11-estudio",
    title: "Medicina FPP T11",
    category: "Estúdio",
    year: "2025",
  },
  {
    id: "fpp-t11-colacao",
    title: "Medicina FPP T11",
    category: "Colação",
    year: "2025",
  },
  {
    id: "fpp-t12",
    title: "Medicina FPP T12",
    category: "Estúdio",
    year: "2025",
  },
  {
    id: "fpp-t13",
    title: "Medicina FPP T13",
    category: "Estúdio",
    year: "2025",
  },
  {
    id: "up-17",
    title: "Medicina UP 17",
    category: "Estúdio",
    year: "2025",
  },
  {
    id: "compilado-culto",
    title: "Compilado Culto Colação",
    category: "Colação",
    year: "2025",
  },
];

export function getVideoFile(id: string): string {
  const file = videoFiles[id as keyof typeof videoFiles];
  if (!file) throw new Error(`Video file not found for id: ${id}`);
  return file;
}

export function publicVideoUrl(filename: string) {
  return `/${encodeURIComponent(filename)}`;
}

export function videoSources(id: string) {
  const file = getVideoFile(id);
  return {
    src: publicVideoUrl(file),
  };
}

export const featuredVideos = videos.filter((v) => v.featured);

export function getVideoById(id: string): Video {
  const video = videos.find((v) => v.id === id);
  if (!video) throw new Error(`Video not found: ${id}`);
  return video;
}

export type VideoWithFile = Video & { file: string };

export function withVideoFile(video: Video): VideoWithFile {
  return { ...video, file: getVideoFile(video.id) };
}

export const videosWithFiles = videos.map(withVideoFile);
export const featuredVideosWithFiles = featuredVideos.map(withVideoFile);
