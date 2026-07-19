import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GiantNumber, GiantOutline, GiantWord, IbmGrid, LogisticsMesh } from "./BrandDecor";
import { GeographyMap } from "./GeographyMap";

export function GeographyNew() {
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
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>ГЕОГРАФИЯ ПРИСУТСТВИЯ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
              РАБОТАЕМ ПО ВСЕМУ
              <br /><span className="text-gold-glow">УЗБЕКИСТАНУ.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
              style={{ color: "#9A9A9A", fontSize: 13, fontWeight: 400, lineHeight: 1.82, marginBottom: 32 }}>
              Nobel Group охватывает ключевые регионы страны через развитую сеть дистрибуции и логистики.
            </motion.p>

            {[
              { label: "Точек дистрибуции", value: "7 региональных хабов" },
              { label: "Охват флота", value: "По всей стране" },
              { label: "Клиенты HoReCa", value: "Ташкент + 3 региона" },
              { label: "Частота доставки", value: "2–3 раза в неделю" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
                style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "#9A9A9A", fontSize: 12 }}>{item.label}</span>
                <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{item.value}</span>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
              style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C9A24B", boxShadow: "0 0 6px rgba(201,162,75,0.5)" }} />
                <span style={{ color: "#9A9A9A", fontSize: 11 }}>Главный хаб</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(201,162,75,0.7)" }} />
                <span style={{ color: "#9A9A9A", fontSize: 11 }}>Региональный центр</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 20, height: 1, borderTop: "1px dashed rgba(201,162,75,0.4)" }} />
                <span style={{ color: "#9A9A9A", fontSize: 11 }}>Маршрут доставки</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(201,162,75,0.9)", boxShadow: "0 0 8px rgba(201,162,75,0.8)" }} />
                <span style={{ color: "#9A9A9A", fontSize: 11 }}>Активная доставка (анимирована)</span>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
            <GeographyMap active={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
