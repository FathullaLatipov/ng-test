import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1683843392592-12de59d26cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const HEADLINE_LINES = [
  { text: "BUILT FOR", gold: false },
  { text: "GROWTH.", gold: true },
];

function Particle({ x, y, size, delay, duration }: {
  x: number; y: number; size: number; delay: number; duration: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#C9A24B",
        pointerEvents: "none",
      }}
      animate={{
        y: [0, -40, 0],
        opacity: [0.1, 0.5, 0.1],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 23) % 100,
        size: (i % 3) + 1.5,
        delay: (i * 0.41) % 4,
        duration: 3 + (i * 0.7) % 4,
      })),
    []
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        overflow: "hidden",
        background: "#0A0A0A",
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          y: imageY,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "120%",
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.35) saturate(0.6)",
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(201,162,75,0.08) 0%, transparent 50%, rgba(10,10,10,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.0) 40%, rgba(10,10,10,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated ambient glow */}
      <motion.div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,162,75,0.12) 0%, transparent 70%)",
          top: "20%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gold particles */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Thin gold diagonal lines (motion blur aesthetic) */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        <line x1="75%" y1="0" x2="100%" y2="35%" stroke="#C9A24B" strokeWidth="0.5" />
        <line x1="80%" y1="0" x2="100%" y2="28%" stroke="#C9A24B" strokeWidth="0.3" />
        <line x1="65%" y1="0" x2="95%" y2="50%" stroke="#C9A24B" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          maxWidth: 900,
          y: contentY,
          opacity,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 32, height: 1, background: "#C9A24B" }} />
          <span
            style={{
              color: "#C9A24B",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.3em",
            }}
          >
            NOBEL GROUP · UZBEKISTAN
          </span>
        </motion.div>

        {/* Main headline — word by word stagger */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          {HEADLINE_LINES.map((line, li) => (
            <div key={li} style={{ overflow: "hidden" }}>
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.35 + li * 0.15,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontSize: "clamp(60px, 9vw, 112px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.0,
                  color: line.gold ? "#C9A24B" : "#FFFFFF",
                  display: "block",
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{
            color: "#9A9A9A",
            fontSize: 17,
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 40,
            maxWidth: 520,
          }}
        >
          Wholesale · Distribution · HoReCa · Production
          <br />
          <span style={{ color: "#FFFFFF", fontWeight: 500 }}>
            One holding. Six directions. Unlimited reach.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-block",
              background: "#C9A24B",
              color: "#0A0A0A",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "16px 36px",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D4AF37";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(201,162,75,0.55)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A24B";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            BECOME A PARTNER
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#C9A24B",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.12em",
              padding: "15px 36px",
              border: "1px solid rgba(201,162,75,0.5)",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,162,75,0.08)";
              e.currentTarget.style.borderColor = "#C9A24B";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(201,162,75,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            CONTACT US
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.2em", fontWeight: 500 }}>
          SCROLL
        </span>
        <motion.div
          style={{
            width: 1,
            background: "linear-gradient(to bottom, #C9A24B, transparent)",
            height: 48,
          }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom gold border that will blend into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,162,75,0.4) 50%, transparent)",
        }}
      />
    </section>
  );
}
