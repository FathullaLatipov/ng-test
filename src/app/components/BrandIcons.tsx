import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const G = {
  a: "#D5A251",
  b: "#C9A24B",
  c: "#E8C97A",
};

let _gid = 0;
function uid(prefix: string) {
  _gid += 1;
  return `${prefix}-${_gid}`;
}

type IconProps = {
  size?: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
};

function GoldGrad({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={G.c} />
        <stop offset="45%" stopColor={G.a} />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
    </defs>
  );
}

/** Импорт: контейнер + корабль + зерно */
export function IconImport({ size = 48, glow }: IconProps) {
  const id = uid("g-import");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ filter: glow ? "drop-shadow(0 0 8px rgba(213,162,81,0.45))" : undefined }}>
      <GoldGrad id={id} />
      {/* ship hull */}
      <path d="M8 40h40l4-8H12l-4 8z" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 32V22h6v10M26 32V18h6v14M38 32V24h6v8" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" />
      {/* container */}
      <rect x="18" y="8" width="28" height="12" rx="1" stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M25 8v12M32 8v12M39 8v12" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.7" />
      {/* grain */}
      <ellipse cx="50" cy="48" rx="5" ry="7" stroke={`url(#${id})`} strokeWidth="1.3" />
      <path d="M50 41v14M46 48h8" stroke={`url(#${id})`} strokeWidth="1" opacity="0.6" />
      <path d="M8 48h36" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.4" strokeDasharray="2 3" />
    </svg>
  );
}

/** Дистрибуция: дороги + грузовик + узлы карты */
export function IconDistribution({ size = 48, glow }: IconProps) {
  const id = uid("g-dist");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ filter: glow ? "drop-shadow(0 0 8px rgba(213,162,81,0.45))" : undefined }}>
      <GoldGrad id={id} />
      <circle cx="14" cy="18" r="3.5" stroke={`url(#${id})`} strokeWidth="1.4" />
      <circle cx="50" cy="14" r="3" stroke={`url(#${id})`} strokeWidth="1.4" />
      <circle cx="48" cy="48" r="3.5" stroke={`url(#${id})`} strokeWidth="1.4" />
      <circle cx="16" cy="50" r="2.5" stroke={`url(#${id})`} strokeWidth="1.3" />
      <path d="M17 20l30-4M17 21l30 26M48 17l-1 28M18 48l28-1" stroke={`url(#${id})`} strokeWidth="1.1" opacity="0.55" strokeDasharray="3 3" />
      {/* truck */}
      <rect x="22" y="28" width="18" height="10" rx="1" stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M40 32h6l4 6v4h-4" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="28" cy="40" r="2.5" stroke={`url(#${id})`} strokeWidth="1.3" />
      <circle cx="44" cy="40" r="2.5" stroke={`url(#${id})`} strokeWidth="1.3" />
    </svg>
  );
}

/** HoReCa: бокал + тарелка + шеф */
export function IconHoReCa({ size = 48, glow }: IconProps) {
  const id = uid("g-horeca");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ filter: glow ? "drop-shadow(0 0 8px rgba(213,162,81,0.45))" : undefined }}>
      <GoldGrad id={id} />
      {/* glass */}
      <path d="M12 12h14l-2 16c0 4-2.5 7-5 7s-5-3-5-7l-2-16z" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M19 35v10M14 45h10" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 20h10" stroke={`url(#${id})`} strokeWidth="1" opacity="0.5" />
      {/* plate */}
      <ellipse cx="44" cy="42" rx="12" ry="5" stroke={`url(#${id})`} strokeWidth="1.5" />
      <ellipse cx="44" cy="40" rx="8" ry="3" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.7" />
      {/* chef hat */}
      <path d="M36 22c0-6 4-10 8-10s8 4 8 10v2H36v-2z" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="37" y="24" width="14" height="4" rx="1" stroke={`url(#${id})`} strokeWidth="1.3" />
    </svg>
  );
}

