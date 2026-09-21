import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GiantNumber, GiantOutline, GiantWord, IbmGrid, LogisticsMesh } from "./BrandDecor";
import { GeographyMap } from "./GeographyMap";
import { useCms } from "../cms/store";

/** Country code from a KZ/RU/UZ code or a Russian country name */
function flagCode(v: string): string {
  const n = (v || "").toLowerCase();
  if (n.includes("казах") || n === "kz") return "KZ";
  if (n.includes("росс") || n === "ru") return "RU";
  if (n.includes("узбек") || n === "uz") return "UZ";
  return (v || "").slice(0, 2).toUpperCase();
}

/** Minimal vector flags (emoji flags don't render on Windows) */
function Flag({ code, size = 22 }: { code: string; size?: number }) {
  const w = size;
  const h = Math.round(size * 0.66);
  const common = { width: w, height: h, viewBox: "0 0 30 20", style: { borderRadius: 2, flexShrink: 0, display: "block" } as const };
  switch (flagCode(code)) {
    case "RU":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#FFFFFF" />
          <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
          <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
        </svg>
      );
    case "UZ":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#1EB53A" />
          <rect width="30" height="6.67" fill="#0099B5" />
          <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
          <rect y="6.4" width="30" height="0.27" fill="#CE1126" />
          <rect y="13.06" width="30" height="0.27" fill="#CE1126" />
        </svg>
      );
    default: // KZ
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#00AFCA" />
          <circle cx="15" cy="8.5" r="3.2" fill="#FEC50C" />
          <path d="M15 12c-2.6 0-4.4 1.1-4.4 2.8h8.8C19.4 13.1 17.6 12 15 12z" fill="#FEC50C" />
        </svg>
      );
  }
}

export function GeographyNew() {
  const { data } = useCms();
  const geo = data.geography;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="geography" className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      <IbmGrid opacity={0.02} />
      <LogisticsMesh opacity={0.06} />
      <div className="ng-decor"><GiantNumber n="06" /></div>
      <div className="ng-decor"><GiantWord word="UZBEKISTAN" side="left" /></div>
      <div className="ng-decor"><GiantOutline kind="truck" side="right" size={280} /></div>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 60%, rgba(213,162,81,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.25) 50%, transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>{geo.eyebrow}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
              {geo.title}
              <br /><span className="text-gold-glow">{geo.titleAccent}</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400, lineHeight: 1.82, marginBottom: 32 }}>
              {geo.lead}
            </motion.p>

            {geo.rows.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "rgba(201,162,75,0.9)", fontSize: 12, fontWeight: 500 }}>{item.label}</span>
                <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{item.value}</span>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.75 }}
              style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 4 }}>ДОЧЕРНИЕ ЗАВОДЫ</div>
              {geo.factories.map((f) => (
                <div key={f.id} style={{ background: "var(--ng-elevated)", border: "1px solid rgba(213,162,81,0.25)", borderLeft: "2px solid #D5A251", padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Flag code={f.country} size={22} />
                    <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>{f.country}</div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 12, marginTop: 4 }}>{f.role}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
              style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C9A24B", boxShadow: "0 0 6px rgba(201,162,75,0.5)" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Главный хаб / офис</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(201,162,75,0.7)" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Склад / региональный центр</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 1, borderTop: "1px dashed rgba(201,162,75,0.4)" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Дистрибуционный маршрут</span>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
            <GeographyMap active={inView} />
            <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
              {geo.plants.map((p) => (
                <div key={p.id} style={{ background: "rgba(30,28,24,0.8)", border: "1px solid rgba(255,255,255,0.08)", padding: "16px 18px", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, border: "1px solid rgba(213,162,81,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Flag code={p.flag} size={24} /></div>
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>{p.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 11, marginTop: 3 }}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
