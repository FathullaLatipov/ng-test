import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L4 7v7c0 6 4.4 11.6 10 13 5.6-1.4 10-7 10-13V7L14 2z" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
        <path d="M9 14l3 3 7-7" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Reliability",
    desc: "Every delivery, every commitment — fulfilled on time and in full. We don't make promises we can't keep.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,2 17.5,10.5 26,11.5 20,17.5 21.8,26 14,21.8 6.2,26 8,17.5 2,11.5 10.5,10.5" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
      </svg>
    ),
    title: "Premium Quality",
    desc: "From sourcing to delivery — we apply the highest standards across every product we handle or produce.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="6" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
        <path d="M10 16v8M18 16v8M8 20h12" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M11 7l2 2 4-4" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Innovation",
    desc: "We continuously invest in technology, logistics, and own-brand development to stay ahead of the market.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="3,20 9,12 15,15 25,6" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
        <polyline points="20,6 25,6 25,11" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Growth",
    desc: "Year over year expansion — in regions covered, brands managed, partners served, and people employed.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        <circle cx="14" cy="8" r="4" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
        <path d="M2 26c0-3.3 2.7-6 6-6" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M26 26c0-3.3-2.7-6-6-6" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="6" cy="14" r="3" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
        <circle cx="22" cy="14" r="3" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
      </svg>
    ),
    title: "Partnership",
    desc: "We build long-term relationships with manufacturers, retailers, and HoReCa operators based on mutual benefit.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3c0 0-8 4-8 11 0 4.4 3.6 8 8 8s8-3.6 8-8c0-7-8-11-8-11z" stroke="#C9A24B" strokeWidth="1.3" fill="none"/>
        <path d="M14 14v6" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M11 16.5l3-2.5 3 2.5" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: "Sustainability",
    desc: "EcoBorn and Dairy Direction lead our commitment to responsible production and environmental stewardship.",
  },
];

function ValueCard({ value, delay, inView }: { value: typeof VALUES[0]; delay: number; inView: boolean }) {
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
        border: hovered ? "1px solid rgba(201,162,75,0.4)" : "1px solid rgba(255,255,255,0.06)",
        padding: "36px 28px",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 48px rgba(0,0,0,0.5), 0 0 24px rgba(201,162,75,0.1)"
          : "none",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0.4, opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2,
          width: "100%",
          background: "linear-gradient(to right, #C9A24B, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Icon with micro-animation container */}
      <motion.div
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: 20 }}
      >
        {value.icon}
      </motion.div>

      <div
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.04em",
          marginBottom: 12,
        }}
      >
        {value.title}
      </div>

      <div
        style={{
          color: "#9A9A9A",
          fontSize: 13,
          fontWeight: 400,
          lineHeight: 1.7,
        }}
      >
        {value.desc}
      </div>
    </motion.div>
  );
}

export function MissionValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="values"
      style={{
        background: "#0A0A0A",
        padding: "120px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 80% 50%, rgba(201,162,75,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }} ref={ref}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            marginBottom: 80,
            alignItems: "end",
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
            >
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>
                MISSION & VALUES
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
              }}
            >
              WE BUILD
              <br />
              <span style={{ color: "#C9A24B" }}>ECOSYSTEMS,</span>
              <br />
              NOT JUST SUPPLY CHAINS.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Mission statement */}
            <div
              style={{
                borderLeft: "2px solid #C9A24B",
                paddingLeft: 24,
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: 17,
                  fontWeight: 500,
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                  marginBottom: 16,
                }}
              >
                Our mission is to connect Uzbekistan's producers with every table — building the most reliable, expansive, and innovative food distribution network in Central Asia.
              </p>
              <p
                style={{
                  color: "#9A9A9A",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                From our own EcoBorn and Dairy Direction production facilities to 200+ retail and HoReCa partners across 7 regions — Nobel Group is the backbone of food commerce in Uzbekistan.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} value={v} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8 }}
        >
          <div style={{ width: 16, height: 1, background: "rgba(201,162,75,0.3)" }} />
          <span style={{ color: "#9A9A9A", fontSize: 11, letterSpacing: "0.12em" }}>
            HOVER EACH CARD — ICON LIFTS · BORDER GLOWS GOLD · CARD ELEVATES
          </span>
        </motion.div>
      </div>
    </section>
  );
}
