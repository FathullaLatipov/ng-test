import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import { GoldCheck } from "./BrandIcons";
import { LogisticsMesh, IbmGrid } from "./BrandDecor";

const AUDIENCE = [
  {
    id: "producers",
    label: "Производителям",
    subtitle: "Выход на рынок Узбекистана",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    desc: "Импорт, дистрибуция, таможенное сопровождение и локальное продвижение вашей продукции.",
    benefits: ["Прямой выход на рынок", "Региональная сеть продаж", "Управление категорией"],
  },
  {
    id: "retail",
    label: "Торговым сетям",
    subtitle: "Стабильные поставки",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
    desc: "Мультикатегорийный портфель, надёжный график поставок и поддержка на полке.",
    benefits: ["Широкий ассортимент", "Стабильное наличие", "Работа с ключевыми сетями"],
  },
  {
    id: "distributors",
    label: "Дистрибьюторам",
    subtitle: "Оптовое партнёрство",
    img: "https://images.unsplash.com/photo-1578574577315-52f121f77a3f?auto=format&fit=crop&w=1000&q=80",
    desc: "Доступ к портфелю продуктов питания через одного надёжного оптового партнёра.",
    benefits: ["Конкурентные условия", "Выделенный менеджер", "Региональная поддержка"],
  },
  {
    id: "horeca",
    label: "HoReCa",
    subtitle: "Рестораны, отели, кафе",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80",
    desc: "Специализированный ассортимент и гибкие поставки для профессионального сегмента.",
    benefits: ["Ассортимент для HoReCa", "Гибкий минимальный заказ", "Приоритетная доставка"],
  },
  {
    id: "investors",
    label: "Инвесторам",
    subtitle: "Стратегический рост",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    desc: "Инвестиционные проекты в производство, инфраструктуру и расширение FMCG-платформы.",
    benefits: ["Производственные проекты", "Складская инфраструктура", "Региональное масштабирование"],
  },
];

const COOP_TYPES = [
  "Производитель / поставщик",
  "Торговая сеть",
  "Дистрибьютор",
  "HoReCa",
  "Инвестор",
  "Другое",
];

function AudienceCard({ aud, index, inView }: { aud: (typeof AUDIENCE)[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.65 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ng-card-compact"
      style={{
        background: "var(--ng-elevated)",
        border: hovered ? "1px solid rgba(213,162,81,0.45)" : "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-5px)" : "none",
      }}
    >
      <div className="ng-card-photo" style={{ height: 160, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${aud.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: hovered ? "brightness(0.7)" : "brightness(0.55)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.5s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, rgba(18,17,15,0.95) 100%)" }} />
        <div className="ng-card-photo-caption" style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
          <div className="ng-card-compact-tagline" style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", marginBottom: 4 }}>
            {aud.subtitle.toUpperCase()}
          </div>
          <div className="ng-card-compact-title" style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800 }}>{aud.label}</div>
        </div>
      </div>
      <div style={{ padding: "20px 18px 22px" }}>
        <p className="ng-card-compact-desc" style={{ color: "var(--ng-muted-dark)", fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{aud.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {aud.benefits.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GoldCheck size={13} />
              <span className="ng-card-compact-benefit" style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PartnerForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    type: COOP_TYPES[0],
    contact: "",
    message: "",
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "rgba(18,17,15,0.85)",
          border: "1px solid rgba(201,162,75,0.35)",
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ color: "#C9A24B", fontSize: 26, marginBottom: 14 }}>✦</div>
        <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Заявка отправлена</div>
        <p style={{ color: "var(--ng-muted-dark)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней.
        </p>
      </motion.div>
    );
  }

  const fieldStyle: CSSProperties = {
    width: "100%",
    background: "#111111",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#FFFFFF",
    fontSize: 14,
    padding: "12px 14px",
    outline: "none",
    fontFamily: "Manrope, sans-serif",
    boxSizing: "border-box",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    color: "#9A9A9A",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    marginBottom: 8,
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      className="ng-grid-2"
    >
      {[
        { key: "name", label: "Имя", placeholder: "Ваше имя", full: false },
        { key: "company", label: "Компания", placeholder: "Название компании", full: false },
        { key: "country", label: "Страна", placeholder: "Узбекистан", full: false },
        { key: "contact", label: "Телефон / Email", placeholder: "+998 … или email", full: false },
      ].map((f) => (
        <div key={f.key}>
          <label style={labelStyle}>{f.label.toUpperCase()}</label>
          <input
            required
            value={form[f.key as keyof typeof form]}
            placeholder={f.placeholder}
            onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
            style={fieldStyle}
          />
        </div>
      ))}
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>ТИП СОТРУДНИЧЕСТВА</label>
        <select
          value={form.type}
          onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
          style={{ ...fieldStyle, cursor: "pointer" }}
        >
          {COOP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>СООБЩЕНИЕ</label>
        <textarea
          required
          rows={4}
          placeholder="Кратко опишите предложение о сотрудничестве"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button
          type="submit"
          className="ng-cta-btn"
          style={{
            background: "linear-gradient(0deg, #D5A251, #2F2512 160%)",
            border: "none",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "16px 28px",
            cursor: "pointer",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          ОТПРАВИТЬ ЗАЯВКУ →
        </button>
      </div>
    </form>
  );
}

export function PartnershipSection({ showForm = true }: { showForm?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="partnership" style={{ background: "var(--ng-void)", padding: "110px 0 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.25) 50%, transparent)" }} />
      <div className="ng-side-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 70px" }} ref={ref}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
            <span style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>ПАРТНЁРАМ</span>
            <div style={{ width: 24, height: 1, background: "var(--ng-gold)" }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}
          >
            Сценарии сотрудничества
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            style={{ color: "var(--ng-muted-dark)", fontSize: 15, fontWeight: 300, lineHeight: 1.75, maxWidth: 620, margin: "0 auto" }}
          >
            Отдельные модели для производителей, торговых сетей, дистрибьюторов, HoReCa и инвесторов.
          </motion.p>
        </div>

        <div className="ng-grid-3 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {AUDIENCE.slice(0, 3).map((aud, i) => (
            <AudienceCard key={aud.id} aud={aud} index={i} inView={inView} />
          ))}
        </div>
        <div className="ng-grid-2 ng-grid-cards2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16, maxWidth: 920, marginLeft: "auto", marginRight: "auto" }}>
          {AUDIENCE.slice(3).map((aud, i) => (
            <AudienceCard key={aud.id} aud={aud} index={i + 3} inView={inView} />
          ))}
        </div>
      </div>

      {showForm && (
        <div id="partner-form" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(115deg, #1C170F 0%, #2F2512 48%, #1C170F 100%)", scrollMarginTop: 90 }}>
          <IbmGrid opacity={0.025} />
          <LogisticsMesh opacity={0.08} />
          <div className="ng-side-pad" style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "72px 80px" }}>
            <div style={{ color: "var(--ng-gold)", fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", marginBottom: 14 }}>ОБСУДИТЬ СОТРУДНИЧЕСТВО</div>
            <h3 style={{ color: "#FFFFFF", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 12px" }}>
              Короткая заявка — быстрый ответ
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Заполните форму: имя, компания, страна, тип сотрудничества, контакты и сообщение.
            </p>
            <PartnerForm />
          </div>
        </div>
      )}
    </section>
  );
}
