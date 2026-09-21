import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { IbmGrid, GiantWord } from "./BrandDecor";
import { useCms } from "../cms/store";

/** Matching icon per stat (by CMS id) */
const STAT_ICONS: Record<string, ReactNode> = {
  s1: (<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>), // лет на рынке — календарь
  s2: (<><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>), // регионы — метка на карте
  s3: (<><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>), // SKU — упаковка
  s4: (<><path d="M9.5 13.5a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1" /><path d="M14.5 10.5a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1" /></>), // партнёры — связь
  s5: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>), // клиенты B2B — люди
  s6: (<><path d="M3 21V9l9-5 9 5v12" /><path d="M3 21h18" /><path d="M9 21v-6h6v6" /></>), // склад
  s7: (<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>), // сотрудники
  s8: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>), // страны — глобус
};

function StatIcon({ id }: { id: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D5A251"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, opacity: 0.85 }}
    >
      {STAT_ICONS[id] || <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

export function KeyStats() {
  const { data } = useCms();
  const ks = data.keyStats;
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
          <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>{ks.eyebrow}</span>
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
          {ks.title}
          <br />
          <span style={{ color: "#C9A24B" }}>{ks.titleAccent}</span>
        </motion.h2>

        <div
          className="ng-grid-4 ng-grid-cards2"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
        >
          {ks.items.map((s, i) => (
            <motion.div
              key={s.id}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: "clamp(26px, 2.8vw, 34px)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #E8C97A 0%, #D5A251 55%, #8B6914 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.n}
                </div>
                <StatIcon id={s.id} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.45 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
