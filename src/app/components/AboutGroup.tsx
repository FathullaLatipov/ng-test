import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { GoldCheck } from "./BrandIcons";
import { GiantNumber, GiantOutline, IbmGrid, LogisticsMesh, DrawLine } from "./BrandDecor";
import { useCms } from "../cms/store";

/** Icon paths kept for CAP_NODES diagram only */
const CAP_ICONS: Record<string, string> = {
  trade: "M1 3h15v13H1zM16 8l4 2v6h-4z",
  distribution: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  production: "M14.7 6.3a1 1 0 010 1.4l-8 8a1 1 0 01-.4.25l-3 1a1 1 0 01-1.25-1.25l1-3a1 1 0 01.25-.4l8-8a1 1 0 011.4 0z",
  horeca: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z",
  brand: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  logistics: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18",
};

const CAP_NODES = [
  { id: "trade",        label: "Импорт и\nдистрибуция", x: 50,   y: 10 },
  { id: "production",   label: "Производство",          x: 84.6, y: 30 },
  { id: "horeca",       label: "HoReCa и B2B",          x: 84.6, y: 70 },
  { id: "brand",        label: "Проекты",               x: 50,   y: 90 },
  { id: "logistics",    label: "Логистика",             x: 15.4, y: 70 },
  { id: "distribution", label: "Междунар.\nторговля",   x: 15.4, y: 30 },
];

/** hexagon perimeter (circulating flow) + inner diagonals (structural links) */
const PERIMETER: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]];
const DIAG: [number, number][] = [[0,3],[1,4],[2,5]];

function NodeDot({ cap, inView, delay, floatDelay }: { cap: typeof CAP_NODES[0]; inView: boolean; delay: number; floatDelay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "absolute", left: `${cap.x}%`, top: `${cap.y}%`, x: "-50%", y: "-50%", width: 58, height: 58, cursor: "default", zIndex: 3 }}
    >
      {/* gentle floating wrapper — CSS loop (compositor-reliable) */}
      <div className="ng-eco-float" style={{ position: "relative", width: 58, height: 58, animationDelay: `${floatDelay}s` }}>
        {/* soft glow halo — CSS loop */}
        <div className="ng-eco-halo" style={{ position: "absolute", inset: -6, borderRadius: 16, background: "radial-gradient(circle, rgba(213,162,81,0.38), transparent 70%)", pointerEvents: "none", animationDelay: `${floatDelay}s` }} />
        <motion.div
          animate={{ borderColor: hovered ? "rgba(232,201,122,0.85)" : "rgba(213,162,81,0.35)", background: hovered ? "rgba(213,162,81,0.12)" : "rgba(18,17,15,0.92)", boxShadow: hovered ? "0 0 22px rgba(213,162,81,0.4)" : "0 6px 18px rgba(0,0,0,0.4)" }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative", width: 58, height: 58, borderRadius: 14, border: "1px solid rgba(213,162,81,0.35)", background: "rgba(18,17,15,0.92)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#E8C97A" : "#C9A24B"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d={CAP_ICONS[cap.id] || ""} />
          </svg>
        </motion.div>
      </div>
      <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 100, textAlign: "center", color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.78)", fontSize: 10, fontWeight: 600, lineHeight: 1.35, whiteSpace: "pre-line", transition: "color 0.3s" }}>
        {cap.label}
      </div>
    </motion.div>
  );
}

/** Data packet circulating along a hexagon edge pa → pb */
function EdgeParticle({ a, b, delay }: { a: number; b: number; delay: number }) {
  const pa = CAP_NODES[a], pb = CAP_NODES[b];
  return (
    <motion.circle
      r={0.9}
      fill="#E8C97A"
      style={{ filter: "drop-shadow(0 0 2.5px rgba(232,201,122,0.95))" }}
      initial={{ cx: pa.x, cy: pa.y, opacity: 0 }}
      animate={{ cx: [pa.x, pb.x], cy: [pa.y, pb.y], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "linear", times: [0, 0.12, 0.88, 1] }}
    />
  );
}

