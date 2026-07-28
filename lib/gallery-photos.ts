import fs from "fs";
import path from "path";

const PHOTOS_DIR = path.join(process.cwd(), "public/images/photos");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export type GalleryPhoto = {
  src: string;
  alt: string;
};

function formatAlt(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[._-]+/g, " ")
    .trim();
}

export function getGalleryPhotos(): GalleryPhoto[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((filename) => ({
      src: `/images/photos/${filename}`,
      alt: formatAlt(filename),
    }));
}
