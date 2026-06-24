import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";

const STATS = [
  { value: 600, suffix: "+", label: "Employees", sublabel: "Across all divisions" },
  { value: 15, suffix: "+", label: "Own Brands", sublabel: "Developed in-house" },
  { value: 7, suffix: "", label: "Regions", sublabel: "Covered across Uzbekistan" },
  { value: 200, suffix: "+", label: "Partners", sublabel: "Retail & HoReCa network" },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.25, 0, 0, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        background: "#0D0D0D",
        position: "relative",
        padding: "120px 80px",
        overflow: "hidden",
      }}
    >
      {/* Top gold gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,162,75,0.6) 50%, transparent)",
        }}
      />

      {/* Background noise / texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(201,162,75,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(201,162,75,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 72,
          }}
        >
          <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
          <span
            style={{
              color: "#C9A24B",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.3em",
            }}
          >
            NUMBERS THAT SPEAK
          </span>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "0 40px",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                position: "relative",
              }}
            >
              {/* Ghost frame — shows animation in-progress state */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: 40,
                  color: "rgba(201,162,75,0.08)",
                  fontSize: 96,
                  fontWeight: 800,
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                0{stat.suffix}
              </div>

              {/* Animated number */}
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: "#C9A24B",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>

              {/* Label */}
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>

              {/* Sub-label */}
              <div
                style={{
                  color: "#9A9A9A",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  marginTop: 4,
                  lineHeight: 1.5,
                }}
              >
                {stat.sublabel}
              </div>

              {/* Gold bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
                style={{
                  marginTop: 24,
                  height: 2,
                  background: "linear-gradient(to right, #C9A24B, transparent)",
                  transformOrigin: "left",
                  width: "60%",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Motion annotation: arrow showing count-up direction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 24, height: 1, background: "rgba(201,162,75,0.3)" }} />
          <span style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em" }}>
            ↑ ANIMATED · NUMBERS COUNT UP ON SCROLL ENTER
          </span>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,162,75,0.3) 50%, transparent)",
        }}
      />
    </section>
  );
}
