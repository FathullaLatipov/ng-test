import { useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { GoldCheck } from "./BrandIcons";
import { GiantNumber, GiantOutline, IbmGrid, LogisticsMesh } from "./BrandDecor";
import { useCms } from "../cms/store";

function prng(i: number) {
  return ((i * 7919 + 1) % 100) / 100;
}

function EmberParticles() {
  const pts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: prng(i * 3) * 100,
        top: prng(i * 3 + 1) * 90 + 5,
        size: prng(i * 3 + 2) * 2.2 + 0.8,
        delay: prng(i) * 6,
        dur: prng(i * 2) * 5 + 6,
      })),
    [],
  );
  return (
    <>
      {pts.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#E8C97A",
            boxShadow: "0 0 6px rgba(232,201,122,0.7)",
            animation: `drift-up ${p.dur}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

export function WhyChooseUs() {
  const { data } = useCms();
  const why = data.why;
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="ng-sec-pad"
      style={{
        background: "linear-gradient(160deg, #17130D 0%, #241D12 42%, #1C170F 72%, #14110C 100%)",
        padding: "110px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.3) 50%, transparent)" }} />
      <IbmGrid opacity={0.025} />
      <LogisticsMesh opacity={0.05} />
      <div className="ng-decor">
        <GiantNumber n="05" />
      </div>
      <div className="ng-decor">
        <GiantOutline kind="handshake" side="right" size={300} />
      </div>
      <EmberParticles />
      <motion.div
        style={{
          position: "absolute",
          left: "-15%",
          top: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(213,162,81,0.1) 0%, transparent 68%)",
          pointerEvents: "none",
          x: bgX,
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
          <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{why.eyebrow}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48, maxWidth: 720 }}
        >
          {why.title}
          <br />
          <span className="text-gold-glow">{why.titleAccent}</span>
        </motion.h2>

        <div className="ng-grid-3 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {why.reasons.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + i * 0.07, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="ng-card-compact"
              style={{
                background: hovered === i ? "linear-gradient(145deg, #262019 0%, #1B1712 100%)" : "var(--ng-elevated)",
                border: hovered === i ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)",
                padding: "28px 24px",
                transition: "all 0.35s ease",
                transform: hovered === i ? "translateY(-4px)" : "none",
                minHeight: 200,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <GoldCheck size={18} />
                <span style={{ color: "rgba(213,162,81,0.8)", fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="ng-card-compact-title" style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 12, lineHeight: 1.35 }}>
                {r.title}
              </div>
              <p className="ng-card-compact-desc" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
