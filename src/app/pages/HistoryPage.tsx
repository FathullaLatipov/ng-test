import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { CompanyJourney } from "../components/CompanyJourney";
import {
  SectionDivider,
  QuoteBand,
  MegaStats,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const VALUES = [
  { title: "Надёжность", desc: "Выполняем обязательства перед поставщиками, клиентами и региональными командами." },
  { title: "Ответственность", desc: "Каждая поставка — это обещание качества, сроков и прозрачных условий." },
  { title: "Качество", desc: "Работаем с востребованной продукцией и выстраиваем контроль по всей цепочке." },
  { title: "Стабильность поставок", desc: "Многоисточниковые закупки и складская инфраструктура снижают риски дефицита." },
  { title: "Долгосрочное партнёрство", desc: "Строим отношения на годы, а не на разовые сделки." },
  { title: "Оперативность", desc: "Быстрые решения, гибкие схемы и профессиональная команда на местах." },
];

const MISSION_POINTS = [
  "Качественные и доступные продукты питания для рынка Узбекистана",
  "Надёжная система импорта, производства и дистрибуции",
  "Долгосрочное партнёрство с производителями и клиентами",
  "Рост региональных команд и открытость к новым направлениям",
];

export function HistoryPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="ИСТОРИЯ КОМПАНИИ"
        title="Путь от оптовых поставок"
        titleAccent="к продовольственной экосистеме."
        subtitle="С 2012 года Nobel Group развивается как системный игрок рынка продуктов питания Узбекистана — от первых оптовых операций до мультиформатной группы."
        crumbs={[{ label: "История" }]}
        visual="history"
      />

      <CompanyJourney />

      <MegaStats
        items={[
          { n: "2012", l: "Год основания" },
          { n: "14+", l: "Лет опыта" },
          { n: "4", l: "Этапа масштабирования" },
          { n: "1", l: "Общая стратегия роста" },
        ]}
      />

      <section
        ref={missionRef}
        className="ng-sec-pad"
        style={{
          background: "linear-gradient(165deg, #12110F 0%, #1E1A12 45%, #12110F 100%)",
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LogisticsMesh opacity={0.08} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              >
                <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
                <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>МИССИЯ</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 22 }}
              >
                Обеспечивать рынок
                <br /><span style={{ color: "#C9A24B" }}>качественными продуктами.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.18 }}
                style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.85, margin: 0 }}
              >
                Мы обеспечиваем рынок Узбекистана качественными, востребованными и доступными продуктами питания через надёжную систему поставок, местного производства, дистрибуции и долгосрочного партнёрства.
              </motion.p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MISSION_POINTS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 24 }}
                  animate={missionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  style={{
                    background: "var(--ng-elevated)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "18px 22px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#C9A24B", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.6 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider mark="node" />

      <section
        ref={valuesRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ЦЕННОСТИ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48, maxWidth: 640 }}
          >
            Принципы, на которых
            <br /><span style={{ color: "#C9A24B" }}>строится группа.</span>
          </motion.h2>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.07 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "28px 24px",
                  minHeight: 180,
                }}
              >
                <div style={{ width: 28, height: 2, background: "#D5A251", marginBottom: 18 }} />
                <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{v.title}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        quote="Nobel Group — надёжная, развивающаяся продовольственная группа с сильной дистрибуцией, региональным покрытием и партнёрской моделью."
        author="Позиционирование"
        role="Главная мысль для посетителя"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
