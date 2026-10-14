import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { IconYearExpand, IconYearFoundation, IconYearGlobal, IconYearService, IconYearWarehouse } from "./BrandIcons";
import { useCms } from "../cms/store";
import type { MilestoneItem } from "../cms/types";
import { GiantNumber, GiantOutline, GiantWord, IbmGrid } from "./BrandDecor";

type Milestone = MilestoneItem;

/** «17 ЛЕТ», «21 ГОД», «22 ГОДА» */
function yearsLabel(n: number) {
  const m10 = n % 10, m100 = n % 100;
  const w = m10 === 1 && m100 !== 11 ? "ГОД" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "ГОДА" : "ЛЕТ";
  return `${n} ${w}`;
}

const ICON_CYCLE = [IconYearExpand, IconYearWarehouse, IconYearService, IconYearGlobal];

function MilestoneCard({
  m, i, total, inView, progress,
}: {
  m: Milestone;
  i: number;
  total: number;
  inView: boolean;
  progress: number;
}) {
  const [hovered, setHovered] = useState(false);
  const YearIcon = i === 0 ? IconYearFoundation : ICON_CYCLE[(i - 1) % ICON_CYCLE.length];
  const threshold = i / Math.max(total - 1, 1);
  const active = progress >= threshold - 0.02;

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="ng-milestone-grid"
      style={{ display: "grid", gridTemplateColumns: "110px 56px 1fr", gap: "0 20px", alignItems: "center", paddingBottom: i < total - 1 ? 48 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ textAlign: "right" }}>
        <span style={{
          color: active ? "var(--ng-gold)" : "rgba(255,255,255,0.25)",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          transition: "color 0.4s",
          textShadow: active ? "0 0 18px rgba(213,162,81,0.4)" : "none",
        }}>
          {m.year}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {active && (
          <motion.div
            aria-hidden
            animate={{ opacity: [0.5, 0], scale: [0.85, 1.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", width: 60, height: 60, borderRadius: 10, border: "1.5px solid rgba(213,162,81,0.5)", pointerEvents: "none" }}
          />
        )}
        <motion.div
          animate={{
            scale: hovered ? 1.15 : active ? 1 : 0.85,
            boxShadow: hovered
              ? "0 0 32px rgba(213,162,81,0.75)"
              : active
              ? "0 0 24px rgba(213,162,81,0.55)"
              : "0 4px 12px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.35 }}
          style={{
            width: 56, height: 56,
            boxSizing: "border-box",
            zIndex: 2,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active ? "linear-gradient(145deg, #2F2512, #1A1814)" : "var(--ng-void)",
            border: active || hovered ? "1.5px solid rgba(213,162,81,0.7)" : "1px solid rgba(255,255,255,0.12)",
            transition: "background 0.4s, border 0.4s",
          }}
        >
          <YearIcon size={28} />
        </motion.div>
      </div>

      <motion.div
        animate={{
          x: hovered ? 6 : 0,
          borderColor: hovered ? "rgba(213,162,81,0.4)" : "rgba(255,255,255,0.06)",
          boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.42)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25 }}
        className="ng-milestone-content"
        style={{
          background: active ? "var(--ng-elevated)" : "rgba(30,28,24,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: active ? "3px solid #D5A251" : "3px solid rgba(213,162,81,0.2)",
          padding: "22px 26px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700 }}>{m.title}</div>
          <div style={{ background: "rgba(213,162,81,0.1)", border: "1px solid rgba(213,162,81,0.22)", color: "var(--ng-gold)", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", padding: "4px 10px", flexShrink: 0, marginLeft: 14 }}>
            {m.tag.toUpperCase()}
          </div>
        </div>
        {m.desc && <p style={{ color: "var(--ng-muted-dark)", fontSize: 14, fontWeight: 300, lineHeight: 1.75, margin: 0 }}>{m.desc}</p>}
        {!!m.points?.length && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {m.points.map((p) => (
              <span key={p} style={{ border: "1px solid rgba(213,162,81,0.28)", background: "rgba(213,162,81,0.05)", color: "rgba(255,255,255,0.82)", fontSize: 11.5, fontWeight: 500, padding: "5px 11px" }}>{p}</span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function CompanyJourney() {
  const { data } = useCms();
  const milestones = [...data.milestones]
    .filter((m) => m.published)
    .sort((a, b) => (parseInt(a.year, 10) || 0) - (parseInt(b.year, 10) || 0) || a.order - b.order);
  const firstYear = Math.min(...milestones.map((m) => parseInt(m.year, 10)).filter((y) => y > 0), new Date().getFullYear());
  const years = Math.max(new Date().getFullYear() - firstYear, 1);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 70%", "end 40%"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  return (
    <section ref={containerRef} id="history" className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "120px 80px", position: "relative", overflow: "hidden" }}>
      <IbmGrid opacity={0.02} />
      <div className="ng-decor"><GiantNumber n="03" /></div>
      <div className="ng-decor"><GiantWord word="HISTORY" side="left" /></div>
      <div className="ng-decor"><GiantOutline kind="factory" side="right" size={300} /></div>
      <motion.div style={{ position: "absolute", right: "-8%", top: "15%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(213,162,81,0.05) 0%, transparent 70%)", pointerEvents: "none", y: bgY }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div style={{ marginBottom: 72, maxWidth: 640 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
            <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>ИСТОРИЯ КОМПАНИИ</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {yearsLabel(years)}
            <br /><span className="text-gold-glow">УСТОЙЧИВОГО РОСТА.</span>
          </motion.h2>
        </div>

        <div style={{ position: "relative" }} ref={spineRef}>
          <div className="ng-timeline-spine" style={{ position: "absolute", left: 136, top: 24, bottom: 24, width: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
          <div className="ng-timeline-spine" style={{ position: "absolute", left: 136, top: 24, bottom: 24, width: 3, overflow: "hidden", borderRadius: 2, pointerEvents: "none" }}>
            <motion.div style={{ width: "100%", height: fillHeight, background: "linear-gradient(to bottom, #E8C97A, #D5A251)", boxShadow: "0 0 20px rgba(213,162,81,0.6)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {milestones.map((m, i) => (
              <MilestoneCard key={m.id} m={m} i={i} total={milestones.length} inView={inView} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
