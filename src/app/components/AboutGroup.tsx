import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { GoldCheck } from "./BrandIcons";
import { GiantNumber, GiantOutline, IbmGrid, LogisticsMesh, DrawLine } from "./BrandDecor";
import { useCms } from "../cms/store";

/** Icon paths kept for CAP_NODES diagram only */
const CAP_ICONS: Record<string, string> = {
  import: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  production: "M14.7 6.3a1 1 0 010 1.4l-8 8a1 1 0 01-.4.25l-3 1a1 1 0 01-1.25-1.25l1-3a1 1 0 01.25-.4l8-8a1 1 0 011.4 0z",
  horeca: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z",
  trade: "M1 3h15v13H1zM16 8l4 2v6h-4z",
  invest: "M3 7h18M3 12h18M3 17h12",
  brand: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  logistics: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18",
};

const CAP_NODES = [
  { id: "import",     label: "Импорт и\nдистрибуция", x: 50,   y: 10 },
  { id: "production", label: "Производство",          x: 84.6, y: 30 },
  { id: "horeca",     label: "HoReCa",                x: 84.6, y: 70 },
  { id: "brand",      label: "Бренды",                x: 50,   y: 90 },
  { id: "logistics",  label: "Логистика\nи склад",    x: 15.4, y: 70 },
  { id: "trade",      label: "Междунар.\nторговля",   x: 15.4, y: 30 },
];

const CONNS: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]];

function NodeDot({ cap, inView, delay }: { cap: typeof CAP_NODES[0]; inView: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "absolute", left: `${cap.x}%`, top: `${cap.y}%`, x: "-50%", y: "-50%", width: 44, height: 44, cursor: "default" }}
    >
      <motion.div
        animate={{ borderColor: hovered ? "rgba(213,162,81,0.7)" : "rgba(213,162,81,0.3)", background: hovered ? "rgba(213,162,81,0.08)" : "#12110F", boxShadow: hovered ? "0 0 16px rgba(213,162,81,0.25)" : "none" }}
        transition={{ duration: 0.3 }}
        style={{ width: 44, height: 44, border: "1px solid rgba(213,162,81,0.3)", background: "#12110F", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#D5A251" : "#C9A24B"} strokeWidth="1.2" strokeLinecap="round">
          <path d={CAP_ICONS[cap.id] || ""} />
        </svg>
      </motion.div>
      <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 100, textAlign: "center", color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: 600, lineHeight: 1.35, whiteSpace: "pre-line", transition: "color 0.3s" }}>
        {cap.label}
      </div>
    </motion.div>
  );
}

