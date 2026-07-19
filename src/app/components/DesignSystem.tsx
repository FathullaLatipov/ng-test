import { useState } from "react";
import { motion } from "motion/react";

const PALETTE = [
  { name: "Primary Black", hex: "#0A0A0A", role: "Body background" },
  { name: "Card Black", hex: "#111111", role: "Cards & sections" },
  { name: "Dark Gray", hex: "#1C1C1C", role: "Elevated cards" },
  { name: "Gold", hex: "#C9A24B", role: "Primary accent" },
  { name: "Gold Bright", hex: "#D4AF37", role: "Hover / glow state" },
  { name: "White", hex: "#FFFFFF", role: "Headings & key text" },
  { name: "Gray", hex: "#9A9A9A", role: "Body / secondary text" },
];

const TYPE_SCALE = [
  { name: "H1 Hero", size: "96–112px", weight: "800", case: "UPPERCASE", note: "Kinetic reveal, word stagger" },
  { name: "H2 Section", size: "48–56px", weight: "800", case: "UPPERCASE", note: "Scroll fade-up" },
  { name: "H3 Card", size: "24–28px", weight: "700", case: "Title Case", note: "Hover lift" },
  { name: "Eyebrow", size: "11px", weight: "600", case: "UPPERCASE", note: "0.3em letter-spacing, gold" },
  { name: "Body", size: "14–16px", weight: "400", case: "Normal", note: "1.7 line-height, gray" },
  { name: "Stat", size: "72–80px", weight: "800", case: "—", note: "Count-up, tabular nums, gold" },
  { name: "Caption", size: "11px", weight: "500", case: "UPPERCASE", note: "0.2em tracking" },
];

const ANIMATIONS = [
  { name: "Scroll Reveal", desc: "Elements fade in + slide up 30–50px as they enter viewport. Once-only trigger.", type: "scroll" },
  { name: "Hero Kinetic Type", desc: "H1 words clip-reveal upward with 150ms stagger between each word.", type: "load" },
  { name: "Count-Up Numbers", desc: "Stats animate 0→target in 2.2s with ease-out curve on viewport enter.", type: "scroll" },
  { name: "SVG Path Draw", desc: "Org chart gold lines draw via pathLength 0→1 on scroll enter, 0.8s each.", type: "scroll" },
  { name: "Pulse Ring", desc: "City dots and timeline nodes emit concentric ring pulses continuously.", type: "loop" },
  { name: "Parallax Hero", desc: "Background image moves at 25% speed of foreground content on scroll.", type: "scroll" },
  { name: "Card Hover Lift", desc: "Cards translateY(-6–10px), border gold glow, box-shadow depth on hover.", type: "hover" },
  { name: "Marquee Loop", desc: "Brand strips auto-scroll: own brands forward 40s, partners reverse 35s.", type: "loop" },
  { name: "Ambient Glow", desc: "Hero gold radial gradient breathes scale 1→1.15→1 in 6s loop.", type: "loop" },
  { name: "Header Shrink", desc: "Nav compresses + gains backdrop blur on scroll past 60px threshold.", type: "scroll" },
];

