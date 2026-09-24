import { motion } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import {
  MegaStats,
  QuoteBand,
  SectionDivider,
  IbmGrid,
  HoneycombPattern,
  LogisticsMesh,
  GiantNumber,
} from "../components/BrandDecor";
import { GoldCheck } from "../components/BrandIcons";
import { useCms } from "../cms/store";
import type { DirectionItem } from "../cms/types";

import ecobornHero from "../../assets/ecoborn-5.jpg";
import ecobornFacility from "../../assets/ecoborn-3.jpg";
import ecobornWarehouse from "../../assets/ecoborn-1.jpg";
import ecobornLogo from "../../assets/ecoborn-logo.svg";

const GOLD = "#C9A24B";
const GOLD_LIGHT = "#E8C97A";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

/* ─── EcoBorn (Импорт и дистрибуция) ─────────────────── */
const ECOBORN_FACTS = [
  { n: "2016", l: "Год основания" },
  { n: "72 000 т", l: "Семян в переработку / год" },
  { n: "200+", l: "Сотрудников" },
  { n: "6", l: "Брендов масла" },
];
const ECOBORN_BRANDS = [
  { name: "LEKKER", note: "Флагманский бренд · рафинированное масло", featured: true },
  { name: "Zlatozhar", note: "Златожар" },
  { name: "Donskoy Yantar", note: "Донской Янтарь" },
  { name: "Nonna", note: "Подсолнечное масло" },
  { name: "Choice", note: "Подсолнечное масло" },
  { name: "Ramazan", note: "Подсолнечное масло" },
];
const ECOBORN_ADV = [
  "Собственная железнодорожная ветка на территории комплекса",
  "Рафинированное, дезодорированное и вымороженное масло",
  "Поставки на внутренний рынок и в соседние регионы",
  "Один из крупнейших экспортёров отрасли в стране",
];

const HORECA_POINTS = [
  "Специализированный ассортимент для профессиональной кухни",
  "Стабильный график поставок и приоритетная доставка",
  "Гибкий минимальный заказ",
  "Выделенная поддержка и персональный менеджер",
];
const TRADE_POINTS = [
  "Внешнеторговые операции и прямые контракты",
  "Партнёрская сеть в Центральной Азии и СНГ",
  "Развитие экспортных маршрутов",
  "Таможенное и логистическое сопровождение",
];
const INVEST_POINTS = [
  "Инвестиции в складскую инфраструктуру",
  "Развитие производственных мощностей",
  "Стратегические партнёрства и M&A",
  "Масштабирование FMCG-платформы группы",
];

function DirHeader({ dir }: { dir?: DirectionItem }) {
  if (!dir) return null;
  return (
    <motion.div {...reveal} style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
        <span style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 800, color: "rgba(213,162,81,0.35)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          {dir.number}
        </span>
        <div>
          <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", marginBottom: 8 }}>
            {dir.tagline.toUpperCase()}
          </div>
          <h2 style={{ fontSize: "clamp(28px, 3.4vw, 46px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.08, margin: 0 }}>
            {dir.name}
          </h2>
        </div>
      </div>
      <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 16, lineHeight: 1.8, maxWidth: 780, marginTop: 20, marginBottom: 0 }}>
        {dir.desc}
      </p>
    </motion.div>
  );
}

/** Compact info block for directions without a dedicated page */
function InfoDirection({
  dir,
  points,
  img,
}: {
  dir?: DirectionItem;
  points: string[];
  img?: string;
}) {
  return (
    <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 48, alignItems: "center" }}>
      <div>
        <DirHeader dir={dir} />
        <motion.div {...reveal} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }}>
          {points.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "15px 18px" }}>
              <GoldCheck size={15} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5 }}>{p}</span>
            </div>
          ))}
        </motion.div>
      </div>
      {img && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", minHeight: 360, border: "1px solid rgba(213,162,81,0.2)", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.72)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.75), transparent 55%)" }} />
        </motion.div>
      )}
    </div>
  );
}

