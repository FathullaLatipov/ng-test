import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IbmGrid, HoneycombPattern, LogisticsMesh } from "./BrandDecor";
import { GoldCheck } from "./BrandIcons";

import arisHero from "../../assets/aris/aris-1.png";
import arisAbout from "../../assets/aris/aris-2.png";
import arisWarehouse from "../../assets/aris/aris-warehouse.jpg";

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

const CAPACITY = [
  { n: "600 т/сут", l: "Семян подсолнечника" },
  { n: "400 т/сут", l: "Хлопковых семян" },
  { n: "60 000 т", l: "Подсолнечного масла / год" },
  { n: "450 т/сут", l: "Автоматическая фасовка" },
];

const OUTPUT = [
  { n: "60 000 т", l: "Подсолнечного масла" },
  { n: "5 000 т", l: "Хлопкового масла" },
  { n: "76 000 т", l: "Жмыха и хлопковой кунжары" },
  { n: "10 000 т", l: "Хлопковой шелухи" },
];

const TARA = ["1 л", "1,5 л", "1,8 л", "2 л", "3 л", "5 л", "10 л", "20 л"];

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
            <Reveal><Eyebrow>ПРОИЗВОДСТВО · МАСЛОЖИРОВОЙ КОМПЛЕКС</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontSize: "clamp(28px, 3.4vw, 46px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 18px" }}>
                Производственный комплекс <span style={{ color: GOLD_LIGHT }}>Aris</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, lineHeight: 1.8, margin: 0 }}>
                Современный производственный комплекс по переработке масличных культур и выпуску растительных масел — от приёмки сырья до автоматической фасовки и отгрузки готовой продукции.
              </p>
            </Reveal>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center", marginBottom: 40 }}>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}>
                Проектная мощность предприятия предусматривает переработку до <b style={{ color: "#FFFFFF" }}>600 тонн семян подсолнечника</b> и <b style={{ color: "#FFFFFF" }}>400 тонн хлопковых семян</b> в сутки.
              </p>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15.5, lineHeight: 1.85, margin: 0 }}>
                При плановой загрузке комплекс сможет производить около 60 тыс. тонн подсолнечного и 5 тыс. тонн хлопкового масла в год, а также до 76 тыс. тонн жмыха и хлопковой кунжары и около 10 тыс. тонн хлопковой шелухи.
              </p>
            </Reveal>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
              style={{ position: "relative", minHeight: 380, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={arisAbout} alt="Комплекс Aris" style={{ width: "100%", height: "100%", minHeight: 380, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 64, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </motion.div>
          </div>

          {/* capacity */}
          <Reveal>
            <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {CAPACITY.map((c) => (
                <div key={c.l} style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `2px solid ${GOLD}`, padding: "22px 20px", boxSizing: "border-box" }}>
                  <div style={{ fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 800, background: "linear-gradient(135deg, #E8C97A, #D5A251 60%, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap", marginBottom: 8 }}>{c.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, lineHeight: 1.4 }}>{c.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── OUTPUT + TECHNOLOGY ─── */}
      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}>
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal><Eyebrow>ПРОДУКЦИЯ И ВЫХОД · ГОД</Eyebrow></Reveal>
          <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 56 }}>
            {OUTPUT.map((o, i) => (
              <Reveal key={o.l} delay={0.05 + i * 0.05}>
                <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `2px solid ${GOLD}`, padding: "24px 20px", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ color: GOLD_LIGHT, fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, whiteSpace: "nowrap", marginBottom: 8 }}>{o.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>{o.l}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><Eyebrow>СОВРЕМЕННЫЕ ТЕХНОЛОГИИ</Eyebrow></Reveal>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal delay={0.06}>
              <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "28px 28px", height: "100%" }}>
                <div style={{ color: GOLD_LIGHT, fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Myande</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14.5, lineHeight: 1.75, margin: 0 }}>
                  Основное технологическое оборудование поставляется компанией <b style={{ color: "#FFFFFF" }}>Myande</b> — международным производителем оборудования для масложировой промышленности.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "28px 28px", height: "100%" }}>
                <div style={{ color: GOLD_LIGHT, fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Котёл XINLI · 15 т на лузге</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14.5, lineHeight: 1.75, margin: "0 0 14px" }}>
                  15-тонный котёл XINLI работает на растительной лузге — побочный продукт переработки используется для производства технологического пара.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {["Меньше потребление энергоресурсов", "Ниже затраты на утилизацию отходов", "Ниже энергосоставляющая себестоимости"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                      <GoldCheck size={13} /> {t}
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
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "flex-start", marginBottom: 56 }}>
            <div>
              <Reveal><Eyebrow>АВТОМАТИЗИРОВАННАЯ ФАСОВКА</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15.5, lineHeight: 1.85, margin: "0 0 20px" }}>
                  Четыре интегрированные автоматические линии <b style={{ color: "#FFFFFF" }}>TECHGEN</b> общей производительностью до <b style={{ color: "#FFFFFF" }}>450 тонн в сутки</b> обеспечивают стабильность процесса, контроль качества и выпуск продукции в разных форматах.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Розница", "Опт", "HoReCa"].map((s) => (
                    <div key={s} style={{ border: `1px solid rgba(213,162,81,0.4)`, background: "rgba(201,162,75,0.06)", color: GOLD_LIGHT, fontSize: 12.5, fontWeight: 700, padding: "9px 16px" }}>{s}</div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", padding: "26px 26px" }}>
                <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16 }}>ФОРМАТЫ ТАРЫ</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {TARA.map((t) => (
                    <div key={t} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", color: "#FFFFFF", fontSize: 15, fontWeight: 700, textAlign: "center", padding: "15px 6px" }}>{t}</div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
              style={{ position: "relative", minHeight: 300, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={arisWarehouse} alt="Хранение и отгрузка" style={{ width: "100%", height: "100%", minHeight: 300, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.5), transparent 60%)" }} />
            </motion.div>
            <div>
              <Reveal><Eyebrow>АВТОМАТИЗИРОВАННАЯ ЛОГИСТИКА</Eyebrow></Reveal>
              <Reveal delay={0.05}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {LOGISTICS.map((l) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "15px 18px" }}>
                      <GoldCheck size={15} />
                      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8, marginTop: 20, marginBottom: 0 }}>
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
