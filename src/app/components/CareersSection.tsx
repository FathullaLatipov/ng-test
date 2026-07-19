import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";

const TEAM_IMG = "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const OPEN_ROLES = [
  { title: "Менеджер по ключевым клиентам", dept: "Продажи и торговля", type: "Полная занятость", location: "Ташкент" },
  { title: "Координатор дистрибуционной логистики", dept: "Операции", type: "Полная занятость", location: "Ташкент" },
  { title: "Представитель HoReCa", dept: "Подразделение HoReCa", type: "Полная занятость", location: "Ташкент / Самарканд" },
  { title: "Специалист по импорту и закупкам", dept: "Nobel group", type: "Полная занятость", location: "Ташкент" },
];

const VALUES_CAREERS = [
  { n: "1", title: "Профессиональный рост", desc: "Структурированные пути развития и программы обучения по всем направлениям бизнеса." },
  { n: "2", title: "Реальная ответственность", desc: "С первого дня — управление реальными клиентами, партнёрами и бизнес-результатами." },
  { n: "3", title: "Стабильность", desc: "Растущий, прибыльный бизнес с 12-летней историей и чёткой долгосрочной стратегией." },
];

export function CareersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="careers" className="ng-sec-pad" style={{ background: "#0D0D0D", padding: "110px 80px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>КАРЬЕРА</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 22 }}>
              РАСТЁМ ВМЕСТЕ
              <br /><span style={{ color: "#C9A24B" }}>С NOBEL GROUP.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "#9A9A9A", fontSize: 15, fontWeight: 400, lineHeight: 1.8, marginBottom: 36 }}>
              Мы уверены, что успех компании начинается с сильной команды. Мы создаём возможности для профессионального развития специалистов в сфере продаж, логистики, закупок, дистрибуции и управления.
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 36 }}>
              {VALUES_CAREERS.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, border: "1px solid rgba(201,162,75,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24B", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{v.n}</div>
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{v.title}</div>
                    <div style={{ color: "#9A9A9A", fontSize: 13, lineHeight: 1.65 }}>{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
              style={{ height: 210, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: "100%", height: "100%", backgroundImage: `url(${TEAM_IMG})`, backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.45) saturate(0.6)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.6), transparent)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 22, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>Команда Nobel Group</div>
            </motion.div>
          </div>

          {/* Right: Openings */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              ОТКРЫТЫЕ ВАКАНСИИ
            </motion.div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {OPEN_ROLES.map((role, i) => (
                <motion.div key={role.title} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.35 + i * 0.08 }}
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  whileHover={{ borderColor: "rgba(201,162,75,0.35)", x: 2 }}>
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{role.title}</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <span style={{ background: "rgba(201,162,75,0.1)", color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", padding: "2px 8px" }}>{role.dept.toUpperCase()}</span>
                      <span style={{ color: "#9A9A9A", fontSize: 12 }}>{role.type}</span>
                      <span style={{ color: "#9A9A9A", fontSize: 12 }}>· {role.location}</span>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "#C9A24B", flexShrink: 0 }}><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
              style={{ background: "#111111", border: "1px solid rgba(201,162,75,0.2)", padding: "26px 26px" }}>
              <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Не нашли подходящую вакансию?</div>
              <p style={{ color: "#9A9A9A", fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>
                Мы всегда ищем опытных специалистов в области продаж, логистики, операций и торговли. Пришлите резюме — мы свяжемся, когда появится подходящая возможность.
              </p>
              <Link to="/careers#resume"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C9A24B", color: "#0A0A0A", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", padding: "11px 20px", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,162,75,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A24B"; e.currentTarget.style.boxShadow = "none"; }}>
                ОТПРАВИТЬ РЕЗЮМЕ →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
