import { useRef } from "react";
import { motion, useInView } from "motion/react";

const CATEGORIES = [
  { name: "Растительные масла",   icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" },
  { name: "Пальмовая продукция",  icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" },
  { name: "Какао-продукты",       icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" },
  { name: "Крахмал и производные",icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" },
  { name: "Молочные ингредиенты", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
  { name: "Пищевое сырьё",        icon: "M3 7h18M3 12h18M3 17h12" },
  { name: "FMCG-продукция",       icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
  { name: "Оптовые поставки",     icon: "M1 3h15v13H1zM16 8l4 2v6h-4z" },
];

const OWN_BRANDS = [
  { name: "EcoBorn", cat: "Экопродукты", desc: "Премиальная линейка экосертифицированных продуктов" },
  { name: "Dairy Direction", cat: "Молочная продукция", desc: "Производство и дистрибуция молочных продуктов" },
];

const MARQUEE = [
  "РАСТИТЕЛЬНЫЕ МАСЛА", "ПАЛЬМОВАЯ ПРОДУКЦИЯ", "КАКАО-ПРОДУКТЫ", "ПИЩЕВЫЕ КРАХМАЛЫ",
  "МОЛОЧНЫЕ ИНГРЕДИЕНТЫ", "ПИЩЕВОЕ СЫРЬЁ", "ОПТОВЫЕ ПОСТАВКИ", "ИМПОРТ И ТОРГОВЛЯ",
  "РАСТИТЕЛЬНЫЕ МАСЛА", "ПАЛЬМОВАЯ ПРОДУКЦИЯ", "КАКАО-ПРОДУКТЫ", "ПИЩЕВЫЕ КРАХМАЛЫ",
  "МОЛОЧНЫЕ ИНГРЕДИЕНТЫ", "ПИЩЕВОЕ СЫРЬЁ", "ОПТОВЫЕ ПОСТАВКИ", "ИМПОРТ И ТОРГОВЛЯ",
];

export function BrandsPortfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="brands" style={{ background: "#0D0D0D", padding: "110px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
      <div style={{ padding: "0 80px", maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>КАТЕГОРИИ ПРОДУКЦИИ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              СОБСТВЕННЫЕ БРЕНДЫ
              <br /><span style={{ color: "#C9A24B" }}>И ПАРТНЁРСКИЙ ПОРТФЕЛЬ.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "#9A9A9A", fontSize: 14, fontWeight: 400, lineHeight: 1.8 }}>
            Nobel Group управляет как собственными брендами, так и эксклюзивными дистрибьюторскими соглашениями с международными партнёрами — формируя мультикатегорийный портфель продуктов питания.
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginBottom: 48 }}>
          {/* Own brands */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}>
            <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(201,162,75,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A24B" }} />
              СОБСТВЕННЫЕ БРЕНДЫ
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {OWN_BRANDS.map((b) => (
                <div key={b.name} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid #C9A24B", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800 }}>{b.name}</div>
                    <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", marginTop: 3 }}>{b.cat.toUpperCase()}</div>
                    <div style={{ color: "#9A9A9A", fontSize: 12, marginTop: 5 }}>{b.desc}</div>
                  </div>
                  <div style={{ width: 34, height: 34, border: "1px solid rgba(201,162,75,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24B", fontSize: 16 }}>✦</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}>
            <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
              НАПРАВЛЕНИЯ, С КОТОРЫМИ МЫ РАБОТАЕМ
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {CATEGORIES.map((cat, i) => (
                <motion.div key={cat.name} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 + i * 0.05 }}
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2" strokeLinecap="round"><path d={cat.icon} /></svg>
                  <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 500 }}>{cat.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0A", overflow: "hidden", padding: "13px 0", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #0A0A0A, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #0A0A0A, transparent)", zIndex: 2 }} />
        <div style={{ display: "flex", animation: "marquee-scroll 45s linear infinite", width: "max-content" }}>
          {MARQUEE.map((name, i) => (
            <span key={i} style={{ color: i % 3 === 0 ? "rgba(201,162,75,0.55)" : "rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", marginRight: 36, whiteSpace: "nowrap" }}>
              {name}<span style={{ color: "rgba(201,162,75,0.25)", marginLeft: 36 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "36px 80px 0", maxWidth: 1400, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", padding: "26px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
              ПАРТНЁРСКИЕ БРЕНДЫ И ПРИНЦИПАЛЫ
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>Эксклюзивные дистрибуторские соглашения с международными производителями по ключевым категориям.</div>
          </div>
          <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#C9A24B", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", padding: "11px 20px", border: "1px solid rgba(201,162,75,0.35)", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 32, transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,162,75,0.08)"; e.currentTarget.style.borderColor = "#C9A24B"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,162,75,0.35)"; }}>
            ЗАЯВКА ПОСТАВЩИКА →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
