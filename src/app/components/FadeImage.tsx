import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Edges dissolve into the section background (works on any bg); corners fade the most */
const FADE_MASK =
  "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 9%, #000 91%, transparent 100%)";

/**
 * Photo for a two-column block: rounded, soft dark/transparent edges, faint gold glow behind.
 * `.ng-bz-img` lets the parent grid flip image/text order on desktop (see responsive.css).
 */
export function FadeImage({
  src,
  alt,
  position = "center",
  aspect,
  minHeight = 460,
  caption,
  children,
}: {
  src: string;
  alt: string;
  position?: string;
  /** По умолчанию фото растягивается на всю высоту соседнего текста; aspect — только если нужен фиксированный формат */
  aspect?: string;
  minHeight?: number;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className="ng-bz-img"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ position: "relative", width: "100%", alignSelf: "stretch", minHeight, ...(aspect ? { aspectRatio: aspect } : {}) }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-6%",
          background: "radial-gradient(ellipse at center, rgba(213,162,81,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 26,
          overflow: "hidden",
          WebkitMaskImage: FADE_MASK,
          maskImage: FADE_MASK,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, display: "block", filter: "brightness(0.88) saturate(1.05)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.45), transparent 50%)" }} />
      </div>
      {caption && (
        <div style={{ position: "absolute", left: 34, bottom: 30, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>{caption}</span>
        </div>
      )}
      {children}
    </motion.div>
  );
}
