import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Handshake } from "lucide-react";
import { GeographyMap } from "./GeographyMap";

export type HeroVisualKind =
  | "history"
  | "business"
  | "geography"
  | "partnership"
  | "careers"
  | "contacts";

const GOLD = "#D5A251";
const GOLD_SOFT = "#E8C97A";

function Frame({
  children,
  wide,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: wide ? 560 : 420,
        aspectRatio: wide ? undefined : "1 / 1",
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!wide && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(213,162,81,0.14) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

function HistoryVisual() {
  // Milestone years, auto-extended to the current year: the newest year is added
  // at the bottom and the oldest drops off the top so the timeline always fits.
  const MILESTONES = [2012, 2015, 2018, 2021, 2024, 2026];
  const MAX_VISIBLE = 6;
  const current = new Date().getFullYear();
  const all = [...MILESTONES];
  for (let y = all[all.length - 1] + 1; y <= current; y++) all.push(y);
  const years = all.slice(-MAX_VISIBLE).map(String);

  const TOP = 40;
  const BOTTOM = 320;
  const step = years.length > 1 ? (BOTTOM - TOP) / (years.length - 1) : 0;

  return (
    <Frame>
      <svg viewBox="0 0 360 360" width="100%" height="100%" style={{ overflow: "visible" }}>
        <motion.line
          x1="90" y1={TOP} x2="90" y2={BOTTOM}
          stroke="rgba(213,162,81,0.25)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        <motion.line
          x1="90" y1={TOP} x2="90" y2={BOTTOM}
          stroke={GOLD} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(213,162,81,0.6))" }}
        />
        {years.map((y, i) => {
          const cy = TOP + step * i;
          return (
            <g key={y}>
              <motion.circle
                cx="90" cy={cy} r="7" fill="#12110F" stroke={GOLD} strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 220 }}
                style={{ filter: "drop-shadow(0 0 10px rgba(213,162,81,0.7))" }}
              />
              <motion.circle
                cx="90" cy={cy} r="14" fill="none" stroke={GOLD} strokeWidth="1"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 0.55, 0], scale: [0.5, 1.4, 1.7] }}
                transition={{ delay: 1.1 + i * 0.25, duration: 2.2, repeat: Infinity }}
              />
              <motion.text
                x="120" y={cy + 5} fill={GOLD_SOFT} fontSize="18" fontWeight="700"
                fontFamily="Manrope, sans-serif"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.12 }}
              >
                {y}
              </motion.text>
              <motion.line
                x1="180" y1={cy} x2="300" y2={cy}
                stroke="rgba(213,162,81,0.2)" strokeWidth="1" strokeDasharray="3 5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
              />
            </g>
          );
        })}
        <motion.circle
          cx="90" cy={TOP} r="4" fill={GOLD_SOFT}
          animate={{ cy: [TOP, BOTTOM - 20, TOP], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.9, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(232,201,122,0.9))" }}
        />
      </svg>
    </Frame>
  );
}

function BusinessVisual() {
  const nodes = [
    { x: 180, y: 70, label: "01" },
    { x: 280, y: 160, label: "02" },
    { x: 230, y: 280, label: "03" },
    { x: 100, y: 250, label: "04" },
    { x: 80, y: 130, label: "NG" },
  ];
  const links: [number, number][] = [
    [4, 0], [4, 1], [4, 2], [4, 3], [0, 1], [1, 2], [2, 3], [3, 0],
  ];
  return (
    <Frame>
      <svg viewBox="0 0 360 360" width="100%" height="100%">
        {links.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(213,162,81,0.35)" strokeWidth="1.4"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.45 + i * 0.08, duration: 0.7 }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.x} cy={n.y} r={i === 4 ? 28 : 22} fill="#141210" stroke={GOLD}
              strokeWidth={i === 4 ? 2 : 1.5}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 200 }}
              style={{ filter: "drop-shadow(0 0 12px rgba(213,162,81,0.45))" }}
            />
            <motion.text
              x={n.x} y={n.y + 5} textAnchor="middle" fill={GOLD_SOFT}
              fontSize={i === 4 ? 12 : 13} fontWeight="800" fontFamily="Manrope, sans-serif"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              {n.label}
            </motion.text>
          </g>
        ))}
        <motion.circle
          cx="180" cy="180" r="110" fill="none" stroke="rgba(213,162,81,0.15)"
          strokeWidth="1" strokeDasharray="4 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "180px 180px" }}
        />
      </svg>
    </Frame>
  );
}

