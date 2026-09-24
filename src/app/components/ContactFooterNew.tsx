import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import nobelLogo from "../../assets/nobel-logo.png";
import { useCms } from "../cms/store";

const INQUIRY_TYPES = [
  { id: "cooperation", label: "Сотрудничество", icon: "M9 13a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1M15 11a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1" },
  { id: "partner", label: "Стать партнёром", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { id: "supplier", label: "Заявка поставщика", icon: "M3 7h18M3 12h18M3 17h12" },
  { id: "horeca", label: "Заявка для HoReCa", icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" },
  { id: "career", label: "Отправить резюме", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" },
];

const FOOTER_COLS: { title: string; links: { label: string; to?: string }[] }[] = [
  {
    title: "О группе",
    links: [
      { label: "О компании", to: "/about" },
      { label: "История", to: "/history" },
      { label: "Новости", to: "/news" },
    ],
  },
  {
    title: "Бизнес",
    links: [
      { label: "Импорт и дистрибуция", to: "/business/import" },
      { label: "HoReCa", to: "/business#horeca" },
      { label: "Международная торговля", to: "/business#trade" },
      { label: "Производство", to: "/business/jib" },
      { label: "Инвестиционные проекты", to: "/business#invest" },
    ],
  },
  {
    title: "Партнёрам",
    links: [
      { label: "Производителям", to: "/partnership" },
      { label: "Торговым сетям", to: "/partnership" },
      { label: "Дистрибьюторам", to: "/partnership" },
      { label: "HoReCa", to: "/partnership" },
      { label: "Инвесторам", to: "/partnership" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Бренды", to: "/brands" },
      { label: "Карьера", to: "/careers" },
      { label: "География", to: "/geography" },
      { label: "Контакты", to: "/contacts" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { label: "Ташкент, Узбекистан", to: "/contacts" },
      { label: "+998 71 000 00 00" },
      { label: "info@nobelgroup.uz" },
      { label: "Обсудить сотрудничество", to: "/partnership#partner-form" },
    ],
  },
];

export function ContactFooterNew() {
  const { data } = useCms();
  const contact = data.contact;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedType, setSelectedType] = useState("cooperation");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <section id="contact" ref={ref} className="ng-sec-pad" style={{ background: "#0A0A0A", padding: "110px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>{contact.eyebrow}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.8vw, 52px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {contact.title}
              <br /><span style={{ color: "#C9A24B" }}>{contact.titleAccent}</span>
            </motion.h2>
          </div>

          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ marginBottom: 32 }}>
                <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", marginBottom: 14 }}>ВЫБЕРИТЕ ТИП ОБРАЩЕНИЯ</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {INQUIRY_TYPES.map((t) => (
                    <button key={t.id} onClick={() => setSelectedType(t.id)}
                      style={{ background: selectedType === t.id ? "rgba(201,162,75,0.1)" : "#111111", border: selectedType === t.id ? "1px solid rgba(201,162,75,0.45)" : "1px solid rgba(255,255,255,0.07)", color: selectedType === t.id ? "#FFFFFF" : "#9A9A9A", fontSize: 13, fontWeight: selectedType === t.id ? 600 : 400, padding: "13px 18px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.25s", fontFamily: "Manrope, sans-serif" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedType === t.id ? "#C9A24B" : "#9A9A9A"} strokeWidth="1.3" strokeLinecap="round"><path d={t.icon} /></svg>
                      {t.label}
                      {selectedType === t.id && <span style={{ marginLeft: "auto", color: "#C9A24B", fontSize: 13 }}>→</span>}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Адрес", value: contact.address },
                  { label: "Телефон", value: contact.phone },
                  { label: "Email", value: contact.email },
                  { label: "Часы работы", value: contact.hours },
                ].map((item) => (
                  <div key={item.label} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 16, padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>{item.label.toUpperCase()}</span>
                    <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 400, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
              {sent ? (
                <div style={{ background: "#111111", border: "1px solid rgba(201,162,75,0.3)", padding: "56px 36px", textAlign: "center" }}>
                  <div style={{ color: "#C9A24B", fontSize: 32, marginBottom: 18 }}>✦</div>
                  <div style={{ color: "#FFFFFF", fontSize: 19, fontWeight: 700, marginBottom: 12 }}>Заявка получена</div>
                  <p style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.7 }}>Спасибо за обращение. Наш менеджер свяжется с вами в течение 1–2 рабочих дней.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[
                      { key: "name", label: "Имя", placeholder: "Ваше имя" },
                      { key: "company", label: "Компания", placeholder: "Название компании" },
                      { key: "email", label: "Email", placeholder: "your@email.com" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 14 }}>{field.label.toUpperCase()}</label>
                        <input type={field.key === "email" ? "email" : "text"} placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                          style={{ width: "100%", background: "#111111", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: 14, padding: "12px 16px", outline: "none", fontFamily: "Manrope, sans-serif", boxSizing: "border-box", transition: "border-color 0.25s" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(201,162,75,0.45)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 14 }}>СООБЩЕНИЕ</label>
                      <textarea placeholder="Опишите ваш запрос или предложение о сотрудничестве..." rows={5}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        style={{ width: "100%", background: "#111111", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: 14, padding: "12px 16px", outline: "none", fontFamily: "Manrope, sans-serif", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.25s" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(201,162,75,0.45)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <button type="submit"
                      style={{ background: "#C9A24B", border: "none", color: "#0A0A0A", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 30px", cursor: "pointer", fontFamily: "Manrope, sans-serif", transition: "all 0.3s", alignSelf: "flex-start" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,162,75,0.4)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A24B"; e.currentTarget.style.boxShadow = "none"; }}>
                      ОТПРАВИТЬ ЗАЯВКУ →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ng-side-pad" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "60px 80px 34px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 72, marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <img src={nobelLogo} alt="Nobel Group" style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800, letterSpacing: "0.12em" }}>NOBEL</div>
                  <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.32em", marginTop: 2 }}>GROUP</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, fontWeight: 400, lineHeight: 1.75, marginBottom: 22 }}>
                {contact.footerBlurb}
              </p>
            </div>
            <div className="ng-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28 }}>
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 16 }}>{col.title.toUpperCase()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map((link) =>
                      link.to ? (
                        <Link
                          key={link.label}
                          to={link.to}
                          style={{ color: "rgba(255,255,255,0.78)", textDecoration: "none", fontSize: 14, fontWeight: 400, lineHeight: 1.5, transition: "color 0.25s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24B")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span key={link.label} style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, fontWeight: 400, lineHeight: 1.5 }}>
                          {link.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ng-stack ng-stack-center ng-footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{contact.copyright}</div>
            <div style={{ display: "flex", gap: 22 }}>
              {["Политика конфиденциальности", "Условия использования"].map((item) => (
                <a key={item} href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13, transition: "color 0.25s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
