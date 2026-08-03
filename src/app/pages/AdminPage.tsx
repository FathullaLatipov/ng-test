import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Home,
  Hash,
  Building2,
  Briefcase,
  Tags,
  Map,
  ShieldCheck,
  Handshake,
  Users,
  Contact,
  Layers,
  Factory,
  Newspaper,
  ExternalLink,
  LogOut,
  RotateCcw,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  ADMIN_PASSWORD,
  isAdminAuthed,
  loginAdmin,
  resetCms,
  setAdminAuthed,
  uid,
  useCms,
} from "../cms/store";
import type {
  AudienceItem,
  BrandItem,
  CmsData,
  CompanyBgKind,
  CompanyItem,
  DirectionItem,
  JobItem,
  NewsItem,
  StatItem,
  TextItem,
} from "../cms/types";
import nobelLogo from "../../assets/nobel-logo.png";

type Tab =
  | "dashboard"
  | "homeHero"
  | "keyStats"
  | "about"
  | "business"
  | "brands"
  | "geography"
  | "why"
  | "partnership"
  | "careers"
  | "contact"
  | "companies"
  | "companiesHero"
  | "news";

const TABS: { id: Tab; label: string; group: string; Icon: LucideIcon }[] = [
  { id: "dashboard", label: "Dashboard", group: "Обзор", Icon: LayoutDashboard },
  { id: "homeHero", label: "Главный экран", group: "Главная", Icon: Home },
  { id: "keyStats", label: "Цифры", group: "Главная", Icon: Hash },
  { id: "about", label: "О компании", group: "Главная", Icon: Building2 },
  { id: "business", label: "Направления", group: "Главная", Icon: Briefcase },
  { id: "brands", label: "Бренды", group: "Главная", Icon: Tags },
  { id: "geography", label: "География", group: "Главная", Icon: Map },
  { id: "why", label: "Почему мы", group: "Главная", Icon: ShieldCheck },
  { id: "partnership", label: "Партнёрам", group: "Главная", Icon: Handshake },
  { id: "careers", label: "Карьера", group: "Страницы", Icon: Users },
  { id: "contact", label: "Контакты / футер", group: "Страницы", Icon: Contact },
  { id: "news", label: "Новости", group: "Страницы", Icon: Newspaper },
  { id: "companiesHero", label: "Компании — вступление", group: "Холдинг", Icon: Layers },
  { id: "companies", label: "Компании группы", group: "Холдинг", Icon: Factory },
];

const BG_OPTIONS: { value: CompanyBgKind; label: string }[] = [
  { value: "oil", label: "Анимация: масло" },
  { value: "palm", label: "Анимация: пальмы" },
  { value: "milk", label: "Анимация: молоко" },
  { value: "syrup", label: "Анимация: патока" },
  { value: "video", label: "Видео (URL)" },
  { value: "image", label: "Фото (URL)" },
];

const field: CSSProperties = {
  width: "100%",
  background: "var(--admin-input, #FFFFFF)",
  border: "1px solid var(--admin-border, #E5E0D8)",
  color: "var(--admin-text, #1A1814)",
  padding: "11px 13px",
  fontSize: 13,
  fontFamily: "Manrope, sans-serif",
  boxSizing: "border-box",
  borderRadius: 8,
};

const labelCss: CSSProperties = {
  display: "block",
  color: "var(--admin-muted, #6B6760)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  marginBottom: 6,
};

function Field({
  lab,
  value,
  onChange,
  multiline,
  rows = 3,
}: {
  lab: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label style={labelCss}>{lab.toUpperCase()}</label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...field, resize: "vertical" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={field} />
      )}
    </div>
  );
}

function Card({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--admin-card)",
        border: "1px solid var(--admin-border)",
        borderRadius: 14,
        padding: 22,
        marginBottom: 14,
        boxShadow: "var(--admin-shadow)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--admin-text)" }}>{title}</h3>
        {actions}
      </div>
      <div style={{ display: "grid", gap: 12 }}>{children}</div>
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#C9A24B",
        border: "none",
        color: "#1A1814",
        padding: "10px 16px",
        fontWeight: 700,
        cursor: "pointer",
        fontSize: 12,
        borderRadius: 8,
      }}
    >
      Сохранить
    </button>
  );
}

function DangerBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#FFF5F5",
        border: "1px solid #F0C4C4",
        color: "#C0392B",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: 12,
        borderRadius: 8,
      }}
    >
      {children}
    </button>
  );
}

function LoginGate({ onOk }: { onOk: () => void }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #F7F4EF 0%, #FFFFFF 45%, #F3EEE6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setErr("");
          const ok = await loginAdmin(pass);
          setBusy(false);
          if (ok) onOk();
          else setErr("Неверный пароль");
        }}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#FFFFFF",
          border: "1px solid #EDE8E0",
          borderRadius: 18,
          padding: 36,
          boxShadow: "0 20px 50px rgba(26,24,20,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <img src={nobelLogo} alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
          <div>
            <div style={{ color: "#8A6A2F", fontSize: 11, letterSpacing: "0.18em", fontWeight: 700 }}>NOBEL GROUP</div>
            <div style={{ color: "#1A1814", fontSize: 20, fontWeight: 800 }}>Admin Dashboard</div>
          </div>
        </div>
        <p style={{ color: "#6B6760", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          Войдите, чтобы управлять контентом сайта. Изменения сохраняются на сервер.
        </p>
        <label style={labelCss}>ПАРОЛЬ</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} style={{ ...field, marginBottom: 12 }} autoFocus />
        {err && <div style={{ color: "#C0392B", fontSize: 12, marginBottom: 12 }}>{err}</div>}
        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            background: "#C9A24B",
            border: "none",
            color: "#1A1814",
            fontWeight: 700,
            padding: "13px 16px",
            cursor: busy ? "wait" : "pointer",
            borderRadius: 10,
            fontSize: 14,
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? "ВХОД…" : "ВОЙТИ"}
        </button>
        <div style={{ marginTop: 16, fontSize: 12, color: "#8A8580" }}>
          Демо-пароль: <code style={{ color: "#8A6A2F", background: "#F7F1E6", padding: "2px 6px", borderRadius: 4 }}>{ADMIN_PASSWORD}</code>
        </div>
      </form>
    </div>
  );
}

