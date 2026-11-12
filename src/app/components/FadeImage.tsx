import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ResponsiveImg } from "./ResponsiveImg";

/**
 * Edges dissolve into the section background — a thin, smooth fade (~5% per side) so the photo
 * stays almost fully visible. Eased stops (not a hard linear ramp) keep the transition silky.
 */
const FADE_X = "linear-gradient(to right, transparent 0, rgba(0,0,0,0.55) 2.2%, #000 5.5%, #000 94.5%, rgba(0,0,0,0.55) 97.8%, transparent 100%)";
const FADE_Y = "linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.55) 2.6%, #000 6.5%, #000 93.5%, rgba(0,0,0,0.55) 97.4%, transparent 100%)";
const FADE_MASK = `${FADE_X}, ${FADE_Y}`;

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
      data-fixed={aspect ? "1" : undefined}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      style={{ position: "relative", width: "100%", alignSelf: aspect ? "center" : "stretch", minHeight, ...(aspect ? { aspectRatio: aspect } : {}) }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-6%",
          background: "radial-gradient(ellipse at center, rgba(213,162,81,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          WebkitMaskImage: FADE_MASK,
          maskImage: FADE_MASK,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <ResponsiveImg
          src={src}
          alt={alt}
          sizes="(max-width: 1024px) 100vw, 56vw"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.14), transparent 30%)" }} />
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
