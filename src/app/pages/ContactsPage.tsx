import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import {
  SectionDivider,
  QuoteBand,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const CHANNELS = [
  { label: "Общие вопросы", value: "info@nobelgroup.uz", note: "Корпоративные обращения" },
  { label: "Партнёрство", value: "partners@nobelgroup.uz", note: "Дилеры и сотрудничество" },
  { label: "Поставщикам", value: "suppliers@nobelgroup.uz", note: "Производители и импорт" },
  { label: "HoReCa", value: "horeca@nobelgroup.uz", note: "Рестораны, отели, кафе" },
  { label: "Карьера", value: "hr@nobelgroup.uz", note: "Резюме и вакансии" },
  { label: "Телефон", value: "+998 71 000 00 00", note: "Пн–Сб, 09:00–18:00" },
];

const OFFICES = [
  {
    city: "Ташкент",
    role: "Головной офис",
    address: "100084, Узбекистан, Ташкент\nМирабадский район, ул. Навои, 22А",
    hours: "Пн – Сб: 09:00 – 18:00",
  },
  {
    city: "Регионы",
    role: "Дистрибуционная сеть",
    address: "Самарканд · Бухара · Ферганская долина\nи ключевые направления по стране",
    hours: "По графику региональных операций",
  },
];

export function ContactsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="КОНТАКТЫ"
        title="Давайте строить"
        titleAccent="будущее вместе."
        subtitle="Свяжитесь с нами по вопросам партнёрства, поставок, HoReCa или карьеры. Выберите канал обращения — и оставьте заявку в форме ниже."
        crumbs={[{ label: "Контакты" }]}
        visual="contacts"
      />

      <section
        ref={ref}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "90px 80px 40px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <LogisticsMesh opacity={0.06} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 72 }}>
            {OFFICES.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "32px 30px",
                }}
              >
                <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", marginBottom: 12 }}>
                  {o.role.toUpperCase()}
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{o.city}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-line", margin: "0 0 18px" }}>
                  {o.address}
                </p>
                <div style={{ color: "var(--ng-muted-dark)", fontSize: 13 }}>{o.hours}</div>
              </motion.div>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: 28 }}
          >
            Каналы связи
          </motion.h2>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
            {CHANNELS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(18,17,15,0.8)",
                  padding: "22px 20px",
                }}
              >
                <div style={{ color: "var(--ng-muted-dark)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 10 }}>
                  {c.label.toUpperCase()}
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{c.value}</div>
                <div style={{ color: "rgba(213,162,81,0.7)", fontSize: 12 }}>{c.note}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              padding: "22px 0 10px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {["Telegram", "WhatsApp"].map((ch) => (
              <a
                key={ch}
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid rgba(213,162,81,0.35)",
                  color: "#C9A24B",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "12px 20px",
                }}
              >
                {ch.toUpperCase()} →
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <QuoteBand
        quote="Официальный контакт — это первый шаг к долгосрочному партнёрству. Мы отвечаем на заявки в течение 1–2 рабочих дней."
        author="Nobel Group"
        role="Служба партнёрств"
      />

      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
