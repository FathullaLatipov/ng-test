import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { ContactFooterNew } from "../components/ContactFooterNew";
import { CompanyBgCanvas } from "../components/companies/CompanyBgCanvas";
import { useCms } from "../cms/store";
import type { CompanyItem } from "../cms/types";
import nobelLogo from "../../assets/nobel-logo.png";

function CompanySection({
  company,
  active,
  onInView,
}: {
  company: CompanyItem;
  active: boolean;
  onInView: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onInView();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onInView]);

  const hasVideo = company.bgKind === "video" && company.videoUrl;
  const hasImage = (company.bgKind === "image" || (!hasVideo && company.imageUrl)) && company.imageUrl;

  return (
    <section
      ref={ref}
      id={company.id}
      style={{
        position: "relative",
        minHeight: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 8vw",
        background: `linear-gradient(200deg, ${company.gradientFrom}, ${company.gradientTo})`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={company.videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
          />
        ) : hasImage ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${company.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.55) saturate(0.9)",
              animation: inView ? "ken-burns 18s ease-out forwards" : "none",
            }}
          />
        ) : (
          <CompanyBgCanvas kind={company.bgKind} active={active && inView} />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "8vw",
          bottom: "8vh",
          zIndex: 2,
          fontSize: "clamp(80px, 15vw, 220px)",
          fontWeight: 300,
          color: "rgba(244,239,228,0.06)",
          lineHeight: 1,
          userSelect: "none",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {company.number}
      </div>

      <motion.div
        initial={false}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 2, maxWidth: 640 }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#E8C97A",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ width: 34, height: 1, background: "#E8C97A" }} />
          Компания холдинга — {company.number}
        </div>
        <h2
          style={{
            fontSize: "clamp(38px, 6vw, 68px)",
            lineHeight: 1.02,
            margin: "0 0 20px",
            color: "#F4EFE4",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {company.name}
        </h2>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.75,
            color: "rgba(244,239,228,0.88)",
            maxWidth: 520,
            margin: "0 0 22px",
          }}
        >
          {company.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 32 }}>
          {company.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11.5,
                letterSpacing: "0.04em",
                padding: "7px 13px",
                border: "1px solid rgba(244,239,228,0.18)",
                borderRadius: 100,
                color: "rgba(244,239,228,0.85)",
                background: "rgba(244,239,228,0.04)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "#141210",
              background: "#E8C97A",
              padding: "15px 26px",
              textDecoration: "none",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 26px rgba(233,207,122,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {company.websiteLabel || company.website}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        )}
      </motion.div>
    </section>
  );
}

export function CompaniesPage() {
  const { data } = useCms();
  const companies = data.companies.filter((c) => c.published).sort((a, b) => a.order - b.order);
  const hero = data.companiesHero;
  const [activeId, setActiveId] = useState("hero");
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(Math.min(100, scrolled * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y mandatory";
    return () => {
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActiveId("hero");
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dots = [
    { id: "hero", label: "О холдинге" },
    ...companies.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div style={{ background: "#0f0d0a", color: "#F4EFE4", fontFamily: "Manrope, sans-serif" }}>
      <Header />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C9A227, #E8C97A)",
          zIndex: 220,
          transition: "width 0.08s linear",
        }}
      />

      <nav
        className="ng-companies-dots"
        style={{
          position: "fixed",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 210,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {dots.map((d) => (
          <button
            key={d.id}
            aria-label={d.label}
            title={d.label}
            onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: activeId === d.id ? "1.5px solid #E8C97A" : "1.5px solid rgba(244,239,228,0.55)",
              background: activeId === d.id ? "#E8C97A" : "transparent",
              boxShadow: activeId === d.id ? "0 0 0 4px rgba(233,207,122,0.18)" : "none",
              cursor: "pointer",
              padding: 0,
              position: "relative",
            }}
          />
        ))}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "120px 8vw 80px",
          background: "#0f0d0a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(201,162,39,0.16), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(154,61,26,0.14), transparent 50%), linear-gradient(160deg,#0f0d0a 0%, #17130d 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55))" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <img src={nobelLogo} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
            <div style={{ color: "#E8C97A", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase" }}>{hero.eyebrow}</div>
          </div>
          <h1
            style={{
              fontSize: "clamp(40px, 6.5vw, 76px)",
              lineHeight: 1.05,
              margin: "0 0 24px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#F4EFE4",
            }}
          >
            {hero.title}
            <br />
            <em style={{ fontStyle: "italic", color: "#E8C97A", fontWeight: 500 }}>{hero.titleAccent}</em>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(244,239,228,0.85)", maxWidth: 600, marginBottom: 36 }}>{hero.lead}</p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(244,239,228,0.18)",
                  color: "rgba(244,239,228,0.55)",
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  padding: "0 0 10px",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "8vw",
            bottom: "6vh",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244,239,228,0.55)",
          }}
        >
          <span
            style={{
              width: 1,
              height: 38,
              background: "linear-gradient(180deg, #E8C97A, transparent)",
              animation: "scrollpulse 1.8s infinite",
            }}
          />
          Листайте вниз
        </div>
      </section>

      {companies.map((c) => (
        <CompanySection
          key={c.id}
          company={c}
          active={activeId === c.id}
          onInView={() => setActiveId(c.id)}
        />
      ))}

      <div style={{ scrollSnapAlign: "start", position: "relative", zIndex: 2 }}>
        <ContactFooterNew />
      </div>

      <style>{`
        @keyframes scrollpulse { 0%{opacity:.2;} 50%{opacity:1;} 100%{opacity:.2;} }
        @media (max-width: 720px) {
          .ng-companies-dots { right: 12px !important; }
        }
      `}</style>
    </div>
  );
}
