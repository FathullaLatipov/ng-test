import { useState, useEffect } from "react";

const NAV = [
  { label: "Группа", href: "#about" },
  { label: "Бизнес", href: "#business" },
  { label: "История", href: "#history" },
  { label: "География", href: "#geography" },
  { label: "Партнерство", href: "#partnership" },
  { label: "Карьера", href: "#careers" },
  { label: "Контакты", href: "#contact" },
];

const LANGS = ["RU", "UZ", "EN"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("RU");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        padding: scrolled ? "14px 0" : "22px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <div
            style={{
              width: 30, height: 30,
              border: "2px solid #C9A24B",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: "rotate(45deg)",
            }}
          >
            <div style={{ width: 8, height: 8, background: "#C9A24B" }} />
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800, letterSpacing: "0.12em", lineHeight: 1 }}>NOBEL</div>
            <div style={{ color: "#C9A24B", fontSize: 8, fontWeight: 500, letterSpacing: "0.32em", marginTop: 2, lineHeight: 1 }}>GROUP</div>
          </div>
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ color: "#9A9A9A", textDecoration: "none", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.25s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                  color: lang === l ? "#C9A24B" : "#9A9A9A",
                  padding: "4px 6px", transition: "color 0.25s",
                  borderBottom: lang === l ? "1px solid #C9A24B" : "1px solid transparent",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            style={{
              background: "#C9A24B", color: "#0A0A0A", textDecoration: "none",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
              padding: "9px 20px", display: "block", transition: "all 0.3s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,162,75,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A24B"; e.currentTarget.style.boxShadow = "none"; }}
          >
            СТАТЬ ПАРТНЕРОМ
          </a>
        </div>
      </div>
    </header>
  );
}
