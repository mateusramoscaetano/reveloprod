#!/usr/bin/env bash
set -euo pipefail

PUBLIC_DIR="$(cd "$(dirname "$0")/../public" && pwd)"
LOG="$PUBLIC_DIR/../convert-webm.log"

echo "=== WebM conversion started at $(date) ===" | tee "$LOG"

cd "$PUBLIC_DIR"

for f in *.mp4; do
  [ -f "$f" ] || continue
  out="${f%.mp4}.webm"

  if [ -f "$out" ]; then
    echo "[SKIP] $out already exists" | tee -a "$LOG"
    continue
  fi

  echo "[START] $f at $(date)" | tee -a "$LOG"

  ffmpeg -y -i "$f" \
    -c:v libvpx-vp9 -crf 32 -b:v 0 \
    -cpu-used 4 -deadline good -row-mt 1 \
    -c:a libopus -b:a 128k \
    "$out" 2>>"$LOG"

  echo "[DONE] $f -> $out at $(date)" | tee -a "$LOG"
done

echo "=== All conversions finished at $(date) ===" | tee -a "$LOG"