function EnergyPulse({ node, delay }: { node: typeof CAP_NODES[0]; delay: number }) {
  return (
    <motion.circle
      r={0.85}
      fill="#D5A251"
      style={{ filter: "drop-shadow(0 0 2.5px rgba(213,162,81,0.95))" }}
      animate={{ cx: [50, node.x, 50], cy: [50, node.y, 50], opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut", times: [0, 0.08, 0.45, 0.92, 1] }}
    />
  );
}

export function AboutGroup() {
  const { data } = useCms();
  const about = data.about;
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const diagramY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={sectionRef} id="about" className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      <IbmGrid opacity={0.02} />
      <LogisticsMesh opacity={0.07} />
      <div className="ng-decor"><GiantNumber n="01" /></div>
      <div className="ng-decor"><GiantOutline kind="network" side="left" size={280} /></div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{about.eyebrow}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24 }}>
              {about.title}
              <br /><span className="text-gold-glow">{about.titleAccent}</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "var(--ng-muted-dark)", fontSize: 15, fontWeight: 300, lineHeight: 1.82, marginBottom: 10 }}>
              {about.body}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
              style={{ color: "var(--ng-muted-dark)", fontSize: 14, fontWeight: 300, lineHeight: 1.82, marginBottom: 28 }}>
              {about.body2}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} style={{ marginBottom: 28 }}>
              <DrawLine label="ЭКОСИСТЕМА" inView={inView} />
            </motion.div>

            {about.capabilities.map((label, i) => (
              <motion.div key={label} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.32 + i * 0.07 }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "default" }}>
                <GoldCheck size={15} />
                <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>{label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ position: "relative", width: "100%", aspectRatio: "1", maxWidth: 460, margin: "0 auto", y: diagramY }}>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
              style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", color: "rgba(213,162,81,0.5)", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700, zIndex: 3 }}>
              LOGISTICS
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
              style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", color: "rgba(213,162,81,0.5)", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700, zIndex: 3 }}>
              RETAIL
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.95 }}
              style={{ position: "absolute", left: -4, top: "50%", transform: "translateY(-50%) rotate(-90deg)", color: "rgba(213,162,81,0.5)", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700, zIndex: 3 }}>
              MANUFACTURE
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.05 }}
              style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%) rotate(90deg)", color: "rgba(213,162,81,0.5)", fontSize: 9, letterSpacing: "0.2em", fontWeight: 700, zIndex: 3 }}>
              DISTRIBUTION
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }}
              style={{ position: "absolute", inset: "4%", borderRadius: "50%", border: "1px solid rgba(213,162,81,0.08)" }} />
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ position: "absolute", inset: "16%", borderRadius: "50%", border: "1px solid rgba(213,162,81,0.06)" }} />

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: 360 } : {}}
              transition={{ opacity: { delay: 0.4, duration: 0.8 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
              style={{ position: "absolute", inset: "0%", borderRadius: "50%", border: "1px dashed rgba(213,162,81,0.16)" }} />
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: -360 } : {}}
              transition={{ opacity: { delay: 0.5, duration: 0.8 }, rotate: { duration: 45, repeat: Infinity, ease: "linear" } }}
              style={{ position: "absolute", inset: "10%", borderRadius: "50%", border: "1px dashed rgba(213,162,81,0.10)" }} />

            {[0, 1, 2].map((k) => (
              <motion.div key={k}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: k % 2 === 0 ? 360 : -360 } : {}}
                transition={{ opacity: { delay: 0.6 }, rotate: { duration: 18 + k * 7, repeat: Infinity, ease: "linear" } }}
                style={{ position: "absolute", inset: `${4 + k * 6}%`, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: -2.5, left: "50%", width: 5, height: 5, borderRadius: "50%", background: "#D5A251", marginLeft: -2.5, boxShadow: "0 0 8px rgba(213,162,81,0.8)" }} />
              </motion.div>
            ))}

            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 100 100">
              {inView && [0, 1, 2].map((k) => (
                <motion.circle key={`wave-${k}`} cx={50} cy={50} fill="none" stroke="rgba(213,162,81,0.25)" strokeWidth="0.3"
                  initial={{ r: 8, opacity: 0 }}
                  animate={{ r: [8, 40], opacity: [0.5, 0] }}
                  transition={{ duration: 4, delay: k * 1.33, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              {CAP_NODES.map((node, i) => (
                <motion.line key={`radial-${i}`} x1={50} y1={50} x2={node.x} y2={node.y}
                  stroke="rgba(213,162,81,0.12)" strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
                />
              ))}
              {CONNS.map(([a, b], i) => {
                const pa = CAP_NODES[a], pb = CAP_NODES[b];
                return (
                  <motion.line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(213,162,81,0.16)" strokeWidth="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.07, duration: 0.55 }}
                  />
                );
              })}
              {inView && CAP_NODES.map((node, i) => (
                <EnergyPulse key={`pulse-${i}`} node={node} delay={1.4 + i * 0.5} />
              ))}
            </svg>

            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.55 }}
              style={{ position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", width: 96, height: 96, background: "linear-gradient(135deg, #2F2512 0%, #12110F 100%)", border: "1px solid rgba(213,162,81,0.65)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, animation: "glow-pulse 3s ease-in-out infinite", boxShadow: "0 0 32px rgba(213,162,81,0.15)" }}>
              <div style={{ color: "#D5A251", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", marginBottom: 4 }}>NOBEL</div>
              <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em" }}>GROUP</div>
            </motion.div>

            {CAP_NODES.map((cap, i) => <NodeDot key={cap.id} cap={cap} inView={inView} delay={0.75 + i * 0.09} />)}
          </motion.div>
        </div>

        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 60, paddingTop: 52, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}
            style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid #D5A251", padding: "28px 28px" }}>
            <div style={{ color: "#D5A251", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>МИССИЯ</div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{about.missionTitle}</div>
            <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, fontWeight: 300, lineHeight: 1.82, margin: 0 }}>
              {about.missionBody}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.75 }}
            style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", padding: "28px 28px" }}>
            <div style={{ color: "var(--ng-muted-dark)", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>ЦЕННОСТИ</div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>{about.valuesTitle}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {about.values.map((v) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <GoldCheck size={14} />
                  <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
