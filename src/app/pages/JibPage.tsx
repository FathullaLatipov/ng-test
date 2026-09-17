import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { PageLayout } from "../components/PageLayout";
import { IbmGrid, HoneycombPattern, SectionDivider, MegaStats } from "../components/BrandDecor";
import { GoldCheck } from "../components/BrandIcons";
import { useCms } from "../cms/store";

const GOLD = "#C9A24B";
const GOLD_LIGHT = "#E8C97A";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <span style={{ width: 26, height: 1, background: GOLD }} />
      <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.24em" }}>{children}</span>
    </div>
  );
}

export function JibPage() {
  const { data } = useCms();
  const jib = data.jib;
  const history = [...jib.history].sort((a, b) => a.order - b.order);
  const products = [...jib.products].sort((a, b) => a.order - b.order);

  return (
    <PageLayout>
      {/* HERO */}
      <section
        className="ng-side-pad"
        style={{
          position: "relative",
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          padding: "150px 80px 90px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${jib.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.34) saturate(0.85)",
            transform: "scale(1.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.72) 45%, rgba(10,9,8,0.55) 100%)",
          }}
        />
        <IbmGrid opacity={0.06} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
          {/* breadcrumbs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 12, color: "rgba(244,239,228,0.55)", marginBottom: 28 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Главная</Link>
            <span>/</span>
            <Link to="/business" style={{ color: "inherit", textDecoration: "none" }}>Направления бизнеса</Link>
            <span>/</span>
            <Link to="/business#production" style={{ color: "inherit", textDecoration: "none" }}>Производство</Link>
            <span>/</span>
            <span style={{ color: GOLD_LIGHT }}>J.I.B. INVEST</span>
          </div>

          <Reveal>
            <img
              src={jib.logoUrl}
              alt="J.I.B. INVEST"
              style={{ height: 72, width: "auto", maxWidth: "min(80vw, 460px)", objectFit: "contain", marginBottom: 26, filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.5))" }}
            />
          </Reveal>

          <Reveal delay={0.05}>
            <Eyebrow>{jib.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 8px" }}>
              {jib.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ fontSize: "clamp(18px, 2.4vw, 28px)", fontWeight: 600, color: GOLD_LIGHT, letterSpacing: "-0.01em", marginBottom: 22 }}>
              {jib.titleAccent}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(244,239,228,0.82)", maxWidth: 620, marginBottom: 34 }}>
              {jib.heroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Link
                to="/partnership#partner-form"
                style={{ background: GOLD, color: "#0A0A0A", textDecoration: "none", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 28px" }}
              >
                ОБСУДИТЬ СОТРУДНИЧЕСТВО →
              </Link>
              {jib.website && (
                <a
                  href={jib.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ border: "1px solid rgba(213,162,81,0.5)", color: GOLD_LIGHT, textDecoration: "none", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 28px" }}
                >
                  {jib.websiteLabel || "Сайт завода"} ↗
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <MegaStats items={jib.stats.map((s) => ({ n: s.n, l: s.l }))} />

      {/* ABOUT */}
      <section
        className="ng-sec-pad"
        style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 50%, #12110F 100%)", padding: "110px 80px", position: "relative", overflow: "hidden" }}
      >
        <HoneycombPattern opacity={0.03} />
        <div className="ng-jib-about" style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal><Eyebrow>{jib.aboutTitle}</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontSize: "clamp(26px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, margin: "0 0 26px" }}>
                Завод полного цикла переработки подсолнечника
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 18 }}>{jib.about}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15.5, lineHeight: 1.85, marginBottom: 28 }}>{jib.about2}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ borderLeft: `3px solid ${GOLD}`, background: "rgba(201,162,75,0.06)", padding: "18px 22px" }}>
                <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 8 }}>МИССИЯ</div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>«{jib.mission}»</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div style={{ position: "relative", minHeight: 420, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={jib.aboutImage} alt="Продукция завода" style={{ width: "100%", height: "100%", minHeight: 420, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 64, height: 2, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTORY */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "110px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.03} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal><Eyebrow>ИСТОРИЯ</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: "clamp(26px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", margin: "0 0 48px" }}>
              Путь длиною <span style={{ color: GOLD_LIGHT }}>в четверть века</span>
            </h2>
          </Reveal>
          <div className="ng-jib-timeline" style={{ display: "grid", gridTemplateColumns: `repeat(${history.length}, 1fr)`, gap: 16 }}>
            {history.map((h, i) => (
              <Reveal key={h.id} delay={0.08 + i * 0.08}>
                <div style={{ position: "relative", background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `3px solid ${GOLD}`, padding: "26px 22px", height: "100%" }}>
                  <div style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: GOLD_LIGHT, letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1 }}>{h.year}</div>
                  <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{h.title}</div>
                  <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        className="ng-sec-pad"
        style={{ background: "linear-gradient(165deg, #12110F 0%, #1A1712 50%, #12110F 100%)", padding: "110px 80px", position: "relative", overflow: "hidden" }}
      >
        <HoneycombPattern opacity={0.03} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700, marginBottom: 48 }}>
            <Reveal><Eyebrow>ПРОДУКЦИЯ</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontSize: "clamp(26px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.12, margin: "0 0 18px" }}>{jib.productsTitle}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 15, lineHeight: 1.8, margin: 0 }}>{jib.productsLead}</p>
            </Reveal>
          </div>

          <div className="ng-jib-products" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            {products.map((p, i) => (
              <Reveal key={p.id} delay={0.08 + i * 0.08}>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "radial-gradient(120% 80% at 50% 0%, rgba(232,201,122,0.10), transparent 60%), var(--ng-elevated)",
                    padding: "28px 24px 26px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {p.img && (
                    <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <img src={p.img} alt={p.name} style={{ maxHeight: 240, maxWidth: "100%", width: "auto", objectFit: "contain", filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))" }} />
                    </div>
                  )}
                  <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{p.name}</div>
                  <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* byproducts */}
          <Reveal delay={0.15}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 30 }}>
              <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16 }}>{jib.byproductsTitle.toUpperCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {jib.byproducts.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", padding: "11px 16px", color: "rgba(255,255,255,0.8)", fontSize: 13.5 }}>
                    <GoldCheck size={13} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES + STANDARDS */}
      <section
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div className="ng-jib-caps" style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 56 }}>
          <div>
            <Reveal><Eyebrow>{jib.capabilitiesTitle}</Eyebrow></Reveal>
            <div className="ng-jib-caps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
              {jib.capabilities.map((c, i) => (
                <Reveal key={c} delay={0.05 + i * 0.06}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "var(--ng-elevated)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${GOLD}`, padding: "18px 18px", height: "100%" }}>
                    <span style={{ marginTop: 2 }}><GoldCheck size={16} /></span>
                    <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.55 }}>{c}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal><Eyebrow>{jib.standardsTitle}</Eyebrow></Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
              {jib.standards.map((s, i) => (
                <Reveal key={s} delay={0.05 + i * 0.06}>
                  <div style={{ border: `1px solid rgba(213,162,81,0.4)`, background: "rgba(201,162,75,0.06)", color: GOLD_LIGHT, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", padding: "12px 18px" }}>
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ng-sec-pad" style={{ background: "var(--ng-void)", padding: "90px 80px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 16px" }}>{jib.ctaTitle}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 15.5, lineHeight: 1.8, maxWidth: 620, margin: "0 auto 30px" }}>{jib.ctaLead}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <Link to="/partnership#partner-form" style={{ background: GOLD, color: "#0A0A0A", textDecoration: "none", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 30px" }}>
                ОБСУДИТЬ СОТРУДНИЧЕСТВО →
              </Link>
              {jib.website && (
                <a href={jib.website} target="_blank" rel="noopener noreferrer" style={{ border: "1px solid rgba(213,162,81,0.5)", color: GOLD_LIGHT, textDecoration: "none", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 30px" }}>
                  {jib.websiteLabel || "Сайт завода"} ↗
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider mark="hex" />

      <style>{`
        @media (max-width: 900px) {
          .ng-jib-about { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ng-jib-caps { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 820px) {
          .ng-jib-timeline { grid-template-columns: 1fr 1fr !important; }
          .ng-jib-products { grid-template-columns: 1fr !important; }
          .ng-jib-caps-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .ng-jib-timeline { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
