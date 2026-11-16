import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Droplets, Leaf, Package, ShieldCheck, X } from "lucide-react";
import type { BrandItem } from "../cms/types";

const GOLD = "#C9A24B";
const GOLD_LIGHT = "#E8C97A";

/** Icon for a property chip, picked by its wording */
function badgeIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("гмо")) return ShieldCheck;
  if (t.includes("холестерин") || t.includes("натурал")) return Leaf;
  return Droplets;
}

/**
 * Brand details dialog: photo, description, volumes / shelf life, properties and a CTA.
 * Closes on Esc, on backdrop click and with the × button; locks page scroll while open.
 */
export function BrandModal({ brand, onClose }: { brand: BrandItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!brand) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [brand, onClose]);

  if (typeof document === "undefined") return null;

  const paragraphs = (brand?.about || "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const [maker, makerNote] = brand ? (brand.cat.split("·").map((x) => x.trim()) as [string, string?]) : ["", ""];

  return createPortal(
    <AnimatePresence>
      {brand && (
        <motion.div
          key="brand-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(6,5,4,0.82)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(10px, 3vw, 32px)" }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={brand.name}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="ng-brand-modal"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              maxHeight: "min(92vh, 760px)",
              display: "grid",
              gridTemplateColumns: "minmax(260px, 0.82fr) 1.18fr",
              background: "linear-gradient(160deg, #1B1812 0%, #121110 60%)",
              border: "1px solid rgba(213,162,81,0.35)",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 60px rgba(213,162,81,0.08)",
            }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Закрыть"
              style={{ position: "absolute", top: 14, right: 14, zIndex: 3, width: 40, height: 40, borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(10,9,8,0.6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <X size={20} />
            </button>

            {/* photo */}
            <div className="ng-brand-modal-photo" style={{ position: "relative", background: "radial-gradient(circle at 50% 38%, rgba(232,201,122,0.28), rgba(26,22,15,1) 72%)", minHeight: 280 }}>
              {brand.img && (
                <img
                  src={brand.img}
                  alt={brand.name}
                  draggable={false}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: brand.img.includes("mark-") ? "contain" : "cover", padding: brand.img.includes("mark-") ? 24 : 0, boxSizing: "border-box" }}
                />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(18,17,16,0.9))", pointerEvents: "none" }} />
            </div>

            {/* content */}
            <div style={{ padding: "clamp(22px, 3vw, 38px)", overflowY: "auto", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12, paddingRight: 44 }}>
                <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>{(maker || "").toUpperCase()}</span>
                {makerNote && <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em" }}>· {makerNote.toUpperCase()}</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <h3 style={{ margin: 0, color: "#fff", fontSize: "clamp(28px, 3.4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{brand.name}</h3>
                {brand.desc && <span style={{ color: "#0A0A0A", background: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 9px" }}>ФЛАГМАН</span>}
              </div>

              {paragraphs.map((p, i) => (
                <p key={i} style={{ color: "rgba(255,255,255,0.82)", fontSize: 15.5, lineHeight: 1.75, margin: "0 0 14px" }}>{p}</p>
              ))}
              {!paragraphs.length && brand.desc && <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 15.5, lineHeight: 1.75 }}>{brand.desc}</p>}

              {(brand.volumes || brand.shelfLife) && (
                <div style={{ display: "grid", gridTemplateColumns: brand.volumes && brand.shelfLife ? "1fr 1fr" : "1fr", gap: 12, margin: "20px 0" }}>
                  {brand.volumes && (
                    <div style={{ border: "1px solid rgba(213,162,81,0.3)", background: "rgba(213,162,81,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 6 }}><Package size={15} /> ОБЪЁМ</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{brand.volumes}</div>
                    </div>
                  )}
                  {brand.shelfLife && (
                    <div style={{ border: "1px solid rgba(213,162,81,0.3)", background: "rgba(213,162,81,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 6 }}><Clock size={15} /> СРОК ХРАНЕНИЯ</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{brand.shelfLife}</div>
                    </div>
                  )}
                </div>
              )}

              {!!brand.badges?.length && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {brand.badges.map((b) => {
                    const Icon = badgeIcon(b);
                    return (
                      <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.88)", borderRadius: 999, fontSize: 13, fontWeight: 600, padding: "7px 13px" }}>
                        <Icon size={14} color={GOLD_LIGHT} /> {b}
                      </span>
                    );
                  })}
                </div>
              )}

              <Link
                to="/partnership#partner-form"
                onClick={onClose}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: "#0A0A0A", textDecoration: "none", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", padding: "14px 26px", borderRadius: 4 }}
              >
                ЗАПРОСИТЬ ПРЕДЛОЖЕНИЕ →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
