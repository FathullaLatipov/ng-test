import { useState, useEffect, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router";
import nobelLogo from "../../assets/nobel-logo.png";

const BUSINESS_LINKS = [
  { label: "Импорт и дистрибуция", to: "/business#import" },
  { label: "Производство", to: "/business#production" },
  { label: "HoReCa", to: "/business#horeca" },
  { label: "Международная торговля", to: "/business#trade" },
  { label: "Инвестиционные проекты", to: "/business#invest" },
];

const NAV = [
  { label: "Главная", to: "/" },
  { label: "О группе", to: "/about" },
  { label: "Компании", to: "/companies" },
  { label: "Направления бизнеса", to: "/business", children: BUSINESS_LINKS },
  { label: "Бренды", to: "/brands" },
  { label: "Партнерам", to: "/partnership" },
  { label: "Новости", to: "/news" },
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
    whiteSpace: "nowrap",
  };
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("RU");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
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
    setBizOpen(false);
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
        padding: scrolled ? "12px 0" : "18px 0",
      }}
    >
      <div
        className="ng-header-inner"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", flexShrink: 0 }}>
          <img
            src={nobelLogo}
            alt="Nobel Group"
            style={{ width: 52, height: 52, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, letterSpacing: "0.12em", lineHeight: 1 }}>NOBEL</div>
            <div style={{ color: "#C9A24B", fontSize: 10, fontWeight: 600, letterSpacing: "0.34em", marginTop: 3, lineHeight: 1 }}>GROUP</div>
          </div>
        </Link>

        <nav className="ng-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {NAV.map((item) => {
            if (item.children) {
              const active = pathname.startsWith("/business");
              return (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setBizOpen(true)}
                  onMouseLeave={() => setBizOpen(false)}
                >
                  <NavLink to={item.to} style={navStyle(active)} onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }} onMouseLeave={(e) => { e.currentTarget.style.color = active ? "#C9A24B" : "#9A9A9A"; }}>
                    {item.label}
                    <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.7 }}>▾</span>
                  </NavLink>
                  <AnimatePresence>
                    {bizOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          paddingTop: 14,
                          zIndex: 50,
                        }}
                      >
                        <div
                          style={{
                            minWidth: 260,
                            background: "rgba(14,13,11,0.98)",
                            border: "1px solid rgba(213,162,81,0.25)",
                            boxShadow: "0 20px 48px rgba(0,0,0,0.55)",
                            padding: "10px 0",
                          }}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              style={{
                                display: "block",
                                padding: "11px 20px",
                                color: "#C8C8C8",
                                textDecoration: "none",
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#C9A24B";
                                e.currentTarget.style.background = "rgba(213,162,81,0.08)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#C8C8C8";
                                e.currentTarget.style.background = "transparent";
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                style={({ isActive }) => navStyle(isActive)}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => {
                  const on = pathname === item.to || (item.to === "/" && pathname === "/");
                  e.currentTarget.style.color = on ? "#C9A24B" : "#9A9A9A";
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="ng-header-actions" style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: lang === l ? "#C9A24B" : "#9A9A9A",
                  padding: "4px 6px",
                  transition: "color 0.25s",
                  borderBottom: lang === l ? "1px solid #C9A24B" : "1px solid transparent",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/partnership#partner-form"
            style={{
              background: "#C9A24B",
              color: "#0A0A0A",
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "10px 18px",
              display: "block",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D4AF37";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,162,75,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A24B";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ОБСУДИТЬ
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
                <div key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => !item.children && setMenuOpen(false)}
                    style={{
                      color: "#FFFFFF",
                      textDecoration: "none",
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.label}
                    {item.children && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setBizOpen((v) => !v);
                        }}
                        style={{ background: "none", border: "none", color: "#C9A24B", fontSize: 14, cursor: "pointer" }}
                      >
                        {bizOpen ? "−" : "+"}
                      </button>
                    )}
                  </Link>
                  {item.children && bizOpen && (
                    <div style={{ padding: "4px 0 12px 12px" }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: "block",
                            color: "rgba(255,255,255,0.65)",
                            textDecoration: "none",
                            fontSize: 14,
                            padding: "10px 0",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
                to="/partnership#partner-form"
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
                ОБСУДИТЬ СОТРУДНИЧЕСТВО
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
