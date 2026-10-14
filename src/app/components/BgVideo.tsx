import { useEffect, useRef, useState } from "react";

const DESKTOP_SRC = "/video/bg-desktop.mp4";
const MOBILE_SRC = "/video/bg-mobile.mp4";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** Нужно ли вообще грузить видео: экономия трафика / «меньше анимации» → остаётся только постер */
function shouldSkipVideo() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  return Boolean(conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g");
}

/**
 * Looping muted background video that starts from `start` seconds (and loops back to it).
 * Phones get a lighter file; data-saver / slow networks / reduced-motion get the poster only.
 */
export function BgVideo({ start = 0, poster }: { start?: number; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    setSrc(window.matchMedia("(max-width: 768px)").matches ? MOBILE_SRC : DESKTOP_SRC);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const seek = () => {
      try {
        v.currentTime = start;
      } catch {
        /* ignore */
      }
    };
    if (v.readyState >= 1) seek();
    else v.addEventListener("loadedmetadata", seek, { once: true });
    const onEnded = () => {
      seek();
      void v.play().catch(() => {});
    };
    v.addEventListener("ended", onEnded);
    void v.play().catch(() => {});
    return () => v.removeEventListener("ended", onEnded);
  }, [start, src]);

  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" } as const;

  if (!src) {
    return poster ? <img src={poster} alt="" aria-hidden="true" style={fill} /> : null;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={fill}
    />
  );
}
