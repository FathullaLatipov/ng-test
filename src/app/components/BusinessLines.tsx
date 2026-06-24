import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const LINES = [
  {
    id: "wholesale",
    label: "01",
    title: "Wholesale",
    subtitle: "B2B Trade Network",
    desc: "Strategic supply of 800+ SKUs to hypermarkets, supermarkets, and regional retail chains across all 7 regions of Uzbekistan.",
    image: "https://images.unsplash.com/photo-1617448570646-652843c87581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stats: [
      { n: "500+", l: "Retail clients" },
      { n: "7", l: "Regions" },
      { n: "800+", l: "SKUs" },
    ],
  },
  {
    id: "distribution",
    label: "02",
    title: "Distribution",
    subtitle: "Logistics Infrastructure",
    desc: "End-to-end temperature-controlled distribution with same-day delivery capabilities and real-time tracking across the network.",
    image: "https://images.unsplash.com/photo-1633523316711-a969b8f47bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stats: [
      { n: "120+", l: "Fleet vehicles" },
      { n: "24h", l: "Delivery cycle" },
      { n: "8000 m²", l: "Warehouse" },
    ],
  },
  {
    id: "horeca",
    label: "03",
    title: "HoReCa",
    subtitle: "Hospitality Sector",
    desc: "Tailored supply solutions for hotels, restaurants, and cafes — with dedicated account managers and premium product lines.",
    image: "https://images.unsplash.com/photo-1668838225765-daa3a5da6207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stats: [
      { n: "200+", l: "HoReCa partners" },
      { n: "Premium", l: "Tier service" },
      { n: "Daily", l: "Fresh delivery" },
    ],
  },
  {
    id: "production",
    label: "04",
    title: "Production",
    subtitle: "Own Manufacturing",
    desc: "EcoBorn eco-certified line and Dairy Direction — from raw material sourcing to finished product on the retailer shelf.",
    image: "https://images.unsplash.com/photo-1683843392592-12de59d26cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stats: [
      { n: "2", l: "Own brands" },
      { n: "Eco", l: "Certified" },
      { n: "Local", l: "Production" },
    ],
  },
];

function BusinessCard({
  line,
  index,
  inView,
}: {
  line: (typeof LINES)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#111111",
        border: hovered ? "1px solid rgba(201,162,75,0.5)" : "1px solid rgba(255,255,255,0.06)",
        cursor: "default",
        transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201,162,75,0.12)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Background image (reveals on hover) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${line.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.12) saturate(0.3)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Gold gradient overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(135deg, rgba(201,162,75,0.08) 0%, transparent 100%)"
            : "transparent",
          transition: "background 0.5s",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", padding: "40px 32px" }}>
        {/* Top row: number + animated top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              color: hovered ? "#C9A24B" : "rgba(201,162,75,0.3)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.2em",
              transition: "color 0.4s",
            }}
          >
            {line.label}
          </span>

          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              width: 20,
              height: 20,
              border: `1px solid ${hovered ? "#C9A24B" : "rgba(255,255,255,0.2)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.4s",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 7L7 1M7 1H2M7 1V6" stroke={hovered ? "#C9A24B" : "#9A9A9A"} strokeWidth="1" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          {line.title}
        </div>

        <div
          style={{
            color: "#C9A24B",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            marginBottom: 20,
          }}
        >
          {line.subtitle}
        </div>

        {/* Description */}
        <div
          style={{
            color: "#9A9A9A",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          {line.desc}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {line.stats.map((s) => (
            <div key={s.l}>
              <div
                style={{
                  color: hovered ? "#C9A24B" : "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 700,
                  transition: "color 0.4s",
                  letterSpacing: "0.02em",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  color: "#9A9A9A",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  marginTop: 2,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessLines() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="business"
      style={{
        background: "#0D0D0D",
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
            "radial-gradient(ellipse at 20% 80%, rgba(201,162,75,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }} ref={ref}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
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
                LINES OF BUSINESS
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
              FOUR DIRECTIONS.
              <br />
              <span style={{ color: "#C9A24B" }}>ONE GOAL.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              color: "rgba(201,162,75,0.5)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textAlign: "right",
              maxWidth: 200,
              lineHeight: 1.6,
            }}
          >
            HOVER CARDS TO SEE BACKGROUND IMAGE REVEAL + GOLD GLOW STATE
          </motion.div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {LINES.map((line, i) => (
            <BusinessCard key={line.id} line={line} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
