import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { BusinessDirections } from "../components/BusinessDirections";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import {
  SectionDivider,
  QuoteBand,
  RouteTransition,
  MegaStats,
  IbmGrid,
  LogisticsMesh,
  GiantNumber,
} from "../components/BrandDecor";
import { GoldCheck } from "../components/BrandIcons";

const CATEGORIES = [
  { name: "Растительные масла", desc: "Оптовые поставки и дистрибуция ключевых категорий масел для ретейла и производства." },
  { name: "Пальмовый жир", desc: "Сырьё и полуфабрикаты для пищевой промышленности с стабильным графиком поставок." },
  { name: "Какао-продукты", desc: "Ингредиенты и готовые решения для кондитерского и пищевого сегмента." },
  { name: "Крахмал", desc: "Промышленные и пищевые позиции для производителей и переработчиков." },
  { name: "Молочная сыворотка", desc: "Специализированные поставки для производств и профессиональных каналов." },
  { name: "FMCG-ассортимент", desc: "Мультикатегорийный портфель продуктов питания для оптовых и региональных партнёров." },
];

const ENTITIES = [
  { name: "Nobel Trade", role: "Оптовая торговля и импорт", focus: "Крупные объёмы, прямые контракты, работа с производителями." },
  { name: "Nobel Distribution", role: "Региональная дистрибуция", focus: "Складская сеть, транспорт, покрытие регионов Узбекистана." },
  { name: "HoReCa", role: "Профессиональный канал", focus: "Снабжение ресторанов, отелей и предприятий общественного питания." },
  { name: "Eco Born", role: "Развитие брендов", focus: "Продвижение продуктовых направлений и локальное присутствие." },
  { name: "Rimada", role: "Продуктовое направление", focus: "Специализированные категории внутри экосистемы группы." },
  { name: "Elite Daily", role: "Рыночное присутствие", focus: "Работа с востребованными позициями повседневного спроса." },
];

export function BusinessPage() {
  const catRef = useRef<HTMLDivElement>(null);
  const entRef = useRef<HTMLDivElement>(null);
  const catInView = useInView(catRef, { once: true, margin: "-80px" });
  const entInView = useInView(entRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ"
        title="Бизнес,"
        titleAccent="который питает рынок."
        subtitle="Импорт, оптовая торговля, региональная дистрибуция, HoReCa и развитие брендов — единая экосистема поставок продуктов питания в Узбекистане."
        crumbs={[{ label: "Бизнес" }]}
        visual="business"
      />

      <BusinessDirections />

      <RouteTransition label="КАТЕГОРИИ ПРОДУКЦИИ" />

      <section
        ref={catRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div className="ng-decor"><GiantNumber n="02" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={catInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>АССОРТИМЕНТ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={catInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 18, maxWidth: 720 }}
          >
            Ключевые категории
            <br /><span style={{ color: "#C9A24B" }}>продовольственного портфеля.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={catInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, marginBottom: 48 }}
          >
            Основной фокус группы — продукты питания и сырьё: растительные масла, пальмовый жир, какао, крахмал, молочная сыворотка и смежные FMCG-направления.
          </motion.p>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 28 }}
                animate={catInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "28px 26px",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(213,162,81,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ color: "rgba(213,162,81,0.45)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 14 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{c.name}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider mark="hex" />

      <section
        ref={entRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.08} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={entInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>СТРУКТУРА ГРУППЫ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={entInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16, maxWidth: 700 }}
          >
            Nobel Group → направления
            <br /><span style={{ color: "#C9A24B" }}>→ компании и подразделения.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={entInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, marginBottom: 48 }}
          >
            Упрощённая публичная структура группы. Каждое направление усиливает общую систему поставок, не раскрывая внутреннюю управленческую модель.
          </motion.p>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {ENTITIES.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 24 }}
                animate={entInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.06 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid #D5A251",
                  background: "rgba(30,28,24,0.65)",
                  padding: "24px 22px",
                }}
              >
                <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{e.name}</div>
                <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", marginBottom: 12 }}>{e.role.toUpperCase()}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{e.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MegaStats
        items={[
          { n: "4", l: "Бизнес-направления" },
          { n: "6+", l: "Продуктовых категорий" },
          { n: "50+", l: "Поставщиков" },
          { n: "15+", l: "Брендов в портфеле" },
        ]}
      />

      <BrandsPortfolio />

      <QuoteBand
        quote="Опыт работы с крупными объёмами, региональная сеть и гибкая партнёрская модель — наша операционная сила."
        author="Nobel Group"
        role="Направления деятельности"
      />

      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "80px 80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginBottom: 28 }}>
            {[
              "Прямые контракты с производителями",
              "Мультиканальная модель: опт, дистрибуция, HoReCa",
              "Складская логистика и стабильность поставок",
            ].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                <GoldCheck size={14} />
                {t}
              </div>
            ))}
          </div>
          <Link
            to="/partnership"
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
            СТАТЬ ПАРТНЁРОМ →
          </Link>
        </div>
      </section>

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
