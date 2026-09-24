import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { GoldCheck } from "./BrandIcons";

/* ─── Background atmospheres ───────────────────────── */
export type SectionTone = "void" | "charcoal" | "elevated" | "gradient" | "grid" | "honey" | "paper";

const TONES: Record<SectionTone, CSSProperties> = {
  void: { background: "var(--ng-void, #12110F)" },
  charcoal: { background: "var(--ng-charcoal, #181714)" },
  elevated: { background: "var(--ng-elevated, #1E1C18)" },
  gradient: {
    background: "linear-gradient(165deg, #12110F 0%, #1E1A12 42%, #16140F 72%, #12110F 100%)",
  },
  grid: { background: "var(--ng-void, #12110F)" },
  honey: { background: "var(--ng-charcoal, #181714)" },
  paper: {
    background: "linear-gradient(180deg, var(--ng-paper, #F7F6F3) 0%, #FFFFFF 50%, var(--ng-paper-deep, #EEECE7) 100%)",
  },
};

export function IbmGrid({ opacity = 0.025, light = false }: { opacity?: number; light?: boolean }) {
  const c = light ? `rgba(26,24,20,${opacity})` : `rgba(255,255,255,${opacity})`;
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

export function HoneycombPattern({ opacity = 0.04 }: { opacity?: number }) {
  const id = `ng-honey-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} width="56" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M28 2 L48 14 L48 34 L28 46 L8 34 L8 14 Z"
            fill="none"
            stroke="#D5A251"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Firm logistics node network — reusable brand motif */
export function LogisticsMesh({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
    >
      <g stroke="#D5A251" strokeWidth="0.9" fill="none">
        <path d="M80 80 H320 M320 80 V200 M320 200 H520 M520 200 V320 M520 320 H720" strokeDasharray="4 6" opacity="0.7" />
        <path d="M120 300 H280 M280 300 V160 M280 160 H480 M480 160 V80 M480 80 H680" opacity="0.5" />
        <path d="M200 40 V360 M400 20 V380 M600 60 V340" opacity="0.25" strokeDasharray="2 8" />
      </g>
      {[
        [80, 80], [320, 80], [320, 200], [520, 200], [520, 320], [720, 320],
        [120, 300], [280, 300], [280, 160], [480, 160], [480, 80], [680, 80],
        [200, 200], [400, 240], [600, 180],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="#D5A251" opacity="0.85" />
          <circle cx={x} cy={y} r="8" fill="none" stroke="#D5A251" strokeWidth="0.6" opacity="0.35" />
        </g>
      ))}
      {/* animated pulse dots via CSS can't easily target SVG - use motion in parent if needed */}
    </svg>
  );
}

export function GiantNumber({
  n,
  light = false,
}: {
  n: string;
  light?: boolean;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "6%",
        right: "4%",
        fontSize: "clamp(140px, 22vw, 280px)",
        fontWeight: 800,
        lineHeight: 0.85,
        letterSpacing: "-0.06em",
        color: light ? "rgba(26,24,20,0.04)" : "rgba(255,255,255,0.035)",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {n}
    </div>
  );
}

export function GiantWord({
  word,
  side = "left",
}: {
  word: string;
  side?: "left" | "right";
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        [side]: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(80px, 14vw, 220px)",
        fontWeight: 800,
        letterSpacing: "0.04em",
        lineHeight: 1,
        color: "rgba(213,162,81,0.035)",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        whiteSpace: "nowrap",
      }}
    >
      {word}
    </div>
  );
}

type OutlineKind = "truck" | "warehouse" | "container" | "network" | "handshake" | "pallet" | "factory" | "globe";

function OutlineSvg({ kind }: { kind: OutlineKind }) {
  const s = { stroke: "#D5A251", strokeWidth: 1.2, fill: "none" as const };
  switch (kind) {
    case "truck":
      return (
        <g {...s}>
          <rect x="20" y="70" width="140" height="55" rx="4" />
          <path d="M160 85h45l30 35v35H175" />
          <circle cx="60" cy="140" r="18" />
          <circle cx="185" cy="140" r="18" />
          <path d="M40 70V45h80v25" />
        </g>
      );
    case "warehouse":
      return (
        <g {...s}>
          <path d="M30 160 L130 50 L230 160 V220 H30 Z" />
          <path d="M90 220 V140 H170 V220" />
          <path d="M30 160 H230" />
          <path d="M110 100 h40 v20 h-40z" opacity="0.6" />
        </g>
      );
    case "container":
      return (
        <g {...s}>
          <rect x="40" y="60" width="180" height="100" rx="2" />
          <path d="M70 60v100M100 60v100M130 60v100M160 60v100M190 60v100" opacity="0.55" />
          <path d="M40 90 H220 M40 120 H220" opacity="0.35" />
        </g>
      );
    case "network":
      return (
        <g {...s}>
          <circle cx="130" cy="110" r="22" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="210" cy="50" r="14" />
          <circle cx="50" cy="180" r="14" />
          <circle cx="210" cy="180" r="14" />
          <path d="M63 58 L112 96 M197 58 L148 96 M63 168 L112 128 M197 168 L148 128" />
        </g>
      );
    case "handshake":
      return (
        <g {...s}>
          <path d="M40 100c20-30 50-30 70-10l20 20c15 15 40 10 55-5" />
          <path d="M60 140c25 20 55 15 80-5" opacity="0.7" />
          <path d="M90 80 l30 30 M150 80 l-20 35" opacity="0.5" />
        </g>
      );
    case "pallet":
      return (
        <g {...s}>
          <rect x="50" y="90" width="160" height="70" />
          <path d="M50 115 H210 M50 140 H210" />
          <path d="M70 160 V190 H100 V160 M120 160 V190 H150 V160 M170 160 V190 H200 V160" />
        </g>
      );
    case "factory":
      return (
        <g {...s}>
          <path d="M40 200 V100 L90 130 V100 L140 130 V80 H220 V200 Z" />
          <rect x="160" y="40" width="28" height="45" />
          <path d="M160 40 c10-20 28-20 28 0" />
          <rect x="55" y="150" width="30" height="30" opacity="0.6" />
          <rect x="100" y="150" width="30" height="30" opacity="0.6" />
        </g>
      );
    case "globe":
      return (
        <g {...s}>
          <circle cx="130" cy="110" r="70" />
          <ellipse cx="130" cy="110" rx="30" ry="70" />
          <path d="M60 110 H200 M70 75 H190 M70 145 H190" opacity="0.6" />
        </g>
      );
  }
}

export function GiantOutline({
  kind,
  side = "right",
  size = 320,
}: {
  kind: OutlineKind;
  side?: "left" | "right";
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size * 0.85}
      viewBox="0 0 260 230"
      style={{
        position: "absolute",
        [side]: "2%",
        bottom: "8%",
        opacity: 0.035,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <OutlineSvg kind={kind} />
    </svg>
  );
}

export function SectionShell({
  children,
  tone = "void",
  number,
  word,
  outline,
  id,
  style,
  light,
}: {
  children: ReactNode;
  tone?: SectionTone;
  number?: string;
  word?: string;
  outline?: OutlineKind;
  id?: string;
  style?: CSSProperties;
  light?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        position: "relative",
        overflow: "hidden",
        ...TONES[tone],
        ...style,
      }}
    >
      {(tone === "grid" || tone === "void" || tone === "charcoal") && <IbmGrid opacity={0.022} light={light || tone === "paper"} />}
      {tone === "honey" && <HoneycombPattern />}
      {tone === "gradient" && <LogisticsMesh opacity={0.08} />}
      {tone === "elevated" && <LogisticsMesh opacity={0.06} />}
      {number && <div className="ng-decor"><GiantNumber n={number} light={light || tone === "paper"} /></div>}
      {word && <div className="ng-decor"><GiantWord word={word} side={number ? "left" : "right"} /></div>}
      {outline && <div className="ng-decor"><GiantOutline kind={outline} side={number ? "left" : "right"} /></div>}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

export function SectionDivider({ mark = "diamond" }: { mark?: "diamond" | "hex" | "node" }) {
  return (
    <div
      aria-hidden
      className="ng-sec-pad-sm"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "28px 80px",
        background: "var(--ng-void)",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.35))" }} />
      {mark === "diamond" && (
        <div style={{ width: 8, height: 8, background: "#D5A251", transform: "rotate(45deg)", boxShadow: "0 0 12px rgba(213,162,81,0.5)" }} />
      )}
      {mark === "hex" && (
        <svg width="14" height="14" viewBox="0 0 14 14">
          <polygon points="7,1 13,4.5 13,9.5 7,13 1,9.5 1,4.5" fill="none" stroke="#D5A251" strokeWidth="1.2" />
        </svg>
      )}
      {mark === "node" && (
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D5A251", boxShadow: "0 0 10px rgba(213,162,81,0.6)" }} />
      )}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(213,162,81,0.35))" }} />
    </div>
  );
}

export function QuoteBand({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      className="ng-sec-pad-sm"
      style={{
        position: "relative",
        background: "linear-gradient(115deg, #241D12 0%, #322612 38%, #241D12 68%, #1C160E 100%)",
        padding: "76px 80px",
        overflow: "hidden",
      }}
    >
      <IbmGrid opacity={0.03} />
      <motion.div
        initial={{ opacity: 0.5, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute",
          left: "8%",
          top: "-20%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(213,162,81,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(213,162,81,0.4) 50%, transparent)" }} />
      <motion.div
        initial={{ opacity: 0, rotate: -8 }}
        animate={inView ? { opacity: 1, rotate: 0 } : {}}
        className="ng-decor"
        style={{ position: "absolute", left: 48, top: 34, fontSize: 130, fontWeight: 800, color: "rgba(213,162,81,0.16)", lineHeight: 1, pointerEvents: "none", textShadow: "0 0 40px rgba(213,162,81,0.15)" }}
      >
        “
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="ng-grid-2"
        style={{ maxWidth: 1000, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "end" }}
      >
        <p style={{ color: "#FFFFFF", fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.02em", margin: 0, textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}>
          {quote}
        </p>
        <div style={{ textAlign: "right", minWidth: 160 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 40 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ height: 1, background: "#D5A251", marginLeft: "auto", marginBottom: 12, boxShadow: "0 0 8px rgba(213,162,81,0.6)" }}
          />
          <div style={{ color: "#E8C97A", fontSize: 18, fontWeight: 700, letterSpacing: "0.04em" }}>{author}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginTop: 5, fontWeight: 400 }}>{role}</div>
        </div>
      </motion.div>
    </div>
  );
}

/** Photo-free animated section break — a drawing gold route line with a travelling node */
export function RouteTransition({ label = "ЭКОСИСТЕМА NOBEL GROUP" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className="ng-sec-pad-sm" style={{ position: "relative", background: "var(--ng-void)", padding: "58px 80px", overflow: "hidden" }}>
      <IbmGrid opacity={0.02} />
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", display: "flex", alignItems: "center", gap: 28 }}>
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="ng-route-label"
          style={{ color: "rgba(213,162,81,0.6)", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", flexShrink: 0 }}
        >
          {label}
        </motion.span>
        <div style={{ flex: 1, height: 2, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.06)" }} />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #8B6914, #D5A251, #E8C97A)", transformOrigin: "left", boxShadow: "0 0 14px rgba(213,162,81,0.5)" }}
          />
          {/* Running current sheen — continuously sweeps along the line */}
          <motion.div
            animate={inView ? { left: ["-25%", "125%"] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: 0, bottom: 0, width: "25%", background: "linear-gradient(to right, transparent, rgba(255,244,214,0.85), transparent)", filter: "blur(1px)", pointerEvents: "none" }}
          />
          {/* Travelling node — flows left ↔ right like electric current */}
          <motion.div
            animate={inView ? { left: ["0%", "100%", "0%"] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "50%", width: 11, height: 11, borderRadius: "50%", background: "#E8C97A", marginTop: -5.5, marginLeft: -5.5, boxShadow: "0 0 16px rgba(232,201,122,0.95), 0 0 32px rgba(213,162,81,0.5)" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 45 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ width: 9, height: 9, background: "#D5A251", flexShrink: 0, boxShadow: "0 0 12px rgba(213,162,81,0.6)" }}
        />
      </div>
    </div>
  );
}

export function FullBleedPhoto({
  src,
  caption,
  height = 420,
}: {
  src: string;
  caption?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} style={{ position: "relative", height, overflow: "hidden" }}>
      <motion.div
        style={{
          position: "absolute",
          inset: "-12% 0",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,17,15,0.75) 0%, rgba(18,17,15,0.25) 50%, rgba(18,17,15,0.45) 100%)" }} />
      <LogisticsMesh opacity={0.1} />
      {caption && (
        <div style={{ position: "absolute", bottom: 36, left: 80, zIndex: 2, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 24, height: 1, background: "#D5A251" }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em" }}>{caption}</span>
        </div>
      )}
    </div>
  );
}

/** Draw-on-view / hover logistics arrow line */
export function DrawLine({
  label,
  inView,
}: {
  label?: string;
  inView?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#D5A251" }}>
      {label && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>{label}</span>}
      <svg width="72" height="12" viewBox="0 0 72 12" overflow="visible">
        <motion.path
          d="M2 6 H62"
          stroke="#D5A251"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.path
          d="M58 2 L66 6 L58 10"
          stroke="#D5A251"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.55, duration: 0.25 }}
        />
      </svg>
    </div>
  );
}

export function FeatureIconRow({
  items,
  light = false,
}: {
  items: { label: string; icon: ReactNode }[];
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            border: light ? "1px solid var(--ng-line)" : "1px solid rgba(255,255,255,0.08)",
            background: light ? "var(--ng-surface)" : "rgba(255,255,255,0.02)",
          }}
        >
          <span style={{ color: "#D5A251", display: "flex" }}>{it.icon}</span>
          <span style={{ color: light ? "var(--ng-ink)" : "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Compact preview block for the home page — short pitch + points, linking out to the dedicated page for full detail */
export function SectionTeaser({
  index,
  eyebrow,
  title,
  titleAccent,
  desc,
  points,
  ctaLabel,
  ctaTo,
  background = "var(--ng-charcoal)",
  reverse = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  desc: string;
  points: string[];
  ctaLabel?: string;
  ctaTo?: string;
  background?: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className="ng-sec-pad"
      style={{ background, padding: "74px 80px", position: "relative", overflow: "hidden" }}
    >
      <IbmGrid opacity={0.02} />
      {index && <div className="ng-decor"><GiantNumber n={index} /></div>}
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          className="ng-grid-2 ng-teaser-grid"
          style={{
            display: "grid",
            gridTemplateColumns: reverse ? "0.85fr 1.15fr" : "1.15fr 0.85fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ order: reverse ? 2 : 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
            >
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>{eyebrow}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              style={{ fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 14, maxWidth: 520 }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span style={{ color: "#C9A24B" }}>{titleAccent}</span>
                </>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.14 }}
              style={{ color: "#FFFFFF", fontSize: 15, lineHeight: 1.75, maxWidth: 480, marginBottom: 26 }}
            >
              {desc}
            </motion.p>
            {ctaLabel && ctaTo && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
              <Link
                to={ctaTo}
                className="ng-cta-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "1px solid rgba(213,162,81,0.5)",
                  color: "#C9A24B",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "13px 24px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(213,162,81,0.1)";
                  e.currentTarget.style.borderColor = "#D5A251";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(213,162,81,0.5)";
                }}
              >
                {ctaLabel} →
              </Link>
            </motion.div>
            )}
          </div>
          <div style={{ order: reverse ? 1 : 2 }}>
            <motion.div
              initial={{ opacity: 0, x: reverse ? -18 : 18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
              style={{
                background: "var(--ng-elevated)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "6px 20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {points.map((p, i) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "15px 0",
                    borderBottom: i < points.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <GoldCheck size={14} />
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Big full-viewport-ish stats strip */
export function MegaStats({
  items,
}: {
  items: { n: string; l: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className="ng-sec-pad-sm"
      style={{
        position: "relative",
        background: "var(--ng-void)",
        padding: "100px 80px",
        overflow: "hidden",
      }}
    >
      <IbmGrid opacity={0.02} />
      <div className="ng-decor"><GiantWord word="GROWTH" side="right" /></div>
      <div className="ng-grid-stats" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 24, position: "relative", zIndex: 1 }}>
        {items.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
            style={{
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              paddingLeft: i > 0 ? 32 : 0,
            }}
          >
            <div
              style={{
                fontSize: "clamp(38px, 4.6vw, 66px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                background: "linear-gradient(135deg, #E8C97A 0%, #D5A251 50%, #8B6914 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 16,
              }}
            >
              {s.n}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 400, letterSpacing: "0.06em" }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
