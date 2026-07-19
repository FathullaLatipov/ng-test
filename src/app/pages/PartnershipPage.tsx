import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { PartnershipSection } from "../components/PartnershipSection";
import {
  SectionDivider,
  QuoteBand,
  RouteTransition,
  MegaStats,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";
import { GoldCheck } from "../components/BrandIcons";

const PARTNER_TYPES = [
  "Производители и поставщики растительных масел",
  "Поставщики продуктов питания и FMCG",
  "Дилеры и региональные дистрибьюторы",
  "HoReCa: рестораны, отели, кафе",
  "Торговые сети и оптовые клиенты",
  "Логистические партнёры и инвесторы",
];

const ADVANTAGES = [
  { title: "Выход на рынок Узбекистана", desc: "Помогаем международным производителям работать без создания собственного юрлица на старте." },
  { title: "Региональная дистрибуция", desc: "Готовая сеть продаж и поставок по ключевым регионам страны." },
  { title: "Опыт крупных объёмов", desc: "Понимание рынка растительных масел и FMCG, работа с объёмными поставками." },
  { title: "Гибкая модель", desc: "Эксклюзив, дистрибуция, агентские схемы — под задачу партнёра." },
  { title: "Склад и логистика", desc: "Инфраструктура хранения и доставки как часть предложения группы." },
  { title: "Долгосрочный фокус", desc: "Прозрачная коммуникация, совместный рост и устойчивые отношения." },
];

const STEPS = [
  { n: "01", title: "Заявка", desc: "Оставьте запрос через форму: тип партнёра, регион и описание предложения." },
  { n: "02", title: "Диалог", desc: "Менеджер уточнит категорию, объёмы и возможные модели сотрудничества." },
  { n: "03", title: "Согласование", desc: "Обсуждаем формат работы, роли сторон и операционный контур." },
  { n: "04", title: "Запуск", desc: "Переходим к пилоту или полноценному партнёрству с выделенной поддержкой." },
];

export function PartnershipPage() {
  const typesRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const typesInView = useInView(typesRef, { once: true, margin: "-80px" });
  const advInView = useInView(advRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="ПАРТНЁРСТВО"
        title="Растите вместе"
        titleAccent="с Nobel Group."
        subtitle="Для поставщиков, дилеров, дистрибьюторов и HoReCa — надёжная партнёрская модель с региональным покрытием и прозрачными условиями на уровне принципов сотрудничества."
        crumbs={[{ label: "Партнёрство" }]}
        visual="partnership"
      />

      <section
        ref={typesRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "90px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              >
                <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
                <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>КОМУ ПОДХОДИТ</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}
              >
                Кто может стать
                <br /><span style={{ color: "#C9A24B" }}>партнёром группы.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18 }}
                style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.8, margin: 0 }}
              >
                Мы показываем общие преимущества сотрудничества: надёжность, региональная дистрибуция, опыт в объёмах и долгосрочный подход. Коммерческие условия обсуждаются индивидуально.
              </motion.p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PARTNER_TYPES.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={typesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "var(--ng-elevated)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "16px 18px",
                  }}
                >
                  <GoldCheck size={15} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RouteTransition label="МОДЕЛИ СОТРУДНИЧЕСТВА" />

      <PartnershipSection />

      <section
        ref={advRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.07} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={advInView ? { opacity: 1, y: 0 } : {}}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48, maxWidth: 640 }}
          >
            Почему выбирают
            <br /><span style={{ color: "#C9A24B" }}>Nobel Group.</span>
          </motion.h2>
          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {ADVANTAGES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                animate={advInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "26px 24px",
                }}
              >
                <div style={{ color: "rgba(213,162,81,0.4)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 14 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{a.title}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MegaStats
        items={[
          { n: "200+", l: "Активных партнёров" },
          { n: "3", l: "Формата заявок" },
          { n: "7+", l: "Регионов работы" },
          { n: "14+", l: "Лет на рынке" },
        ]}
      />

      <section
        ref={stepsRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48 }}
          >
            Как начать
            <br /><span style={{ color: "#C9A24B" }}>сотрудничество.</span>
          </motion.h2>
          <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{ borderTop: "2px solid #D5A251", paddingTop: 22 }}
              >
                <div style={{ color: "#C9A24B", fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{s.n}</div>
                <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 48, textAlign: "center" }}
          >
            <Link
              to="/contacts"
              style={{
                display: "inline-block",
                background: "#C9A24B",
                color: "#0A0A0A",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "14px 28px",
              }}
            >
              ОСТАВИТЬ ЗАЯВКУ →
            </Link>
          </motion.div>
        </div>
      </section>

      <QuoteBand
        quote="Цены, отсрочки и лимиты не публикуем на сайте — обсуждаем индивидуально. На сайте важны доверие, охват и модель партнёрства."
        author="Nobel Group"
        role="Принцип партнёрства"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
