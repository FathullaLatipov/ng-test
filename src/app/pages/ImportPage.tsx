import { motion } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import {
  IbmGrid,
  LogisticsMesh,
  HoneycombPattern,
  GiantNumber,
  GiantWord,
  MegaStats,
  QuoteBand,
  FullBleedPhoto,
  SectionDivider,
} from "../components/BrandDecor";
import { GoldCheck, IconImport, IconDistribution, IconBrand } from "../components/BrandIcons";

import heroImg from "../../assets/ecoborn-5.jpg";
import facilityImg from "../../assets/ecoborn-3.jpg";
import warehouseImg from "../../assets/ecoborn-1.jpg";
import galleryB from "../../assets/ecoborn-2.jpg";
import galleryD from "../../assets/ecoborn-4.jpg";
import galleryF from "../../assets/ecoborn-6.jpg";
import ecobornLogo from "../../assets/ecoborn-logo.svg";

const LEKKER = [
  { l: "L", en: "Living", ru: "Жизнь" },
  { l: "E", en: "Eco", ru: "Экология" },
  { l: "K", en: "Kindness", ru: "Доброта" },
  { l: "K", en: "Keeping", ru: "Сохранность" },
  { l: "E", en: "Energy", ru: "Энергия" },
  { l: "R", en: "Recycling", ru: "Переработка" },
];

const BRANDS = [
  { name: "ЛЕККЕР", note: "Флагманский бренд · рафинированное подсолнечное масло", featured: true },
  { name: "Златожар", note: "Подсолнечное масло" },
  { name: "Донской Янтарь", note: "Подсолнечное масло" },
  { name: "Нонна", note: "Подсолнечное масло" },
  { name: "Чойс", note: "Подсолнечное масло" },
  { name: "Рамазан", note: "Подсолнечное масло" },
];

const PROCESS = [
  { n: "01", t: "Экстракция", d: "Извлечение масла из семян на современном автоматизированном оборудовании." },
  { n: "02", t: "Рафинация", d: "Очистка масла от примесей — чистый и безопасный продукт." },
  { n: "03", t: "Дезодорация", d: "Удаление запахов: масло с нейтральным вкусом и ароматом." },
  { n: "04", t: "Вымораживание", d: "Финальная стабилизация — прозрачность и длительное хранение." },
];

const ADVANTAGES = [
  "Собственная железнодорожная ветка на территории комплекса",
  "Рафинированное, дезодорированное и вымороженное масло",
  "Поставки на внутренний рынок Узбекистана и в соседние регионы",
  "Один из крупнейших экспортёров отрасли в стране",
  "Подсолнечный шрот с содержанием сырого протеина 30–32%",
];

