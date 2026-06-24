import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const MILESTONES = [
  { year: "2012", title: "Основание компании",           desc: "Nobel Group основана в Ташкенте. Первоначальная деятельность — оптовые поставки продуктов питания.", tag: "Основание", color: "#C9A24B", progress: 16 },
  { year: "2015", title: "Региональное расширение",       desc: "Выход за пределы Ташкента на ключевые региональные рынки. Первые дистрибуторские соглашения.", tag: "Расширение", color: "#C9A24B", progress: 33 },
  { year: "2018", title: "Дистрибуционная инфраструктура", desc: "Запуск дистрибуционного подразделения с транспортным парком и складской сетью по всей стране.", tag: "Дистрибуция", color: "#C9A24B", progress: 50 },
  { year: "2021", title: "Развитие направления HoReCa",   desc: "Запуск специализированного HoReCa-подразделения. Индивидуальные модели сервиса для ресторанов и отелей.", tag: "HoReCa", color: "#C9A24B", progress: 67 },
  { year: "2024", title: "Расширение экосистемы",         desc: "Консолидация группы по четырём направлениям. Активное развитие портфеля брендов и международных партнёрств.", tag: "Рост", color: "#C9A24B", progress: 83 },
  { year: "Будущее", title: "Производственные инициативы", desc: "Стратегическое развитие производственных мощностей для увеличения добавленной стоимости.", tag: "Планы", color: "rgba(201,162,75,0.45)", progress: 100, future: true },
];

function MilestoneCard({ m, i, total, inView }: { m: typeof MILESTONES[0]; i: number; total: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.35 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "grid", gridTemplateColumns: "96px 28px 1fr", gap: "0 20px", alignItems: "flex-start", paddingBottom: i < total - 1 ? 32 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year */}
      <div style={{ textAlign: "right", paddingTop: 16 }}>
        <span style={{ color: m.future ? "rgba(201,162,75,0.45)" : "#C9A24B", fontSize: 16, fontWeight: 800, letterSpacing: "0.01em" }}>
          {m.year}
        </span>
      </div>

      {/* Timeline spine + dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        <motion.div
          animate={{ scale: hovered && !m.future ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: 12, height: 12, borderRadius: "50%", background: m.future ? "#0D0D0D" : "#C9A24B", border: m.future ? "1px solid rgba(201,162,75,0.4)" : "none", marginTop: 18, zIndex: 2, position: "relative", flexShrink: 0, boxShadow: hovered && !m.future ? "0 0 12px rgba(201,162,75,0.7)" : "none", transition: "box-shadow 0.3s" }}
        />
      </div>

      {/* Content card */}
      <motion.div
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: hovered ? "#141414" : "#111111", border: `1px solid ${hovered ? "rgba(201,162,75,0.35)" : "rgba(255,255,255,0.06)"}`, borderLeft: m.future ? "2px solid rgba(201,162,75,0.3)" : "2px solid #C9A24B", padding: "18px 22px", opacity: m.future ? 0.7 : 1, transition: "all 0.3s", position: "relative", overflow: "hidden" }}
      >
        {/* Gold sheen on hover */}
        {hovered && !m.future && (
          <div style={{ position: "absolute", top: 0, left: "-60%", width: "40%", height: "100%", background: "linear-gradient(to right, transparent, rgba(201,162,75,0.04), transparent)", animation: "gold-sheen 0.6s ease-in-out", pointerEvents: "none" }} />
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>{m.title}</div>
          <div style={{ background: "rgba(201,162,75,0.1)", border: "1px solid rgba(201,162,75,0.2)", color: "#C9A24B", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", padding: "3px 10px", flexShrink: 0, marginLeft: 14 }}>
            {m.tag.toUpperCase()}
          </div>
        </div>
        <p style={{ color: "#9A9A9A", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{m.desc}</p>

        {/* Progress indicator */}
        {!m.future && (
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${m.progress}%` } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(to right, #C9A24B, rgba(201,162,75,0.5))" }}
              />
            </div>
            <span style={{ color: "rgba(201,162,75,0.6)", fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }}>{m.progress}%</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function CompanyJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={containerRef} id="history" style={{ background: "#0D0D0D", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      {/* Floating background element */}
      <motion.div style={{ position: "absolute", right: "-10%", top: "10%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,75,0.04) 0%, transparent 70%)", pointerEvents: "none", y: bgY }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.22) 50%, transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 64 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>ИСТОРИЯ КОМПАНИИ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              12 ЛЕТ
              <br /><span style={{ color: "#C9A24B" }}>УСТОЙЧИВОГО РОСТА.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.82 }}>
            От целенаправленных оптовых операций до диверсифицированной группы компаний — Nobel Group развивала компетенции органически, шаг за шагом, охватывая все ключевые сектора продовольственной торговли и дистрибуции Узбекистана.
          </motion.p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline spine */}
          <div style={{ position: "absolute", left: 116, top: 20, bottom: 20, width: 1, background: "rgba(201,162,75,0.1)" }} />
          <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ delay: 0.3, duration: 1.4, ease: "easeOut" }}
            style={{ position: "absolute", left: 116, top: 20, bottom: 20, width: 1, background: "linear-gradient(to bottom, #C9A24B 0%, rgba(201,162,75,0.2) 100%)", transformOrigin: "top" }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.year} m={m} i={i} total={MILESTONES.length} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
