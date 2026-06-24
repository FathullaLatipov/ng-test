import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const CARDS = [
  { icon: "M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6L12 2zM9 12l2 2 4-4", title: "Сильная дистрибуционная сеть",   desc: "Развитая система поставок и устойчивое присутствие на региональном рынке Узбекистана.",              idx: 0 },
  { icon: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",           title: "Экспертиза в FMCG",               desc: "Глубокое понимание продовольственного рынка: потребительское поведение, сезонный спрос, регуляторная среда.", idx: 1 },
  { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", title: "Гибкая модель сотрудничества",    desc: "Индивидуальный подход к каждому партнёру — эксклюзивное представительство, дистрибуция, агентские схемы.", idx: 2 },
  { icon: "M1 3h15v13H1zM16 8l4 2v6h-4zM5.5 21a1.5 1.5 0 100-3M18.5 21a1.5 1.5 0 100-3",            title: "Стабильные поставки",             desc: "Налаженные отношения с поставщиками и многоисточниковые закупки обеспечивают стабильное наличие товара.",  idx: 3 },
  { icon: "M2 3h20v4H2zM2 10h20v4H2zM2 17h12",                                                         title: "Операционная эффективность",    desc: "Профессиональное управление логистикой и дистрибуцией снижает совокупные издержки партнёров.",            idx: 4 },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM8 11l3 3 5-5",                                  title: "Долгосрочное партнёрство",       desc: "Прозрачная отчётность, честные условия и ориентация на совместный рост — основа всех отношений.",         idx: 5 },
];

function TrustCard({ card, delay, inView }: { card: typeof CARDS[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#131313" : "#111111",
        border: hovered ? "1px solid rgba(201,162,75,0.4)" : "1px solid rgba(255,255,255,0.06)",
        padding: "32px 28px",
        transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,162,75,0.08)" : "0 2px 12px rgba(0,0,0,0.2)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100%" : "32px", height: 2, background: "linear-gradient(to right, #C9A24B, rgba(201,162,75,0.3))", transition: "width 0.45s ease" }} />

      {/* Gold corner highlight on hover */}
      {hovered && <div style={{ position: "absolute", top: 0, right: 0, width: 48, height: 48, background: "radial-gradient(circle at top right, rgba(201,162,75,0.08), transparent)", pointerEvents: "none" }} />}

      {/* Icon box */}
      <motion.div
        animate={{ y: hovered ? -2 : 0, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: 20, width: 44, height: 44, border: `1px solid ${hovered ? "rgba(201,162,75,0.55)" : "rgba(201,162,75,0.22)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(201,162,75,0.07)" : "transparent", transition: "all 0.35s" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#D4AF37" : "#C9A24B"} strokeWidth="1.2" strokeLinecap="round">
          <path d={card.icon} />
        </svg>
      </motion.div>

      <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, marginBottom: 10, letterSpacing: "0.01em" }}>{card.title}</div>
      <p style={{ color: hovered ? "rgba(255,255,255,0.65)" : "#9A9A9A", fontSize: 13, fontWeight: 400, lineHeight: 1.78, margin: 0, transition: "color 0.3s" }}>{card.desc}</p>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={sectionRef} id="why" style={{ background: "#0A0A0A", padding: "110px 80px", position: "relative", overflow: "hidden" }}>
      {/* Animated background layer */}
      <motion.div style={{ position: "absolute", left: "-15%", top: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,75,0.04) 0%, transparent 68%)", pointerEvents: "none", x: bgX }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.22) 50%, transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }} ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>ПОЧЕМУ NOBEL GROUP</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              НАДЕЖНЫЙ ПАРТНЕР
              <br /><span style={{ color: "#C9A24B" }}>ДЛЯ УСТОЙЧИВОГО РОСТА.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <p style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.82, marginBottom: 28 }}>
              Международные поставщики и местные партнёры выбирают Nobel Group, потому что мы выполняем обязательства — по качеству, охвату, коммуникации и коммерческим результатам.
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              {[{ n: "200+", l: "Активных партнёров" }, { n: "14+", l: "Лет на рынке" }].map((s) => (
                <div key={s.l} style={{ padding: "16px 20px", background: "#111111", border: "1px solid rgba(201,162,75,0.15)" }}>
                  <div style={{ color: "#C9A24B", fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ color: "#9A9A9A", fontSize: 11, marginTop: 5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {CARDS.map((card) => <TrustCard key={card.title} card={card} delay={0.2 + card.idx * 0.09} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
