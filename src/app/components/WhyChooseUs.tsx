import { useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { HexStat, IconShell, IconDistribution, IconBrand, IconImport, IconHoReCa, GoldCheck } from "./BrandIcons";
import { GiantNumber, GiantOutline, IbmGrid, LogisticsMesh } from "./BrandDecor";

const CARDS = [
  { Icon: IconDistribution, title: "Сильная дистрибуционная сеть",   desc: "Развитая система поставок и устойчивое присутствие на региональном рынке Узбекистана.",              idx: 0, metric: "7" },
  { Icon: IconBrand,        title: "Экспертиза в FMCG",               desc: "Глубокое понимание продовольственного рынка: потребительское поведение, сезонный спрос, регуляторная среда.", idx: 1, metric: "14+" },
  { Icon: IconImport,       title: "Гибкая модель сотрудничества",    desc: "Индивидуальный подход к каждому партнёру — эксклюзивное представительство, дистрибуция, агентские схемы.", idx: 2, metric: "5" },
  { Icon: IconDistribution, title: "Стабильные поставки",             desc: "Налаженные отношения с поставщиками и многоисточниковые закупки обеспечивают стабильное наличие товара.",  idx: 3, metric: "98%" },
  { Icon: IconImport,       title: "Операционная эффективность",    desc: "Профессиональное управление логистикой и дистрибуцией снижает совокупные издержки партнёров.",            idx: 4, metric: "2–3×" },
  { Icon: IconHoReCa,       title: "Долгосрочное партнёрство",       desc: "Прозрачная отчётность, честные условия и ориентация на совместный рост — основа всех отношений.",         idx: 5, metric: "200+" },
];

function prng(i: number) { return ((i * 7919 + 1) % 100) / 100; }

function EmberParticles() {
  const pts = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      left: prng(i * 3) * 100,
      top: prng(i * 3 + 1) * 90 + 5,
      size: prng(i * 3 + 2) * 2.2 + 0.8,
      delay: prng(i) * 6,
      dur: prng(i * 2) * 5 + 6,
    })), []);
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

function TrustCard({ card, delay, inView }: { card: typeof CARDS[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = card;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ng-card-compact"
      style={{
        background: hovered ? "linear-gradient(145deg, #262019 0%, #1B1712 100%)" : "var(--ng-elevated)",
        border: hovered ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)",
        padding: "28px 26px",
        transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 44px rgba(0,0,0,0.4), 0 0 28px rgba(213,162,81,0.1)" : "0 6px 20px rgba(0,0,0,0.25)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100%" : "32px", height: 2, background: "linear-gradient(to right, var(--ng-gold), rgba(213,162,81,0.3))", transition: "width 0.45s ease" }} />

      <div className="ng-card-compact-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div className="ng-card-icon">
          <IconShell hovered={hovered} size={64}>
            <Icon size={40} glow={hovered} />
          </IconShell>
        </div>
        <div style={{
          color: "var(--ng-gold)",
          fontSize: 18,
          fontWeight: 800,
          opacity: hovered ? 1 : 0.55,
          transition: "opacity 0.3s",
          textShadow: hovered ? "0 0 12px rgba(213,162,81,0.35)" : "none",
        }}>
          {card.metric}
        </div>
      </div>

      <div className="ng-card-compact-title" style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, marginBottom: 10, letterSpacing: "0.01em" }}>{card.title}</div>
      <p className="ng-card-compact-desc" style={{ color: "var(--ng-muted-dark)", fontSize: 13, fontWeight: 300, lineHeight: 1.78, margin: 0 }}>{card.desc}</p>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const bgX2 = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="ng-sec-pad"
      style={{
        background: "linear-gradient(160deg, #17130D 0%, #241D12 42%, #1C170F 72%, #14110C 100%)",
        padding: "110px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.3) 50%, transparent)" }} />
      <IbmGrid opacity={0.025} />
      <LogisticsMesh opacity={0.05} />
      <div className="ng-decor"><GiantNumber n="05" /></div>
      <div className="ng-decor"><GiantOutline kind="handshake" side="right" size={300} /></div>
      <EmberParticles />
      <motion.div style={{ position: "absolute", left: "-15%", top: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(213,162,81,0.1) 0%, transparent 68%)", pointerEvents: "none", x: bgX }} />
      <motion.div style={{ position: "absolute", right: "-10%", bottom: "-10%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(213,162,81,0.07) 0%, transparent 70%)", pointerEvents: "none", x: bgX2 }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end", marginBottom: 48 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>ПОЧЕМУ NOBEL GROUP</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              НАДЕЖНЫЙ ПАРТНЕР
              <br /><span className="text-gold-glow">ДЛЯ УСТОЙЧИВОГО РОСТА.</span>
            </motion.h2>
          </div>

          {/* Infographic strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              background: "var(--ng-elevated)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "20px 18px",
              boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
            }}
          >
            {[
              { n: "200+", l: "Партнёров" },
              { n: "14+", l: "Лет" },
              { n: "7", l: "Регионов" },
            ].map((s, i) => (
                <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                  <HexStat delay={0.3 + i * 0.1} inView={inView}>
                    {s.n}
                  </HexStat>
                  <span style={{ color: "var(--ng-muted-dark)", fontSize: 11, fontWeight: 500 }}>{s.l}</span>
                </div>
            ))}
          </motion.div>
        </div>

        {/* Infographic principles row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 36,
          }}
        >
          {["Качество без компромиссов", "Поставки по графику", "Прозрачные условия", "Локальная экспертиза"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <GoldCheck size={14} />
              <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </motion.div>

        <div className="ng-grid-3 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {CARDS.map((card) => <TrustCard key={card.title} card={card} delay={0.2 + card.idx * 0.09} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
