import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const CITIES = [
  { id: "tashkent", name: "Tashkent", role: "Headquarters & Main Hub", x: 490, y: 60, main: true },
  { id: "samarkand", name: "Samarkand", role: "Distribution Center", x: 380, y: 140, main: false },
  { id: "bukhara", name: "Bukhara", role: "Regional Warehouse", x: 280, y: 132, main: false },
  { id: "namangan", name: "Namangan", role: "Fergana Distribution", x: 590, y: 72, main: false },
  { id: "andijan", name: "Andijan", role: "East Region Hub", x: 625, y: 90, main: false },
  { id: "urgench", name: "Urgench", role: "West Region Center", x: 160, y: 82, main: false },
  { id: "termez", name: "Termez", role: "South Logistics Point", x: 420, y: 238, main: false },
  { id: "jizzakh", name: "Jizzakh", role: "Central Depot", x: 440, y: 108, main: false },
];

function CityDot({ city, inView, delay }: { city: typeof CITIES[0]; inView: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Outer pulse ring 1 */}
      {city.main && (
        <motion.circle
          cx={city.x}
          cy={city.y}
          r={20}
          fill="none"
          stroke="#C9A24B"
          strokeWidth="0.8"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${city.x}px ${city.y}px` }}
        />
      )}

      {/* Outer pulse ring 2 (offset) */}
      <motion.circle
        cx={city.x}
        cy={city.y}
        r={12}
        fill="none"
        stroke="rgba(201,162,75,0.4)"
        strokeWidth="0.8"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        style={{ transformOrigin: `${city.x}px ${city.y}px` }}
      />

      {/* Main dot */}
      <motion.circle
        cx={city.x}
        cy={city.y}
        r={city.main ? 6 : (hovered ? 5 : 4)}
        fill={hovered ? "#D4AF37" : "#C9A24B"}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay, duration: 0.4 }}
        style={{ filter: hovered ? "drop-shadow(0 0 6px rgba(201,162,75,0.8))" : "none", transition: "all 0.3s" }}
      />

      {/* City name label */}
      <motion.text
        x={city.x + (city.x > 400 ? -8 : 10)}
        y={city.y - 10}
        fill="#FFFFFF"
        fontSize={hovered ? "11" : "9.5"}
        fontWeight={hovered ? "700" : "500"}
        textAnchor={city.x > 400 ? "end" : "start"}
        fontFamily="Manrope, sans-serif"
        letterSpacing="0.06em"
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.2 }}
        style={{ transition: "font-size 0.3s" }}
      >
        {city.name}
      </motion.text>

      {/* Role label on hover */}
      {hovered && (
        <motion.text
          x={city.x + (city.x > 400 ? -8 : 10)}
          y={city.y + 22}
          fill="#C9A24B"
          fontSize="8"
          fontWeight="500"
          textAnchor={city.x > 400 ? "end" : "start"}
          fontFamily="Manrope, sans-serif"
          letterSpacing="0.08em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {city.role}
        </motion.text>
      )}
    </g>
  );
}

export function Geography() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="geography"
      style={{
        background: "#0A0A0A",
        padding: "120px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,162,75,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }} ref={ref}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            marginBottom: 72,
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
                COVERAGE MAP
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
              EVERYWHERE
              <br />
              <span style={{ color: "#C9A24B" }}>IN UZBEKISTAN.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <p
              style={{
                color: "#9A9A9A",
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 1.75,
                marginBottom: 24,
              }}
            >
              From Karakalpakstan in the northwest to the Fergana Valley in the east — Nobel Group operates 8 strategic hubs covering all 7 regions of Uzbekistan with dedicated logistics infrastructure.
            </p>

            {/* Legend */}
            <div style={{ display: "flex", gap: 24 }}>
              {[
                { color: "#C9A24B", label: "HQ & Main Hub", size: 10 },
                { color: "#C9A24B", label: "Distribution Centers", size: 7, opacity: 0.7 },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: item.size,
                      height: item.size,
                      borderRadius: "50%",
                      background: item.color,
                      opacity: item.opacity ?? 1,
                      boxShadow: `0 0 8px rgba(201,162,75,0.5)`,
                    }}
                  />
                  <span style={{ color: "#9A9A9A", fontSize: 12, fontWeight: 500 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          style={{
            background: "#0D0D0D",
            border: "1px solid rgba(201,162,75,0.15)",
            padding: "48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Hover annotation */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              color: "rgba(201,162,75,0.4)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
            }}
          >
            HOVER CITY DOTS FOR INFO · DOTS PULSE CONTINUOUSLY
          </div>

          <svg
            viewBox="0 0 740 290"
            style={{ width: "100%", height: "auto", overflow: "visible" }}
          >
            {/* Uzbekistan outline */}
            <motion.path
              d="M 78,62 L 100,42 L 130,30 L 180,18 L 240,14 L 310,16 L 390,22 L 440,35 L 478,32 L 500,48 L 520,38 L 540,30 L 558,42 L 580,38 L 600,50 L 628,58 L 645,72 L 650,92 L 638,108 L 618,114 L 598,106 L 576,90 L 558,98 L 545,118 L 528,148 L 510,178 L 488,208 L 465,228 L 440,238 L 410,242 L 370,240 L 330,236 L 285,228 L 245,216 L 208,200 L 172,182 L 140,162 L 108,140 L 78,115 L 55,90 L 58,68 L 68,58 Z"
              fill="rgba(201,162,75,0.04)"
              stroke="rgba(201,162,75,0.35)"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Connecting lines between cities */}
            {[
              [490, 60, 380, 140],
              [490, 60, 590, 72],
              [490, 60, 440, 108],
              [490, 60, 625, 90],
              [380, 140, 280, 132],
              [380, 140, 420, 238],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(201,162,75,0.15)"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
              />
            ))}

            {/* City dots */}
            {CITIES.map((city, i) => (
              <CityDot
                key={city.id}
                city={city}
                inView={inView}
                delay={1.6 + i * 0.1}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
