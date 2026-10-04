import { useRef } from "react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import {
  SectionDivider,
  QuoteBand,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const TOPICS = ["Продажи", "Закупки / поставщики", "Партнёрство", "HoReCa", "Логистика", "Карьера", "СМИ", "Другое"];

export function ContactsPage() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PageLayout title="Контакты — Nobel Group" description="Связаться с Nobel Group через форму. Официальные контакты публикуются после утверждения.">
      <PageHero
        eyebrow="КОНТАКТЫ"
        title="Связаться"
        titleAccent="с Nobel Group."
        subtitle="Выберите направление обращения или напишите через форму. Телефон, email и адрес появятся после утверждённого списка контактов."
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
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, lineHeight: 1.8, maxWidth: 760, marginTop: 0 }}>
            Официальный адрес, телефон и почта не публикуются, пока Nobel Group не передаст подтверждённый список. Выберите тему и оставьте сообщение в форме ниже.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {TOPICS.map((topic) => (
              <a key={topic} href="#contact" style={{ border: "1px solid rgba(213,162,81,0.35)", color: "#C9A24B", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "10px 14px" }}>
                {topic}
              </a>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        quote="Официальный контакт — это первый шаг к долгосрочному партнёрству."
        author="Nobel Group"
        role="Служба партнёрств"
      />

      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
