import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, animate } from "motion/react";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "СКЛАДСКИЕ ОПЕРАЦИИ",
    kb: "ken-burns",
  },
  {
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "ЛОГИСТИКА И ДОСТАВКА",
    kb: "ken-burns-b",
  },
  {
    img: "https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "ДЕЛОВОЕ ПАРТНЕРСТВО",
    kb: "ken-burns",
  },
  {
    img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "ДИСТРИБУЦИЯ",
    kb: "ken-burns-b",
  },
];

const STATS = [
  { n: "14+", l: "Лет на рынке" },
  { n: "4",   l: "Направления бизнеса" },
  { n: "7",   l: "Регионов охвата" },
  { n: "200+", l: "Активных партнеров" },
];

/* Deterministic pseudo-random from index */
function prng(i: number) { return ((i * 7919 + 1) % 100) / 100; }

function Particles() {
  const pts = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      left: prng(i * 3) * 100,
      top: prng(i * 3 + 1) * 80 + 10,
      size: prng(i * 3 + 2) * 2.5 + 0.8,
      delay: prng(i) * 5,
      dur: prng(i * 2) * 4 + 5,
    })), []);
  return (
    <>
      {pts.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#C9A24B",
            animation: `drift-up ${p.dur}s ${p.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

function CounterStat({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctrl = animate(0, target, {
        duration: 2,
        ease: [0.25, 0, 0, 1],
        onUpdate: (v) => setVal(Math.round(v)),
      });
      return () => ctrl.stop();
    }, 1600);
    return () => clearTimeout(timer);
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function HeroNew() {
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* Slide cycling */
  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      setPrev(slide);
      setTimeout(() => {
        setSlide((s) => (s + 1) % SLIDES.length);
        setTransitioning(false);
      }, 900);
    }, 7000);
    return () => clearInterval(id);
  }, [slide]);

  return (
    <section
      ref={ref}
      id="hero"
      style={{ position: "relative", height: "100vh", minHeight: 760, overflow: "hidden", background: "#050505" }}
    >
      {/* ── Background slide stack ──────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === slide ? 1 : (i === prev && transitioning ? 0 : 0),
            transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1)",
            zIndex: i === slide ? 2 : 1,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.22) saturate(0.4)",
              animation: `${s.kb} 9s ease-out forwards`,
            }}
          />
        </div>
      ))}

      {/* ── Gradient overlays ───────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(105deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.2) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "radial-gradient(ellipse at 70% 50%, rgba(201,162,75,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", zIndex: 3, background: "linear-gradient(to top, #050505 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* ── Light streaks ───────────────────────────── */}
      {[
        { w: "35%", top: "20%", h: "60%", delay: "0s",   dur: "9s",  opacity: 0.035 },
        { w: "20%", top: "40%", h: "20%", delay: "3.5s", dur: "11s", opacity: 0.025 },
        { w: "45%", top: "10%", h: "80%", delay: "6s",   dur: "13s", opacity: 0.02  },
      ].map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: l.top,
            width: l.w,
            height: l.h,
            zIndex: 4,
            background: `linear-gradient(to right, transparent, rgba(201,162,75,${l.opacity}), transparent)`,
            animation: `light-sweep ${l.dur} ${l.delay} linear infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Particles ───────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}>
        <Particles />
      </div>

      {/* ── Thin diagonal gold line ──────────────────── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 4, pointerEvents: "none", opacity: 0.18 }} preserveAspectRatio="none">
        <line x1="60%" y1="0" x2="100%" y2="42%" stroke="#C9A24B" strokeWidth="0.6" />
        <line x1="65%" y1="0" x2="100%" y2="34%" stroke="#C9A24B" strokeWidth="0.3" />
        <line x1="55%" y1="0" x2="95%"  y2="58%" stroke="#C9A24B" strokeWidth="0.4" />
      </svg>

      {/* ── Current slide label ──────────────────────── */}
      <motion.div
        key={slide}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "absolute", top: 110, right: 52, zIndex: 10, display: "flex", alignItems: "center", gap: 8 }}
      >
        <div style={{ width: 16, height: 1, background: "#C9A24B", opacity: 0.6 }} />
        <span style={{ color: "rgba(201,162,75,0.65)", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em" }}>
          {SLIDES[slide].label}
        </span>
      </motion.div>

      {/* ── Slide dots ──────────────────────────────── */}
      <div style={{ position: "absolute", bottom: 96, right: 52, zIndex: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={() => setSlide(i)}
            style={{
              width: i === slide ? 2 : 1,
              height: i === slide ? 20 : 12,
              background: i === slide ? "#C9A24B" : "rgba(255,255,255,0.25)",
              cursor: "pointer",
              transition: "all 0.4s",
              animation: i === slide ? "glow-pulse 2.5s ease-in-out infinite" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Main content ────────────────────────────── */}
      <motion.div
        style={{ position: "absolute", inset: 0, zIndex: 8, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", maxWidth: 760, y: contentY, opacity: fadeOut }}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 30, height: 1, background: "#C9A24B" }} />
          <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>ГРУППА КОМПАНИЙ · УЗБЕКИСТАН</span>
        </motion.div>

        {/* Headline — each line mask-reveals */}
        {[
          { text: "СОЗДАЕМ БУДУЩЕЕ",          delay: 0.35, gold: false },
          { text: "ПРОДОВОЛЬСТВЕННОЙ",         delay: 0.48, gold: false },
          { text: "ДИСТРИБУЦИИ.",              delay: 0.61, gold: true  },
        ].map(({ text, delay, gold }) => (
          <div key={text} style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.06, color: gold ? "#C9A24B" : "#FFFFFF", paddingBottom: "0.04em" }}
            >
              {text}
            </motion.div>
          </div>
        ))}

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          style={{ color: "#9A9A9A", fontSize: 15, fontWeight: 400, lineHeight: 1.82, marginTop: 28, marginBottom: 44, maxWidth: 520 }}>
          Nobel Group объединяет поставщиков, дистрибьюторов, ретейлеров и партнёров HoReCa в единую надёжную экосистему торговли, логистики и развития рынка.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: "flex", gap: 14 }}>
          <a href="#about"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C9A24B", color: "#050505", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", padding: "15px 32px", transition: "all 0.35s", position: "relative", overflow: "hidden" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF37"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,162,75,0.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A24B"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            О ГРУППЕ КОМПАНИЙ
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
          <a href="#contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", color: "#FFFFFF", textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", padding: "14px 32px", border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.35s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9A24B"; e.currentTarget.style.color = "#C9A24B"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            СТАТЬ ПАРТНЕРОМ
          </a>
        </motion.div>
      </motion.div>

      {/* ── Animated stat strip ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          background: "rgba(5,5,5,0.82)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(201,162,75,0.14)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "0 80px",
        }}
      >
        {STATS.map(({ n, l }, i) => {
          const num = parseInt(n);
          const suf = n.replace(String(num), "");
          return (
            <div key={l} style={{ padding: "22px 0", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingLeft: i > 0 ? 32 : 0, display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
              {/* Gold accent bar */}
              <div style={{ position: "absolute", top: 0, left: i > 0 ? 32 : 0, width: 24, height: 2, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 28, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em" }}>
                <CounterStat target={num} suffix={suf} />
              </span>
              <span style={{ color: "#9A9A9A", fontSize: 12, fontWeight: 400, lineHeight: 1.4 }}>{l}</span>
            </div>
          );
        })}
      </motion.div>

      {/* ── Scroll indicator ────────────────────────── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 92, left: 80, zIndex: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #C9A24B, transparent)" }}
        />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.22em", fontWeight: 500 }}>ПРОКРУТИТЬ</span>
      </motion.div>
    </section>
  );
}
