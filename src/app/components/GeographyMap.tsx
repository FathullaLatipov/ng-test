import { useMemo, useState } from "react";
import { motion } from "motion/react";

function toX(lon: number) {
  return ((lon - 55.5) / 18.5) * 900;
}
function toY(lat: number) {
  return ((46 - lat) / 9.5) * 430;
}

const CITIES = [
  { id: "tashkent", name: "Ташкент", role: "Штаб-квартира · Главный хаб", lon: 69.24, lat: 41.3, main: true },
  { id: "samarkand", name: "Самарканд", role: "Дистрибуция юг-центр", lon: 66.95, lat: 39.65, main: false },
  { id: "bukhara", name: "Бухара", role: "Западный склад", lon: 64.42, lat: 39.77, main: false },
  { id: "andijan", name: "Андижан", role: "Ферганская долина", lon: 72.34, lat: 40.78, main: false },
  { id: "namangan", name: "Наманган", role: "Север Ферганы", lon: 71.67, lat: 41.0, main: false },
  { id: "fergana", name: "Фергана", role: "Восточные операции", lon: 71.78, lat: 40.38, main: false },
  { id: "nukus", name: "Нукус", role: "Каракалпакстан", lon: 59.61, lat: 42.47, main: false },
  { id: "guliston", name: "Гулистон", role: "Сырдарьинский регион", lon: 68.79, lat: 40.49, main: false },
  { id: "jizzakh", name: "Жиззах", role: "Центральный депо", lon: 67.83, lat: 40.12, main: false },
  { id: "termez", name: "Термез", role: "Южная точка", lon: 67.28, lat: 37.22, main: false },
  { id: "urgench", name: "Урганч", role: "Хорезм регион", lon: 60.64, lat: 41.55, main: false },
  { id: "navoi", name: "Навои", role: "Навоийский регион", lon: 65.38, lat: 40.08, main: false },
  { id: "qarshi", name: "Қарши", role: "Кашкадарьинский регион", lon: 65.79, lat: 38.86, main: false },
];

const ROUTES: { from: string; to: string; dur: number; delay: number }[] = [
  { from: "tashkent", to: "samarkand", dur: 3.5, delay: 0 },
  { from: "tashkent", to: "namangan", dur: 2.8, delay: 0.6 },
  { from: "tashkent", to: "guliston", dur: 2.2, delay: 1.0 },
  { from: "samarkand", to: "bukhara", dur: 3.0, delay: 1.4 },
  { from: "samarkand", to: "termez", dur: 3.8, delay: 0.3 },
  { from: "samarkand", to: "jizzakh", dur: 2.5, delay: 1.8 },
  { from: "namangan", to: "andijan", dur: 2.0, delay: 0.8 },
  { from: "andijan", to: "fergana", dur: 1.8, delay: 1.2 },
  { from: "bukhara", to: "urgench", dur: 3.2, delay: 0.4 },
  { from: "bukhara", to: "navoi", dur: 2.4, delay: 1.6 },
  { from: "bukhara", to: "qarshi", dur: 2.6, delay: 2.0 },
];

const UZ_BORDER: [number, number][] = [
  [58.59, 45.59], [56.0, 45.0], [56.0, 41.32], [57.03, 41.26], [57.16, 41.38],
  [57.03, 41.92], [57.4, 42.17], [57.86, 42.17], [58.02, 42.5], [58.49, 42.29],
  [58.15, 42.64], [58.62, 42.8], [59.45, 42.29], [60.01, 42.21], [59.97, 41.94],
  [60.33, 41.77], [60.07, 41.75], [60.21, 41.34], [61.88, 41.11], [62.46, 39.97],
  [63.7, 39.23], [65.54, 38.3], [66.61, 38.02], [66.55, 37.35], [67.78, 37.17],
  [67.86, 37.54], [68.4, 38.2], [68.06, 38.4], [68.21, 38.92], [67.33, 39.24],
  [67.4, 39.53], [67.71, 39.66], [68.55, 39.54], [68.63, 39.85], [68.82, 39.99],
  [68.9, 39.87], [68.84, 40.05], [69.03, 40.15], [68.54, 40.15], [69.31, 40.19],
  [69.22, 40.54], [69.39, 40.79], [69.72, 40.63], [70.47, 41.04], [70.8, 40.73],
  [70.33, 40.46], [70.63, 40.18], [71.21, 40.34], [71.73, 40.15], [72.18, 40.49],
  [72.42, 40.4], [72.34, 40.6], [72.66, 40.51], [73.13, 40.78], [72.19, 41.0],
  [71.72, 41.55], [71.4, 41.11], [70.79, 41.2], [70.72, 41.46], [70.17, 41.52],
  [71.26, 42.17], [71.06, 42.29], [69.15, 41.43], [68.73, 40.97], [68.52, 41.02],
  [68.6, 40.57], [67.97, 40.83], [68.13, 41.04], [67.96, 41.15], [66.71, 41.14],
  [66.53, 41.88], [66.0, 41.94], [66.1, 42.94], [65.84, 42.86], [65.0, 43.72],
  [62.0, 43.5], [61.11, 44.36],
];

