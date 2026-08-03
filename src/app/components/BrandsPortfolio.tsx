import { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { useCms } from "../cms/store";

function SectionLabel({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <div
      style={{
        color: accent ? "#C9A24B" : "#9A9A9A",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.18em",
        marginBottom: 18,
        paddingBottom: 12,
        borderBottom: accent ? "1px solid rgba(201,162,75,0.25)" : "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent ? "#C9A24B" : "rgba(255,255,255,0.3)" }} />
      {children}
    </div>
  );
}

export function BrandsPortfolio({ showCta = true }: { showCta?: boolean }) {
  const { data } = useCms();
  const brands = data.brands;
  const own = [...brands.own].sort((a, b) => a.order - b.order);
  const exclusive = [...brands.exclusive].sort((a, b) => a.order - b.order);
  const distributed = [...brands.distributed].sort((a, b) => a.order - b.order);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="brands" className="ng-sec-pad-v" style={{ background: "#0D0D0D", padding: "110px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
      <div className="ng-side-pad" style={{ padding: "0 80px", maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>{brands.eyebrow}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              {brands.title}
              <br />
              <span style={{ color: "#C9A24B" }}>{brands.titleAccent}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: "#9A9A9A", fontSize: 14, fontWeight: 400, lineHeight: 1.8 }}
          >
            {brands.lead}
          </motion.p>
        </div>

        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 28 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <SectionLabel accent>СОБСТВЕННЫЕ БРЕНДЫ</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {own.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderLeft: "2px solid #C9A24B",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800 }}>{b.name}</div>
                  <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", marginTop: 4 }}>{b.cat.toUpperCase()}</div>
                  <div style={{ color: "#9A9A9A", fontSize: 12, marginTop: 6 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28 }}>
            <SectionLabel accent>ЭКСКЛЮЗИВНО ПРЕДСТАВЛЯЕМЫЕ</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {exclusive.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "18px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700 }}>{b.name}</div>
                    <div style={{ color: "#9A9A9A", fontSize: 12, marginTop: 4 }}>{b.cat}</div>
                  </div>
                  <span style={{ color: "#C9A24B", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", flexShrink: 0 }}>EXCLUSIVE</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.34 }}>
            <SectionLabel>ДИСТРИБУТИРУЕМЫЕ БРЕНДЫ</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {distributed.map((b) => (
                <div key={b.id} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)", padding: "16px 14px" }}>
                  <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
                  <div style={{ color: "#9A9A9A", fontSize: 11 }}>{b.cat}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            <SectionLabel>ТОВАРНЫЕ КАТЕГОРИИ</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {brands.categories.map((c) => (
                <span
                  key={c}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.02)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "10px 14px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {showCta && (
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} style={{ marginTop: 40, textAlign: "center" }}>
            <Link
              to="/brands"
              style={{
                display: "inline-flex",
                border: "1px solid rgba(213,162,81,0.45)",
                color: "#C9A24B",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "14px 28px",
              }}
            >
              СМОТРЕТЬ ВЕСЬ ПОРТФЕЛЬ →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
