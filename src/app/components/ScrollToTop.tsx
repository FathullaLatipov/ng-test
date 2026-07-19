import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router";

function forceTop() {
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Always land at the top of a new route (ignore browser scroll restoration) */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) return;
    forceTop();
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else forceTop();
      }, 380);
      return () => window.clearTimeout(t);
    }

    forceTop();
    const t1 = window.setTimeout(forceTop, 50);
    const t2 = window.setTimeout(forceTop, 320);
    const t3 = window.setTimeout(forceTop, 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname, hash]);

  return null;
}
