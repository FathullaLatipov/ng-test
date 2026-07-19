import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { DIRECTION_ICONS, GoldCheck, IconShell } from "./BrandIcons";
import { GiantNumber, GiantOutline, GiantWord, HoneycombPattern, DrawLine } from "./BrandDecor";

const DIRECTIONS = [
  {
    id: "import" as const, number: "01",
    name: "Импорт и закупки", tagline: "Международные поставки",
    desc: "Организация поставок продуктов питания и сырья от международных производителей. Полный цикл от поиска поставщика до поступления товара на склад.",
    benefits: ["Прямые контракты с производителями", "Мультикатегорийный портфель", "Таможенное сопровождение"],
    metric: { n: "50+", l: "Поставщиков" },
  },
  {
    id: "distribution" as const, number: "02",
    name: "Дистрибуция", tagline: "Региональная сеть",
    desc: "Развитая региональная сеть продаж и поставок по всей территории Узбекистана с собственным транспортным парком и складской инфраструктурой.",
    benefits: ["Охват 7 регионов", "Собственный транспортный парк", "Температурный контроль"],
    metric: { n: "7", l: "Регионов" },
  },
  {
    id: "horeca" as const, number: "03",
    name: "HoReCa", tagline: "Рестораны, отели, кафе",
    desc: "Комплексное снабжение предприятий общественного питания. Специализированный ассортимент, гибкие условия и стабильные поставки.",
    benefits: ["Ассортимент для HoReCa", "Гибкий минимальный заказ", "Выделенные менеджеры"],
    metric: { n: "200+", l: "Клиентов" },
  },
  {
    id: "brand" as const, number: "04",
    name: "Развитие брендов", tagline: "Продвижение и рост",
    desc: "Продвижение продуктовых категорий и создание долгосрочной ценности. Помогаем международным производителям выйти на рынок Узбекистана.",
    benefits: ["Вывод бренда на рынок", "Размещение в ретейле", "Управление категорией"],
    metric: { n: "15+", l: "Брендов" },
  },
];

function DirectionCard({ dir, index, inView }: { dir: typeof DIRECTIONS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = DIRECTION_ICONS[dir.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ng-card-auto-h ng-card-compact"
      style={{
        position: "relative",
        background: hovered ? "linear-gradient(145deg, #242018 0%, #1A1814 100%)" : "var(--ng-elevated)",
        border: hovered ? "1px solid rgba(213,162,81,0.5)" : "1px solid rgba(255,255,255,0.07)",
        padding: "32px 28px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.45), 0 0 32px rgba(213,162,81,0.12)" : "0 4px 20px rgba(0,0,0,0.25)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 420,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100%" : "44px", height: 2, background: "linear-gradient(to right, var(--ng-gold), rgba(213,162,81,0.25))", transition: "width 0.5s ease", zIndex: 2 }} />

      <div className="ng-card-compact-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <span style={{ color: "rgba(213,162,81,0.35)", fontSize: 12, fontWeight: 700, letterSpacing: "0.22em" }}>{dir.number}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: hovered ? "var(--ng-gold)" : "rgba(213,162,81,0.5)", fontSize: 18, fontWeight: 800, transition: "color 0.3s" }}>{dir.metric.n}</div>
          <div style={{ color: "var(--ng-muted-dark)", fontSize: 10, letterSpacing: "0.1em", marginTop: 2 }}>{dir.metric.l}</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.35 + index * 0.12 }}
        className="ng-card-icon"
        style={{ marginBottom: 22 }}
      >
        <IconShell hovered={hovered} size={76}>
          <Icon size={48} glow={hovered} />
        </IconShell>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="ng-card-compact-title" style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 6 }}>{dir.name}</div>
        <div className="ng-card-compact-tagline" style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", marginBottom: 14 }}>{dir.tagline.toUpperCase()}</div>
        <p className="ng-card-compact-desc" style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.78, marginBottom: 20, flex: 1 }}>{dir.desc}</p>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {dir.benefits.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GoldCheck size={14} />
              <span className="ng-card-compact-benefit" style={{ color: hovered ? "rgba(255,255,255,0.85)" : "var(--ng-muted-dark)", fontSize: 12, transition: "color 0.3s" }}>{b}</span>
            </div>
          ))}
        </div>

        <motion.div animate={{ opacity: hovered ? 1 : 0 }} style={{ marginTop: 18 }}>
          <DrawLine label="ПОДРОБНЕЕ" inView={hovered} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BusinessDirections() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="business" className="ng-sec-pad" style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 45%, #12110F 100%)", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      <HoneycombPattern opacity={0.035} />
      <div className="ng-decor"><GiantNumber n="02" /></div>
      <div className="ng-decor"><GiantWord word="DISTRIBUTION" /></div>
      <div className="ng-decor"><GiantOutline kind="container" side="left" size={300} /></div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 64 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              ЧЕТЫРЕ НАПРАВЛЕНИЯ.
              <br /><span className="text-gold-glow">ОДНА ЦЕЛЬ.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 14, fontWeight: 300, lineHeight: 1.82 }}>
            Каждое направление Nobel Group работает как самостоятельная бизнес-единица — и при этом использует общие ресурсы группы.
          </motion.p>
        </div>

        <div className="ng-grid-4 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {DIRECTIONS.map((dir, i) => (
            <DirectionCard key={dir.id} dir={dir} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
