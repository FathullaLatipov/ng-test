import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "motion/react";
import { HexStat } from "./BrandIcons";
import { HeroNetwork } from "./HeroNetwork";
import { IbmGrid } from "./BrandDecor";
import { useMediaQuery } from "../hooks/useMediaQuery";

const STATS = [
  { n: "14+", l: "Лет на рынке" },
  { n: "4",   l: "Направления бизнеса" },
  { n: "7",   l: "Регионов охвата" },
  { n: "200+", l: "Активных партнеров" },
];

function CounterStat({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctrl = animate(0, target, {
        duration: 2,
        ease: [0.25, 0, 0, 1],
        onUpdate: (v) => setVal(Math.round(v)),
      });
      return () => ctrl.stop();
    }, 1600);
    return () => clearTimeout(timer);
  }, [target]);
  return <span>{val}{suffix}</span>;
}

export function HeroNew() {
  const ref = useRef<HTMLElement>(null);
  const hideNetwork = useMediaQuery("(max-width: 900px)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const dropletsY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="ng-hero-section"
      style={{ position: "relative", height: "100vh", minHeight: 760, overflow: "hidden", background: "#0A0908" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, #0A0908 0%, #0F0D09 45%, #14110B 78%, #0A0908 100%)" }} />
      <IbmGrid opacity={0.06} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 78% 46%, rgba(199,155,74,0.09) 0%, transparent 58%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(100deg, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.52) 44%, rgba(10,9,8,0.12) 68%, transparent 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32%", zIndex: 3, background: "linear-gradient(to top, #0A0908 0%, transparent 100%)", pointerEvents: "none" }} />

      {!hideNetwork && (
        <motion.div style={{ position: "absolute", inset: 0, y: dropletsY }}>
          <HeroNetwork />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="ng-decor"
        style={{ position: "absolute", top: 110, right: 52, zIndex: 10, display: "flex", alignItems: "center", gap: 8 }}
      >
        <div style={{ width: 16, height: 1, background: "var(--ng-gold)", opacity: 0.6 }} />
        <span style={{ color: "rgba(232,201,122,0.85)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textShadow: "0 0 12px rgba(213,162,81,0.5)" }}>
          NOBEL GROUP · УЗБЕКИСТАН
        </span>
      </motion.div>

      <motion.div
        className="ng-side-pad ng-hero-copy"
        style={{ position: "absolute", inset: 0, zIndex: 8, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", maxWidth: 640, y: contentY, opacity: fadeOut }}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="ng-hero-kicker"
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 30, height: 1, background: "var(--ng-gold)", flexShrink: 0 }} />
          <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>ГРУППА КОМПАНИЙ · УЗБЕКИСТАН</span>
        </motion.div>

        {[
          { text: "СОЗДАЕМ БУДУЩЕЕ", delay: 0.35, gold: false },
          { text: "ПРОДОВОЛЬСТВЕННОЙ", delay: 0.48, gold: false },
          { text: "ДИСТРИБУЦИИ.", delay: 0.61, gold: true },
        ].map(({ text, delay, gold }) => (
          <div key={text} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className={`ng-hero-heading${gold ? " text-gold-glow" : ""}`}
              style={{
                fontSize: "clamp(26px, 3.6vw, 50px)",
                fontWeight: 800,
                letterSpacing: "-0.015em",
                lineHeight: 1.16,
                color: gold ? "var(--ng-gold)" : "#FFFFFF",
                paddingBottom: "0.06em",
              }}
            >
              {text}
            </motion.div>
          </div>
        ))}

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          style={{ color: "rgba(255,255,255,0.62)", fontSize: 15, fontWeight: 300, lineHeight: 1.82, marginTop: 28, marginBottom: 44, maxWidth: 520 }}>
          Nobel Group объединяет поставщиков, дистрибьюторов, ретейлеров и партнёров HoReCa в единую надёжную экосистему торговли, логистики и развития рынка.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#about"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(0deg, #D5A251, #2F2512 170%)", color: "#FFFFFF", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", padding: "15px 32px", transition: "all 0.35s" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(213,162,81,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
            О ГРУППЕ КОМПАНИЙ
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
          <a href="#contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", color: "#FFFFFF", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", padding: "14px 32px", border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.35s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D5A251"; e.currentTarget.style.color = "#D5A251"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            СТАТЬ ПАРТНЕРОМ
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="ng-side-pad ng-grid-stats"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          background: "rgba(18,17,15,0.82)",
          backdropFilter: "blur(22px)",
          borderTop: "1px solid rgba(213,162,81,0.18)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "0 80px",
        }}
      >
        {STATS.map(({ n, l }, i) => {
          const num = parseInt(n);
          const suf = n.replace(String(num), "");
          return (
            <div key={l} style={{ padding: "14px 0", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingLeft: i > 0 ? 28 : 0, display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <HexStat delay={1.6 + i * 0.1} inView>
                <CounterStat target={num} suffix={suf} />
              </HexStat>
              <span style={{ color: "var(--ng-muted-dark)", fontSize: 12, fontWeight: 400, lineHeight: 1.4 }}>{l}</span>
            </div>
          );
        })}
      </motion.div>

    </section>
  );
}
