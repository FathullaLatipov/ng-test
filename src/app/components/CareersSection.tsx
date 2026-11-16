import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FadeImage } from "./FadeImage";
import careersDeal from "../../assets/girl_with_deal.webp";
import { useCms } from "../cms/store";
import { pickSrc } from "../lib/images";

export function CareersSection() {
  const { data } = useCms();
  const careers = data.careers;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="careers" className="ng-sec-pad" style={{ background: "#0D0D0D", padding: "110px 80px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,162,75,0.2) 50%, transparent)" }} />
      <div style={{ maxWidth: 1400, margin: "0 auto" }} ref={ref}>
        <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
              <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.26em" }}>{careers.eyebrow}</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 22 }}>
              {careers.title}
              <br /><span style={{ color: "#C9A24B" }}>{careers.titleAccent}</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 400, lineHeight: 1.8, marginBottom: 36 }}>
              {careers.lead}
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 36 }}>
              {careers.values.map((v, i) => (
                <motion.div key={v.id} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, border: "1px solid rgba(201,162,75,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24B", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{v.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.65 }}>{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {careers.teamImage ? <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
              style={{ height: 210, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: "100%", height: "100%", backgroundImage: `url(${pickSrc(careers.teamImage, 2)})`, backgroundSize: "cover", backgroundPosition: "center top", filter: "brightness(0.45) saturate(0.6)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,13,13,0.6), transparent)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 22, color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>{careers.teamCaption}</div>
            </motion.div> : null}
          </div>

          {/* Right: photo (replaces the vacancies list + CTA card) */}
          <FadeImage src={careersDeal} alt="Рукопожатие при приёме на работу в Nobel Group" aspect="1448 / 1086" minHeight={0} />
        </div>
      </div>
    </section>
  );
}
