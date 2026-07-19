import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { GoldCheck, PARTNER_ICONS } from "./BrandIcons";
import { LogisticsMesh, IbmGrid } from "./BrandDecor";

const AUDIENCE = [
  {
    id: "suppliers" as const,
    label: "Поставщики и производители",
    subtitle: "Для поставщиков",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
    desc: "Расширяйте своё присутствие на рынке Узбекистана вместе с надёжным партнёром. Мы берём на себя импорт, дистрибуцию, регуляторные вопросы и локальное продвижение.",
    benefits: [
      "Выход на рынок без открытия юридического лица",
      "Таможенная и регуляторная поддержка",
      "Развитая дистрибуционная сеть",
      "Управление категорией и маркетинг",
      "Прозрачная отчётность о продажах",
    ],
    cta: "Заявка поставщика",
  },
  {
    id: "distributors" as const,
    label: "Дилеры и дистрибьюторы",
    subtitle: "Для дистрибьюторов",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
    desc: "Получайте доступ к широкому портфелю продуктов питания через одного надёжного оптового партнёра — с конкурентными ценами и стабильным наличием товара.",
    benefits: [
      "Мультикатегорийный портфель в одном заказе",
      "Конкурентные оптовые цены",
      "Надёжный график поставок",
      "Кредитные условия для постоянных партнёров",
      "Выделенный менеджер по работе с клиентами",
    ],
    cta: "Стать партнёром",
  },
  {
    id: "horeca" as const,
    label: "Рестораны, отели, кафе",
    subtitle: "Для HoReCa",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
    desc: "Получайте стабильные поставки продукции для профессионального использования. Специализированный ассортимент и гибкие условия работы для предприятий общественного питания.",
    benefits: [
      "Ассортимент специально для HoReCa",
      "Гибкий минимальный объём заказа",
      "Приоритетный график доставки",
      "Дегустация и отбор образцов",
      "Специализированная поддержка аккаунта",
    ],
    cta: "Заявка для HoReCa",
  },
];

function AudienceCard({ aud, index, inView }: { aud: typeof AUDIENCE[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = PARTNER_ICONS[aud.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--ng-elevated)",
        border: hovered ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="ng-card-photo" style={{ height: 210, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${aud.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: hovered ? "brightness(0.72) saturate(0.9)" : "brightness(0.58) saturate(0.8)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s ease, filter 0.4s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(30,28,24,0.95) 100%)" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="ng-card-photo-badge"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 52,
            height: 52,
            background: "rgba(18,17,15,0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(213,162,81,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(213,162,81,0.2)",
          }}
        >
          <Icon size={30} />
        </motion.div>
        <div className="ng-card-photo-caption" style={{ position: "absolute", bottom: 18, left: 24, right: 24 }}>
          <div className="ng-card-compact-tagline" style={{ color: "var(--ng-gold)", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", marginBottom: 4 }}>{aud.subtitle.toUpperCase()}</div>
          <div className="ng-card-compact-title" style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800 }}>{aud.label}</div>
        </div>
      </div>
      <div className="ng-card-compact" style={{ padding: "26px 24px 30px" }}>
        <p className="ng-card-compact-desc" style={{ color: "var(--ng-muted-dark)", fontSize: 13, fontWeight: 300, lineHeight: 1.75, marginBottom: 22 }}>{aud.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
          {aud.benefits.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <GoldCheck size={15} />
              <span className="ng-card-compact-benefit" style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 400, lineHeight: 1.4 }}>{b}</span>
            </div>
          ))}
        </div>
        <a
          href="#contact"
          className="ng-cta-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: hovered ? "var(--ng-gold)" : "transparent",
            color: hovered ? "#12110F" : "var(--ng-gold)",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "11px 22px",
            border: "1px solid rgba(213,162,81,0.5)",
            transition: "all 0.35s",
          }}
        >
          {aud.cta.toUpperCase()}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        </a>
      </div>
    </motion.div>
  );
}

export function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="partnership" style={{ background: "var(--ng-void)", padding: "110px 0 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.25) 50%, transparent)" }} />
      <div className="ng-side-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 80px" }} ref={ref}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
            <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>С КЕМ МЫ РАБОТАЕМ</span>
            <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            ПАРТНЕРСТВО,{" "}
            <span className="text-gold-glow">ОСНОВАННОЕ НА ДОВЕРИИ</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "var(--ng-muted-dark)", fontSize: 15, fontWeight: 300, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>
            Мы открыты к сотрудничеству с производителями, поставщиками, дилерами, дистрибьюторами и представителями HoReCa.
          </motion.p>
        </div>
        <div className="ng-grid-3 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {AUDIENCE.map((aud, i) => <AudienceCard key={aud.id} aud={aud} index={i} inView={inView} />)}
        </div>
      </div>

      <div style={{ position: "relative", minHeight: 280, overflow: "hidden", background: "linear-gradient(115deg, #1C170F 0%, #2F2512 48%, #1C170F 100%)" }}>
        <IbmGrid opacity={0.025} />
        <LogisticsMesh opacity={0.09} />
        <motion.div
          initial={{ opacity: 0.4, x: -40 }}
          animate={{ opacity: [0.4, 0.75, 0.4], x: [-40, 40, -40] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-20%", left: "20%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(213,162,81,0.16) 0%, transparent 70%)", pointerEvents: "none" }}
        />
        <div className="ng-side-pad ng-stack" style={{ position: "relative", maxWidth: 1400, margin: "0 auto", padding: "68px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          <div>
            <div style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", marginBottom: 16 }}>СТАНОВИТЕСЬ ПАРТНЕРАМИ</div>
            <h3 style={{ color: "#FFFFFF", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0, maxWidth: 640 }}>
              РАЗВИВАЙТЕСЬ ВМЕСТЕ С <span className="text-gold-glow">Nobel group</span>
            </h3>
          </div>
          <a
            href="#contact"
            className="ng-cta-btn"
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(0deg, #D5A251, #2F2512 160%)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "18px 36px",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(213,162,81,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            ОТПРАВИТЬ ЗАЯВКУ
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
