import { useRef } from "react";
import { motion, useInView } from "motion/react";

const OWN_BRANDS = [
  { name: "EcoBorn", cat: "Eco Foods" },
  { name: "Dairy Direction", cat: "Dairy & Fresh" },
  { name: "Nobel Fresh", cat: "Fresh Produce" },
  { name: "NoblePro", cat: "Professional Line" },
  { name: "GreenField", cat: "Organic Range" },
  { name: "Nobel Gold", cat: "Premium Tier" },
  { name: "EcoBorn", cat: "Eco Foods" },
  { name: "Dairy Direction", cat: "Dairy & Fresh" },
  { name: "Nobel Fresh", cat: "Fresh Produce" },
  { name: "NoblePro", cat: "Professional Line" },
  { name: "GreenField", cat: "Organic Range" },
  { name: "Nobel Gold", cat: "Premium Tier" },
];

const PARTNER_BRANDS = [
  { name: "Nestlé", cat: "FMCG" },
  { name: "Unilever", cat: "Consumer Goods" },
  { name: "Danone", cat: "Dairy & Health" },
  { name: "PepsiCo", cat: "Beverages" },
  { name: "Mars", cat: "Confectionery" },
  { name: "Kraft Heinz", cat: "Foods" },
  { name: "Ferrero", cat: "Chocolate" },
  { name: "Kellogg's", cat: "Cereals" },
  { name: "Nestlé", cat: "FMCG" },
  { name: "Unilever", cat: "Consumer Goods" },
  { name: "Danone", cat: "Dairy & Health" },
  { name: "PepsiCo", cat: "Beverages" },
  { name: "Mars", cat: "Confectionery" },
  { name: "Kraft Heinz", cat: "Foods" },
  { name: "Ferrero", cat: "Chocolate" },
  { name: "Kellogg's", cat: "Cereals" },
];

function BrandPill({ name, cat, gold }: { name: string; cat: string; gold?: boolean }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: gold ? "rgba(201,162,75,0.08)" : "rgba(255,255,255,0.04)",
        border: gold ? "1px solid rgba(201,162,75,0.25)" : "1px solid rgba(255,255,255,0.08)",
        padding: "14px 28px",
        marginRight: 16,
        whiteSpace: "nowrap",
      }}
    >
      {/* Logo placeholder: diamond icon */}
      <div
        style={{
          width: 20,
          height: 20,
          border: `1px solid ${gold ? "#C9A24B" : "rgba(255,255,255,0.2)"}`,
          transform: "rotate(45deg)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            background: gold ? "#C9A24B" : "rgba(255,255,255,0.3)",
          }}
        />
      </div>
      <div>
        <div
          style={{
            color: gold ? "#C9A24B" : "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "#9A9A9A",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.1em",
            marginTop: 3,
          }}
        >
          {cat}
        </div>
      </div>
    </div>
  );
}

function Marquee({ brands, gold, reverse }: { brands: typeof OWN_BRANDS; gold?: boolean; reverse?: boolean }) {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: "linear-gradient(to right, #0D0D0D, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: "linear-gradient(to left, #0D0D0D, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          animation: `marquee-scroll ${reverse ? "35s" : "40s"} linear infinite ${reverse ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        {brands.map((b, i) => (
          <BrandPill key={`a-${i}`} name={b.name} cat={b.cat} gold={gold} />
        ))}
        {brands.map((b, i) => (
          <BrandPill key={`b-${i}`} name={b.name} cat={b.cat} gold={gold} />
        ))}
      </div>
    </div>
  );
}

export function BrandsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="brands"
      style={{
        background: "#0D0D0D",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,162,75,0.3) 50%, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 80px",
          marginBottom: 64,
        }}
        ref={ref}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
                BRAND PORTFOLIO
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
              BRANDS WE
              <br />
              <span style={{ color: "#C9A24B" }}>BUILD & DISTRIBUTE.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              color: "rgba(201,162,75,0.5)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textAlign: "right",
              maxWidth: 200,
              lineHeight: 1.6,
            }}
          >
            ← AUTO-SCROLLING MARQUEE · CONTINUOUS LOOP
          </motion.div>
        </div>
      </div>

      {/* Own brands marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{ marginBottom: 8 }}
      >
        <div
          style={{
            padding: "0 80px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C9A24B",
            }}
          />
          <span
            style={{
              color: "#C9A24B",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
          >
            OWN BRANDS
          </span>
        </div>
        <Marquee brands={OWN_BRANDS} gold />
      </motion.div>

      {/* Partner brands marquee (reverse direction) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.7 }}
        style={{ marginTop: 16 }}
      >
        <div
          style={{
            padding: "0 80px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span
            style={{
              color: "#9A9A9A",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
          >
            PARTNER BRANDS
          </span>
        </div>
        <Marquee brands={PARTNER_BRANDS} reverse />
      </motion.div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,162,75,0.3) 50%, transparent)",
        }}
      />
    </section>
  );
}