function GeographyVisual() {
  return (
    <Frame wide>
      <GeographyMap active compact />
    </Frame>
  );
}

/** Only partnership uses Lucide icon */
function PartnershipVisual() {
  return (
    <Frame>
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "78%",
          height: "78%",
          borderRadius: "50%",
          border: "1px dashed rgba(213,162,81,0.22)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "62%",
          height: "62%",
          borderRadius: "50%",
          border: "1px solid rgba(213,162,81,0.16)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.1, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "48%",
          height: "48%",
          borderRadius: "50%",
          border: "1.5px solid rgba(232,201,122,0.45)",
          boxShadow: "0 0 24px rgba(213,162,81,0.2)",
        }}
      />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 180, damping: 16 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: 180,
          height: 180,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1E1A14 0%, #12100C 100%)",
          border: "1.5px solid rgba(213,162,81,0.55)",
          boxShadow: "0 0 40px rgba(213,162,81,0.28), inset 0 0 28px rgba(213,162,81,0.06)",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            color: GOLD_SOFT,
            filter: "drop-shadow(0 0 14px rgba(213,162,81,0.7))",
            display: "flex",
          }}
        >
          <Handshake size={96} strokeWidth={1.25} />
        </motion.div>
      </motion.div>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
          style={{
            position: "absolute",
            width: `${70 - i * 8}%`,
            height: `${70 - i * 8}%`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: 6,
              height: 6,
              marginLeft: -3,
              borderRadius: "50%",
              background: i === 0 ? GOLD_SOFT : GOLD,
              boxShadow: "0 0 10px rgba(213,162,81,0.8)",
            }}
          />
        </motion.div>
      ))}
    </Frame>
  );
}

function CareersVisual() {
  const bars = [48, 78, 110, 150, 195];
  return (
    <Frame>
      <svg viewBox="0 0 360 360" width="100%" height="100%">
        <motion.path
          d="M70 290 L120 230 L170 250 L230 170 L290 90"
          fill="none" stroke="rgba(213,162,81,0.25)" strokeWidth="2" strokeDasharray="4 6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        />
        <motion.path
          d="M70 290 L120 230 L170 250 L230 170 L290 90"
          fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.55, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 10px rgba(213,162,81,0.55))" }}
        />
        {bars.map((h, i) => {
          const x = 80 + i * 48;
          return (
            <g key={i}>
              <motion.rect
                x={x} y={300 - h} width="28" height={h}
                fill="rgba(213,162,81,0.12)" stroke={GOLD} strokeWidth="1.2"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${x + 14}px 300px` }}
              />
              <motion.circle
                cx={x + 14} cy={300 - h} r="5" fill={GOLD_SOFT}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                style={{ filter: "drop-shadow(0 0 8px rgba(232,201,122,0.8))" }}
              />
            </g>
          );
        })}
        <motion.circle
          r="4" fill={GOLD_SOFT}
          animate={{
            cx: [70, 120, 170, 230, 290],
            cy: [290, 230, 250, 170, 90],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </Frame>
  );
}

function ContactsVisual() {
  return (
    <Frame>
      <svg viewBox="0 0 360 360" width="100%" height="100%">
        {[50, 90, 130].map((r, i) => (
          <motion.circle
            key={r} cx="180" cy="180" r={r} fill="none" stroke={GOLD} strokeWidth="1.2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.35, 0, 0.35], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 3.2, delay: i * 0.45, repeat: Infinity }}
          />
        ))}
        <motion.rect
          x="115" y="130" width="130" height="90" rx="6"
          fill="#141210" stroke={GOLD} strokeWidth="2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ filter: "drop-shadow(0 0 16px rgba(213,162,81,0.35))" }}
        />
        <motion.path
          d="M115 140 L180 185 L245 140" fill="none" stroke={GOLD_SOFT}
          strokeWidth="1.8" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />
        <motion.circle
          cx="180" cy="180" r="6" fill={GOLD}
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 10px rgba(213,162,81,0.9))" }}
        />
        {[
          [80, 90], [280, 100], [70, 260], [290, 250],
        ].map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r="4" fill={GOLD_SOFT}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
    </Frame>
  );
}

export function PageHeroVisual({ kind }: { kind: HeroVisualKind }) {
  switch (kind) {
    case "history":
      return <HistoryVisual />;
    case "business":
      return <BusinessVisual />;
    case "geography":
      return <GeographyVisual />;
    case "partnership":
      return <PartnershipVisual />;
    case "careers":
      return <CareersVisual />;
    case "contacts":
      return <ContactsVisual />;
  }
}
