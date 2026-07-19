import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const DIVISIONS = [
  {
    id: "trade",
    name: "Nobel group",
    desc: "Large-scale wholesale operations and strategic retail network management across all regions.",
    icon: "◈",
    color: "#C9A24B",
  },
  {
    id: "distribution",
    name: "Nobel Distribution",
    desc: "End-to-end nationwide distribution infrastructure with temperature-controlled logistics.",
    icon: "◉",
    color: "#C9A24B",
  },
  {
    id: "ecoborn",
    name: "EcoBorn",
    desc: "Own production of premium eco-certified food products for retail and HoReCa channels.",
    icon: "◍",
    color: "#C9A24B",
  },
  {
    id: "dairy",
    name: "Dairy Direction",
    desc: "Specialized dairy production, processing, and distribution across Uzbekistan's key markets.",
    icon: "◌",
    color: "#C9A24B",
  },
];

function DivisionCard({
  division,
  inView,
  delay,
}: {
  division: (typeof DIVISIONS)[0];
  inView: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#161616" : "#111111",
        border: hovered
          ? "1px solid rgba(201,162,75,0.6)"
          : "1px solid rgba(255,255,255,0.07)",
        padding: "28px 24px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,162,75,0.15)"
          : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 32,
          height: 2,
          background: "#C9A24B",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />

      {/* Icon */}
      <div
        style={{
          color: "#C9A24B",
          fontSize: 24,
          marginBottom: 16,
        }}
      >
        {division.icon}
      </div>

      <div
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.04em",
          marginBottom: 10,
        }}
      >
        {division.name}
      </div>

      <div
        style={{
          color: "#9A9A9A",
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1.65,
        }}
      >
        {division.desc}
      </div>

      {/* Hover reveal: "Learn more" */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#C9A24B",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.15em",
        }}
      >
        EXPLORE →
      </motion.div>
    </motion.div>
  );
}

export function GroupStructure() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="structure"
      ref={ref}
      style={{
        background: "#0A0A0A",
        padding: "120px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,75,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>
              HOLDING STRUCTURE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: 600,
            }}
          >
            ONE GROUP,
            <br />
            <span style={{ color: "#C9A24B" }}>FOUR DIRECTIONS.</span>
          </motion.h2>
        </div>

        {/* SVG Connection diagram */}
        <div style={{ position: "relative" }}>
          {/* Nobel Group — central hub card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              width: 260,
              margin: "0 auto 0 auto",
              background: "linear-gradient(135deg, #1A1500 0%, #111111 100%)",
              border: "1px solid rgba(201,162,75,0.5)",
              padding: "24px 32px",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 0 40px rgba(201,162,75,0.12), 0 0 80px rgba(0,0,0,0.5)",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          >
            {/* Corner marks */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  border: "1px solid #C9A24B",
                  ...pos,
                  transform:
                    i === 0
                      ? "translate(-1px,-1px)"
                      : i === 1
                      ? "translate(1px,-1px)"
                      : i === 2
                      ? "translate(-1px,1px)"
                      : "translate(1px,1px)",
                }}
              />
            ))}

            <div
              style={{
                color: "#C9A24B",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.3em",
                marginBottom: 8,
              }}
            >
              HOLDING
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.04em",
              }}
            >
              NOBEL GROUP
            </div>
            <div
              style={{
                color: "#9A9A9A",
                fontSize: 12,
                marginTop: 6,
                letterSpacing: "0.05em",
              }}
            >
              Tashkent, Uzbekistan
            </div>
          </motion.div>

          {/* SVG connecting lines */}
          <svg
            style={{
              position: "absolute",
              top: 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: 80,
              overflow: "visible",
              pointerEvents: "none",
            }}
            viewBox="0 0 800 80"
            preserveAspectRatio="none"
          >
            {/* Vertical stem from parent */}
            <motion.line
              x1="400" y1="0" x2="400" y2="30"
              stroke="#C9A24B" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
            {/* Horizontal bar */}
            <motion.line
              x1="100" y1="30" x2="700" y2="30"
              stroke="#C9A24B" strokeWidth="1"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000, opacity: 0 }}
              animate={inView ? { strokeDashoffset: 0, opacity: 0.8 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            />
            {/* Drop lines to each card */}
            {[100, 300, 500, 700].map((x, i) => (
              <motion.line
                key={x}
                x1={x} y1="30" x2={x} y2="80"
                stroke="#C9A24B" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
              />
            ))}
            {/* Dots at intersections */}
            {[100, 300, 500, 700].map((x) => (
              <motion.circle
                key={`dot-${x}`}
                cx={x} cy="30" r="3"
                fill="#C9A24B"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
            ))}
          </svg>

          {/* Motion annotation */}
          <div
            style={{
              position: "absolute",
              top: 90,
              right: 0,
              color: "rgba(201,162,75,0.4)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>↖ LINES DRAW IN ON SCROLL</span>
          </div>

          {/* Division cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginTop: 80,
            }}
          >
            {DIVISIONS.map((div, i) => (
              <DivisionCard
                key={div.id}
                division={div}
                inView={inView}
                delay={1.0 + i * 0.1}
              />
            ))}
          </div>

          {/* Hover annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingLeft: 4,
            }}
          >
            <div style={{ width: 16, height: 1, background: "rgba(201,162,75,0.3)" }} />
            <span style={{ color: "#9A9A9A", fontSize: 11, letterSpacing: "0.12em" }}>
              HOVER CARDS TO REVEAL — CARDS LIFT AND GLOW GOLD ON HOVER
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
