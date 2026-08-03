import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { HeroNetwork } from "./HeroNetwork";
import { IbmGrid } from "./BrandDecor";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useCms } from "../cms/store";

export function HeroNew() {
  const { data } = useCms();
  const h = data.homeHero;
  const ref = useRef<HTMLElement>(null);
  const hideNetwork = useMediaQuery("(max-width: 900px)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="ng-hero-section"
      style={{ position: "relative", height: "100vh", minHeight: 760, overflow: "hidden", background: "#0A0908" }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-8% 0",
          backgroundImage: `url(${h.photoUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "brightness(0.38) saturate(0.75)",
          y: photoY,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(10,9,8,0.94) 0%, rgba(10,9,8,0.72) 42%, rgba(10,9,8,0.45) 70%, rgba(10,9,8,0.55) 100%)" }} />
      <IbmGrid opacity={0.05} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 78% 46%, rgba(199,155,74,0.12) 0%, transparent 58%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", zIndex: 3, background: "linear-gradient(to top, #0A0908 0%, transparent 100%)", pointerEvents: "none" }} />

      {!hideNetwork && (
        <motion.div style={{ position: "absolute", inset: 0, opacity: 0.55, zIndex: 2 }}>
          <HeroNetwork />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="ng-decor"
        style={{ position: "absolute", top: 110, right: 52, zIndex: 10, display: "flex", alignItems: "center", gap: 8 }}
      >
        <div style={{ width: 16, height: 1, background: "var(--ng-gold)", opacity: 0.6 }} />
        <span style={{ color: "rgba(232,201,122,0.85)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textShadow: "0 0 12px rgba(213,162,81,0.5)" }}>
          {h.badge}
        </span>
      </motion.div>

      <motion.div
        className="ng-side-pad ng-hero-copy"
        style={{ position: "absolute", inset: 0, zIndex: 8, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", maxWidth: 720, y: contentY, opacity: fadeOut }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="ng-hero-kicker"
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
        >
          <div style={{ width: 30, height: 1, background: "var(--ng-gold)", flexShrink: 0 }} />
          <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{h.eyebrow}</span>
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="ng-hero-heading"
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "#FFFFFF",
              margin: 0,
              maxWidth: 640,
            }}
          >
            {h.titleLine1}
            <br />
            <span className="text-gold-glow" style={{ color: "var(--ng-gold)" }}>{h.titleAccent}</span>
            <br />
            {h.titleLine3}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 300, lineHeight: 1.75, marginTop: 24, marginBottom: 18, maxWidth: 540 }}
        >
          {h.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.65 }}
          style={{ color: "rgba(255,255,255,0.48)", fontSize: 14, fontWeight: 300, lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}
        >
          {h.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <Link
            to={h.ctaPrimaryTo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(0deg, #D5A251, #2F2512 170%)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "15px 32px",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(213,162,81,0.45)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {h.ctaPrimary}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            to={h.ctaSecondaryTo}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              padding: "14px 32px",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#D5A251";
              e.currentTarget.style.color = "#D5A251";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {h.ctaSecondary}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
