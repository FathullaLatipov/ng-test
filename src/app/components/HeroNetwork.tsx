import { useEffect, useMemo, useState } from "react";
import { animate, motion, motionValue, useMotionValue, useSpring, useTransform } from "motion/react";

/** Premium cinematic easing used throughout the sequence */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD = { primary: "#C79B4A", secondary: "#9D7434", highlight: "#F1D089", bronze: "#5A4423" };

function hash(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function wait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

type Vec = { x: number; y: number };
type Tier = "primary" | "secondary" | "tertiary";

/* ---------------------------------------------------------------------- */
/*  Geography — a real, simplified outline of Uzbekistan projected to px  */
/* ---------------------------------------------------------------------- */

const BORDER_LONLAT: [number, number][] = [
  [66.518607, 37.362784], [66.54615, 37.974685], [65.215999, 38.402695], [64.170223, 38.892407],
  [63.518015, 39.363257], [62.37426, 40.053886], [61.882714, 41.084857], [61.547179, 41.26637],
  [60.465953, 41.220327], [60.083341, 41.425146], [59.976422, 42.223082], [58.629011, 42.751551],
  [57.78653, 42.170553], [56.932215, 41.826026], [57.096391, 41.32231], [55.968191, 41.308642],
  [55.928917, 44.995858], [58.503127, 45.586804], [58.689989, 45.500014], [60.239972, 44.784037],
  [61.05832, 44.405817], [62.0133, 43.504477], [63.185787, 43.650075], [64.900824, 43.728081],
  [66.098012, 42.99766], [66.023392, 41.994646], [66.510649, 41.987644], [66.714047, 41.168444],
  [67.985856, 41.135991], [68.259896, 40.662325], [68.632483, 40.668681], [69.070027, 41.384244],
  [70.388965, 42.081308], [70.962315, 42.266154], [71.259248, 42.167711], [70.420022, 41.519998],
  [71.157859, 41.143587], [71.870115, 41.3929], [73.055417, 40.866033], [71.774875, 40.145844],
  [71.014198, 40.244366], [70.601407, 40.218527], [70.45816, 40.496495], [70.666622, 40.960213],
  [69.329495, 40.727824], [69.011633, 40.086158], [68.536416, 39.533453], [67.701429, 39.580478],
  [67.44222, 39.140144], [68.176025, 38.901553], [68.392033, 38.157025], [67.83, 37.144994],
  [67.075782, 37.356144],
];

const CITIES_RAW: { key: string; label: string; lon: number; lat: number; labelDx: number; labelDy: number; order: number; tier: Tier }[] = [
  { key: "tashkent", label: "ТАШКЕНТ", lon: 69.2401, lat: 41.2995, labelDx: 16, labelDy: -8, order: 0, tier: "primary" },
  { key: "samarkand", label: "САМАРКАНД", lon: 66.9749, lat: 39.6542, labelDx: -14, labelDy: 16, order: 1, tier: "secondary" },
  { key: "fergana", label: "ФЕРГАНА", lon: 71.7843, lat: 40.3894, labelDx: 12, labelDy: 18, order: 2, tier: "secondary" },
  { key: "bukhara", label: "БУХАРА", lon: 64.4207, lat: 39.768, labelDx: -52, labelDy: 4, order: 3, tier: "tertiary" },
  { key: "namangan", label: "НАМАНГАН", lon: 71.6726, lat: 40.9983, labelDx: 14, labelDy: -14, order: 4, tier: "tertiary" },
  { key: "andijan", label: "АНДИЖАН", lon: 72.3442, lat: 40.7821, labelDx: 16, labelDy: 8, order: 5, tier: "tertiary" },
  { key: "nukus", label: "НУКУС", lon: 59.6103, lat: 42.92, labelDx: -12, labelDy: -14, order: 6, tier: "tertiary" },
  { key: "karshi", label: "КАРШИ", lon: 65.7891, lat: 38.8606, labelDx: -14, labelDy: 16, order: 7, tier: "tertiary" },
  { key: "termez", label: "ТЕРМЕЗ", lon: 67.2783, lat: 37.86, labelDx: -12, labelDy: -16, order: 8, tier: "tertiary" },
  { key: "jizzakh", label: "ДЖИЗАК", lon: 67.8422, lat: 40.1158, labelDx: 12, labelDy: -12, order: 9, tier: "tertiary" },
  { key: "navoi", label: "НАВОИ", lon: 65.3792, lat: 40.0844, labelDx: 10, labelDy: -14, order: 10, tier: "tertiary" },
];

const ROUTES: { a: string; b: string; tier: Tier }[] = [
  { a: "tashkent", b: "samarkand", tier: "primary" },
  { a: "samarkand", b: "bukhara", tier: "secondary" },
  { a: "tashkent", b: "namangan", tier: "secondary" },
  { a: "namangan", b: "andijan", tier: "secondary" },
  { a: "andijan", b: "fergana", tier: "secondary" },
  { a: "fergana", b: "namangan", tier: "secondary" },
  { a: "tashkent", b: "jizzakh", tier: "tertiary" },
  { a: "jizzakh", b: "samarkand", tier: "tertiary" },
  { a: "samarkand", b: "navoi", tier: "tertiary" },
  { a: "navoi", b: "bukhara", tier: "tertiary" },
  { a: "bukhara", b: "karshi", tier: "tertiary" },
  { a: "karshi", b: "termez", tier: "tertiary" },
  { a: "tashkent", b: "nukus", tier: "tertiary" },
  { a: "bukhara", b: "nukus", tier: "tertiary" },
];

const SCALE = 42;
const LON_CENTER = (55.928917 + 73.055417) / 2;
const LAT_CENTER = (37.144994 + 45.586804) / 2;
const LAT_COS = Math.cos((LAT_CENTER * Math.PI) / 180);

function project(lon: number, lat: number): Vec {
  return {
    x: (lon - LON_CENTER) * LAT_COS * SCALE,
    y: -(lat - LAT_CENTER) * SCALE,
  };
}

function resamplePolygon(points: Vec[], spacing: number): Vec[] {
  const out: Vec[] = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const segLen = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, Math.round(segLen / spacing));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

function pointInPolygon(pt: Vec, poly: Vec[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const intersect = yi > pt.y !== yj > pt.y && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function nearestIndex(pt: Vec, arr: Vec[]): number {
  let best = 0;
  let bestD = Infinity;
  arr.forEach((p, i) => {
    const d = Math.hypot(p.x - pt.x, p.y - pt.y);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

function buildFillNodes(borderPts: Vec[], count: number, minDist: number): Vec[] {
  const out: Vec[] = [];
  let seed = 500;
  let guard = 0;
  while (out.length < count && guard < count * 80) {
    guard++;
    seed += 1;
    const x = -211 + hash(seed) * 422;
    const y = -139 + hash(seed * 1.37 + 3) * 278;
    if (!pointInPolygon({ x, y }, borderPts)) continue;
    if (!out.every((p) => Math.hypot(p.x - x, p.y - y) > minDist)) continue;
    out.push({ x, y });
  }
  return out;
}

type MeshNode = { x: number; y: number; scatter: Vec; size: number; kind: "border" | "fill"; reserve: boolean };

function buildMesh() {
  const borderProjected = BORDER_LONLAT.map(([lon, lat]) => project(lon, lat));
  const border = resamplePolygon(borderProjected, 22);
  const fill = buildFillNodes(border, 34, 28);
  const combined: Vec[] = [...border, ...fill];
  const nodes: MeshNode[] = combined.map((p, i) => {
    const seed = 900 + i * 7;
    const angle = hash(seed) * Math.PI * 2;
    const r = 240 + hash(seed * 1.7 + 1) * 220;
    const isBorder = i < border.length;
    return {
      x: p.x,
      y: p.y,
      scatter: { x: Math.cos(angle) * r, y: Math.sin(angle) * r },
      size: isBorder ? 1.9 + hash(seed * 2.1 + 2) * 0.9 : 1.7 + hash(seed * 2.3 + 3) * 1.3,
      kind: isBorder ? "border" : "fill",
      reserve: !isBorder && i % 7 === 0,
    };
  });
  const edges: [number, number][] = [];
  border.forEach((_, i) => edges.push([i, (i + 1) % border.length]));
  fill.forEach((p, j) => edges.push([border.length + j, nearestIndex(p, border)]));
  return { nodes, edges };
}

const MESH = buildMesh();
const MESH_NODES = MESH.nodes;
const MESH_EDGES = MESH.edges;
/** Edges [0..BORDER_EDGE_COUNT) trace the country outline; the rest are interior fill */
const BORDER_EDGE_COUNT = MESH_NODES.filter((n) => n.kind === "border").length;
const RESERVE_IDX = MESH_NODES.map((n, i) => (n.reserve ? i : -1)).filter((i) => i >= 0);

const CITIES = CITIES_RAW.map((c) => {
  const p = project(c.lon, c.lat);
  return { ...c, x: p.x, y: p.y };
});
const CAPITAL_IDX = CITIES.findIndex((c) => c.key === "tashkent");
const CITY_INDEX: Record<string, number> = {};
CITIES.forEach((c, i) => (CITY_INDEX[c.key] = i));
const ROUTE_EDGES: { a: number; b: number; tier: Tier }[] = ROUTES.map((r) => ({ a: CITY_INDEX[r.a], b: CITY_INDEX[r.b], tier: r.tier }));

type Warehouse = { cityIdx: number; x: number; y: number; size: number };

function buildWarehouses(): Warehouse[] {
  const list: Warehouse[] = [];
  CITIES.forEach((c, ci) => {
    const n = c.tier === "primary" ? 5 : c.tier === "secondary" ? 4 : 3;
    for (let k = 0; k < n; k++) {
      const seed = 1500 + ci * 37 + k * 11;
      const angle = hash(seed) * Math.PI * 2;
      const radius = 5 + hash(seed * 1.3 + 2) * 6.5;
      list.push({
        cityIdx: ci,
        x: c.x + Math.cos(angle) * radius,
        y: c.y + Math.sin(angle) * radius,
        size: 1 + hash(seed * 1.9 + 4) * 0.7,
      });
    }
  });
  return list;
}
const WAREHOUSES = buildWarehouses();

/* ---- tiny, near-invisible cluster glyphs: warehouse / retail / HoReCa / truck / factory ---- */
const ICON_PATHS = [
  "M1 8.4 6 4l5 4.4M2.2 8v4.6h7.6V8", // warehouse
  "M2.4 5.4h7.2l.7 6.6H1.7l.7-6.6ZM4.4 5.4V3.9a1.6 1.6 0 0 1 3.2 0v1.5", // retail
  "M3 2.4v4.1c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6V2.4M4.6 8.1v4M9.4 2.4c-1 .3-1.6 1.3-1.6 2.4s.6 2.1 1.6 2.4v4.9", // restaurant
  "M1.4 9.4V4.8h5v4.6M6.4 6.6h2.6l1.6 1.7v1.1H6.4M3 11.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2ZM8.6 11.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z", // truck
  "M1.6 11.6V6.2l2.6 1.8V6.2l2.6 1.8V4.6h3.6v7Z", // factory
];
function ClusterIcon({ index, x, y, opacity }: { index: number; x: number; y: number; opacity: any }) {
  return (
    <motion.svg width={11} height={11} viewBox="0 0 12 12" style={{ position: "absolute", left: x, top: y, overflow: "visible", opacity }}>
      <path d={ICON_PATHS[index % ICON_PATHS.length]} fill="none" stroke={GOLD.highlight} strokeWidth={0.65} strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

const CANVAS_W = 600;
const CANVAS_H = 400;

type Stage = "dark" | "emerge" | "hubs" | "routes" | "traffic" | "clusters" | "alive";

/* ---------------------------------------------------------------------- */

export function HeroNetwork() {
  const [stage, setStage] = useState<Stage>("dark");

  const ambientGlow = useMemo(() => motionValue(0), []);

  const meshPoints = useMemo(
    () => MESH_NODES.map((n) => ({ x: motionValue(n.scatter.x), y: motionValue(n.scatter.y), opacity: motionValue(0), scale: motionValue(0.4) })),
    []
  );
  const meshEdgeOpacity = useMemo(() => MESH_EDGES.map(() => motionValue(0)), []);

  const cityPoints = useMemo(
    () =>
      CITIES.map((c, i) => {
        const seed = 2200 + i * 13;
        const drift = i === CAPITAL_IDX ? { x: 0, y: 0 } : { x: (hash(seed) - 0.5) * 90, y: (hash(seed * 1.6 + 1) - 0.5) * 90 };
        return {
          x: motionValue(c.x + drift.x),
          y: motionValue(c.y + drift.y),
          opacity: motionValue(0),
          scale: motionValue(0.5),
        };
      }),
    []
  );
  const citySize = useMemo(() => CITIES.map(() => motionValue(1)), []);
  const cityGlow = useMemo(() => CITIES.map(() => motionValue(0)), []);
  const cityLabel = useMemo(() => CITIES.map(() => motionValue(0)), []);

  const routeOpacity = useMemo(() => ROUTE_EDGES.map(() => motionValue(0)), []);
  const routeDots = useMemo(() => ROUTE_EDGES.map(() => ({ cx: motionValue(0), cy: motionValue(0), o: motionValue(0) })), []);

  const warehousePoints = useMemo(() => WAREHOUSES.map(() => ({ opacity: motionValue(0), scale: motionValue(0.3) })), []);
  const iconOpacity = useMemo(() => CITIES.map(() => motionValue(0)), []);

  const sceneScale = useMemo(() => motionValue(1.05), []);
  const orbitRotate = useMemo(() => motionValue(0), []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 20, damping: 17 });
  const sy = useSpring(my, { stiffness: 20, damping: 17 });
  const mouseRotateY = useTransform(sx, (v) => v * 1.5);
  const rotateX = useTransform(sy, (v) => v * -1.1);
  const rotateY = useTransform([mouseRotateY, orbitRotate], ([a, b]) => (a as number) + (b as number));

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const c = animate(orbitRotate, [-1.4, 1.4, -1.4], { duration: 42, repeat: Infinity, ease: "easeInOut" });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Cinematic sequence, matches the requested timeline ---- */
  useEffect(() => {
    let cancelled = false;
    const active: ReturnType<typeof animate>[] = [];
    const track = <T extends ReturnType<typeof animate>>(c: T) => {
      active.push(c);
      return c;
    };

    async function run() {
      // 0–1s — almost black, only a faint dark-gold atmospheric glow
      track(animate(sceneScale, 1, { duration: 10, ease: EASE }));
      track(animate(ambientGlow, 1, { duration: 1.6, ease: EASE }));
      await wait(1000);
      if (cancelled) return;

      // 1–3s — tiny golden points slowly appear, assembling the contour
      setStage("emerge");
      MESH_NODES.forEach((n, i) => {
        if (n.reserve) return;
        const d = hash(i * 1.9 + 21) * 1.9;
        const p = meshPoints[i];
        track(animate(p.opacity, n.kind === "border" ? 0.9 : 0.32, { duration: 1.4, delay: d, ease: EASE }));
        track(animate(p.scale, 1, { duration: 1.4, delay: d, ease: EASE }));
        track(animate(p.x, n.x, { duration: 1.9, delay: d, ease: EASE }));
        track(animate(p.y, n.y, { duration: 1.9, delay: d, ease: EASE }));
      });
      meshEdgeOpacity.forEach((mv, i) => {
        track(animate(mv, i < BORDER_EDGE_COUNT ? 0.7 : 0.14, { duration: 0.9, delay: 1 + hash(i * 2.1 + 40) * 1.2, ease: EASE }));
      });
      await wait(2000);
      if (cancelled) return;

      // 3–5s — the regional hubs softly illuminate
      setStage("hubs");
      const cityOrder = CITIES.map((_, i) => i).sort((a, b) => CITIES[a].order - CITIES[b].order);
      cityOrder.forEach((idx, k) => {
        const d = k * 0.16;
        const peak = 0.72;
        track(animate(cityPoints[idx].opacity, 1, { duration: 1.1, delay: d, ease: EASE }));
        track(animate(cityPoints[idx].scale, 1, { duration: 1.1, delay: d, ease: EASE }));
        track(animate(cityPoints[idx].x, CITIES[idx].x, { duration: 1.4, delay: d, ease: EASE }));
        track(animate(cityPoints[idx].y, CITIES[idx].y, { duration: 1.4, delay: d, ease: EASE }));
        track(animate(cityGlow[idx], [0, peak, peak * 0.5], { duration: 1.4, delay: d, ease: EASE }));
        track(animate(cityLabel[idx], 1, { duration: 0.9, delay: d + 0.2, ease: EASE }));
        track(animate(citySize[idx], 1.15, { duration: 1.1, delay: d, ease: EASE }));
      });
      await wait(2000);
      if (cancelled) return;

      // 5–8s — metallic-gold connections grow organically between hubs
      setStage("routes");
      ROUTE_EDGES.forEach((r, i) => {
        const target = r.tier === "primary" ? 0.85 : r.tier === "secondary" ? 0.62 : 0.4;
        track(animate(routeOpacity[i], target, { duration: 1.2, delay: i * 0.22, ease: EASE }));
      });
      await wait(3000);
      if (cancelled) return;

      // 8–12s — pulses travel the routes; Tashkent leads, Samarkand & the Fergana Valley follow
      setStage("traffic");
      await wait(4000);
      if (cancelled) return;

      // 12–16s — minimal clusters emerge around the hubs
      setStage("clusters");
      WAREHOUSES.forEach((_, i) => {
        const d = hash(i * 4.4 + 70) * 1.8;
        track(animate(warehousePoints[i].opacity, 0.5, { duration: 1.1, delay: d, ease: EASE }));
        track(animate(warehousePoints[i].scale, 1, { duration: 1.1, delay: d, ease: EASE }));
      });
      CITIES.forEach((_, i) => {
        track(animate(iconOpacity[i], 0.55, { duration: 1, delay: 0.6 + hash(i * 5.5 + 90) * 1.8, ease: EASE }));
      });
      await wait(4000);
      if (cancelled) return;

      // 16–20s+ — the ecosystem becomes fully alive, looping forever
      setStage("alive");
    }

    run();
    return () => {
      cancelled = true;
      active.forEach((c) => c.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Very slow, nearly imperceptible camera breathing
  useEffect(() => {
    if (stage !== "routes" && stage !== "traffic" && stage !== "clusters" && stage !== "alive") return;
    const c = animate(sceneScale, [1, 1.008, 1], { duration: 16, repeat: Infinity, ease: "easeInOut" });
    return () => c.stop();
  }, [stage]);

  // Goods travelling through the supply chain — smooth accel/decel, infinite loop
  useEffect(() => {
    if (stage !== "traffic" && stage !== "clusters" && stage !== "alive") return;
    const controls = ROUTE_EDGES.flatMap((r, i) => {
      const ca = CITIES[r.a];
      const cb = CITIES[r.b];
      const dot = routeDots[i];
      const cfg =
        r.tier === "primary"
          ? { duration: 2.2, repeatDelay: 0.9, peak: 1 }
          : r.tier === "secondary"
          ? { duration: 3, repeatDelay: 1.8, peak: 0.85 }
          : { duration: 4, repeatDelay: 3.2, peak: 0.55 };
      const opts = { duration: cfg.duration, repeat: Infinity, repeatDelay: cfg.repeatDelay, delay: i * 0.4, ease: "easeInOut" as const };
      return [
        animate(dot.cx, [ca.x, cb.x], opts),
        animate(dot.cy, [ca.y, cb.y], opts),
        animate(dot.o, [0, cfg.peak, cfg.peak, 0], { ...opts, times: [0, 0.16, 0.84, 1] }),
      ];
    });
    return () => controls.forEach((c) => c.stop());
  }, [stage]);

  // Warehouse / partner clusters breathing gently, like a living ecosystem
  useEffect(() => {
    if (stage !== "alive") return;
    const controls = WAREHOUSES.map((_, i) => {
      const dur = 4.5 + hash(i * 6.6 + 80) * 2.6;
      return animate(warehousePoints[i].scale, [1, 1.22, 1], { duration: dur, delay: hash(i * 8.8 + 81) * dur, repeat: Infinity, ease: "easeInOut" });
    });
    return () => controls.forEach((c) => c.stop());
  }, [stage]);

  // Activity subtly shifting between regions — hubs take turns glowing
  useEffect(() => {
    if (stage !== "alive") return;
    const cycle = 8 * CITIES.length;
    const controls = CITIES.map((c, i) => {
      const peak = 0.75;
      return animate(cityGlow[i], [cityGlow[i].get(), cityGlow[i].get(), peak, cityGlow[i].get()], { duration: cycle, delay: i * 8, repeat: Infinity, ease: EASE });
    });
    return () => controls.forEach((c) => c.stop());
  }, [stage]);

  // New nodes occasionally appear and integrate into the network
  useEffect(() => {
    if (stage !== "alive") return;
    const controls = RESERVE_IDX.map((idx, k) => {
      const dur = 5 + hash(idx * 3.3 + 12) * 4;
      const cyc = dur + 14 + hash(idx * 5.1 + 13) * 20;
      return [
        animate(meshPoints[idx].opacity, [0, 0.4, 0], { duration: dur, delay: k * 3 + hash(idx * 7.7) * 6, repeat: Infinity, repeatDelay: cyc - dur, ease: EASE }),
        animate(meshPoints[idx].scale, [0.3, 1, 0.3], { duration: dur, delay: k * 3 + hash(idx * 7.7) * 6, repeat: Infinity, repeatDelay: cyc - dur, ease: EASE }),
      ];
    }).flat();
    return () => controls.forEach((c) => c.stop());
  }, [stage]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        perspective: 1600,
        WebkitMaskImage: "linear-gradient(to right, transparent 0, transparent 480px, rgba(0,0,0,0.5) 620px, black 760px, black 100%)",
        maskImage: "linear-gradient(to right, transparent 0, transparent 480px, rgba(0,0,0,0.5) 620px, black 760px, black 100%)",
      }}
    >
      {/* atmospheric haze — never covers the composition, ambient only */}
      <motion.div style={{ position: "absolute", left: "38%", top: "50%", width: "58%", height: "78%", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(199,155,74,0.08) 0%, transparent 70%)", filter: "blur(10px)", opacity: ambientGlow }} />
      <div style={{ position: "absolute", right: "-4%", top: "-6%", width: "36%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(157,116,52,0.09) 0%, transparent 72%)", filter: "blur(22px)" }} />

      <motion.div
        style={{
          position: "absolute",
          left: "63%",
          top: "54%",
          width: CANVAS_W,
          height: CANVAS_H,
          marginLeft: -CANVAS_W / 2,
          marginTop: -CANVAS_H / 2,
          scale: sceneScale,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <svg width={CANVAS_W} height={CANVAS_H} viewBox={`${-CANVAS_W / 2} ${-CANVAS_H / 2} ${CANVAS_W} ${CANVAS_H}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {MESH_EDGES.map(([a, b], i) => (
            <motion.line key={`mesh-${i}`} x1={meshPoints[a].x} y1={meshPoints[a].y} x2={meshPoints[b].x} y2={meshPoints[b].y} stroke={i < BORDER_EDGE_COUNT ? GOLD.highlight : GOLD.primary} strokeWidth={i < BORDER_EDGE_COUNT ? 1.7 : 0.45} opacity={meshEdgeOpacity[i]} style={i < BORDER_EDGE_COUNT ? { filter: "drop-shadow(0 0 3px rgba(241,208,137,0.55))" } : undefined} />
          ))}
          {ROUTE_EDGES.map((r, i) => (
            <motion.line
              key={`route-${i}`}
              x1={cityPoints[r.a].x}
              y1={cityPoints[r.a].y}
              x2={cityPoints[r.b].x}
              y2={cityPoints[r.b].y}
              stroke={GOLD.highlight}
              strokeWidth={r.tier === "primary" ? 0.9 : r.tier === "secondary" ? 0.7 : 0.5}
              opacity={routeOpacity[i]}
              style={{ filter: "drop-shadow(0 0 3px rgba(241,208,137,0.45))" }}
            />
          ))}
          {routeDots.map((dot, i) => (
            <motion.circle key={`dot-${i}`} r={1.9} fill={GOLD.highlight} cx={dot.cx} cy={dot.cy} opacity={dot.o} style={{ filter: "drop-shadow(0 0 5px rgba(241,208,137,0.8))" }} />
          ))}
        </svg>

        {/* the outline of the country, revealed by hundreds of interconnected nodes */}
        {MESH_NODES.map((n, i) => (
          <motion.div
            key={`mesh-node-${i}`}
            style={{
              position: "absolute",
              left: CANVAS_W / 2 - n.size / 2,
              top: CANVAS_H / 2 - n.size / 2,
              width: n.size,
              height: n.size,
              borderRadius: "50%",
              background: GOLD.primary,
              boxShadow: `0 0 3px rgba(199,155,74,0.45)`,
              x: meshPoints[i].x,
              y: meshPoints[i].y,
              opacity: meshPoints[i].opacity,
              scale: meshPoints[i].scale,
            }}
          />
        ))}

        {/* warehouse / partner clusters, breathing gently around every hub */}
        {WAREHOUSES.map((w, i) => (
          <motion.div
            key={`wh-${i}`}
            style={{
              position: "absolute",
              left: CANVAS_W / 2 + w.x - w.size / 2,
              top: CANVAS_H / 2 + w.y - w.size / 2,
              width: w.size,
              height: w.size,
              borderRadius: "50%",
              background: GOLD.secondary,
              opacity: warehousePoints[i].opacity,
              scale: warehousePoints[i].scale,
              transform: "translateZ(52px)",
            }}
          />
        ))}

        {/* major hubs — the beating heart of the network */}
        {CITIES.map((c, i) => {
          const base = 5.5;
          const iconAngle = (i / CITIES.length) * Math.PI * 2 + 0.6;
          const iconR = 14;
          return (
            <motion.div
              key={c.key}
              style={{
                position: "absolute",
                left: CANVAS_W / 2,
                top: CANVAS_H / 2,
                x: cityPoints[i].x,
                y: cityPoints[i].y,
                opacity: cityPoints[i].opacity,
                scale: cityPoints[i].scale,
                transform: "translateZ(85px)",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  left: -24,
                  top: -24,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(241,208,137,0.7) 0%, rgba(199,155,74,0.18) 45%, transparent 75%)",
                  opacity: cityGlow[i],
                  pointerEvents: "none",
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  left: -base / 2,
                  top: -base / 2,
                  width: base,
                  height: base,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${GOLD.highlight} 0%, ${GOLD.primary} 55%, ${GOLD.bronze} 100%)`,
                  boxShadow: `0 0 9px rgba(199,155,74,0.55)`,
                  scale: citySize[i],
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  left: c.labelDx,
                  top: c.labelDy,
                  whiteSpace: "nowrap",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  color: "rgba(246,224,155,0.98)",
                  textShadow: "0 0 3px rgba(10,9,8,0.9), 0 0 11px rgba(199,155,74,0.75)",
                  opacity: cityLabel[i],
                }}
              >
                {c.label}
              </motion.div>
              <ClusterIcon index={i} x={Math.cos(iconAngle) * iconR - 5.5} y={Math.sin(iconAngle) * iconR - 5.5} opacity={iconOpacity[i]} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
