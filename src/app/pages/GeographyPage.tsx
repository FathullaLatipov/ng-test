import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import {
  SectionDivider,
  QuoteBand,
  MegaStats,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const REGIONS = [
  { name: "Ташкент", role: "Штаб-квартира и главный логистический хаб", focus: "Управление, импорт, ключевые клиенты" },
  { name: "Самарканд", role: "Юго-центральный дистрибуционный узел", focus: "Региональные поставки и партнёры" },
  { name: "Бухара", role: "Западное направление", focus: "Складская поддержка и опт" },
  { name: "Ферганская долина", role: "Андижан · Наманган · Фергана", focus: "Восточный кластер продаж" },
  { name: "Каракалпакстан", role: "Нукус и западные маршруты", focus: "Покрытие удалённых рынков" },
  { name: "Юг и центр", role: "Термез · Қарши · Жиззах · Гулистон", focus: "Межрегиональные коридоры" },
];

const CAPABILITIES = [
  { title: "Региональная сеть продаж", desc: "Присутствие в ключевых городах и регионах Узбекистана через партнёров и собственные операции." },
  { title: "Складская инфраструктура", desc: "Общая модель складов и логистики без публикации чувствительных адресов и мощностей." },
  { title: "Транспортные маршруты", desc: "Связка хабов позволяет поддерживать стабильный график поставок по стране." },
  { title: "Мультиканальный охват", desc: "Опт, дистрибуция и HoReCa работают в единой географической логике группы." },
];

export function GeographyPage() {
  const regRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const regInView = useInView(regRef, { once: true, margin: "-80px" });
  const capInView = useInView(capRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        eyebrow="ГЕОГРАФИЯ ПРИСУТСТВИЯ"
        title="Сеть, которая"
        titleAccent="покрывает Узбекистан."
        subtitle="Интерактивная карта и региональная модель поставок — от ташкентского хаба до ключевых городов и направлений по всей стране."
        crumbs={[{ label: "География" }]}
        visual="geography"
      />

      <MegaStats
        items={[
          { n: "7+", l: "Регионов охвата" },
          { n: "13", l: "Городов на карте" },
          { n: "1", l: "Центральный хаб" },
          { n: "24/7", l: "Логистическая связность" },
        ]}
      />

      <section
        ref={regRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={regInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>РЕГИОНЫ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={regInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 18, maxWidth: 700 }}
          >
            Ключевые точки
            <br /><span style={{ color: "#C9A24B" }}>операционного присутствия.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={regInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.8, maxWidth: 620, marginBottom: 48 }}
          >
            Компания работает по регионам Узбекистана. Ниже — публичная модель присутствия: хабы, направления и логика покрытия без раскрытия точных складских адресов.
          </motion.p>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {REGIONS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 24 }}
                animate={regInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + i * 0.06 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "26px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: 36, height: 2, background: "#D5A251" }} />
                <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{r.name}</div>
                <div style={{ color: "#C9A24B", fontSize: 12, fontWeight: 600, marginBottom: 12 }}>{r.role}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{r.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider mark="hex" />

      <section
        ref={capRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.07} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={capInView ? { opacity: 1, y: 0 } : {}}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48, maxWidth: 640 }}
          >
            Как устроена
            <br /><span style={{ color: "#C9A24B" }}>география поставок.</span>
          </motion.h2>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 22 }}
                animate={capInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(30,28,24,0.55)",
                  padding: "28px 26px",
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(213,162,81,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9A24B",
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
                  <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        quote="География для нас — это не точки на карте, а способность стабильно доставлять продукт туда, где он нужен рынку."
        author="Nobel Group"
        role="Логистика и дистрибуция"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
