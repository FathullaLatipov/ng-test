import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import nobelLogo from "../../assets/nobel-logo.png";
import { useCms } from "../cms/store";
import { submitLead } from "../lib/submitLead";

const TOPICS = ["Продажи", "Закупки / поставщики", "Партнёрство", "HoReCa", "Логистика", "Карьера", "СМИ", "Другое"];

const FOOTER_COLS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Группа",
    links: [
      { label: "О группе", to: "/about" },
      { label: "История", to: "/history" },
      { label: "География", to: "/geography" },
    ],
  },
  {
    title: "Бизнес",
    links: [
      { label: "Импорт и дистрибуция", to: "/business#import" },
      { label: "Производство", to: "/business#production" },
      { label: "Логистика", to: "/business#logistics" },
      { label: "Международная торговля", to: "/business#trade" },
      { label: "Проекты", to: "/business#projects" },
    ],
  },
  {
    title: "Партнерам",
    links: [
      { label: "Производителям", to: "/partnership" },
      { label: "Сетям и опту", to: "/partnership" },
      { label: "HoReCa", to: "/partnership" },
      { label: "Логистике", to: "/partnership" },
      { label: "Обсудить", to: "/partnership#partner-form" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "Бренды и продукция", to: "/brands" },
      { label: "Карьера", to: "/careers" },
      { label: "Контакты", to: "/contacts" },
      { label: "Политика конфиденциальности", to: "/privacy" },
      { label: "Условия использования", to: "/terms" },
    ],
  },
];

export function ContactFooterNew() {
  const { data } = useCms();
  const contact = data.contact;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedType, setSelectedType] = useState(TOPICS[0]);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "", consent: false });
  const [sent, setSent] = useState("");
  const [formError, setFormError] = useState("");

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
                  {TOPICS.map((label) => (
                  <button key={label} type="button" onClick={() => setSelectedType(label)}
                    style={{ background: selectedType === label ? "rgba(201,162,75,0.1)" : "#111111", border: selectedType === label ? "1px solid rgba(201,162,75,0.45)" : "1px solid rgba(255,255,255,0.07)", color: selectedType === label ? "#FFFFFF" : "#9A9A9A", fontSize: 13, fontWeight: selectedType === label ? 600 : 400, padding: "13px 18px", textAlign: "left", cursor: "pointer", fontFamily: "Manrope, sans-serif" }}>
                    {label}
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
                ].filter((item) => item.value.trim()).map((item) => (
                  <div key={item.label} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 16, padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>{item.label.toUpperCase()}</span>
                    <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 400, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</span>
                  </div>
                ))}
                {!contact.phone && !contact.email && !contact.address && (
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    Официальные телефон, email и адрес публикуются после утверждённого списка контактов. Пока обращение идёт через форму.
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
              {sent ? (
                <div style={{ background: "#111111", border: "1px solid rgba(201,162,75,0.3)", padding: "56px 36px", textAlign: "center" }}>
                  <div style={{ color: "#C9A24B", fontSize: 32, marginBottom: 18 }}>✦</div>
                  <div style={{ color: "#FFFFFF", fontSize: 19, fontWeight: 700, marginBottom: 12 }}>Заявка сохранена</div>
                  <p style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.7 }}>{sent}</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setFormError("");
                  const result = await submitLead({
                    form: "contact",
                    name: form.name,
                    company: form.company,
                    phone: form.phone,
                    email: form.email,
                    topic: selectedType,
                    message: form.message,
                    consent: form.consent ? "yes" : "",
                  });
                  if (!result.ok) {
                    setFormError(result.message);
                    return;
                  }
                  setSent("Обращение записано и будет передано ответственному подразделению.");
                }}>
                  <input name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden />
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {[
                      { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                      { key: "company", label: "Компания", placeholder: "Название компании", type: "text" },
                      { key: "phone", label: "Телефон", placeholder: "+998 …", type: "tel" },
                      { key: "email", label: "Email", placeholder: "name@company.com", type: "email" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 8 }}>{field.label.toUpperCase()}</label>
                        <input required={field.key === "name"} type={field.type} placeholder={field.placeholder}
                          value={form[field.key as "name"]}
                          onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                          style={{ width: "100%", background: "#111111", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: 14, padding: "12px 16px", outline: "none", fontFamily: "Manrope, sans-serif", boxSizing: "border-box" }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 8 }}>СООБЩЕНИЕ</label>
                      <textarea required placeholder="Опишите обращение" rows={4} value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        style={{ width: "100%", background: "#111111", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: 14, padding: "12px 16px", outline: "none", fontFamily: "Manrope, sans-serif", resize: "vertical", boxSizing: "border-box" }}
                      />
                    </div>
                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5 }}>
                      <input type="checkbox" checked={form.consent} onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))} required />
                      <span>Согласен на обработку данных согласно <Link to="/privacy" style={{ color: "#C9A24B" }}>политике конфиденциальности</Link>.</span>
                    </label>
                    {formError && <p style={{ color: "#E8A0A0", fontSize: 13, margin: 0 }}>{formError}</p>}
                    <button type="submit" style={{ background: "#C9A24B", border: "none", color: "#0A0A0A", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", padding: "15px 30px", cursor: "pointer", fontFamily: "Manrope, sans-serif", alignSelf: "flex-start" }}>
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
            <div className="ng-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
              {FOOTER_COLS.map((col) => (
                <div key={col.title}>
                  <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 16 }}>{col.title.toUpperCase()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map((link) => (
                        <Link
                          key={link.label}
                          to={link.to}
                          style={{ color: "rgba(255,255,255,0.78)", textDecoration: "none", fontSize: 14, fontWeight: 400, lineHeight: 1.5, transition: "color 0.25s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24B")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
                        >
                          {link.label}
                        </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ng-stack ng-stack-center ng-footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{contact.copyright}</div>
            <div style={{ display: "flex", gap: 22 }}>
              <Link to="/privacy" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>Политика конфиденциальности</Link>
              <Link to="/terms" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>Условия использования</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
