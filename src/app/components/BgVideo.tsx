import { useEffect, useRef } from "react";

/** Looping muted background video that starts from `start` seconds (and loops back to it). */
export function BgVideo({ start = 0, src = "/video/bg.mp4" }: { start?: number; src?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
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
  }, [start]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
    />
  );
}
