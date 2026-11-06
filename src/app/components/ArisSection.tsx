import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IbmGrid, HoneycombPattern, LogisticsMesh } from "./BrandDecor";
import { GoldCheck } from "./BrandIcons";
import { FadeImage } from "./FadeImage";

import arisHero from "../../assets/aris/aris-1.webp";
import arisAbout from "../../assets/aris/aris-2.webp";
import arisWarehouse from "../../assets/aris/aris-warehouse.webp";

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
      <span style={{ color: GOLD, fontSize: 13.5, fontWeight: 700, letterSpacing: "0.22em" }}>{children}</span>
    </div>
  );
}

/** Переработка в сутки (60 000 т масла / год — в блоке выпуска, без дубля) */
const CAPACITY = [
  { n: "600 т/сут", l: "Семян подсолнечника" },
  { n: "400 т/сут", l: "Хлопковых семян" },
  { n: "450 т/сут", l: "Автоматическая фасовка" },
];

/** Плановый выпуск в год */
const OUTPUT = [
  { n: "60 000 т", l: "Подсолнечного масла / год" },
  { n: "5 000 т", l: "Хлопкового масла / год" },
  { n: "76 000 т", l: "Жмыха и хлопковой кунжары / год" },
  { n: "10 000 т", l: "Хлопковой шелухи / год" },
];

const LOGISTICS = [
  "Автоматизированная система хранения и отгрузки",
  "Эффективное использование складских площадей",
  "Ускоренная обработка заказов",
  "Отгрузка автомобильным и железнодорожным транспортом",
];

export function ArisSection() {
  return (
    <>
      {/* ─── ABOUT + CAPACITY ─── */}
      <section id="aris" className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <HoneycombPattern opacity={0.03} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 820, marginBottom: 44 }}>
            <Reveal><Eyebrow>ПРОЕКТ В РЕАЛИЗАЦИИ · КАЗАХСТАН</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontSize: "clamp(28px, 3.4vw, 46px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" }}>
                Производственный комплекс <span style={{ color: GOLD_LIGHT }}>Aris</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 18.5, lineHeight: 1.75, margin: 0 }}>
                Современный производственный комплекс по переработке масличных культур и выпуску растительных масел — от приёмки сырья до автоматической фасовки и отгрузки готовой продукции.
              </p>
            </Reveal>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 48 }}>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 17.5, lineHeight: 1.8, marginBottom: 18 }}>
                Проектная мощность предприятия предусматривает переработку до <b style={{ color: "#FFFFFF" }}>600 тонн семян подсолнечника</b> и <b style={{ color: "#FFFFFF" }}>400 тонн хлопковых семян</b> в сутки.
              </p>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 17.5, lineHeight: 1.8, margin: 0 }}>
                При плановой загрузке комплекс сможет производить около 60 тыс. тонн подсолнечного и 5 тыс. тонн хлопкового масла в год, а также до 76 тыс. тонн жмыха и хлопковой кунжары и около 10 тыс. тонн хлопковой шелухи.
              </p>
            </Reveal>
            <FadeImage src={arisAbout} alt="Комплекс Aris" />
          </div>

          {/* capacity + output — one block */}
          <div className="ng-aris-stats">
            {CAPACITY.map((c, i) => (
              <Reveal key={c.l} delay={0.04 + i * 0.04}>
                <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `2px solid ${GOLD}`, padding: "24px 22px", boxSizing: "border-box", height: "100%" }}>
                  <div style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 800, background: "linear-gradient(135deg, #E8C97A, #D5A251 60%, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap", marginBottom: 8 }}>{c.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.4 }}>{c.l}</div>
                </div>
              </Reveal>
            ))}
            {OUTPUT.map((o, i) => (
              <Reveal key={o.l} delay={0.16 + i * 0.04}>
                <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `2px solid ${GOLD}`, padding: "24px 22px", boxSizing: "border-box", height: "100%" }}>
                  <div style={{ fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: 800, background: "linear-gradient(135deg, #E8C97A, #D5A251 60%, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap", marginBottom: 8 }}>{o.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.4 }}>{o.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUTPUT + TECHNOLOGY ─── */}
      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "90px 80px", position: "relative", overflow: "hidden" }}>
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal><Eyebrow>СОВРЕМЕННЫЕ ТЕХНОЛОГИИ</Eyebrow></Reveal>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal delay={0.06}>
              <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "28px 28px", height: "100%" }}>
                <div style={{ color: GOLD_LIGHT, fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Myande</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16.5, lineHeight: 1.75, margin: 0 }}>
                  Основное технологическое оборудование поставляется компанией <b style={{ color: "#FFFFFF" }}>Myande</b> — международным производителем оборудования для масложировой промышленности.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "28px 28px", height: "100%" }}>
                <div style={{ color: GOLD_LIGHT, fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Котёл XINLI · 15 т на лузге</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16.5, lineHeight: 1.75, margin: "0 0 14px" }}>
                  15-тонный котёл XINLI работает на растительной лузге — побочный продукт переработки используется для производства технологического пара.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {["Меньше потребление энергоресурсов", "Ниже затраты на утилизацию отходов", "Ниже энергосоставляющая себестоимости"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
                      <GoldCheck size={15} /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PACKAGING + LOGISTICS ─── */}
      <section className="ng-sec-pad" style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 50%, #12110F 100%)", padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <LogisticsMesh opacity={0.06} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 860, marginBottom: 56 }}>
            <div>
              <Reveal><Eyebrow>АВТОМАТИЗИРОВАННАЯ ФАСОВКА</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 17.5, lineHeight: 1.8, margin: "0 0 20px" }}>
                  Четыре интегрированные автоматические линии <b style={{ color: "#FFFFFF" }}>TECHGEN</b> общей производительностью до <b style={{ color: "#FFFFFF" }}>450 тонн в сутки</b> обеспечивают стабильность процесса, контроль качества и выпуск продукции в разных форматах.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Розница", "Опт", "HoReCa"].map((s) => (
                    <div key={s} style={{ border: `1px solid rgba(213,162,81,0.4)`, background: "rgba(201,162,75,0.06)", color: GOLD_LIGHT, fontSize: 14.5, fontWeight: 700, padding: "11px 18px" }}>{s}</div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <FadeImage src={arisWarehouse} alt="Хранение и отгрузка" />
            <div>
              <Reveal><Eyebrow>АВТОМАТИЗИРОВАННАЯ ЛОГИСТИКА</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {LOGISTICS.map((l) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "15px 18px" }}>
                      <GoldCheck size={17} />
                      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16.5 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 16, lineHeight: 1.8, marginTop: 22, marginBottom: 0 }}>
                  Комплекс Aris объединяет переработку сырья, производство растительных масел, энергоэффективные технологии, автоматическую фасовку, хранение и логистику в единую производственную систему.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
