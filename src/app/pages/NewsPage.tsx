import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { SectionDivider, IbmGrid } from "../components/BrandDecor";

const NEWS = [
  {
    date: "2026",
    tag: "Группа",
    title: "Развитие FMCG-платформы в Центральной Азии",
    desc: "Nobel Group продолжает усиливать импорт, производство и дистрибуцию продуктов питания на рынке Узбекистана.",
  },
  {
    date: "2025",
    tag: "География",
    title: "Расширение регионального покрытия",
    desc: "Укрепление складской инфраструктуры и дистрибуционной сети в ключевых регионах страны.",
  },
  {
    date: "2025",
    tag: "Партнёрство",
    title: "Новые контракты с международными производителями",
    desc: "Прямые соглашения расширяют ассортимент и повышают устойчивость поставок.",
  },
  {
    date: "2024",
    tag: "Производство",
    title: "Дочерние производственные площадки",
    desc: "Развитие производственных проектов, включая площадки в Казахстане и России.",
  },
];

export function NewsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="НОВОСТИ"
        title="События и"
        titleAccent="развитие группы."
        subtitle="Ключевые обновления о направлениях бизнеса, партнёрствах, географии и производственных проектах Nobel Group."
        crumbs={[{ label: "Новости" }]}
        visual="contacts"
      />

      <section ref={ref} className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "90px 80px", position: "relative", overflow: "hidden" }}>
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {NEWS.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              style={{
                background: "var(--ng-elevated)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "28px 28px",
                display: "grid",
                gridTemplateColumns: "90px 1fr",
                gap: 24,
              }}
              className="ng-grid-2"
            >
              <div>
                <div style={{ color: "#C9A24B", fontSize: 20, fontWeight: 800 }}>{n.date}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", marginTop: 8 }}>{n.tag.toUpperCase()}</div>
              </div>
              <div>
                <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{n.title}</h3>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{n.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