const UZ_PATH = `M ${UZ_BORDER.map(([lon, lat]) => `${toX(lon)},${toY(lat)}`).join(" L ")} Z`;

function TravelDot({
  from: fromId,
  to: toId,
  dur,
  delay,
  cityMap,
  active,
}: {
  from: string;
  to: string;
  dur: number;
  delay: number;
  cityMap: Record<string, (typeof CITIES)[0]>;
  active: boolean;
}) {
  const a = cityMap[fromId];
  const b = cityMap[toId];
  if (!a || !b || !active) return null;
  const x1 = toX(a.lon);
  const y1 = toY(a.lat);
  const x2 = toX(b.lon);
  const y2 = toY(b.lat);
  return (
    <motion.circle
      r={2.5}
      cx={x1}
      cy={y1}
      fill="#C9A24B"
      style={{ filter: "drop-shadow(0 0 4px rgba(201,162,75,0.9))" }}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2, x1],
        cy: [y1, y2, y1],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: dur,
        delay: delay + 0.5,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.05, 0.5, 0.95, 1],
      }}
    />
  );
}

function CityMarker({
  city,
  active,
  delay,
  compact,
}: {
  city: (typeof CITIES)[0];
  active: boolean;
  delay: number;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cx = toX(city.lon);
  const cy = toY(city.lat);
  const anchor = cx > 450 ? "end" : "start";
  const lx = cx + (cx > 450 ? -10 : 10);

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      {city.main && (
        <>
          <motion.circle
            cx={cx}
            cy={cy}
            r={24}
            fill="none"
            stroke="rgba(201,162,75,0.12)"
            strokeWidth="1"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r={13}
            fill="none"
            stroke="rgba(201,162,75,0.28)"
            strokeWidth="0.8"
            animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </>
      )}
      <motion.circle
        cx={cx}
        cy={cy}
        r={city.main ? 6 : hovered ? 5 : 3.5}
        fill={hovered ? "#D4AF37" : "#C9A24B"}
        opacity={city.main ? 1 : 0.8}
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: 1, opacity: city.main ? 1 : 0.8 } : {}}
        transition={{ delay, duration: 0.45 }}
        style={{ filter: hovered || city.main ? "drop-shadow(0 0 5px rgba(201,162,75,0.7))" : "none" }}
      />
      {!compact && (
        <motion.text
          x={lx}
          y={cy - 9}
          fill={hovered ? "#FFFFFF" : "rgba(255,255,255,0.82)"}
          fontSize={city.main ? "10.5" : "9"}
          fontWeight={city.main ? "700" : "500"}
          textAnchor={anchor}
          fontFamily="Manrope, sans-serif"
          letterSpacing="0.04em"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.15 }}
        >
          {city.name}
        </motion.text>
      )}
      {compact && city.main && (
        <motion.text
          x={lx}
          y={cy - 10}
          fill="#E8C97A"
          fontSize="11"
          fontWeight="700"
          textAnchor={anchor}
          fontFamily="Manrope, sans-serif"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
        >
          {city.name}
        </motion.text>
      )}
    </g>
  );
}

/** Interactive Uzbekistan distribution map — shared by home section and page hero */
export function GeographyMap({
  active = true,
  compact = false,
}: {
  active?: boolean;
  compact?: boolean;
}) {
  const cityMap = useMemo(() => Object.fromEntries(CITIES.map((c) => [c.id, c])), []);

  return (
    <div
      style={{
        background: "var(--ng-elevated)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: compact ? "18px 16px" : "36px 40px",
        position: "relative",
        width: "100%",
      }}
    >
      <svg viewBox="0 0 900 430" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <motion.path
          d={UZ_PATH}
          fill="rgba(201,162,75,0.04)"
          stroke="rgba(201,162,75,0.3)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: "easeInOut" }}
        />
        <motion.path
          d={UZ_PATH}
          fill="rgba(201,162,75,0.025)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        />

        {[100, 200, 300].map((y) => (
          <line key={y} x1="50" y1={y} x2="860" y2={y} stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />
        ))}
        {[200, 400, 600, 800].map((x) => (
          <line key={x} x1={x} y1="10" x2={x} y2="420" stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />
        ))}

        {ROUTES.map(({ from: fId, to: tId }, i) => {
          const a = cityMap[fId];
          const b = cityMap[tId];
          if (!a || !b) return null;
          return (
            <motion.line
              key={i}
              x1={toX(a.lon)}
              y1={toY(a.lat)}
              x2={toX(b.lon)}
              y2={toY(b.lat)}
              stroke="rgba(201,162,75,0.18)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.03, duration: 0.4 }}
            />
          );
        })}

        {ROUTES.map((r, i) => (
          <TravelDot key={i} {...r} cityMap={cityMap} active={active} />
        ))}

        {CITIES.map((city, i) => (
          <CityMarker key={city.id} city={city} active={active} delay={0.5 + i * 0.04} compact={compact} />
        ))}
      </svg>
    </div>
  );
}