/** Pulse radiating from the core hub out to a node */
function EnergyPulse({ node, delay }: { node: typeof CAP_NODES[0]; delay: number }) {
  return (
    <motion.circle
      r={0.75}
      cx={50}
      cy={50}
      fill="#D5A251"
      style={{ filter: "drop-shadow(0 0 2.5px rgba(213,162,81,0.95))" }}
      initial={{ cx: 50, cy: 50, opacity: 0 }}
      animate={{ cx: [50, node.x], cy: [50, node.y], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeIn", times: [0, 0.1, 0.85, 1] }}
    />
  );
}

/** Checkmark that draws its path on scroll-into-view */
function DrawCheck({ inView, delay, size = 16 }: { inView: boolean; delay: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke="#D5A251" strokeWidth="1.2" opacity="0.4" />
      <motion.path
        d="M4.5 8.2l2.4 2.4 4.6-5"
        stroke="#E8C97A"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: delay + 0.15, duration: 0.45, ease: "easeInOut" }}
      />
    </svg>
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
              style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 300, lineHeight: 1.82, marginBottom: 10 }}>
              {about.body}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
              style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 300, lineHeight: 1.82, marginBottom: 28 }}>
              {about.body2}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} style={{ marginBottom: 28 }}>
              <DrawLine label="ЭКОСИСТЕМА" inView={inView} />
            </motion.div>

            {about.capabilities.map((label, i) => (
              <motion.div key={label} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.32 + i * 0.07 }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "default" }}>
                <DrawCheck inView={inView} delay={0.32 + i * 0.07} size={16} />
                <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>{label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ position: "relative", width: "100%", aspectRatio: "1", maxWidth: 460, margin: "0 auto", y: diagramY }}>
            {/* static concentric guides */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }}
              style={{ position: "absolute", inset: "4%", borderRadius: "50%", border: "1px solid rgba(213,162,81,0.08)" }} />
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ position: "absolute", inset: "16%", borderRadius: "50%", border: "1px solid rgba(213,162,81,0.06)" }} />

            {/* radar sweep — CSS loop */}
            <div className="ng-eco-spin" style={{ "--spin": "9s", position: "absolute", inset: "2%", borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(232,201,122,0.20), rgba(213,162,81,0.04) 40deg, transparent 90deg)", WebkitMaskImage: "radial-gradient(circle, #000 34%, transparent 70%)", maskImage: "radial-gradient(circle, #000 34%, transparent 70%)", pointerEvents: "none" } as React.CSSProperties} />

            {/* counter-rotating dashed rings — CSS loops */}
            <div className="ng-eco-spin" style={{ "--spin": "60s", position: "absolute", inset: "0%", borderRadius: "50%", border: "1px dashed rgba(213,162,81,0.16)" } as React.CSSProperties} />
            <div className="ng-eco-spin-r" style={{ "--spin": "45s", position: "absolute", inset: "10%", borderRadius: "50%", border: "1px dashed rgba(213,162,81,0.10)" } as React.CSSProperties} />

            {/* orbiting satellites — CSS loops */}
            {[0, 1, 2].map((k) => (
              <div key={k} className={k % 2 === 0 ? "ng-eco-spin" : "ng-eco-spin-r"}
                style={{ "--spin": `${18 + k * 7}s`, position: "absolute", inset: `${4 + k * 6}%`, pointerEvents: "none" } as React.CSSProperties}>
                <div style={{ position: "absolute", top: -2.5, left: "50%", width: 5, height: 5, borderRadius: "50%", background: "#D5A251", marginLeft: -2.5, boxShadow: "0 0 8px rgba(213,162,81,0.8)" }} />
              </div>
            ))}

            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ngEdgeFlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(213,162,81,0.05)" />
                  <stop offset="50%" stopColor="rgba(232,201,122,0.55)" />
                  <stop offset="100%" stopColor="rgba(213,162,81,0.05)" />
                </linearGradient>
              </defs>

              {/* expanding sonar waves */}
              {inView && [0, 1, 2].map((k) => (
                <motion.circle key={`wave-${k}`} cx={50} cy={50} fill="none" stroke="rgba(213,162,81,0.22)" strokeWidth="0.3"
                  initial={{ r: 8, opacity: 0 }}
                  animate={{ r: [8, 42], opacity: [0.5, 0] }}
                  transition={{ duration: 4.5, delay: k * 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* faint radial spokes core → node */}
              {CAP_NODES.map((node, i) => (
                <motion.line key={`radial-${i}`} x1={50} y1={50} x2={node.x} y2={node.y}
                  stroke="rgba(213,162,81,0.12)" strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
                />
              ))}

              {/* inner diagonals */}
              {DIAG.map(([a, b], i) => {
                const pa = CAP_NODES[a], pb = CAP_NODES[b];
                return (
                  <motion.line key={`diag-${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(213,162,81,0.10)" strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.07, duration: 0.55 }}
                  />
                );
              })}

              {/* hexagon perimeter — base line + flowing dash overlay */}
              {PERIMETER.map(([a, b], i) => {
                const pa = CAP_NODES[a], pb = CAP_NODES[b];
                return (
                  <motion.line key={`edge-${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(213,162,81,0.18)" strokeWidth="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.07, duration: 0.55 }}
                  />
                );
              })}
              {inView && PERIMETER.map(([a, b], i) => {
                const pa = CAP_NODES[a], pb = CAP_NODES[b];
                return (
                  <line key={`flow-${i}`} className="ng-eco-flow" x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="url(#ngEdgeFlow)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="3 6"
                  />
                );
              })}

              {/* circulating data packets around the hexagon */}
              {inView && PERIMETER.map(([a, b], i) => (
                <EdgeParticle key={`ep-${i}`} a={a} b={b} delay={i * 0.4} />
              ))}

              {/* pulses radiating from the core */}
              {inView && CAP_NODES.map((node, i) => (
                <EnergyPulse key={`pulse-${i}`} node={node} delay={1.4 + i * 0.4} />
              ))}
            </svg>

            {/* rotating gradient ring hugging the core — CSS loop */}
            <div className="ng-eco-core-ring"
              style={{ position: "absolute", left: "50%", top: "50%", width: 150, height: 150, borderRadius: "50%", background: "conic-gradient(from 0deg, transparent, rgba(213,162,81,0.55) 90deg, transparent 180deg)", WebkitMaskImage: "radial-gradient(circle, transparent 58%, #000 60%, #000 70%, transparent 72%)", maskImage: "radial-gradient(circle, transparent 58%, #000 60%, #000 70%, transparent 72%)", zIndex: 1, pointerEvents: "none" }} />

            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.55 }}
              style={{ position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", width: 116, height: 116, borderRadius: 16, background: "radial-gradient(120% 120% at 30% 20%, #3A2C14 0%, #1A1712 55%, #12110F 100%)", border: "1px solid rgba(232,201,122,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, animation: "glow-pulse 3s ease-in-out infinite", boxShadow: "0 0 40px rgba(213,162,81,0.22), inset 0 0 20px rgba(213,162,81,0.08)" }}>
              <div style={{ color: "#E8C97A", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 4 }}>NOBEL</div>
              <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800, letterSpacing: "0.08em" }}>GROUP</div>
              <div style={{ width: 20, height: 1, background: "rgba(213,162,81,0.6)", marginTop: 7 }} />
            </motion.div>

            {CAP_NODES.map((cap, i) => <NodeDot key={cap.id} cap={cap} inView={inView} delay={0.75 + i * 0.09} floatDelay={i * 0.6} />)}
          </motion.div>
        </div>

        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 60, paddingTop: 52, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}
            style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid #D5A251", padding: "28px 28px" }}>
            <div style={{ color: "#D5A251", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>МИССИЯ</div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{about.missionTitle}</div>
            <p style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 300, lineHeight: 1.82, margin: 0 }}>
              {about.missionBody}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.75 }}
            style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid #D5A251", padding: "28px 28px" }}>
            <div style={{ color: "#D5A251", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>ЦЕННОСТИ</div>
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
