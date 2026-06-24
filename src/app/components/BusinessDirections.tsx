import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const DIRECTIONS = [
  {
    id: "import", number: "01",
    name: "Импорт и закупки", tagline: "Международные поставки",
    desc: "Организация поставок продуктов питания и сырья от международных производителей. Полный цикл от поиска поставщика до поступления товара на склад.",
    benefits: ["Прямые контракты с производителями", "Мультикатегорийный портфель", "Таможенное сопровождение", "Контроль качества"],
    metric: { n: "50+", l: "Поставщиков" },
    color: "#C9A24B",
    pathD: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: "distribution", number: "02",
    name: "Дистрибуция", tagline: "Региональная сеть",
    desc: "Развитая региональная сеть продаж и поставок по всей территории Узбекистана с собственным транспортным парком и складской инфраструктурой.",
    benefits: ["Охват 7 регионов", "Собственный транспортный парк", "Температурный контроль", "Отслеживание заказов"],
    metric: { n: "7", l: "Регионов" },
    color: "#C9A24B",
    pathD: "M1 3h15v13H1zM16 8l4 2v6h-4zM5.5 21a1.5 1.5 0 100-3M18.5 21a1.5 1.5 0 100-3",
  },
  {
    id: "horeca", number: "03",
    name: "HoReCa", tagline: "Рестораны, отели, кафе",
    desc: "Комплексное снабжение предприятий общественного питания. Специализированный ассортимент, гибкие условия и стабильные поставки.",
    benefits: ["Ассортимент для HoReCa", "Гибкий минимальный заказ", "Выделенные менеджеры", "Приоритетная доставка"],
    metric: { n: "200+", l: "Клиентов HoReCa" },
    color: "#C9A24B",
    pathD: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  },
  {
    id: "brand", number: "04",
    name: "Развитие брендов", tagline: "Продвижение и рост",
    desc: "Продвижение продуктовых категорий и создание долгосрочной ценности. Помогаем международным производителям выйти на рынок Узбекистана.",
    benefits: ["Вывод бренда на рынок", "Размещение в ретейле", "Управление категорией", "Маркетинг-активации"],
    metric: { n: "15+", l: "Брендов" },
    color: "#C9A24B",
    pathD: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  },
];

function DirectionCard({ dir, index, inView }: { dir: typeof DIRECTIONS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "linear-gradient(135deg, #141414 0%, #0F0F0F 100%)"
          : "#111111",
        border: hovered ? "1px solid rgba(201,162,75,0.5)" : "1px solid rgba(255,255,255,0.07)",
        padding: "36px 30px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.6), 0 0 28px rgba(201,162,75,0.1)" : "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar (full width on hover) */}
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100%" : "44px", height: 2, background: "linear-gradient(to right, #C9A24B, rgba(201,162,75,0.3))", transition: "width 0.5s ease" }} />

      {/* Gold sheen on hover */}
      {hovered && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "100%", background: "linear-gradient(to right, transparent, rgba(201,162,75,0.03), transparent)", animation: "gold-sheen 1.2s ease-in-out" }} />
      )}

      {/* Number + metric */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <span style={{ color: "rgba(201,162,75,0.3)", fontSize: 12, fontWeight: 700, letterSpacing: "0.22em" }}>{dir.number}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: hovered ? "#C9A24B" : "rgba(201,162,75,0.45)", fontSize: 18, fontWeight: 800, lineHeight: 1, transition: "color 0.3s" }}>{dir.metric.n}</div>
          <div style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.1em", marginTop: 2 }}>{dir.metric.l}</div>
        </div>
      </div>

      {/* Icon */}
      <motion.div animate={{ scale: hovered ? 1.05 : 1 }} transition={{ duration: 0.35 }} style={{ marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, border: `1px solid ${hovered ? "rgba(201,162,75,0.6)" : "rgba(201,162,75,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(201,162,75,0.06)" : "transparent", transition: "all 0.35s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#D4AF37" : "#C9A24B"} strokeWidth="1.2" strokeLinecap="round">
            <path d={dir.pathD} />
          </svg>
        </div>
      </motion.div>

      {/* Title */}
      <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 6 }}>{dir.name}</div>
      <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", marginBottom: 16 }}>{dir.tagline.toUpperCase()}</div>
      <p style={{ color: "#9A9A9A", fontSize: 13, lineHeight: 1.78, marginBottom: 24, flex: 1 }}>{dir.desc}</p>

      {/* Benefits */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        {dir.benefits.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.div animate={{ scale: hovered ? 1.2 : 1 }} transition={{ duration: 0.3 }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A24B", flexShrink: 0 }} />
            <span style={{ color: hovered ? "rgba(255,255,255,0.8)" : "#9A9A9A", fontSize: 12, transition: "color 0.3s" }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Arrow indicator */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8, color: "#C9A24B" }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em" }}>ПОДРОБНЕЕ</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
      </motion.div>
    </motion.div>
  );
}

export function BusinessDirections() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="business" style={{ background: "#0A0A0A", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      {/* Section background depth layers */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 15% 80%, rgba(201,162,75,0.045) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(201,162,75,0.03) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.22) 50%, transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }} ref={ref}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 64 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              ЧЕТЫРЕ НАПРАВЛЕНИЯ.
              <br /><span style={{ color: "#C9A24B" }}>ОДНА ЦЕЛЬ.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ color: "#9A9A9A", fontSize: 14, fontWeight: 400, lineHeight: 1.82 }}>
            Каждое направление Nobel Group работает как самостоятельная бизнес-единица с выделенными командами и инфраструктурой — и при этом использует общие ресурсы группы: закупки, логистику и аналитику рынка.
          </motion.p>
        </div>

        {/* Connection diagram — thin gold lines linking cards */}
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", top: "50%", left: "12.5%", width: "75%", height: 2, overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
            <motion.line x1="0%" y1="0" x2="100%" y2="0"
              stroke="rgba(201,162,75,0.18)" strokeWidth="1" strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 1.2 }}
            />
            {[0, 33.3, 66.6, 100].map((x, i) => (
              <motion.circle key={i} cx={`${x}%`} cy="0" r="3" fill="#C9A24B"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 0.6 } : {}}
                transition={{ delay: 1.2 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative", zIndex: 2 }}>
            {DIRECTIONS.map((dir, i) => (
              <DirectionCard key={dir.id} dir={dir} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom ecosystem note */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2 }}
          style={{ marginTop: 48, padding: "24px 32px", background: "#111111", border: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 36, height: 36, border: "1px solid rgba(201,162,75,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>Интегрированная экосистема</div>
              <div style={{ color: "#9A9A9A", fontSize: 12 }}>Все направления работают в единой инфраструктуре Nobel Group</div>
            </div>
          </div>
          <a href="#about" style={{ color: "#C9A24B", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6, transition: "gap 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}>
            ПОДРОБНЕЕ О ГРУППЕ
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
