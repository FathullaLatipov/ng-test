import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import { CareersSection } from "../components/CareersSection";
import {
  SectionDivider,
  QuoteBand,
  MegaStats,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const DEPARTMENTS = [
  { title: "Продажи и торговля", desc: "Работа с ключевыми клиентами, оптовыми каналами и развитием портфеля." },
  { title: "Дистрибуция и логистика", desc: "Региональные поставки, складские процессы, координация маршрутов." },
  { title: "Импорт и закупки", desc: "Международные поставщики, контракты, таможенное и операционное сопровождение." },
  { title: "HoReCa", desc: "Снабжение ресторанов, отелей и профессиональных клиентов." },
  { title: "Маркетинг брендов", desc: "Продвижение категорий, вывод брендов и поддержка присутствия на полке." },
  { title: "Операции и администрирование", desc: "Внутренние процессы, которые держат группу системной и управляемой." },
];

export function CareersPage() {
  const deptRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const deptInView = useInView(deptRef, { once: true, margin: "-80px" });
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    city: "",
    experience: "",
    message: "",
  });

  return (
    <PageLayout>
      <PageHero
        eyebrow="КАРЬЕРА"
        title="Растите профессионально"
        titleAccent="вместе с группой."
        subtitle="Мы создаём возможности для специалистов в продажах, логистике, закупках, дистрибуции и управлении — с реальной ответственностью и долгосрочной перспективой."
        crumbs={[{ label: "Карьера" }]}
        visual="careers"
      />

      <CareersSection />

      <MegaStats
        items={[
          { n: "6", l: "Направлений развития" },
          { n: "14+", l: "Лет стабильного бизнеса" },
          { n: "4", l: "Открытых вакансий" },
          { n: "1", l: "Команда роста" },
        ]}
      />

      <section
        ref={deptRef}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={deptInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>НАПРАВЛЕНИЯ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={deptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48, maxWidth: 640 }}
          >
            Где можно расти
            <br /><span style={{ color: "#C9A24B" }}>внутри Nobel Group.</span>
          </motion.h2>

          <div className="ng-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {DEPARTMENTS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                animate={deptInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06 }}
                style={{
                  background: "var(--ng-elevated)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "26px 24px",
                  minHeight: 160,
                }}
              >
                <div style={{ width: 24, height: 2, background: "#D5A251", marginBottom: 16 }} />
                <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{d.title}</div>
                <p style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider mark="node" />

      <section
        ref={formRef}
        id="resume"
        className="ng-sec-pad"
        style={{ background: "var(--ng-void)", padding: "100px 80px", position: "relative", overflow: "hidden" }}
      >
        <LogisticsMesh opacity={0.07} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ОТКЛИК</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}
          >
            Отправить резюме
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}
          >
            Заполните форму — HR или ответственный менеджер свяжется с вами при появлении подходящей возможности.
          </motion.p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "var(--ng-elevated)",
                border: "1px solid rgba(201,162,75,0.3)",
                padding: "56px 36px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#C9A24B", fontSize: 28, marginBottom: 16 }}>✦</div>
              <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Резюме получено</div>
              <p style={{ color: "var(--ng-muted-dark)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Спасибо за интерес к Nobel Group. Мы свяжемся с вами, когда появится подходящая вакансия.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
            >
              {[
                { key: "name", label: "ФИО", placeholder: "Ваше имя", full: false },
                { key: "phone", label: "Телефон", placeholder: "+998 xx xxx xx xx", full: false },
                { key: "email", label: "Email", placeholder: "your@email.com", full: false },
                { key: "city", label: "Город / регион", placeholder: "Ташкент", full: false },
                { key: "role", label: "Вакансия / направление", placeholder: "Например: логистика", full: true },
                { key: "experience", label: "Опыт работы", placeholder: "Кратко о опыте", full: true },
              ].map((field) => (
                <div key={field.key} style={{ gridColumn: field.full ? "1 / -1" : "auto" }}>
                  <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 8 }}>
                    {field.label.toUpperCase()}
                  </label>
                  <input
                    required={field.key === "name" || field.key === "email"}
                    type={field.key === "email" ? "email" : "text"}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    style={{
                      width: "100%",
                      background: "#111111",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#FFFFFF",
                      fontSize: 14,
                      padding: "12px 16px",
                      outline: "none",
                      fontFamily: "Manrope, sans-serif",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", marginBottom: 8 }}>
                  КОММЕНТАРИЙ
                </label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о себе или прикрепите ссылку на резюме..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  style={{
                    width: "100%",
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                    fontSize: 14,
                    padding: "12px 16px",
                    outline: "none",
                    fontFamily: "Manrope, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button
                  type="submit"
                  style={{
                    background: "#C9A24B",
                    border: "none",
                    color: "#0A0A0A",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    padding: "15px 30px",
                    cursor: "pointer",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  ОТПРАВИТЬ РЕЗЮМЕ →
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      <QuoteBand
        quote="Успех компании начинается с сильной команды. Мы даём ответственность, рост и стабильную платформу для развития."
        author="Nobel Group"
        role="Карьера"
      />

      <SectionDivider mark="diamond" />
    </PageLayout>
  );
}
