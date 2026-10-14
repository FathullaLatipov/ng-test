import { useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { GiantNumber, GiantOutline, IbmGrid, LogisticsMesh } from "./BrandDecor";
import { useCms } from "../cms/store";

/** Авторские иконки (viewBox 48): линия + полупрозрачная золотая заливка акцентов */
const F = "rgba(213,162,81,0.2)";
const REASON_ICONS: ReactNode[] = [
  // 1 · региональная сеть продаж: хаб-метка и точки присутствия
  <g key="1">
    <path d="M24 5c-6 0-10.5 4.4-10.5 10 0 7.5 10.5 17 10.5 17s10.5-9.5 10.5-17C34.5 9.4 30 5 24 5z" fill={F} />
    <circle cx="24" cy="15" r="3.6" />
    <path d="M13 31l-6 6M35 31l6 6M24 32v8" />
    <circle cx="6" cy="39" r="2.6" fill={F} /><circle cx="42" cy="39" r="2.6" fill={F} /><circle cx="24" cy="42" r="2.6" fill={F} />
  </g>,
  // 2 · прямые контракты: завод → документ без посредников
  <g key="2">
    <path d="M4 36V22l7 4v-4l7 4v-4l7 4V16h5v20z" fill={F} />
    <path d="M4 36h21" />
    <path d="M28 25h9M34 21.5l3.5 3.5-3.5 3.5" />
    <path d="M30 31h13v11H30z" fill={F} /><path d="M33 36.5l2.2 2.2 4-4.4" />
  </g>,
  // 3 · импорт и таможня: контейнер + печать
  <g key="3">
    <path d="M4 14h30v22H4z" fill={F} />
    <path d="M10 14v22M16 14v22M22 14v22M28 14v22" />
    <circle cx="36" cy="33" r="9" fill="rgba(18,17,15,0.95)" />
    <circle cx="36" cy="33" r="9" /><path d="M31.8 33.2l3 3 5.6-6" />
  </g>,
  // 4 · запасы и логистика: паллета с коробами и цикл поставок
  <g key="4">
    <path d="M12 22h10v10H12zM24 22h10v10H24zM18 12h10v10H18z" fill={F} />
    <path d="M8 36h30M10 36v4M24 36v4M36 36v4" />
    <path d="M38 14a8 8 0 00-6-6.6M38 14l-.5-5M38 14l-5 .8" />
  </g>,
  // 5 · розница, сети, HoReCa: один источник — три канала
  <g key="5">
    <circle cx="24" cy="9" r="4.5" fill={F} />
    <path d="M24 13.5V20M24 20L9 28M24 20V28M24 20l15 8" />
    <path d="M4 28h10l-1 11H5z" fill={F} /><path d="M7 28v-2.5a2 2 0 014 0V28" />
    <path d="M19 28h10v11H19z" fill={F} /><path d="M19 33h10" />
    <path d="M34 30h10l-1.6 9h-6.8z" fill={F} /><path d="M44 31.5c2 0 2.5 4-1 4.5" />
  </g>,
  // 6 · финансовая и операционная инфраструктура: ступени-платформа и рост
  <g key="6">
    <path d="M6 40h36" />
    <path d="M9 40V30h8v10M20 40V22h8v18M31 40V14h8v26" fill={F} />
    <path d="M9 22l9-7 6 4 10-11" /><path d="M28 8h6v6" />
  </g>,
];

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
        padding: "110px 40px",
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

      <div style={{ maxWidth: 1680, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
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
              {(() => {
                const on = hovered === i;
                return (
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 16,
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${on ? "rgba(232,201,122,0.8)" : "rgba(213,162,81,0.3)"}`,
                      background: on
                        ? "radial-gradient(circle at 30% 25%, rgba(232,201,122,0.28), rgba(213,162,81,0.08) 70%)"
                        : "radial-gradient(circle at 30% 25%, rgba(213,162,81,0.14), rgba(213,162,81,0.03) 70%)",
                      boxShadow: on ? "0 0 26px rgba(213,162,81,0.35)" : "inset 0 1px 0 rgba(255,255,255,0.05)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke={on ? "#E8C97A" : "#C9A24B"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "transform 0.35s ease", transform: on ? "scale(1.08)" : "none" }}
                    >
                      {REASON_ICONS[i % REASON_ICONS.length]}
                    </svg>
                  </div>
                );
              })()}
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