/** Бренды: росток + щит */
export function IconBrand({ size = 48, glow }: IconProps) {
  const id = uid("g-brand");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ filter: glow ? "drop-shadow(0 0 8px rgba(213,162,81,0.45))" : undefined }}>
      <GoldGrad id={id} />
      {/* shield */}
      <path d="M32 8l18 6v14c0 12-8 20-18 24C22 48 14 40 14 28V14l18-6z" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinejoin="round" />
      {/* sprout */}
      <path d="M32 46V28" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 34c-6-2-10-8-10-14 6 0 10 6 10 14z" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M32 30c6-1 10-6 10-12-5 1-9 6-10 12z" stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round" />
      {/* mini logos marks */}
      <circle cx="24" cy="20" r="2" stroke={`url(#${id})`} strokeWidth="1" opacity="0.6" />
      <circle cx="40" cy="18" r="2" stroke={`url(#${id})`} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

/** Timeline micro-icons */
export function IconYearFoundation({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 26V14l10-8 10 8v12" stroke="#D5A251" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 26v-8h8v8" stroke="#D5A251" strokeWidth="1.4" />
      <path d="M4 26h24" stroke="#D5A251" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconYearExpand({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="4" stroke="#D5A251" strokeWidth="1.5" />
      <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="#D5A251" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 9l3 3M20 20l3 3M23 9l-3 3M12 20l-3 3" stroke="#D5A251" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function IconYearWarehouse({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 14l12-8 12 8v12H4V14z" stroke="#D5A251" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 26v-8h12v8" stroke="#D5A251" strokeWidth="1.3" />
      <path d="M4 14h24" stroke="#D5A251" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function IconYearService({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M10 8h8l-1.5 10c0 2.5-1.5 4-2.5 4s-2.5-1.5-2.5-4L10 8z" stroke="#D5A251" strokeWidth="1.4" />
      <path d="M14 22v4M11 26h6" stroke="#D5A251" strokeWidth="1.3" strokeLinecap="round" />
      <ellipse cx="22" cy="22" rx="5" ry="2.5" stroke="#D5A251" strokeWidth="1.3" />
    </svg>
  );
}

export function IconYearGlobal({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="10" stroke="#D5A251" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="4.5" ry="10" stroke="#D5A251" strokeWidth="1.2" />
      <path d="M6 16h20M8 11h16M8 21h16" stroke="#D5A251" strokeWidth="1.1" opacity="0.7" />
    </svg>
  );
}

export function IconYearFuture({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 6v20M16 6l6 6M16 6l-6 6" stroke="rgba(213,162,81,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="26" r="2" stroke="rgba(213,162,81,0.55)" strokeWidth="1.2" />
    </svg>
  );
}

/** Partner audience icons */
export function IconPartnerSupplier({ size = 28 }: IconProps) {
  const id = uid("g-psup");
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <GoldGrad id={id} />
      <rect x="8" y="14" width="22" height="16" rx="1.5" stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M30 18h6l4 6v6h-4" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="16" cy="32" r="2.5" stroke={`url(#${id})`} strokeWidth="1.3" />
      <circle cx="34" cy="32" r="2.5" stroke={`url(#${id})`} strokeWidth="1.3" />
      <path d="M14 10h10v4H14z" stroke={`url(#${id})`} strokeWidth="1.2" />
    </svg>
  );
}

export function IconPartnerDealer({ size = 28 }: IconProps) {
  const id = uid("g-pdeal");
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <GoldGrad id={id} />
      <circle cx="16" cy="18" r="5" stroke={`url(#${id})`} strokeWidth="1.5" />
      <circle cx="32" cy="18" r="5" stroke={`url(#${id})`} strokeWidth="1.5" />
      <path d="M8 36c1-6 5-9 8-9s7 3 8 9M24 36c1-6 5-9 8-9s7 3 8 9" stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M21 18h6" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function IconPartnerHoReCa({ size = 28 }: IconProps) {
  return <IconHoReCa size={size} />;
}

/** Firm gold checkmark */
export function GoldCheck({ size = 16 }: { size?: number }) {
  const id = uid("check-g");
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="100%" stopColor="#D5A251" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="8" r="7" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.45" />
      <path d="M4.5 8.2l2.4 2.4 4.6-5" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hex frame for stats */
export function HexStat({
  children,
  delay = 0,
  inView = true,
}: {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
}) {
  const id = uid("hex-g");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: 56,
        height: 56,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="100%" stopColor="#D5A251" />
          </linearGradient>
        </defs>
        <polygon
          points="28,4 50,17 50,39 28,52 6,39 6,17"
          fill="rgba(213,162,81,0.08)"
          stroke={`url(#${id})`}
          strokeWidth="1.4"
        />
      </svg>
      <div style={{ position: "relative", zIndex: 1, color: "#D5A251", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center", lineHeight: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}

/** Animated icon shell with glow ring */
export function IconShell({
  children,
  hovered,
  size = 72,
  light = false,
}: {
  children: ReactNode;
  hovered?: boolean;
  size?: number;
  light?: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: hovered ? 1.06 : 1,
        boxShadow: hovered
          ? "0 0 28px rgba(213,162,81,0.35), inset 0 0 20px rgba(213,162,81,0.08)"
          : "0 0 0 rgba(213,162,81,0)",
      }}
      transition={{ duration: 0.35 }}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: light
          ? hovered ? "rgba(213,162,81,0.1)" : "var(--ng-paper, #F7F6F3)"
          : hovered ? "rgba(213,162,81,0.1)" : "rgba(213,162,81,0.04)",
        border: `1px solid ${hovered ? "rgba(213,162,81,0.65)" : "rgba(213,162,81,0.28)"}`,
        position: "relative",
        transition: "border-color 0.35s, background 0.35s",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", inset: -6, border: "1px solid rgba(213,162,81,0.2)",
          pointerEvents: "none", animation: "glow-pulse 2s ease-in-out infinite",
        }} />
      )}
      {children}
    </motion.div>
  );
}

/** Hero decorative vectors */
export function HeroVectors() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 4, pointerEvents: "none", opacity: 0.22 }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hv-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D5A251" stopOpacity="0" />
          <stop offset="50%" stopColor="#D5A251" stopOpacity="1" />
          <stop offset="100%" stopColor="#D5A251" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* network nodes */}
      <circle cx="1080" cy="220" r="4" fill="#D5A251" opacity="0.8" />
      <circle cx="1220" cy="340" r="3" fill="#D5A251" opacity="0.6" />
      <circle cx="980" cy="380" r="3.5" fill="#D5A251" opacity="0.7" />
      <circle cx="1300" cy="200" r="2.5" fill="#D5A251" opacity="0.5" />
      <path d="M1080 220 L1220 340 L980 380 L1080 220 L1300 200" stroke="url(#hv-g)" strokeWidth="1" fill="none" />
      {/* warehouse outline */}
      <g transform="translate(1180, 520)" opacity="0.55">
        <path d="M0 40 L40 10 L80 40 V80 H0 Z" stroke="#D5A251" strokeWidth="1.2" fill="none" />
        <path d="M20 80 V55 H60 V80" stroke="#D5A251" strokeWidth="1" />
      </g>
      {/* truck silhouette */}
      <g transform="translate(1050, 640)" opacity="0.5">
        <rect x="0" y="8" width="50" height="22" rx="2" stroke="#D5A251" strokeWidth="1.2" fill="none" />
        <path d="M50 14h14l10 12v10H54" stroke="#D5A251" strokeWidth="1.2" fill="none" />
        <circle cx="16" cy="34" r="5" stroke="#D5A251" strokeWidth="1.1" fill="none" />
        <circle cx="58" cy="34" r="5" stroke="#D5A251" strokeWidth="1.1" fill="none" />
      </g>
      {/* grain / product marks */}
      <g transform="translate(1280, 600)" opacity="0.4">
        <ellipse cx="8" cy="16" rx="7" ry="12" stroke="#D5A251" strokeWidth="1" fill="none" />
        <ellipse cx="24" cy="14" rx="6" ry="10" stroke="#D5A251" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

export const YEAR_ICONS = {
  "2012": IconYearFoundation,
  "2015": IconYearExpand,
  "2018": IconYearWarehouse,
  "2021": IconYearService,
  "2024": IconYearGlobal,
  "Будущее": IconYearFuture,
} as const;

export const DIRECTION_ICONS = {
  import: IconImport,
  distribution: IconDistribution,
  horeca: IconHoReCa,
  brand: IconBrand,
} as const;

export const PARTNER_ICONS = {
  suppliers: IconPartnerSupplier,
  distributors: IconPartnerDealer,
  horeca: IconPartnerHoReCa,
} as const;