export function DesignSystem() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <section
      style={{
        background: "#080808",
        padding: "100px 80px",
        borderTop: "1px solid rgba(201,162,75,0.15)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>
              DESIGN SPECIFICATIONS
            </span>
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            DESIGN SYSTEM REFERENCE
          </h2>
          <p style={{ color: "#9A9A9A", fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 600 }}>
            Palette swatches · Typography scale · UI components with hover/animated states · Motion inventory
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          {/* Left column */}
          <div>
            {/* Palette */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", marginBottom: 24 }}>
                COLOR PALETTE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PALETTE.map((p) => (
                  <div
                    key={p.hex}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr auto",
                      alignItems: "center",
                      gap: 16,
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: p.hex,
                        border: p.hex === "#0A0A0A" || p.hex === "#111111" || p.hex === "#1C1C1C"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "none",
                      }}
                    />
                    <div>
                      <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ color: "#9A9A9A", fontSize: 11, marginTop: 2 }}>{p.role}</div>
                    </div>
                    <div style={{ color: "#C9A24B", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
                      {p.hex}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ratio note */}
              <div
                style={{
                  marginTop: 20,
                  padding: "12px 16px",
                  background: "rgba(201,162,75,0.06)",
                  border: "1px solid rgba(201,162,75,0.15)",
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", height: 8, width: "100%", overflow: "hidden" }}>
                  <div style={{ flex: 7, background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div style={{ flex: 2, background: "#FFFFFF" }} />
                  <div style={{ flex: 1, background: "#C9A24B" }} />
                </div>
                <div style={{ color: "#9A9A9A", fontSize: 10, whiteSpace: "nowrap", letterSpacing: "0.1em" }}>
                  70% / 20% / 10%
                </div>
              </div>
            </div>

            {/* UI Components */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", marginBottom: 24 }}>
                UI COMPONENTS · HOVER STATES ACTIVE
              </div>

              {/* Primary CTA */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.15em", marginBottom: 10 }}>
                  PRIMARY CTA — Gold Fill
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button
                    onMouseEnter={() => setHoveredBtn("p1")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      background: hoveredBtn === "p1" ? "#D4AF37" : "#C9A24B",
                      border: "none",
                      color: "#0A0A0A",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      padding: "14px 28px",
                      cursor: "pointer",
                      boxShadow: hoveredBtn === "p1" ? "0 0 24px rgba(201,162,75,0.5)" : "none",
                      transform: hoveredBtn === "p1" ? "translateY(-2px)" : "none",
                      transition: "all 0.35s",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    BECOME A PARTNER
                  </button>
                  <span style={{ color: "rgba(201,162,75,0.5)", fontSize: 10, letterSpacing: "0.15em" }}>
                    {hoveredBtn === "p1" ? "← HOVER STATE ACTIVE" : "↑ HOVER ME"}
                  </span>
                </div>
              </div>

              {/* Secondary CTA */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.15em", marginBottom: 10 }}>
                  SECONDARY CTA — Gold Outline
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button
                    onMouseEnter={() => setHoveredBtn("p2")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      background: hoveredBtn === "p2" ? "rgba(201,162,75,0.08)" : "transparent",
                      border: `1px solid ${hoveredBtn === "p2" ? "#C9A24B" : "rgba(201,162,75,0.5)"}`,
                      color: "#C9A24B",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      padding: "13px 28px",
                      cursor: "pointer",
                      transform: hoveredBtn === "p2" ? "translateY(-2px)" : "none",
                      transition: "all 0.35s",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    CONTACT US
                  </button>
                  <span style={{ color: "rgba(201,162,75,0.5)", fontSize: 10, letterSpacing: "0.15em" }}>
                    {hoveredBtn === "p2" ? "← HOVER STATE ACTIVE" : "↑ HOVER ME"}
                  </span>
                </div>
              </div>

              {/* Card example */}
              <div>
                <div style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.15em", marginBottom: 10 }}>
                  CARD COMPONENT — Hover Lift + Gold Glow
                </div>
                <motion.div
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(201,162,75,0.6)",
                    boxShadow: "0 20px 48px rgba(0,0,0,0.5), 0 0 24px rgba(201,162,75,0.12)",
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "24px",
                    cursor: "default",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: 32, height: 2, background: "#C9A24B" }} />
                  <div style={{ color: "#C9A24B", fontSize: 12, marginBottom: 8 }}>◈</div>
                  <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                    Nobel group
                  </div>
                  <div style={{ color: "#9A9A9A", fontSize: 12, lineHeight: 1.6 }}>
                    Hover this card to see lift, border glow, and depth shadow.
                  </div>
                  <div style={{ color: "#C9A24B", fontSize: 11, letterSpacing: "0.12em", marginTop: 16 }}>
                    EXPLORE →
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Typography scale */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", marginBottom: 24 }}>
                TYPOGRAPHY SCALE · MANROPE FONT FAMILY
              </div>

              <div
                style={{
                  padding: "20px 24px",
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  marginBottom: 24,
                }}
              >
                <div style={{ color: "#C9A24B", fontSize: 11, letterSpacing: "0.2em", marginBottom: 12 }}>
                  DISPLAY EXAMPLE
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    marginBottom: 4,
                  }}
                >
                  NOBEL GROUP
                </div>
                <div style={{ fontSize: 14, fontWeight: 400, color: "#9A9A9A", lineHeight: 1.7 }}>
                  Food distribution holding · Uzbekistan
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TYPE_SCALE.map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 70px 60px 1fr",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: "#C9A24B", fontSize: 11 }}>{t.size}</div>
                    <div style={{ color: "#9A9A9A", fontSize: 11 }}>W{t.weight}</div>
                    <div style={{ color: "#9A9A9A", fontSize: 10, letterSpacing: "0.05em" }}>{t.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motion inventory */}
            <div>
              <div style={{ color: "#9A9A9A", fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", marginBottom: 24 }}>
                MOTION INVENTORY
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ANIMATIONS.map((a) => (
                  <div
                    key={a.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 16,
                      padding: "12px 16px",
                      background: "#111111",
                      border: "1px solid rgba(255,255,255,0.05)",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                        {a.name}
                      </div>
                      <div style={{ color: "#9A9A9A", fontSize: 11, lineHeight: 1.6 }}>{a.desc}</div>
                    </div>
                    <div
                      style={{
                        background:
                          a.type === "loop"
                            ? "rgba(201,162,75,0.12)"
                            : a.type === "hover"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(201,162,75,0.06)",
                        border:
                          a.type === "loop"
                            ? "1px solid rgba(201,162,75,0.3)"
                            : "1px solid rgba(255,255,255,0.08)",
                        color: a.type === "loop" ? "#C9A24B" : "#9A9A9A",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        padding: "4px 10px",
                        whiteSpace: "nowrap",
                        alignSelf: "flex-start",
                      }}
                    >
                      {a.type.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
