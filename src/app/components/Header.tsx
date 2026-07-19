import { useState, useEffect, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router";
import nobelLogo from "../../assets/nobel-logo.png";

const NAV = [
  { label: "Группа", to: "/#about" },
  { label: "Бизнес", to: "/business" },
  { label: "История", to: "/history" },
  { label: "География", to: "/geography" },
  { label: "Партнерство", to: "/partnership" },
  { label: "Карьера", to: "/careers" },
  { label: "Контакты", to: "/contacts" },
];

const LANGS = ["RU", "UZ", "EN"];

function navStyle(active: boolean): CSSProperties {
  return {
    color: active ? "#C9A24B" : "#9A9A9A",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: active ? 600 : 500,
    letterSpacing: "0.04em",
    transition: "color 0.25s",
  };
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("RU");
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled || menuOpen ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        padding: scrolled ? "14px 0" : "22px 0",
      }}
    >
      <div
        className="ng-header-inner"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <img
            src={nobelLogo}
            alt="Nobel Group"
            style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800, letterSpacing: "0.12em", lineHeight: 1 }}>NOBEL</div>
            <div style={{ color: "#C9A24B", fontSize: 8, fontWeight: 500, letterSpacing: "0.32em", marginTop: 2, lineHeight: 1 }}>GROUP</div>
          </div>
        </Link>

        <nav className="ng-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV.map((item) => {
            const isHash = item.to.includes("#");
            const active = isHash
              ? pathname === "/" && (hash === "#about" || (!hash && item.label === "Группа" && false))
              : pathname === item.to;

            if (isHash) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  style={navStyle(pathname === "/" && hash === "#about")}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = pathname === "/" && hash === "#about" ? "#C9A24B" : "#9A9A9A";
                  }}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                style={({ isActive }) => navStyle(isActive || active)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => {
                  const on = pathname === item.to;
                  e.currentTarget.style.color = on ? "#C9A24B" : "#9A9A9A";
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="ng-header-actions" style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
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
          <Link
            to="/contacts"
            style={{
              background: "#C9A24B", color: "#0A0A0A", textDecoration: "none",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
              padding: "9px 20px", display: "block", transition: "all 0.3s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,162,75,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A24B"; e.currentTarget.style.boxShadow = "none"; }}
          >
            СТАТЬ ПАРТНЕРОМ
          </Link>
        </div>

        <button
          className="ng-nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
          aria-expanded={menuOpen}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            width: 34,
            height: 34,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "#FFFFFF", transition: "transform 0.3s, opacity 0.3s", transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#FFFFFF", transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#FFFFFF", transition: "transform 0.3s, opacity 0.3s", transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", padding: "8px 24px 20px" }}>
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 6px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      style={{
                        background: lang === l ? "rgba(201,162,75,0.1)" : "transparent",
                        border: lang === l ? "1px solid rgba(201,162,75,0.45)" : "1px solid rgba(255,255,255,0.12)",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: lang === l ? "#C9A24B" : "#9A9A9A",
                        padding: "6px 12px",
                        fontFamily: "Manrope, sans-serif",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/contacts"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "#C9A24B",
                  color: "#0A0A0A",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "16px 20px",
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                СТАТЬ ПАРТНЕРОМ
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
