import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IbmGrid, GiantWord } from "./BrandDecor";

const STATS = [
  { n: "17+", l: "Лет на рынке" },
  { n: "14", l: "Регионов Узбекистана" },
  { n: "2 500+", l: "SKU в портфеле" },
  { n: "120+", l: "Внешних партнёров" },
  { n: "3 000+", l: "Клиентов B2B" },
  { n: "25 000 м²", l: "Складской инфраструктуры" },
  { n: "800+", l: "Сотрудников" },
  { n: "20+", l: "Стран-поставщиков" },
];

export function KeyStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      ref={ref}
      className="ng-sec-pad"
      style={{
        position: "relative",
        background: "var(--ng-void)",
        padding: "90px 80px",
        overflow: "hidden",
      }}
    >
      <IbmGrid opacity={0.02} />
      <div className="ng-decor">
        <GiantWord word="SCALE" side="right" />
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}
        >
          <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
          <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>NOBEL GROUP В ЦИФРАХ</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          style={{
            fontSize: "clamp(26px, 3vw, 40px)",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 48,
            maxWidth: 640,
          }}
        >
          Масштаб, на котором
          <br />
          <span style={{ color: "#C9A24B" }}>строится FMCG-платформа.</span>
        </motion.h2>

        <div
          className="ng-grid-4 ng-grid-cards2"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.55 }}
              className="ng-card-compact"
              style={{
                background: "var(--ng-elevated)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: "2px solid rgba(213,162,81,0.55)",
                padding: "26px 22px",
                minHeight: 128,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(26px, 2.8vw, 34px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #E8C97A 0%, #D5A251 55%, #8B6914 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 12,
                }}
              >
                {s.n}
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.45 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
