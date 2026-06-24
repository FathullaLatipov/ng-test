import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const AUDIENCE = [
  {
    id: "suppliers",
    label: "Поставщики и производители",
    subtitle: "Для поставщиков",
    img: "https://images.unsplash.com/photo-1758520144427-ddb02ac74e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
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
    id: "distributors",
    label: "Дилеры и дистрибьюторы",
    subtitle: "Для дистрибьюторов",
    img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
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
    id: "horeca",
    label: "Рестораны, отели, кафе",
    subtitle: "Для HoReCa",
    img: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#111111", border: hovered ? "1px solid rgba(201,162,75,0.4)" : "1px solid rgba(255,255,255,0.07)", overflow: "hidden", transition: "all 0.4s ease", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.5)" : "none" }}
    >
      <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
        <div style={{ width: "100%", height: "100%", backgroundImage: `url(${aud.img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) saturate(0.5)", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(17,17,17,0.95) 100%)" }} />
        <div style={{ position: "absolute", bottom: 18, left: 24 }}>
          <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", marginBottom: 4 }}>{aud.subtitle.toUpperCase()}</div>
          <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800 }}>{aud.label}</div>
        </div>
      </div>
      <div style={{ padding: "26px 24px 30px" }}>
        <p style={{ color: "#9A9A9A", fontSize: 13, fontWeight: 400, lineHeight: 1.75, marginBottom: 22 }}>{aud.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
          {aud.benefits.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M2.5 7l3 3 6-6" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 400, lineHeight: 1.4 }}>{b}</span>
            </div>
          ))}
        </div>
        <a
          href="#contact"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: hovered ? "#C9A24B" : "transparent", color: hovered ? "#0A0A0A" : "#C9A24B", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "11px 22px", border: "1px solid rgba(201,162,75,0.5)", transition: "all 0.35s" }}
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
    <section id="partnership" style={{ background: "#0A0A0A", padding: "110px 80px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>С КЕМ МЫ РАБОТАЕМ</span>
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            ПАРТНЕРСТВО, ОСНОВАННОЕ НА ДОВЕРИИ
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "#9A9A9A", fontSize: 15, fontWeight: 400, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>
            Мы открыты к сотрудничеству с производителями, поставщиками, дилерами, дистрибьюторами, логистическими операторами и представителями HoReCa.
          </motion.p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {AUDIENCE.map((aud, i) => <AudienceCard key={aud.id} aud={aud} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
