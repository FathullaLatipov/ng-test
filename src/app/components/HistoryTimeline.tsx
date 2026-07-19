import { useRef } from "react";
import { motion, useInView } from "motion/react";

const MILESTONES = [
  {
    year: "2010",
    title: "Company Founded",
    desc: "Nobel Group established in Tashkent with a vision to build Uzbekistan's premier food distribution holding.",
  },
  {
    year: "2013",
    title: "First Distribution Center",
    desc: "Opened 8,000 m² distribution facility in Tashkent, laying the foundation for nationwide logistics infrastructure.",
  },
  {
    year: "2016",
    title: "Nobel group Launch",
    desc: "Launched wholesale trade division, establishing direct supply contracts with 500+ retail outlets across 3 regions.",
  },
  {
    year: "2018",
    title: "EcoBorn Founded",
    desc: "Launched own premium eco-certified product brand, marking Nobel Group's entry into production.",
  },
  {
    year: "2020",
    title: "5-Region Expansion",
    desc: "Extended distribution network to cover 5 major regions of Uzbekistan with a dedicated fleet of 120+ vehicles.",
  },
  {
    year: "2022",
    title: "Dairy Direction",
    desc: "Entered dairy sector with a new production facility — launch of the Dairy Direction division.",
  },
  {
    year: "2024",
    title: "Group at Full Strength",
    desc: "Reached 600+ employees, 15+ brands, 200+ partners — the largest independent food distribution holding in Uzbekistan.",
  },
];

function TimelineItem({
  milestone,
  index,
  total,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLast = index === total - 1;
  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 60px 1fr",
        alignItems: "start",
        minHeight: 120,
      }}
    >
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: "0 40px 0 0",
          textAlign: "right",
          paddingBottom: 40,
          visibility: isOdd ? "hidden" : "visible",
        }}
      >
        {!isOdd && (
          <>
            <div
              style={{
                color: "#C9A24B",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.2em",
                marginBottom: 8,
              }}
            >
              {milestone.year}
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.02em",
                marginBottom: 8,
              }}
            >
              {milestone.title}
            </div>
            <div
              style={{
                color: "#9A9A9A",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: 280,
                marginLeft: "auto",
              }}
            >
              {milestone.desc}
            </div>
          </>
        )}
      </motion.div>

      {/* Center: vertical line + dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Top line segment */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 1,
            height: index === 0 ? 24 : 24,
            background: "rgba(201,162,75,0.3)",
            transformOrigin: "top",
          }}
        />

        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#0A0A0A",
            border: "2px solid #C9A24B",
            position: "relative",
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          {/* Pulse ring */}
          <motion.div
            animate={{
              scale: [1, 2.5],
              opacity: [0.8, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: "50%",
              border: "1px solid rgba(201,162,75,0.6)",
            }}
          />
        </motion.div>

        {/* Bottom line segment */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              width: 1,
              flex: 1,
              minHeight: 80,
              background:
                "linear-gradient(to bottom, rgba(201,162,75,0.4) 0%, rgba(201,162,75,0.15) 100%)",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: "0 0 40px 40px",
          paddingBottom: 40,
          visibility: isOdd ? "visible" : "hidden",
        }}
      >
        {isOdd && (
          <>
            <div
              style={{
                color: "#C9A24B",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.2em",
                marginBottom: 8,
              }}
            >
              {milestone.year}
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.02em",
                marginBottom: 8,
              }}
            >
              {milestone.title}
            </div>
            <div
              style={{
                color: "#9A9A9A",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: 280,
              }}
            >
              {milestone.desc}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function HistoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="history"
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
            "radial-gradient(ellipse at 50% 100%, rgba(201,162,75,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
          <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>
            OUR JOURNEY
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
            marginBottom: 80,
          }}
        >
          14 YEARS OF
          <br />
          <span style={{ color: "#C9A24B" }}>RELENTLESS GROWTH.</span>
        </motion.h2>

        {/* Motion annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "rgba(201,162,75,0.5)", fontSize: 11, letterSpacing: "0.15em" }}>
            ↓ TIMELINE REVEALS AS YOU SCROLL · DOTS PULSE WITH GOLD RING ANIMATION
          </span>
        </motion.div>

        {/* Timeline items */}
        <div>
          {MILESTONES.map((m, i) => (
            <TimelineItem key={m.year} milestone={m} index={i} total={MILESTONES.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