const GALLERY = [
  { src: warehouseImg, cap: "Склад хранения" },
  { src: galleryB, cap: "Производство" },
  { src: facilityImg, cap: "Производственный комплекс" },
  { src: galleryD, cap: "Оборудование" },
  { src: heroImg, cap: "Отгрузка и логистика" },
  { src: galleryF, cap: "Территория завода" },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function ImportPage() {
  return (
    <PageLayout>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section
        className="ng-side-pad"
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "160px 80px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4) saturate(0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.7) 40%, rgba(10,9,8,0.55) 100%)",
          }}
        />
        <LogisticsMesh opacity={0.12} />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            transformOrigin: "left",
            background: "linear-gradient(to right, transparent, #D5A251 40%, #E8C97A 60%, transparent)",
            zIndex: 3,
          }}
        />

        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          {/* breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}
          >
            <Link to="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 12, letterSpacing: "0.06em" }}>
              Главная
            </Link>
            <span style={{ color: "rgba(213,162,81,0.5)", fontSize: 10 }}>›</span>
            <Link to="/business" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 12 }}>
              Направления бизнеса
            </Link>
            <span style={{ color: "rgba(213,162,81,0.5)", fontSize: 10 }}>›</span>
            <span style={{ color: "#C9A24B", fontSize: 12, fontWeight: 600 }}>Импорт и дистрибуция</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
          >
            <div style={{ width: 28, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em" }}>
              НАПРАВЛЕНИЕ 01 · ИМПОРТ И ДИСТРИБУЦИЯ
            </span>
          </motion.div>

          {/* brand lockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}
          >
            <img src={ecobornLogo} alt="EcoBorn" style={{ width: 60, height: 60, objectFit: "contain" }} />
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1 }}>
                EcoBorn <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, fontSize: 20 }}>INC</span>
              </div>
              <div style={{ color: "#8FCD1E", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", marginTop: 6 }}>
                МАСЛОЭКСТРАКЦИОННЫЙ КОМПЛЕКС
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(34px, 5vw, 62px)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              margin: "0 0 22px",
              maxWidth: 760,
            }}
          >
            Подсолнечное масло<br />
            <span style={{ color: "#C9A24B" }}>полного цикла производства</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65 }}
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 0 32px",
            }}
          >
            Ecoborn INC — один из динамично развивающихся производителей рафинированного
            подсолнечного масла в Узбекистане. Собственное производство, дистрибуция по стране
            и экспорт в соседние регионы.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 30 }}
          >
            {["С 2016 года", "Ташкент, Узбекистан", "72 000 т / год", "200+ сотрудников"].map((b) => (
              <div
                key={b}
                style={{
                  border: "1px solid rgba(213,162,81,0.3)",
                  background: "rgba(213,162,81,0.06)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "9px 16px",
                }}
              >
                {b}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <a
              href="#products"
              style={{
                background: "#C9A24B",
                color: "#0A0A0A",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "14px 28px",
              }}
            >
              ПРОДУКЦИЯ И БРЕНДЫ →
            </a>
            <a
              href="#contact"
              style={{
                border: "1px solid rgba(213,162,81,0.5)",
                color: "#C9A24B",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "14px 28px",
              }}
            >
              КОНТАКТЫ
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────── */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.022} />
        <div className="ng-decor"><GiantNumber n="01" /></div>
        <div
          className="ng-grid-2"
          style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}
        >
          <motion.div {...reveal}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>О КОМПАНИИ</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 22 }}>
              Производитель, которому<br />
              <span className="text-gold-glow">доверяет рынок</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
              Производственный комплекс расположен в Ташкенте (Янгихаётский район, Южная промышленная
              зона) и работает с 2016 года. Компания выпускает рафинированное, дезодорированное и
              вымороженное подсолнечное масло с нейтральным вкусом и запахом, а также подсолнечный шрот.
            </p>
            <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 15, lineHeight: 1.8, marginBottom: 26 }}>
              Ecoborn — один из крупнейших экспортёров отрасли в стране: продукция поставляется на
              внутренний рынок Узбекистана и в соседние регионы. Собственная железнодорожная ветка на
              территории обеспечивает стабильную отгрузку и логистику.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ADVANTAGES.slice(0, 3).map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                  <GoldCheck size={14} />
                  {a}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative", minHeight: 420, border: "1px solid rgba(213,162,81,0.2)", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${facilityImg})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.72)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.85), transparent 55%)" }} />
            <div style={{ position: "absolute", left: 24, bottom: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 24, height: 1, background: "#D5A251" }} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em" }}>ЗАВОД · ТАШКЕНТ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────── */}
      <MegaStats
        items={[
          { n: "2016", l: "Год основания" },
          { n: "72 000 т", l: "Семян в переработку в год" },
          { n: "200+", l: "Сотрудников" },
          { n: "6", l: "Брендов масла" },
        ]}
      />

      {/* ─── LEKKER BRAND ─────────────────────────────── */}
      <section
        className="ng-sec-pad"
        style={{ background: "linear-gradient(165deg, #12110F 0%, #1E1A12 42%, #16140F 72%, #12110F 100%)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.06} />
        <div className="ng-decor"><GiantWord word="LEKKER" side="right" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div {...reveal} style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ФЛАГМАНСКИЙ БРЕНД</span>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
            </div>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.04em", lineHeight: 1, marginBottom: 16 }}>
              LEKKER
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.75, maxWidth: 620, margin: "0 auto" }}>
              Название бренда кодирует философию компании — шесть принципов, стоящих за каждой бутылкой масла.
            </p>
          </motion.div>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
            {LEKKER.map((it, i) => (
              <motion.div
                key={it.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06 }}
                style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #8FCD1E", padding: "22px 24px", display: "flex", alignItems: "center", gap: 20 }}
              >
                <div style={{ fontSize: 44, fontWeight: 800, color: "#8FCD1E", lineHeight: 1, minWidth: 34 }}>{it.l}</div>
                <div>
                  <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700 }}>{it.en}</div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 3 }}>{it.ru}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        quote="LEKKER — это не просто продукт, а отражение подхода компании к качеству, безопасности и ответственности перед потребителем."
        author="Ecoborn INC"
        role="О философии бренда"
      />

      {/* ─── PRODUCTS & BRANDS ────────────────────────── */}
      <section
        id="products"
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}
      >
        <IbmGrid opacity={0.02} />
        <div className="ng-decor"><GiantNumber n="02" /></div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div {...reveal} style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ПРОДУКЦИЯ И БРЕНДЫ</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, maxWidth: 640 }}>
              Портфель марок<br />
              <span className="text-gold-glow">подсолнечного масла</span>
            </h2>
          </motion.div>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {BRANDS.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: b.featured ? "linear-gradient(150deg, rgba(213,162,81,0.14), var(--ng-elevated))" : "var(--ng-elevated)",
                  border: b.featured ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)",
                  padding: "26px 24px",
                  minHeight: 150,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800, letterSpacing: "0.01em" }}>{b.name}</div>
                  {b.featured && (
                    <span style={{ color: "#0A0A0A", background: "#C9A24B", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 8px" }}>ФЛАГМАН</span>
                  )}
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6, marginTop: 14 }}>{b.note}</div>
              </motion.div>
            ))}
          </div>

          {/* Sunflower meal */}
          <motion.div
            {...reveal}
            style={{ marginTop: 14, background: "var(--ng-charcoal)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "3px solid #D5A251", padding: "26px 28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}
          >
            <div>
              <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Подсолнечный шрот</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6, maxWidth: 620 }}>
                Побочный продукт переработки семян — кормовая продукция с содержанием сырого протеина 30–32%.
              </div>
            </div>
            <div style={{ color: "#D5A251", fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>30–32%<span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginLeft: 8 }}>протеин</span></div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRODUCTION PROCESS ───────────────────────── */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <HoneycombPattern opacity={0.03} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div {...reveal} style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ПРОИЗВОДСТВЕННЫЙ ПРОЦЕСС</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, maxWidth: 640 }}>
              От семечки до бутылки —<br />
              <span className="text-gold-glow">четыре этапа</span>
            </h2>
          </motion.div>

          <div className="ng-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                style={{ background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", padding: "26px 22px", position: "relative" }}
              >
                <div style={{ fontSize: 40, fontWeight: 800, color: "rgba(213,162,81,0.25)", lineHeight: 1, marginBottom: 16 }}>{p.n}</div>
                <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{p.t}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.65 }}>{p.d}</div>
                <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 2, background: "linear-gradient(to right, #D5A251, transparent)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL-BLEED PHOTO ─────────────────────────── */}
      <FullBleedPhoto src={warehouseImg} caption="ПРОИЗВОДСТВЕННЫЙ КОМПЛЕКС · ТАШКЕНТ" height={460} />

      {/* ─── LOGISTICS & ADVANTAGES ───────────────────── */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-elevated)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.06} />
        <div
          className="ng-grid-2"
          style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "center" }}
        >
          <motion.div {...reveal}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ЛОГИСТИКА И ЭКСПОРТ</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>
              Стабильные поставки<br />
              <span className="text-gold-glow">и покрытие рынка</span>
            </h2>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                { icon: <IconImport size={40} glow />, l: "Импорт сырья" },
                { icon: <IconDistribution size={40} glow />, l: "Дистрибуция по стране" },
                { icon: <IconBrand size={40} glow />, l: "Собственные бренды" },
              ].map((it) => (
                <div key={it.l} style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 120 }}>
                  {it.icon}
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600 }}>{it.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ADVANTAGES.map((a) => (
              <div
                key={a}
                style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "16px 18px" }}
              >
                <GoldCheck size={15} />
                <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 14 }}>{a}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ──────────────────────────────────── */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div {...reveal} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
              <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ГАЛЕРЕЯ</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
              Производство <span className="text-gold-glow">в кадре</span>
            </h2>
          </motion.div>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.cap}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                style={{ position: "relative", height: 240, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${g.src})`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.6s" }} className="ng-gallery-img" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,8,0.85), transparent 60%)" }} />
                <div style={{ position: "absolute", left: 16, bottom: 14, color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>{g.cap}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / CTA ────────────────────────────── */}
      <section
        id="contact"
        className="ng-sec-pad"
        style={{ background: "linear-gradient(115deg, #241D12 0%, #322612 38%, #241D12 68%, #1C160E 100%)", padding: "90px 80px", position: "relative", overflow: "hidden", scrollMarginTop: 90 }}
      >
        <IbmGrid opacity={0.03} />
        <div
          className="ng-grid-2"
          style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}
        >
          <motion.div {...reveal}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <img src={ecobornLogo} alt="EcoBorn" style={{ width: 46, height: 46, objectFit: "contain" }} />
              <div style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 800 }}>EcoBorn INC</div>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 38px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>
              Готовы обсудить поставки<br />и сотрудничество?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Свяжитесь с командой Ecoborn напрямую или через отдел развития Nobel Group.
            </p>
            <Link
              to="/partnership#partner-form"
              style={{ display: "inline-block", background: "#C9A24B", color: "#0A0A0A", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "14px 30px" }}
            >
              ОБСУДИТЬ СОТРУДНИЧЕСТВО →
            </Link>
          </motion.div>

          <motion.div {...reveal} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { k: "Телефон", v: "+998 (71) 258-46-00", href: "tel:+998712584600" },
              { k: "E-mail", v: "info@ecoborn.uz", href: "mailto:info@ecoborn.uz" },
              { k: "Сайт", v: "ecoborn.uz", href: "https://ecoborn.uz" },
              { k: "Адрес", v: "Ташкент, Янгихаётский район, Южная промзона" },
            ].map((c) => (
              <div key={c.k} style={{ borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.k}</span>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ color: "#E8C97A", fontSize: 15, fontWeight: 600, textDecoration: "none", textAlign: "right" }}>{c.v}</a>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, textAlign: "right" }}>{c.v}</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
