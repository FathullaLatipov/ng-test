import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";

/** Gold curtain wipe on every route change — makes navigation feel intentional */
export function RouteWipe() {
  const { pathname } = useLocation();
  const [tick, setTick] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setTick((t) => t + 1);
  }, [pathname]);

  return (
    <AnimatePresence>
      {tick > 0 && (
        <motion.div
          key={tick}
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "0%", "100%"] }}
          transition={{ duration: 0.72, times: [0, 0.38, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            /* keep last frame out of view; next nav remounts via key */
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            pointerEvents: "none",
            background:
              "linear-gradient(105deg, #0A0908 0%, #1E1912 28%, #D5A251 50%, #1E1912 72%, #0A0908 100%)",
            boxShadow: "0 0 80px rgba(213,162,81,0.35)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], rotate: 45, scale: 1 }}
              transition={{ duration: 0.72, times: [0, 0.35, 0.55, 1] }}
              style={{
                width: 9,
                height: 9,
                background: "#0A0908",
                boxShadow: "0 0 16px rgba(10,9,8,0.35)",
              }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0], letterSpacing: ["0.5em", "0.32em", "0.32em", "0.4em"] }}
              transition={{ duration: 0.72, times: [0, 0.35, 0.55, 1] }}
              style={{
                color: "#0A0908",
                fontSize: 11,
                fontWeight: 800,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              NOBEL GROUP
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PageEnter({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
