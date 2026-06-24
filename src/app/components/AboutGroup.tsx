import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const CAPABILITIES = [
  { id: "import",      label: "Импорт и закупки",                     icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { id: "wholesale",   label: "Оптовая торговля",                     icon: "M3 7h18M3 12h18M3 17h12" },
  { id: "dist",        label: "Региональная дистрибуция",              icon: "M1 3h15v13H1zM16 8l4 2v6h-4z" },
  { id: "horeca",      label: "HoReCa-поставки",                      icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" },
  { id: "brand",       label: "Развитие брендов",                     icon: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6" },
  { id: "logistics",   label: "Логистика и складская инфраструктура",  icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18" },
  { id: "production",  label: "Производственные и фасовочные проекты", icon: "M14.7 6.3a1 1 0 010 1.4l-8 8a1 1 0 01-.4.25l-3 1a1 1 0 01-1.25-1.25l1-3a1 1 0 01.25-.4l8-8a1 1 0 011.4 0z" },
];

// Regular hexagon vertices around the centre (50, 50): pointy-top layout with
// vertices every 60°, radius 40 → symmetric so the "NOBEL GROUP" hub sits exactly
// at the geometric centre where all three diameters cross.
const CAP_NODES = [
  { id: "import",    label: "Импорт\nи закупки",    x: 50,   y: 10 },
  { id: "dist",      label: "Дистрибуция",           x: 84.6, y: 30 },
  { id: "horeca",    label: "HoReCa",                x: 84.6, y: 70 },
  { id: "brand",     label: "Развитие\nбрендов",     x: 50,   y: 90 },
  { id: "logistics", label: "Логистика\nи склад",    x: 15.4, y: 70 },
  { id: "wholesale", label: "Оптовая\nторговля",     x: 15.4, y: 30 },
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
      // The 44×44 icon box is centred exactly on the hexagon vertex (cap.x, cap.y).
      // Centring is done via Motion's x/y (not CSS transform), otherwise Motion's
      // scale animation would overwrite a `translate(-50%,-50%)` and shift the node.
      // The label is positioned absolutely below so it never shifts the icon off-centre.
      style={{ position: "absolute", left: `${cap.x}%`, top: `${cap.y}%`, x: "-50%", y: "-50%", width: 44, height: 44, cursor: "default" }}
    >
      <motion.div
        animate={{ borderColor: hovered ? "rgba(201,162,75,0.7)" : "rgba(201,162,75,0.3)", background: hovered ? "rgba(201,162,75,0.08)" : "#0A0A0A", boxShadow: hovered ? "0 0 16px rgba(201,162,75,0.2)" : "none" }}
        transition={{ duration: 0.3 }}
        style={{ width: 44, height: 44, border: "1px solid rgba(201,162,75,0.3)", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#D4AF37" : "#C9A24B"} strokeWidth="1.2" strokeLinecap="round">
          <path d={CAPABILITIES.find(c => c.id === cap.id)?.icon || ""} />
        </svg>
      </motion.div>
      <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", width: 100, textAlign: "center", color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: 600, lineHeight: 1.35, whiteSpace: "pre-line", transition: "color 0.3s" }}>
        {cap.label}
      </div>
    </motion.div>
  );
}

// A glowing particle that travels from the center hub out to a node and back,
// visualising the flow of the group's operations.
function EnergyPulse({ node, delay }: { node: typeof CAP_NODES[0]; delay: number }) {
  return (
    <motion.circle
      r={0.85}
      fill="#D4AF37"
      style={{ filter: "drop-shadow(0 0 2.5px rgba(201,162,75,0.95))" }}
      animate={{
        cx: [50, node.x, 50],
        cy: [50, node.y, 50],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.08, 0.45, 0.92, 1],
      }}
    />
  );
}

export function AboutGroup() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const diagramY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={sectionRef} id="about" style={{ background: "#0D0D0D", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(201,162,75,0.04) 0%, transparent 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.22) 50%, transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>О КОМПАНИИ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24 }}>
              ОДНА ГРУППА.
              <br />МНОЖЕСТВО ВОЗМОЖНОСТЕЙ.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "#9A9A9A", fontSize: 15, lineHeight: 1.82, marginBottom: 10 }}>
              Nobel Group — развивающаяся группа компаний, специализирующаяся на поставках продуктов питания и развитии эффективной системы дистрибуции в Узбекистане.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
              style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.82, marginBottom: 32 }}>
              Наша задача — создавать устойчивые связи между производителями, поставщиками и рынком, обеспечивая стабильный рост и развитие бизнеса наших партнёров.
            </motion.p>

            {CAPABILITIES.map((cap, i) => (
              <motion.div key={cap.id} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.32 + i * 0.07 }}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "default", transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "rgba(201,162,75,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.06)")}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A24B", flexShrink: 0 }} />
                <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>{cap.label}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: "auto", color: "rgba(201,162,75,0.3)" }}>
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Right: Ecosystem diagram with parallax */}
          <motion.div style={{ position: "relative", width: "100%", aspectRatio: "1", maxWidth: 460, margin: "0 auto", y: diagramY }}>
            {/* Static faint rings */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.6 }}
              style={{ position: "absolute", inset: "4%", borderRadius: "50%", border: "1px solid rgba(201,162,75,0.08)" }} />
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ position: "absolute", inset: "16%", borderRadius: "50%", border: "1px solid rgba(201,162,75,0.06)" }} />

            {/* Slowly rotating dashed orbital rings */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: 360 } : {}}
              transition={{ opacity: { delay: 0.4, duration: 0.8 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
              style={{ position: "absolute", inset: "0%", borderRadius: "50%", border: "1px dashed rgba(201,162,75,0.16)" }} />
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: -360 } : {}}
              transition={{ opacity: { delay: 0.5, duration: 0.8 }, rotate: { duration: 45, repeat: Infinity, ease: "linear" } }}
              style={{ position: "absolute", inset: "10%", borderRadius: "50%", border: "1px dashed rgba(201,162,75,0.10)" }} />

            {/* Orbiting decorative dots (counter-rotating to add life) */}
            {[0, 1, 2].map((k) => (
              <motion.div key={k}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1, rotate: k % 2 === 0 ? 360 : -360 } : {}}
                transition={{ opacity: { delay: 0.6 }, rotate: { duration: 18 + k * 7, repeat: Infinity, ease: "linear" } }}
                style={{ position: "absolute", inset: `${4 + k * 6}%`, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: -2.5, left: "50%", width: 5, height: 5, borderRadius: "50%", background: "#C9A24B", marginLeft: -2.5, boxShadow: "0 0 8px rgba(201,162,75,0.8)" }} />
              </motion.div>
            ))}

            {/* SVG: connections, radial links + traveling energy pulses */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 100 100">
              {/* Radar pulse waves emanating from the hub */}
              {inView && [0, 1, 2].map((k) => (
                <motion.circle key={`wave-${k}`} cx={50} cy={50} fill="none" stroke="rgba(201,162,75,0.25)" strokeWidth="0.3"
                  initial={{ r: 8, opacity: 0 }}
                  animate={{ r: [8, 40], opacity: [0.5, 0] }}
                  transition={{ duration: 4, delay: k * 1.33, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* Radial links from the hub to each node */}
              {CAP_NODES.map((node, i) => (
                <motion.line key={`radial-${i}`} x1={50} y1={50} x2={node.x} y2={node.y}
                  stroke="rgba(201,162,75,0.10)" strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.5 }}
                />
              ))}

              {/* Hexagon perimeter connections */}
              {CONNS.map(([a, b], i) => {
                const pa = CAP_NODES[a], pb = CAP_NODES[b];
                return (
                  <motion.line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(201,162,75,0.14)" strokeWidth="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.07, duration: 0.55 }}
                  />
                );
              })}

              {/* Energy pulses flowing hub → node → hub */}
              {inView && CAP_NODES.map((node, i) => (
                <EnergyPulse key={`pulse-${i}`} node={node} delay={1.4 + i * 0.5} />
              ))}
            </svg>

            {/* Center node */}
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.55 }}
              style={{ position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", width: 90, height: 90, background: "linear-gradient(135deg, #1C1500 0%, #0D0D0D 100%)", border: "1px solid rgba(201,162,75,0.65)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2, animation: "glow-pulse 3s ease-in-out infinite" }}>
              <div style={{ color: "#C9A24B", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", marginBottom: 4 }}>NOBEL</div>
              <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em" }}>GROUP</div>
            </motion.div>

            {/* Nodes */}
            {CAP_NODES.map((cap, i) => <NodeDot key={cap.id} cap={cap} inView={inView} delay={0.75 + i * 0.09} />)}
          </motion.div>
        </div>

        {/* Mission + Values */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 60, paddingTop: 52, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65 }}
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid #C9A24B", padding: "28px 28px" }}>
            <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>МИССИЯ</div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>Наша миссия</div>
            <p style={{ color: "#9A9A9A", fontSize: 13, lineHeight: 1.82, margin: 0 }}>
              Обеспечивать рынок Узбекистана качественными и доступными продуктами питания через надёжную систему поставок, дистрибуции и долгосрочного партнёрства.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.75 }}
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", padding: "28px 28px" }}>
            <div style={{ color: "#9A9A9A", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", marginBottom: 14 }}>ЦЕННОСТИ</div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>Принципы нашей работы</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Надёжность", "Ответственность", "Качество", "Партнёрство", "Оперативность", "Развитие"].map((v) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A24B", flexShrink: 0 }} />
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