export function BusinessPage() {
  const { data } = useCms();
  const directions = [...data.business.directions].filter((d) => d.published).sort((a, b) => a.order - b.order);
  const dir = (id: string) => directions.find((d) => d.id === id);
  const jib = data.jib;
  const jibProducts = [...(jib?.products ?? [])].sort((a, b) => a.order - b.order);

  return (
    <PageLayout>
      <PageHero
        eyebrow="НАПРАВЛЕНИЯ БИЗНЕСА"
        title="Импорт, производство,"
        titleAccent="дистрибуция и рост."
        subtitle="Пять направлений Nobel Group — единая FMCG-экосистема: импорт и дистрибуция, HoReCa, международная торговля, производство и инвестиционные проекты."
        crumbs={[{ label: "Направления бизнеса" }]}
        visual="business"
      />

      {/* Quick nav */}
      <section className="ng-sec-pad-sm" style={{ background: "var(--ng-void)", padding: "34px 80px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {directions.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "9px 16px", transition: "all 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(213,162,81,0.5)"; e.currentTarget.style.color = GOLD; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
            >
              <span style={{ color: GOLD, fontWeight: 700 }}>{d.number}</span>
              {d.name}
            </a>
          ))}
        </div>
      </section>

      {/* ═══ 01 · Импорт и дистрибуция — EcoBorn ═══ */}
      <section id="import" className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <IbmGrid opacity={0.02} />
        <div className="ng-decor"><GiantNumber n="01" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <DirHeader dir={dir("import")} />

          <motion.div {...reveal} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
            <img src={ecobornLogo} alt="EcoBorn" style={{ width: 48, height: 48, objectFit: "contain" }} />
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800 }}>EcoBorn <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, fontSize: 16 }}>INC</span></div>
              <div style={{ color: "#8FCD1E", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginTop: 4 }}>МАСЛОЭКСТРАКЦИОННЫЙ КОМПЛЕКС</div>
            </div>
          </motion.div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 48, alignItems: "center", marginBottom: 40 }}>
            <motion.div {...reveal}>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 22 }}>
                Ecoborn INC — маслоэкстракционный комплекс в Ташкенте (с 2016 года). Производит рафинированное,
                дезодорированное и вымороженное подсолнечное масло и подсолнечный шрот, входит в число крупнейших
                экспортёров отрасли в Узбекистане.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ECOBORN_ADV.map((a) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.82)", fontSize: 14 }}>
                    <GoldCheck size={14} /> {a}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
              style={{ position: "relative", minHeight: 340, border: "1px solid rgba(213,162,81,0.2)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ecobornHero})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.8), transparent 55%)" }} />
              <div style={{ position: "absolute", left: 22, bottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>ЗАВОД · ТАШКЕНТ</span>
              </div>
            </motion.div>
          </div>

          {/* facts */}
          <motion.div {...reveal} className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
            {ECOBORN_FACTS.map((f) => (
              <div key={f.l} style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `2px solid ${GOLD}`, padding: "22px 20px" }}>
                <div style={{ fontSize: "clamp(24px, 2.4vw, 32px)", fontWeight: 800, background: "linear-gradient(135deg, #E8C97A, #D5A251 60%, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap", marginBottom: 8 }}>{f.n}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5 }}>{f.l}</div>
              </div>
            ))}
          </motion.div>

          {/* brands */}
          <motion.div {...reveal}>
            <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16 }}>БРЕНДЫ ПОДСОЛНЕЧНОГО МАСЛА</div>
            <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 30 }}>
              {ECOBORN_BRANDS.map((b) => (
                <div key={b.name} style={{ background: b.featured ? "linear-gradient(150deg, rgba(213,162,81,0.14), var(--ng-elevated))" : "var(--ng-elevated)", border: b.featured ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)", borderLeft: `2px solid ${GOLD}`, padding: "18px 20px", boxSizing: "border-box", minHeight: 88 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800 }}>{b.name}</div>
                    {b.featured && <span style={{ color: "#0A0A0A", background: GOLD, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 7px" }}>ФЛАГМАН</span>}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, marginTop: 10 }}>{b.note}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <Link to="/business/import" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid rgba(213,162,81,0.5)`, color: GOLD, textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "13px 26px" }}>
              ПОДРОБНЕЕ О ECOBORN →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ 02 · HoReCa ═══ */}
      <section id="horeca" className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <IbmGrid opacity={0.02} />
        <div className="ng-decor"><GiantNumber n="02" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <InfoDirection dir={dir("horeca")} points={HORECA_POINTS} img={dir("horeca")?.img} />
        </div>
      </section>

      {/* ═══ 03 · Международная торговля ═══ */}
      <section id="trade" className="ng-sec-pad" style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <HoneycombPattern opacity={0.03} />
        <div className="ng-decor"><GiantNumber n="03" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <InfoDirection dir={dir("trade")} points={TRADE_POINTS} img={dir("trade")?.img} />
        </div>
      </section>

      {/* ═══ 04 · Производство — J.I.B. INVEST ═══ */}
      <section id="production" className="ng-sec-pad" style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 50%, #12110F 100%)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <LogisticsMesh opacity={0.06} />
        <div className="ng-decor"><GiantNumber n="04" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <DirHeader dir={dir("production")} />

          {jib && (
            <>
              <motion.div {...reveal} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26, flexWrap: "wrap" }}>
                {jib.logoUrl && <img src={jib.logoUrl} alt="J.I.B. INVEST" style={{ height: 46, width: "auto", maxWidth: 260, objectFit: "contain" }} />}
                <div style={{ color: GOLD_LIGHT, fontSize: 14, fontWeight: 600 }}>{jib.titleAccent}</div>
              </motion.div>

              <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 48, alignItems: "center", marginBottom: 40 }}>
                <motion.div {...reveal}>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}>{jib.about}</p>
                  <div style={{ borderLeft: `3px solid ${GOLD}`, background: "rgba(201,162,75,0.06)", padding: "16px 20px" }}>
                    <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 8 }}>МИССИЯ</div>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>«{jib.mission}»</p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
                  style={{ position: "relative", minHeight: 340, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <img src={jib.aboutImage} alt="Продукция завода" style={{ width: "100%", height: "100%", minHeight: 340, objectFit: "cover", display: "block" }} />
                </motion.div>
              </div>

              {/* products */}
              <motion.div {...reveal}>
                <div style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16 }}>МАРКИ ЗАВОДА</div>
                <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 30 }}>
                  {jibProducts.map((p) => (
                    <div key={p.id} style={{ position: "relative", border: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(120% 80% at 50% 0%, rgba(232,201,122,0.10), transparent 60%), var(--ng-elevated)", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      {p.img && (
                        <div style={{ height: 170, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                          <img src={p.img} alt={p.name} style={{ maxHeight: 170, maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.45))" }} />
                        </div>
                      )}
                      <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{p.name}</div>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{p.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* standards */}
              {jib.standards?.length > 0 && (
                <motion.div {...reveal} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 30 }}>
                  {jib.standards.map((s) => (
                    <div key={s} style={{ border: `1px solid rgba(213,162,81,0.4)`, background: "rgba(201,162,75,0.06)", color: GOLD_LIGHT, fontSize: 12.5, fontWeight: 700, padding: "10px 16px" }}>{s}</div>
                  ))}
                </motion.div>
              )}

              <motion.div {...reveal}>
                <Link to="/business/jib" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid rgba(213,162,81,0.5)`, color: GOLD, textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "13px 26px" }}>
                  ПОДРОБНЕЕ О J.I.B. INVEST →
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ═══ 05 · Инвестиционные проекты ═══ */}
      <section id="invest" className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}>
        <IbmGrid opacity={0.02} />
        <div className="ng-decor"><GiantNumber n="05" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <InfoDirection dir={dir("invest")} points={INVEST_POINTS} img={dir("invest")?.img} />
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

      <QuoteBand
        quote="Опыт работы с крупными объёмами, региональная сеть и гибкая партнёрская модель — наша операционная сила."
        author="Nobel Group"
        role="Направления деятельности"
      />

      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "60px 80px 40px", textAlign: "center" }}>
        <Link
          to="/partnership#partner-form"
          style={{ display: "inline-block", background: GOLD, color: "#0A0A0A", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "14px 30px" }}
        >
          ОБСУДИТЬ СОТРУДНИЧЕСТВО →
        </Link>
      </section>

      <SectionDivider mark="diamond" />

      <style>{`
        @media (max-width: 900px) {
          .ng-grid-2 { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </PageLayout>
  );
}
