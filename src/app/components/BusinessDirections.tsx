import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { GiantNumber, GiantOutline, GiantWord, HoneycombPattern } from "./BrandDecor";
import { useCms } from "../cms/store";
import type { DirectionItem } from "../cms/types";

function DirectionPhotoCard({
  dir,
  index,
  inView,
  featured,
}: {
  dir: DirectionItem;
  index: number;
  inView: boolean;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const to =
    dir.detailTo ||
    (dir.id === "production" ? "/business/jib" : dir.id === "import" ? "/business/import" : `/business#${dir.id}`);

  return (
    <Link to={to} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 + index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={dir.id}
      style={{
        position: "relative",
        minHeight: featured ? 360 : 300,
        overflow: "hidden",
        border: hovered ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.45)" : "none",
        scrollMarginTop: 100,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${dir.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: hovered ? "brightness(0.55) saturate(0.9)" : "brightness(0.42) saturate(0.75)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s ease, filter 0.4s ease",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.96) 0%, rgba(10,9,8,0.55) 45%, rgba(10,9,8,0.25) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100%" : 48, height: 2, background: "linear-gradient(to right, #D5A251, rgba(213,162,81,0.2))", transition: "width 0.45s ease", zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", minHeight: featured ? 360 : 300, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 26px" }}>
        <div style={{ color: "rgba(232,201,122,0.55)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", marginBottom: 12 }}>{dir.number}</div>
        <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", marginBottom: 8 }}>{dir.tagline.toUpperCase()}</div>
        <div style={{ color: "#FFFFFF", fontSize: featured ? 26 : 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.15 }}>{dir.name}</div>
        <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 420 }}>{dir.desc}</p>
      </div>
    </motion.div>
    </Link>
  );
}

export function BusinessDirections({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const { data } = useCms();
  const biz = data.business;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const directions = [...biz.directions]
    .filter((d) => d.published)
    .sort((a, b) => a.order - b.order);
  const items = limit ? directions.slice(0, limit) : directions;

  return (
    <section
      id="business"
      className="ng-sec-pad"
      style={{
        background: "linear-gradient(165deg, #12110F 0%, #1A1712 45%, #12110F 100%)",
        padding: "110px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HoneycombPattern opacity={0.03} />
      <div className="ng-decor">
        <GiantNumber n="02" />
      </div>
      <div className="ng-decor">
        <GiantWord word="BUSINESS" />
      </div>
      <div className="ng-decor">
        <GiantOutline kind="container" side="left" size={300} />
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end", marginBottom: 56 }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
            >
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{biz.eyebrow}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {biz.title}
              <br />
              <span className="text-gold-glow">{biz.titleAccent}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 300, lineHeight: 1.82 }}
          >
            {biz.lead}
          </motion.p>
        </div>

        <div
          className={`ng-biz-mosaic ${items.length === 4 ? "ng-grid-cards2" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: items.length === 4 ? "1fr 1fr" : "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {items.map((dir, i) => (
            <div
              key={dir.id}
              style={{
                gridColumn: items.length === 4 ? "span 1" : i < 3 ? "span 2" : "span 3",
              }}
            >
              <DirectionPhotoCard dir={dir} index={i} inView={inView} featured={items.length === 4 || i < 2} />
            </div>
          ))}
        </div>

        {showAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 36, textAlign: "center" }}
          >
            <Link
              to="/business"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(213,162,81,0.45)",
                color: "#C9A24B",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "14px 28px",
              }}
            >
              ВСЕ НАПРАВЛЕНИЯ →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