function DashboardHome({
  data,
  onOpen,
}: {
  data: CmsData;
  onOpen: (tab: Tab) => void;
}) {
  const stats = useMemo(() => {
    const publishedCompanies = data.companies.filter((c) => c.published).length;
    const publishedNews = data.news.filter((n) => n.published).length;
    const publishedDirs = data.business.directions.filter((d) => d.published).length;
    const openJobs = data.careers.roles.filter((r) => r.published).length;
    return [
      { label: "Компании холдинга", value: publishedCompanies, hint: `из ${data.companies.length}`, tab: "companies" as Tab, Icon: Factory },
      { label: "Новости", value: publishedNews, hint: `из ${data.news.length}`, tab: "news" as Tab, Icon: Newspaper },
      { label: "Направления", value: publishedDirs, hint: `из ${data.business.directions.length}`, tab: "business" as Tab, Icon: Briefcase },
      { label: "Вакансии", value: openJobs, hint: `из ${data.careers.roles.length}`, tab: "careers" as Tab, Icon: Users },
      { label: "Цифры на главной", value: data.keyStats.items.length, hint: "метрик", tab: "keyStats" as Tab, Icon: Hash },
      { label: "Бренды", value: data.brands.own.length + data.brands.exclusive.length + data.brands.distributed.length, hint: "в портфеле", tab: "brands" as Tab, Icon: Tags },
    ];
  }, [data]);

  const updated = data.updatedAt ? new Date(data.updatedAt).toLocaleString("ru-RU") : "—";

  return (
    <div>
      <div
        style={{
          background: "var(--admin-card)",
          border: "1px solid var(--admin-border)",
          borderRadius: 16,
          padding: "28px 28px",
          marginBottom: 20,
        }}
      >
        <div style={{ color: "var(--admin-accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>ОБЗОР</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 28, color: "var(--admin-text)", fontWeight: 800 }}>Добро пожаловать в панель управления</h2>
        <p style={{ margin: 0, color: "var(--admin-muted)", fontSize: 14, lineHeight: 1.65 }}>
          Управляйте контентом всего сайта Nobel Group. Последнее сохранение: <strong style={{ color: "var(--admin-text)" }}>{updated}</strong>
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 22 }} className="ng-admin-stats">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onOpen(s.tab)}
            style={{
              textAlign: "left",
              background: "var(--admin-card)",
              border: "1px solid var(--admin-border)",
              borderRadius: 14,
              padding: "20px 18px",
              cursor: "pointer",
              boxShadow: "var(--admin-shadow)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--admin-accent-soft)",
                  color: "var(--admin-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <s.Icon size={20} strokeWidth={1.8} />
              </div>
              <span style={{ color: "var(--admin-muted)", fontSize: 11 }}>{s.hint}</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "var(--admin-text)", lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--admin-muted)", fontWeight: 600 }}>{s.label}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14 }} className="ng-admin-dash-grid">
        <Card title="Быстрые действия">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Главный экран", tab: "homeHero" as Tab, Icon: Home },
              { label: "Компании группы", tab: "companies" as Tab, Icon: Factory },
              { label: "Новости", tab: "news" as Tab, Icon: Newspaper },
              { label: "Партнёрам", tab: "partnership" as Tab, Icon: Handshake },
            ].map((a) => (
              <button
                key={a.tab}
                onClick={() => onOpen(a.tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--admin-accent-soft)",
                  border: "1px solid var(--admin-border)",
                  borderRadius: 10,
                  padding: "14px 14px",
                  cursor: "pointer",
                  color: "var(--admin-text)",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                <a.Icon size={18} color="var(--admin-accent)" strokeWidth={1.8} />
                {a.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Статус контента">
          {[
            { ok: data.companies.filter((c) => c.published).length > 0, text: "Компании опубликованы" },
            { ok: data.news.filter((n) => n.published).length > 0, text: "Есть активные новости" },
            { ok: !!data.homeHero.titleAccent, text: "Hero заполнен" },
            { ok: data.contact.email.includes("@"), text: "Контакты указаны" },
          ].map((row) => (
            <div key={row.text} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--admin-text)", fontSize: 13 }}>
              <CheckCircle2 size={16} color={row.ok ? "#2E8B57" : "#C9A24B"} />
              {row.text}
            </div>
          ))}
          <Link
            to="/"
            target="_blank"
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--admin-accent)",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            <Eye size={16} /> Открыть сайт
          </Link>
        </Card>
      </div>
    </div>
  );
}

type AdminTheme = "white" | "brown";

const THEME = {
  white: {
    pageBg: "#F7F4EF",
    sidebarBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    text: "#1A1814",
    muted: "#6B6760",
    border: "#EDE8E0",
    accent: "#8A6A2F",
    accentSoft: "#F7F1E6",
    accentBorder: "#E8D7B0",
    navActiveBg: "#F7F1E6",
    navActiveText: "#8A6A2F",
    navText: "#4A4640",
  },
  brown: {
    pageBg: "#2A2118",
    sidebarBg: "#34281E",
    cardBg: "#3D3125",
    text: "#F5EFE6",
    muted: "#C4B6A4",
    border: "rgba(201,162,75,0.22)",
    accent: "#C9A24B",
    accentSoft: "rgba(201,162,75,0.14)",
    accentBorder: "rgba(201,162,75,0.4)",
    navActiveBg: "rgba(201,162,75,0.16)",
    navActiveText: "#C9A24B",
    navText: "#D8CFC2",
  },
} as const;

export function AdminPage() {
  const [authed, setAuthed] = useState(() => (typeof window !== "undefined" ? isAdminAuthed() : false));
  const { data, update, patch, persist, saving, error, storage, loading } = useCms();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [flash, setFlash] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState<string | null>(data.companies[0]?.id ?? null);
  const [theme, setTheme] = useState<AdminTheme>(() => {
    if (typeof window === "undefined") return "white";
    return (localStorage.getItem("nobel-admin-theme") as AdminTheme) || "white";
  });
  const t = THEME[theme];

  if (!authed) return <LoginGate onOk={() => setAuthed(true)} />;

  const flashOk = () => {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1400);
  };

  const saved = async () => {
    try {
      await persist();
      flashOk();
    } catch {
      /* error shown from store */
    }
  };

  const saveSection = async <K extends keyof CmsData>(key: K, value: CmsData[K]) => {
    patch(key, value);
    await saved();
  };

  const switchTheme = (next: AdminTheme) => {
    setTheme(next);
    localStorage.setItem("nobel-admin-theme", next);
  };

  const groups = Array.from(new Set(TABS.map((t) => t.group)));
  const activeTab = TABS.find((x) => x.id === tab);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.pageBg,
        color: t.text,
        fontFamily: "Manrope, sans-serif",
        display: "grid",
        gridTemplateColumns: "272px 1fr",
        ["--admin-page" as string]: t.pageBg,
        ["--admin-sidebar" as string]: t.sidebarBg,
        ["--admin-card" as string]: t.cardBg,
        ["--admin-input" as string]: theme === "white" ? "#FFFFFF" : "#2F241B",
        ["--admin-text" as string]: t.text,
        ["--admin-muted" as string]: t.muted,
        ["--admin-border" as string]: t.border,
        ["--admin-accent" as string]: t.accent,
        ["--admin-accent-soft" as string]: t.accentSoft,
        ["--admin-accent-border" as string]: t.accentBorder,
        ["--admin-shadow" as string]: theme === "white" ? "0 1px 2px rgba(26,24,20,0.04)" : "none",
      }}
      className="ng-admin-layout"
      data-admin-theme={theme}
    >
      <aside
        style={{
          borderRight: `1px solid ${t.border}`,
          padding: "20px 14px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          background: t.sidebarBg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: "0 6px" }}>
          <img src={nobelLogo} alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <div>
            <div style={{ color: t.accent, fontSize: 10, letterSpacing: "0.16em", fontWeight: 700 }}>NOBEL GROUP</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Admin</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            marginBottom: 18,
            padding: 4,
            background: theme === "white" ? "#F3EEE6" : "rgba(0,0,0,0.2)",
            borderRadius: 10,
          }}
        >
          {(["white", "brown"] as const).map((key) => (
            <button
              key={key}
              onClick={() => switchTheme(key)}
              style={{
                border: "none",
                borderRadius: 8,
                padding: "8px 6px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                background: theme === key ? (key === "white" ? "#FFFFFF" : "#C9A24B") : "transparent",
                color: theme === key ? (key === "white" ? "#1A1814" : "#1A1814") : t.muted,
                boxShadow: theme === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {key === "white" ? "Белый" : "Коричн."}
            </button>
          ))}
        </div>

        {groups.map((g) => (
          <div key={g} style={{ marginBottom: 16 }}>
            <div style={{ color: t.muted, fontSize: 10, letterSpacing: "0.14em", marginBottom: 8, padding: "0 8px", fontWeight: 700, opacity: 0.85 }}>
              {g.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {TABS.filter((item) => item.group === g).map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    style={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: active ? t.navActiveBg : "transparent",
                      border: active ? `1px solid ${t.accentBorder}` : "1px solid transparent",
                      color: active ? t.navActiveText : t.navText,
                      padding: "10px 12px",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: active ? 700 : 500,
                      borderRadius: 10,
                    }}
                  >
                    <item.Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: t.muted,
              fontSize: 12,
              textDecoration: "none",
              padding: "8px 10px",
              fontWeight: 600,
            }}
          >
            <ExternalLink size={14} /> На сайт
          </Link>
          <button
            onClick={async () => {
              if (confirm("Сбросить весь контент на сервере?")) {
                try {
                  await update(resetCms());
                  flashOk();
                } catch {
                  /* shown below */
                }
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: `1px solid ${t.border}`,
              color: t.muted,
              padding: "9px 10px",
              cursor: "pointer",
              fontSize: 12,
              textAlign: "left",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            <RotateCcw size={14} /> Сброс к defaults
          </button>
          <button
            onClick={() => {
              setAdminAuthed(false);
              setAuthed(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#C9A24B",
              border: "none",
              color: "#1A1814",
              padding: "11px 12px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 10,
            }}
          >
            <LogOut size={14} /> Выйти
          </button>
        </div>
      </aside>

      <main style={{ padding: "24px 28px 80px", maxWidth: 1080 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "6px 10px",
              borderRadius: 999,
              background: t.accentSoft,
              color: t.accent,
              border: `1px solid ${t.accentBorder}`,
            }}
          >
            API · {storage === "redis" ? "Redis (Vercel)" : storage === "file" ? "Файл data/cms.json" : storage === "none" ? "Нет хранилища" : storage}
          </span>
          {loading && <span style={{ fontSize: 12, color: t.muted }}>Загрузка с сервера…</span>}
          {saving && <span style={{ fontSize: 12, color: t.accent }}>Сохранение…</span>}
          {flash && (
            <span style={{ color: "#2E8B57", fontSize: 12, fontWeight: 700, background: theme === "white" ? "#EAF7F0" : "rgba(46,139,87,0.18)", padding: "6px 10px", borderRadius: 8 }}>
              Сохранено на сервер ✓
            </span>
          )}
          {error && (
            <span style={{ color: "#C0392B", fontSize: 12, fontWeight: 600, background: theme === "white" ? "#FFF5F5" : "rgba(192,57,43,0.15)", padding: "6px 10px", borderRadius: 8 }}>
              {error}
            </span>
          )}
        </div>

        {tab !== "dashboard" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {activeTab && (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: t.accent,
                  }}
                >
                  <activeTab.Icon size={20} />
                </div>
              )}
              <h1 style={{ margin: 0, fontSize: 26, color: t.text }}>{activeTab?.label}</h1>
            </div>
          </div>
        )}

        {tab === "dashboard" && <DashboardHome data={data} onOpen={setTab} />}

        {tab === "homeHero" && (
          <Card title="Главный экран" actions={<SaveBtn onClick={() => saveSection("homeHero", data.homeHero)} />}>
            <Field lab="Badge" value={data.homeHero.badge} onChange={(v) => patch("homeHero", { ...data.homeHero, badge: v })} />
            <Field lab="Eyebrow" value={data.homeHero.eyebrow} onChange={(v) => patch("homeHero", { ...data.homeHero, eyebrow: v })} />
            <Field lab="Строка 1" value={data.homeHero.titleLine1} onChange={(v) => patch("homeHero", { ...data.homeHero, titleLine1: v })} />
            <Field lab="Акцент" value={data.homeHero.titleAccent} onChange={(v) => patch("homeHero", { ...data.homeHero, titleAccent: v })} />
            <Field lab="Строка 3" value={data.homeHero.titleLine3} onChange={(v) => patch("homeHero", { ...data.homeHero, titleLine3: v })} />
            <Field lab="Подзаголовок" value={data.homeHero.subtitle} onChange={(v) => patch("homeHero", { ...data.homeHero, subtitle: v })} multiline />
            <Field lab="Описание" value={data.homeHero.body} onChange={(v) => patch("homeHero", { ...data.homeHero, body: v })} multiline rows={4} />
            <Field lab="Фото URL" value={data.homeHero.photoUrl} onChange={(v) => patch("homeHero", { ...data.homeHero, photoUrl: v })} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field lab="CTA 1 текст" value={data.homeHero.ctaPrimary} onChange={(v) => patch("homeHero", { ...data.homeHero, ctaPrimary: v })} />
              <Field lab="CTA 1 ссылка" value={data.homeHero.ctaPrimaryTo} onChange={(v) => patch("homeHero", { ...data.homeHero, ctaPrimaryTo: v })} />
              <Field lab="CTA 2 текст" value={data.homeHero.ctaSecondary} onChange={(v) => patch("homeHero", { ...data.homeHero, ctaSecondary: v })} />
              <Field lab="CTA 2 ссылка" value={data.homeHero.ctaSecondaryTo} onChange={(v) => patch("homeHero", { ...data.homeHero, ctaSecondaryTo: v })} />
            </div>
          </Card>
        )}

        {tab === "keyStats" && (
          <>
            <Card title="Заголовок блока" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.keyStats.eyebrow} onChange={(v) => patch("keyStats", { ...data.keyStats, eyebrow: v })} />
              <Field lab="Title" value={data.keyStats.title} onChange={(v) => patch("keyStats", { ...data.keyStats, title: v })} />
              <Field lab="Accent" value={data.keyStats.titleAccent || ""} onChange={(v) => patch("keyStats", { ...data.keyStats, titleAccent: v })} />
            </Card>
            {data.keyStats.items.map((item, i) => (
              <Card
                key={item.id}
                title={`Цифра ${i + 1}`}
                actions={
                  <DangerBtn
                    onClick={() => {
                      patch("keyStats", { ...data.keyStats, items: data.keyStats.items.filter((x) => x.id !== item.id) });
                      saved();
                    }}
                  >
                    Удалить
                  </DangerBtn>
                }
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
                  <Field
                    lab="Значение"
                    value={item.n}
                    onChange={(v) => {
                      const items = data.keyStats.items.map((x) => (x.id === item.id ? { ...x, n: v } : x));
                      patch("keyStats", { ...data.keyStats, items });
                    }}
                  />
                  <Field
                    lab="Подпись"
                    value={item.l}
                    onChange={(v) => {
                      const items = data.keyStats.items.map((x) => (x.id === item.id ? { ...x, l: v } : x));
                      patch("keyStats", { ...data.keyStats, items });
                    }}
                  />
                </div>
              </Card>
            ))}
            <button
              onClick={() => {
                const item: StatItem = { id: uid("stat"), n: "0", l: "Новая метрика" };
                patch("keyStats", { ...data.keyStats, items: [...data.keyStats.items, item] });
                saved();
              }}
              style={{ background: "transparent", border: "1px solid rgba(201,162,75,0.4)", color: "#C9A24B", padding: "12px 16px", cursor: "pointer" }}
            >
              + Добавить цифру
            </button>
          </>
        )}

        {tab === "about" && (
          <Card title="О компании" actions={<SaveBtn onClick={saved} />}>
            <Field lab="Eyebrow" value={data.about.eyebrow} onChange={(v) => patch("about", { ...data.about, eyebrow: v })} />
            <Field lab="Title" value={data.about.title} onChange={(v) => patch("about", { ...data.about, title: v })} />
            <Field lab="Accent" value={data.about.titleAccent || ""} onChange={(v) => patch("about", { ...data.about, titleAccent: v })} />
            <Field lab="Абзац 1" value={data.about.body} onChange={(v) => patch("about", { ...data.about, body: v })} multiline />
            <Field lab="Абзац 2" value={data.about.body2} onChange={(v) => patch("about", { ...data.about, body2: v })} multiline />
            <Field
              lab="Возможности (каждая с новой строки)"
              value={data.about.capabilities.join("\n")}
              onChange={(v) => patch("about", { ...data.about, capabilities: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
              multiline
              rows={7}
            />
            <Field lab="Миссия — заголовок" value={data.about.missionTitle} onChange={(v) => patch("about", { ...data.about, missionTitle: v })} />
            <Field lab="Миссия — текст" value={data.about.missionBody} onChange={(v) => patch("about", { ...data.about, missionBody: v })} multiline />
            <Field lab="Ценности — заголовок" value={data.about.valuesTitle} onChange={(v) => patch("about", { ...data.about, valuesTitle: v })} />
            <Field
              lab="Ценности (через запятую)"
              value={data.about.values.join(", ")}
              onChange={(v) => patch("about", { ...data.about, values: v.split(",").map((s) => s.trim()).filter(Boolean) })}
            />
          </Card>
        )}

        {tab === "business" && (
          <>
            <Card title="Заголовок секции" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.business.eyebrow} onChange={(v) => patch("business", { ...data.business, eyebrow: v })} />
              <Field lab="Title" value={data.business.title} onChange={(v) => patch("business", { ...data.business, title: v })} />
              <Field lab="Accent" value={data.business.titleAccent || ""} onChange={(v) => patch("business", { ...data.business, titleAccent: v })} />
              <Field lab="Lead" value={data.business.lead || ""} onChange={(v) => patch("business", { ...data.business, lead: v })} multiline />
            </Card>
            {data.business.directions
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((d) => (
                <DirectionEditor
                  key={d.id}
                  item={d}
                  onSave={(item) => {
                    patch("business", {
                      ...data.business,
                      directions: data.business.directions.map((x) => (x.id === item.id ? item : x)),
                    });
                    saved();
                  }}
                  onDelete={() => {
                    if (!confirm("Удалить направление?")) return;
                    patch("business", {
                      ...data.business,
                      directions: data.business.directions.filter((x) => x.id !== d.id),
                    });
                    saved();
                  }}
                />
              ))}
            <button
              onClick={() => {
                const item: DirectionItem = {
                  id: uid("dir"),
                  number: String(data.business.directions.length + 1).padStart(2, "0"),
                  name: "Новое направление",
                  tagline: "",
                  desc: "",
                  img: "",
                  order: data.business.directions.length + 1,
                  published: true,
                };
                patch("business", { ...data.business, directions: [...data.business.directions, item] });
                saved();
              }}
              style={{ background: "transparent", border: "1px solid rgba(201,162,75,0.4)", color: "#C9A24B", padding: "12px 16px", cursor: "pointer" }}
            >
              + Направление
            </button>
          </>
        )}

        {tab === "brands" && (
          <>
            <Card title="Заголовок" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.brands.eyebrow} onChange={(v) => patch("brands", { ...data.brands, eyebrow: v })} />
              <Field lab="Title" value={data.brands.title} onChange={(v) => patch("brands", { ...data.brands, title: v })} />
              <Field lab="Accent" value={data.brands.titleAccent || ""} onChange={(v) => patch("brands", { ...data.brands, titleAccent: v })} />
              <Field lab="Lead" value={data.brands.lead || ""} onChange={(v) => patch("brands", { ...data.brands, lead: v })} multiline />
              <Field
                lab="Категории (через запятую)"
                value={data.brands.categories.join(", ")}
                onChange={(v) => patch("brands", { ...data.brands, categories: v.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            </Card>
            <BrandList
              title="Собственные бренды"
              items={data.brands.own}
              withDesc
              onChange={(own) => {
                patch("brands", { ...data.brands, own });
                saved();
              }}
            />
            <BrandList
              title="Эксклюзивные"
              items={data.brands.exclusive}
              onChange={(exclusive) => {
                patch("brands", { ...data.brands, exclusive });
                saved();
              }}
            />
            <BrandList
              title="Дистрибутируемые"
              items={data.brands.distributed}
              onChange={(distributed) => {
                patch("brands", { ...data.brands, distributed });
                saved();
              }}
            />
          </>
        )}

        {tab === "geography" && (
          <Card title="География" actions={<SaveBtn onClick={saved} />}>
            <Field lab="Eyebrow" value={data.geography.eyebrow} onChange={(v) => patch("geography", { ...data.geography, eyebrow: v })} />
            <Field lab="Title" value={data.geography.title} onChange={(v) => patch("geography", { ...data.geography, title: v })} />
            <Field lab="Accent" value={data.geography.titleAccent || ""} onChange={(v) => patch("geography", { ...data.geography, titleAccent: v })} />
            <Field lab="Lead" value={data.geography.lead || ""} onChange={(v) => patch("geography", { ...data.geography, lead: v })} multiline />
            {data.geography.rows.map((r) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field
                  lab="Метка"
                  value={r.label}
                  onChange={(v) =>
                    patch("geography", {
                      ...data.geography,
                      rows: data.geography.rows.map((x) => (x.id === r.id ? { ...x, label: v } : x)),
                    })
                  }
                />
                <Field
                  lab="Значение"
                  value={r.value}
                  onChange={(v) =>
                    patch("geography", {
                      ...data.geography,
                      rows: data.geography.rows.map((x) => (x.id === r.id ? { ...x, value: v } : x)),
                    })
                  }
                />
              </div>
            ))}
            <div style={{ color: "#C9A24B", fontSize: 12, fontWeight: 700, marginTop: 8 }}>ЗАВОДЫ</div>
            {data.geography.factories.map((f) => (
              <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field
                  lab="Страна"
                  value={f.country}
                  onChange={(v) =>
                    patch("geography", {
                      ...data.geography,
                      factories: data.geography.factories.map((x) => (x.id === f.id ? { ...x, country: v } : x)),
                    })
                  }
                />
                <Field
                  lab="Роль"
                  value={f.role}
                  onChange={(v) =>
                    patch("geography", {
                      ...data.geography,
                      factories: data.geography.factories.map((x) => (x.id === f.id ? { ...x, role: v } : x)),
                    })
                  }
                />
              </div>
            ))}
          </Card>
        )}

        {tab === "why" && (
          <>
            <Card title="Заголовок" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.why.eyebrow} onChange={(v) => patch("why", { ...data.why, eyebrow: v })} />
              <Field lab="Title" value={data.why.title} onChange={(v) => patch("why", { ...data.why, title: v })} />
              <Field lab="Accent" value={data.why.titleAccent || ""} onChange={(v) => patch("why", { ...data.why, titleAccent: v })} />
            </Card>
            {data.why.reasons.map((r) => (
              <Card
                key={r.id}
                title={r.title || "Причина"}
                actions={
                  <DangerBtn
                    onClick={() => {
                      patch("why", { ...data.why, reasons: data.why.reasons.filter((x) => x.id !== r.id) });
                      saved();
                    }}
                  >
                    Удалить
                  </DangerBtn>
                }
              >
                <Field
                  lab="Заголовок"
                  value={r.title}
                  onChange={(v) => patch("why", { ...data.why, reasons: data.why.reasons.map((x) => (x.id === r.id ? { ...x, title: v } : x)) })}
                />
                <Field
                  lab="Описание"
                  value={r.desc}
                  onChange={(v) => patch("why", { ...data.why, reasons: data.why.reasons.map((x) => (x.id === r.id ? { ...x, desc: v } : x)) })}
                  multiline
                />
              </Card>
            ))}
            <button
              onClick={() => {
                const item: TextItem = { id: uid("why"), title: "Новый пункт", desc: "" };
                patch("why", { ...data.why, reasons: [...data.why.reasons, item] });
                saved();
              }}
              style={{ background: "transparent", border: "1px solid rgba(201,162,75,0.4)", color: "#C9A24B", padding: "12px 16px", cursor: "pointer" }}
            >
              + Пункт
            </button>
          </>
        )}

        {tab === "partnership" && (
          <>
            <Card title="Заголовок и форма" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.partnership.eyebrow} onChange={(v) => patch("partnership", { ...data.partnership, eyebrow: v })} />
              <Field lab="Title" value={data.partnership.title} onChange={(v) => patch("partnership", { ...data.partnership, title: v })} />
              <Field lab="Lead" value={data.partnership.lead || ""} onChange={(v) => patch("partnership", { ...data.partnership, lead: v })} multiline />
              <Field lab="Форма — eyebrow" value={data.partnership.formEyebrow} onChange={(v) => patch("partnership", { ...data.partnership, formEyebrow: v })} />
              <Field lab="Форма — title" value={data.partnership.formTitle} onChange={(v) => patch("partnership", { ...data.partnership, formTitle: v })} />
              <Field lab="Форма — lead" value={data.partnership.formLead} onChange={(v) => patch("partnership", { ...data.partnership, formLead: v })} multiline />
              <Field
                lab="Типы сотрудничества (через запятую)"
                value={data.partnership.coopTypes.join(", ")}
                onChange={(v) =>
                  patch("partnership", {
                    ...data.partnership,
                    coopTypes: v.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </Card>
            {data.partnership.audiences.map((a) => (
              <AudienceEditor
                key={a.id}
                item={a}
                onSave={(item) => {
                  patch("partnership", {
                    ...data.partnership,
                    audiences: data.partnership.audiences.map((x) => (x.id === item.id ? item : x)),
                  });
                  saved();
                }}
                onDelete={() => {
                  patch("partnership", {
                    ...data.partnership,
                    audiences: data.partnership.audiences.filter((x) => x.id !== a.id),
                  });
                  saved();
                }}
              />
            ))}
          </>
        )}

        {tab === "careers" && (
          <>
            <Card title="Карьера — тексты" actions={<SaveBtn onClick={saved} />}>
              <Field lab="Eyebrow" value={data.careers.eyebrow} onChange={(v) => patch("careers", { ...data.careers, eyebrow: v })} />
              <Field lab="Title" value={data.careers.title} onChange={(v) => patch("careers", { ...data.careers, title: v })} />
              <Field lab="Accent" value={data.careers.titleAccent || ""} onChange={(v) => patch("careers", { ...data.careers, titleAccent: v })} />
              <Field lab="Lead" value={data.careers.lead || ""} onChange={(v) => patch("careers", { ...data.careers, lead: v })} multiline />
              <Field lab="Заголовок вакансий" value={data.careers.rolesHeading} onChange={(v) => patch("careers", { ...data.careers, rolesHeading: v })} />
              <Field lab="Фото команды URL" value={data.careers.teamImage} onChange={(v) => patch("careers", { ...data.careers, teamImage: v })} />
              <Field lab="Подпись фото" value={data.careers.teamCaption} onChange={(v) => patch("careers", { ...data.careers, teamCaption: v })} />
            </Card>
            {data.careers.values.map((v) => (
              <Card key={v.id} title={v.title}>
                <Field lab="Title" value={v.title} onChange={(val) => patch("careers", { ...data.careers, values: data.careers.values.map((x) => (x.id === v.id ? { ...x, title: val } : x)) })} />
                <Field lab="Desc" value={v.desc} onChange={(val) => patch("careers", { ...data.careers, values: data.careers.values.map((x) => (x.id === v.id ? { ...x, desc: val } : x)) })} multiline />
              </Card>
            ))}
            {data.careers.roles.map((r) => (
              <JobEditor
                key={r.id}
                item={r}
                onSave={(item) => {
                  patch("careers", { ...data.careers, roles: data.careers.roles.map((x) => (x.id === item.id ? item : x)) });
                  saved();
                }}
                onDelete={() => {
                  patch("careers", { ...data.careers, roles: data.careers.roles.filter((x) => x.id !== r.id) });
                  saved();
                }}
              />
            ))}
            <button
              onClick={() => {
                const item: JobItem = {
                  id: uid("job"),
                  title: "Новая вакансия",
                  dept: "",
                  type: "Полная занятость",
                  location: "Ташкент",
                  order: data.careers.roles.length + 1,
                  published: true,
                };
                patch("careers", { ...data.careers, roles: [...data.careers.roles, item] });
                saved();
              }}
              style={{ background: "transparent", border: "1px solid rgba(201,162,75,0.4)", color: "#C9A24B", padding: "12px 16px", cursor: "pointer" }}
            >
              + Вакансия
            </button>
          </>
        )}

        {tab === "contact" && (
          <Card title="Контакты и футер" actions={<SaveBtn onClick={saved} />}>
            <Field lab="Eyebrow" value={data.contact.eyebrow} onChange={(v) => patch("contact", { ...data.contact, eyebrow: v })} />
            <Field lab="Title" value={data.contact.title} onChange={(v) => patch("contact", { ...data.contact, title: v })} />
            <Field lab="Accent" value={data.contact.titleAccent || ""} onChange={(v) => patch("contact", { ...data.contact, titleAccent: v })} />
            <Field lab="Адрес" value={data.contact.address} onChange={(v) => patch("contact", { ...data.contact, address: v })} multiline />
            <Field lab="Телефон" value={data.contact.phone} onChange={(v) => patch("contact", { ...data.contact, phone: v })} />
            <Field lab="Email" value={data.contact.email} onChange={(v) => patch("contact", { ...data.contact, email: v })} />
            <Field lab="Часы работы" value={data.contact.hours} onChange={(v) => patch("contact", { ...data.contact, hours: v })} />
            <Field lab="Текст в футере" value={data.contact.footerBlurb} onChange={(v) => patch("contact", { ...data.contact, footerBlurb: v })} multiline />
            <Field lab="Copyright" value={data.contact.copyright} onChange={(v) => patch("contact", { ...data.contact, copyright: v })} />
          </Card>
        )}

        {tab === "companiesHero" && (
          <Card title="Вступление страницы компаний" actions={<SaveBtn onClick={saved} />}>
            <Field lab="Eyebrow" value={data.companiesHero.eyebrow} onChange={(v) => patch("companiesHero", { ...data.companiesHero, eyebrow: v })} />
            <Field lab="Title" value={data.companiesHero.title} onChange={(v) => patch("companiesHero", { ...data.companiesHero, title: v })} />
            <Field lab="Accent" value={data.companiesHero.titleAccent || ""} onChange={(v) => patch("companiesHero", { ...data.companiesHero, titleAccent: v })} />
            <Field lab="Lead" value={data.companiesHero.lead || ""} onChange={(v) => patch("companiesHero", { ...data.companiesHero, lead: v })} multiline rows={5} />
          </Card>
        )}

        {tab === "companies" && (
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }} className="ng-admin-split">
            <div style={{ background: "#FFFFFF", border: "1px solid #EDE8E0", borderRadius: 14, padding: 12 }}>
              <button
                onClick={() => {
                  const item: CompanyItem = {
                    id: uid("company"),
                    number: String(data.companies.length + 1).padStart(2, "0"),
                    name: "Новая компания",
                    description: "",
                    tags: [],
                    website: "",
                    websiteLabel: "Перейти на сайт",
                    bgKind: "oil",
                    gradientFrom: "#3a2a08",
                    gradientTo: "#8a5a12",
                    order: data.companies.length + 1,
                    published: true,
                  };
                  patch("companies", [...data.companies, item]);
                  setEditCompanyId(item.id);
                  saved();
                }}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  background: "#F7F1E6",
                  border: "1px solid #E8D7B0",
                  color: "#8A6A2F",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: 8,
                  fontWeight: 700,
                }}
              >
                + Компания
              </button>
              {data.companies
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setEditCompanyId(c.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      marginBottom: 6,
                      background: editCompanyId === c.id ? "#F7F1E6" : "transparent",
                      border: editCompanyId === c.id ? "1px solid #E8D7B0" : "1px solid #EDE8E0",
                      color: "#1A1814",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#8A8580" }}>{c.number}</div>
                  </button>
                ))}
            </div>
            <div>
              {(() => {
                const editing = data.companies.find((c) => c.id === editCompanyId);
                if (!editing) return <div style={{ color: "#8A8580" }}>Выберите компанию</div>;
                return (
                  <CompanyEditor
                    key={editing.id}
                    item={editing}
                    onSave={(item) => {
                      patch(
                        "companies",
                        data.companies.map((c) => (c.id === item.id ? item : c)),
                      );
                      saved();
                    }}
                    onDelete={() => {
                      if (!confirm("Удалить?")) return;
                      const next = data.companies.filter((c) => c.id !== editing.id);
                      patch("companies", next);
                      setEditCompanyId(next[0]?.id ?? null);
                      saved();
                    }}
                  />
                );
              })()}
            </div>
          </div>
        )}

        {tab === "news" && (
          <>
            <button
              onClick={() => {
                const item: NewsItem = {
                  id: uid("news"),
                  date: String(new Date().getFullYear()),
                  tag: "Группа",
                  title: "Новая новость",
                  description: "",
                  published: true,
                  order: data.news.length + 1,
                };
                patch("news", [...data.news, item]);
                saved();
              }}
              style={{
                marginBottom: 14,
                background: "#C9A24B",
                border: "none",
                color: "#1A1814",
                padding: "10px 14px",
                fontWeight: 700,
                cursor: "pointer",
                borderRadius: 8,
              }}
            >
              + Новость
            </button>
            {data.news
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((n) => (
                <NewsEditor
                  key={n.id}
                  item={n}
                  onSave={(item) => {
                    patch(
                      "news",
                      data.news.map((x) => (x.id === item.id ? item : x)),
                    );
                    saved();
                  }}
                  onDelete={() => {
                    patch(
                      "news",
                      data.news.filter((x) => x.id !== n.id),
                    );
                    saved();
                  }}
                />
              ))}
          </>
        )}

        <p style={{ marginTop: 28, color: "#A39E96", fontSize: 12, lineHeight: 1.6 }}>
          Кнопка «Сохранить» пишет контент на сервер. Локально — в <code>data/cms.json</code>, на Vercel — в Upstash Redis.
          После сохранения все посетители увидят обновления.
        </p>
      </main>

      <style>{`
        @media (max-width: 1100px) {
          .ng-admin-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .ng-admin-dash-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 960px) {
          .ng-admin-layout { grid-template-columns: 1fr !important; }
          .ng-admin-layout > aside { position: relative !important; height: auto !important; }
          .ng-admin-split { grid-template-columns: 1fr !important; }
          .ng-admin-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function DirectionEditor({
  item,
  onSave,
  onDelete,
}: {
  item: DirectionItem;
  onSave: (i: DirectionItem) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState(item);
  return (
    <Card title={d.name} actions={<DangerBtn onClick={onDelete}>Удалить</DangerBtn>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 10 }}>
        <Field lab="Название" value={d.name} onChange={(v) => setD({ ...d, name: v })} />
        <Field lab="№" value={d.number} onChange={(v) => setD({ ...d, number: v })} />
      </div>
      <Field lab="Tagline" value={d.tagline} onChange={(v) => setD({ ...d, tagline: v })} />
      <Field lab="Описание" value={d.desc} onChange={(v) => setD({ ...d, desc: v })} multiline />
      <Field lab="Фото URL" value={d.img} onChange={(v) => setD({ ...d, img: v })} />
      <label style={{ display: "flex", gap: 8, fontSize: 13, color: "#4A4640" }}>
        <input type="checkbox" checked={d.published} onChange={(e) => setD({ ...d, published: e.target.checked })} />
        Опубликовано
      </label>
      <SaveBtn onClick={() => onSave(d)} />
    </Card>
  );
}

function BrandList({
  title,
  items,
  withDesc,
  onChange,
}: {
  title: string;
  items: BrandItem[];
  withDesc?: boolean;
  onChange: (items: BrandItem[]) => void;
}) {
  return (
    <Card
      title={title}
      actions={
        <button
          onClick={() =>
            onChange([
              ...items,
              { id: uid("brand"), name: "Новый бренд", cat: "", desc: withDesc ? "" : undefined, order: items.length + 1 },
            ])
          }
          style={{ background: "transparent", border: "1px solid rgba(201,162,75,0.4)", color: "#C9A24B", padding: "6px 10px", cursor: "pointer", fontSize: 12 }}
        >
          +
        </button>
      }
    >
      {items.map((b) => (
        <div key={b.id} style={{ display: "grid", gridTemplateColumns: withDesc ? "1fr 1fr 1.2fr auto" : "1fr 1fr auto", gap: 8 }}>
          <input
            value={b.name}
            onChange={(e) => onChange(items.map((x) => (x.id === b.id ? { ...x, name: e.target.value } : x)))}
            style={field}
            placeholder="Название"
          />
          <input
            value={b.cat}
            onChange={(e) => onChange(items.map((x) => (x.id === b.id ? { ...x, cat: e.target.value } : x)))}
            style={field}
            placeholder="Категория"
          />
          {withDesc && (
            <input
              value={b.desc || ""}
              onChange={(e) => onChange(items.map((x) => (x.id === b.id ? { ...x, desc: e.target.value } : x)))}
              style={field}
              placeholder="Описание"
            />
          )}
          <DangerBtn onClick={() => onChange(items.filter((x) => x.id !== b.id))}>×</DangerBtn>
        </div>
      ))}
    </Card>
  );
}

function AudienceEditor({
  item,
  onSave,
  onDelete,
}: {
  item: AudienceItem;
  onSave: (i: AudienceItem) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState(item);
  return (
    <Card title={d.label} actions={<DangerBtn onClick={onDelete}>Удалить</DangerBtn>}>
      <Field lab="Название" value={d.label} onChange={(v) => setD({ ...d, label: v })} />
      <Field lab="Subtitle" value={d.subtitle} onChange={(v) => setD({ ...d, subtitle: v })} />
      <Field lab="Описание" value={d.desc} onChange={(v) => setD({ ...d, desc: v })} multiline />
      <Field lab="Фото URL" value={d.img} onChange={(v) => setD({ ...d, img: v })} />
      <Field
        lab="Benefits (через | )"
        value={d.benefits.join(" | ")}
        onChange={(v) => setD({ ...d, benefits: v.split("|").map((s) => s.trim()).filter(Boolean) })}
      />
      <SaveBtn onClick={() => onSave(d)} />
    </Card>
  );
}

function JobEditor({
  item,
  onSave,
  onDelete,
}: {
  item: JobItem;
  onSave: (i: JobItem) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState(item);
  return (
    <Card title={d.title} actions={<DangerBtn onClick={onDelete}>Удалить</DangerBtn>}>
      <Field lab="Должность" value={d.title} onChange={(v) => setD({ ...d, title: v })} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Field lab="Отдел" value={d.dept} onChange={(v) => setD({ ...d, dept: v })} />
        <Field lab="Тип" value={d.type} onChange={(v) => setD({ ...d, type: v })} />
        <Field lab="Локация" value={d.location} onChange={(v) => setD({ ...d, location: v })} />
      </div>
      <label style={{ display: "flex", gap: 8, fontSize: 13, color: "#4A4640" }}>
        <input type="checkbox" checked={d.published} onChange={(e) => setD({ ...d, published: e.target.checked })} />
        Опубликовано
      </label>
      <SaveBtn onClick={() => onSave(d)} />
    </Card>
  );
}

function CompanyEditor({
  item,
  onSave,
  onDelete,
}: {
  item: CompanyItem;
  onSave: (c: CompanyItem) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState(item);
  return (
    <Card title={`Редактирование: ${d.name}`} actions={<DangerBtn onClick={onDelete}>Удалить</DangerBtn>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 10 }}>
        <Field lab="Название" value={d.name} onChange={(v) => setD({ ...d, name: v })} />
        <Field lab="№" value={d.number} onChange={(v) => setD({ ...d, number: v })} />
      </div>
      <Field lab="Описание" value={d.description} onChange={(v) => setD({ ...d, description: v })} multiline rows={4} />
      <Field lab="Теги (через запятую)" value={d.tags.join(", ")} onChange={(v) => setD({ ...d, tags: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field lab="Сайт" value={d.website} onChange={(v) => setD({ ...d, website: v })} />
        <Field lab="Текст кнопки" value={d.websiteLabel} onChange={(v) => setD({ ...d, websiteLabel: v })} />
      </div>
      <div>
        <label style={labelCss}>ТИП ФОНА</label>
        <select value={d.bgKind} onChange={(e) => setD({ ...d, bgKind: e.target.value as CompanyBgKind })} style={field}>
          {BG_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {(d.bgKind === "video" || d.videoUrl) && (
        <Field lab="Video URL" value={d.videoUrl || ""} onChange={(v) => setD({ ...d, videoUrl: v })} />
      )}
      {(d.bgKind === "image" || d.imageUrl) && (
        <Field lab="Image URL" value={d.imageUrl || ""} onChange={(v) => setD({ ...d, imageUrl: v })} />
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field lab="Gradient from" value={d.gradientFrom} onChange={(v) => setD({ ...d, gradientFrom: v })} />
        <Field lab="Gradient to" value={d.gradientTo} onChange={(v) => setD({ ...d, gradientTo: v })} />
      </div>
      <label style={{ display: "flex", gap: 8, fontSize: 13, color: "#4A4640" }}>
        <input type="checkbox" checked={d.published} onChange={(e) => setD({ ...d, published: e.target.checked })} />
        Опубликовано
      </label>
      <SaveBtn onClick={() => onSave(d)} />
    </Card>
  );
}

function NewsEditor({
  item,
  onSave,
  onDelete,
}: {
  item: NewsItem;
  onSave: (n: NewsItem) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState(item);
  return (
    <Card title={d.title} actions={<DangerBtn onClick={onDelete}>Удалить</DangerBtn>}>
      <div style={{ display: "grid", gridTemplateColumns: "120px 160px 1fr", gap: 10 }}>
        <Field lab="Год" value={d.date} onChange={(v) => setD({ ...d, date: v })} />
        <Field lab="Тег" value={d.tag} onChange={(v) => setD({ ...d, tag: v })} />
        <Field lab="Заголовок" value={d.title} onChange={(v) => setD({ ...d, title: v })} />
      </div>
      <Field lab="Текст" value={d.description} onChange={(v) => setD({ ...d, description: v })} multiline />
      <label style={{ display: "flex", gap: 8, fontSize: 13, color: "#4A4640" }}>
        <input type="checkbox" checked={d.published} onChange={(e) => setD({ ...d, published: e.target.checked })} />
        Опубликовано
      </label>
      <SaveBtn onClick={() => onSave(d)} />
    </Card>
  );
}
