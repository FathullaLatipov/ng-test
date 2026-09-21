import { motion } from "motion/react";
import { Link } from "react-router";
import { IbmGrid, LogisticsMesh } from "./BrandDecor";
import { PageHeroVisual, type HeroVisualKind } from "./PageHeroVisual";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  crumbs?: { label: string; to?: string }[];
  visual?: HeroVisualKind;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  crumbs = [],
  visual,
}: PageHeroProps) {
  return (
    <section
      className="ng-side-pad ng-page-hero"
      style={{
        position: "relative",
        minHeight: "58vh",
        display: "flex",
        alignItems: "center",
        padding: "140px 80px 72px",
        overflow: "hidden",
        background: "linear-gradient(125deg, #0A0908 0%, #12100C 42%, #1A1510 78%, #0A0908 100%)",
      }}
    >
      <IbmGrid opacity={0.05} />
      <LogisticsMesh opacity={0.1} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 40%, rgba(213,162,81,0.12) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(213,162,81,0.35) 50%, transparent)",
        }}
      />

      {/* Entrance accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          transformOrigin: "left",
          background: "linear-gradient(to right, transparent, #D5A251 40%, #E8C97A 60%, transparent)",
          zIndex: 3,
        }}
      />

      <div
        className="ng-page-hero-grid"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: visual === "geography" ? "0.9fr 1.1fr" : visual ? "1.05fr 0.95fr" : "1fr",
          gap: visual === "geography" ? 36 : 48,
          alignItems: "center",
        }}
      >
        <div>
          {crumbs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}
            >
              <Link
                to="/"
                style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em" }}
              >
                Главная
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "rgba(213,162,81,0.5)", fontSize: 10 }}>›</span>
                  {c.to ? (
                    <Link to={c.to} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 12 }}>
                      {c.label}
                    </Link>
                  ) : (
                    <span style={{ color: "#C9A24B", fontSize: 12, fontWeight: 600 }}>{c.label}</span>
                  )}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ height: 1, background: "#C9A24B" }}
            />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{eyebrow}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(36px, 5.5vw, 68px)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 24px",
              maxWidth: 640,
            }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span style={{ color: "#C9A24B" }}>{titleAccent}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.65 }}
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 520,
              margin: 0,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {visual && (
          <div className="ng-page-hero-visual" style={{ minHeight: 280, display: "flex", alignItems: "center" }}>
            <PageHeroVisual kind={visual} />
          </div>
        )}
      </div>
    </section>
  );
}
