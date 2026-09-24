import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IbmGrid, HoneycombPattern, FullBleedPhoto } from "./BrandDecor";
import { GoldCheck } from "./BrandIcons";

import semeySunflower from "../../assets/semey/semey-sunflower.jpg";
import semeyField from "../../assets/semey/semey-field.jpg";

const GOLD = "#C9A24B";
const GOLD_LIGHT = "#E8C97A";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <span style={{ width: 26, height: 1, background: GOLD }} />
      <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em" }}>{children}</span>
    </div>
  );
}

const MARKET = [
  { n: "1,7 млн га", l: "Под подсолнечник в Казахстане (2025)" },
  { n: "3,3 млн т", l: "Валовый сбор масличных (2024)" },
  { n: "88", l: "Предприятий переработки в стране" },
  { n: "≈4,7 млн т", l: "Совокупная мощность переработки / год" },
];

const STAGES = [
  { n: "01", t: "Очистка и подготовка сырья", d: "Приёмка семян подсолнечника и подготовка к переработке." },
  { n: "02", t: "Прессово-экстракционный модуль", d: "Глубокая переработка и извлечение масла на современном оборудовании." },
  { n: "03", t: "Фильтрация и хранение масла", d: "Очистка масла и организованное хранение готового продукта." },
  { n: "04", t: "Выпуск шрота", d: "Востребованный продукт для животноводства и экспортных рынков." },
];

const PRINCIPLES = [
  "Обеспеченность региональной сырьевой базой",
  "Продукция с высокой добавленной стоимостью",
  "Ориентация на расширение экспортного потенциала",
  "Энергоэффективные и экологически безопасные технологии",
  "Стабильное качество выпускаемой продукции",
];

export function SemeySection() {
  return (
    <>
      {/* ─── ЦЕЛЬ + РЫНОК ─── */}
      <section id="semey" className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 860, marginBottom: 44 }}>
            <Reveal><Eyebrow>ПРОИЗВОДСТВО · ПРОЕКТ · КАЗАХСТАН</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontSize: "clamp(28px, 3.4vw, 46px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" }}>
                Маслоэкстракционный завод <span style={{ color: GOLD_LIGHT }}>Семей</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, lineHeight: 1.8, margin: 0 }}>
                Создание нового высокотехнологичного маслоэкстракционного завода по переработке семян подсолнечника в Абайской области (Казахстан) — привлечение инвестиций, современные технологии переработки, выпуск конкурентоспособной продукции с высокой добавленной стоимостью и расширение экспортного потенциала страны.
              </p>
            </Reveal>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 48, alignItems: "center", marginBottom: 40 }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
              style={{ position: "relative", minHeight: 380, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={semeySunflower} alt="Подсолнечник" style={{ width: "100%", height: "100%", minHeight: 380, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 64, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </motion.div>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}>
                На Абайскую область приходится около <b style={{ color: "#FFFFFF" }}>10,2 %</b> посевов масличных культур Казахстана. Растущий спрос на растительные масла и благоприятная экспортная конъюнктура формируют устойчивый рынок сбыта масла и шрота.
              </p>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15.5, lineHeight: 1.85, margin: 0 }}>
                Государственные и отраслевые инициативы направлены на увеличение глубокой переработки, развитие инфраструктуры и экспортных потоков — отрасль остаётся приоритетной и способствует диверсификации сельского хозяйства и росту внешнеторговой выручки.
              </p>
            </Reveal>
          </div>

          {/* market stats */}
          <Reveal>
            <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {MARKET.map((m) => (
                <div key={m.l} style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `2px solid ${GOLD}`, padding: "22px 20px", boxSizing: "border-box" }}>
                  <div style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, background: "linear-gradient(135deg, #E8C97A, #D5A251 60%, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap", marginBottom: 8 }}>{m.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, lineHeight: 1.45 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FIELD PHOTO ─── */}
      <FullBleedPhoto src={semeyField} caption="АБАЙСКАЯ ОБЛАСТЬ · РЕГИОНАЛЬНАЯ СЫРЬЕВАЯ БАЗА" height={420} />

      {/* ─── ПРОИЗВОДСТВЕННЫЙ КОМПЛЕКС + ПРИНЦИПЫ ─── */}
      <section className="ng-sec-pad" style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 50%, #12110F 100%)", padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <HoneycombPattern opacity={0.03} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <Reveal><Eyebrow>ПРОИЗВОДСТВЕННЫЙ КОМПЛЕКС</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h3 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, margin: 0 }}>
                Полный цикл глубокой переработки подсолнечника
              </h3>
            </Reveal>
          </div>

          <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 52 }}>
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={0.06 + i * 0.07}>
                <div style={{ position: "relative", background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", padding: "26px 22px", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ fontSize: 38, fontWeight: 800, color: "rgba(213,162,81,0.25)", lineHeight: 1, marginBottom: 14 }}>{s.n}</div>
                  <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{s.t}</div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{s.d}</p>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><Eyebrow>КЛЮЧЕВЫЕ ПРИНЦИПЫ</Eyebrow></Reveal>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {PRINCIPLES.map((p) => (
              <Reveal key={p}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "16px 18px" }}>
                  <GoldCheck size={15} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5 }}>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
