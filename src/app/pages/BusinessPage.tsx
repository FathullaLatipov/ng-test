import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { BusinessDirections, DIRECTIONS } from "../components/BusinessDirections";
import { BrandsPortfolio } from "../components/BrandsPortfolio";
import { SectionDivider, QuoteBand, MegaStats, IbmGrid } from "../components/BrandDecor";
import { GoldCheck } from "../components/BrandIcons";

export function BusinessPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="НАПРАВЛЕНИЯ БИЗНЕСА"
        title="Импорт, производство,"
        titleAccent="дистрибуция и рост."
        subtitle="Пять направлений Nobel Group: импорт и дистрибуция, производство, HoReCa, международная торговля и инвестиционные проекты."
        crumbs={[{ label: "Направления бизнеса" }]}
        visual="business"
      />

      <BusinessDirections />

      <section ref={ref} className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "90px 80px", position: "relative", overflow: "hidden" }}>
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: 36, letterSpacing: "-0.02em" }}
          >
            Структура направлений
          </motion.h2>
          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {DIRECTIONS.map((d, i) => (
              <motion.a
                key={d.id}
                href={`#${d.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.05 }}
                style={{
                  textDecoration: "none",
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid #D5A251",
                  padding: "20px 18px",
                  display: "block",
                }}
              >
                <div style={{ color: "#C9A24B", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 8 }}>{d.number}</div>
                <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700 }}>{d.name}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <MegaStats
        items={[
          { n: "5", l: "Направлений" },
          { n: "2 500+", l: "SKU" },
          { n: "120+", l: "Внешних партнёров" },
          { n: "3 000+", l: "Клиентов B2B" },
        ]}
      />

      <BrandsPortfolio showCta={false} />

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
            to="/partnership#partner-form"
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
            ОБСУДИТЬ СОТРУДНИЧЕСТВО →
          </Link>
        </div>
      </section>

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
