import { useEffect, useRef } from "react";
import type { CompanyBgKind } from "../../cms/types";

type Props = {
  kind: CompanyBgKind;
  active: boolean;
};

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function CompanyBgCanvas({ kind, active }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (kind === "video" || kind === "image") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let clock = 0;
    let running = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // scene state
    const streams = [0.28, 0.5, 0.74].map((px) => ({
      px,
      amp: rand(6, 14),
      speed: rand(0.6, 1.1),
      phase: rand(0, 10),
      width: rand(5, 9),
    }));
    let ripples: { x: number; y: number; r: number; a: number }[] = [];
    let rippleTimer = 0;

    const palms = [0.08, 0.3, 0.55, 0.8, 0.94].map((px, i) => ({
      px,
      depth: i % 2 === 0 ? 0.6 : 1,
      phase: rand(0, 10),
      speed: rand(0.5, 0.9),
      scale: rand(0.7, 1.25),
    }));
    const pollen = Array.from({ length: 22 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(1, 2.6),
      speed: rand(6, 16),
      drift: rand(-8, 8),
    }));

    const milkStreams = [0.35, 0.62].map((px) => ({
      px,
      amp: rand(3, 7),
      speed: rand(0.7, 1.1),
      phase: rand(0, 10),
      width: rand(7, 11),
    }));
    const powder = Array.from({ length: 40 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(1, 2.4),
      speed: rand(4, 10),
      drift: rand(-6, 6),
    }));

    const drips = [0.22, 0.5, 0.76].map((px, i) => ({
      px,
      phase: i * 1.6,
      speed: rand(0.35, 0.5),
      size: rand(9, 15),
    }));
    const grains = Array.from({ length: 50 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      w: rand(2, 4),
      h: rand(4, 8),
      rot: rand(0, 6.28),
      a: rand(0.2, 0.55),
    }));

    const leaf = (cx: number, cy: number, scale: number, angle: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-14, -40, -46, -58, -70, -46);
      ctx.bezierCurveTo(-40, -38, -16, -24, 0, 0);
      ctx.bezierCurveTo(16, -24, 40, -38, 70, -46);
      ctx.bezierCurveTo(46, -58, 14, -40, 0, 0);
      ctx.closePath();
      ctx.fillStyle = `rgba(154,61,26,${alpha})`;
      ctx.fill();
      ctx.restore();
    };

    const frameOil = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const poolY = h * 0.82;
      const poolGrad = ctx.createLinearGradient(0, poolY, 0, h);
      poolGrad.addColorStop(0, "rgba(240,193,75,0.30)");
      poolGrad.addColorStop(1, "rgba(240,193,75,0.05)");
      ctx.fillStyle = poolGrad;
      ctx.fillRect(0, poolY, w, h - poolY);

      streams.forEach((s) => {
        const x0 = w * s.px;
        ctx.beginPath();
        ctx.moveTo(x0, -10);
        for (let y = 0; y <= poolY; y += 14) {
          const wob = Math.sin(t * s.speed + y * 0.02 + s.phase) * s.amp * (y / poolY);
          ctx.lineTo(x0 + wob, y);
        }
        ctx.strokeStyle = "rgba(240,193,75,0.5)";
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,235,180,0.35)";
        ctx.lineWidth = s.width * 0.35;
        ctx.stroke();
      });

      rippleTimer += 1;
      if (rippleTimer > 26) {
        rippleTimer = 0;
        const s = streams[Math.floor(Math.random() * streams.length)];
        ripples.push({ x: w * s.px, y: poolY, r: 4, a: 0.5 });
      }
      ripples.forEach((r) => {
        r.r += 0.7;
        r.a -= 0.008;
      });
      ripples = ripples.filter((r) => r.a > 0);
      ripples.forEach((r) => {
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,224,140,${r.a})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });
    };

    const framePalm = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const gx = w * 0.78 + Math.sin(t * 0.15) * 30;
      const gy = h * 0.22 + Math.cos(t * 0.1) * 14;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.32);
      glow.addColorStop(0, "rgba(232,138,69,0.45)");
      glow.addColorStop(1, "rgba(232,138,69,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      palms
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .forEach((p) => {
          const cx = w * p.px;
          const cy = h * (0.55 + (1 - p.depth) * 0.25);
          const sway = Math.sin(t * p.speed + p.phase) * 0.18;
          const alpha = 0.25 + p.depth * 0.35;
          for (let k = -2; k <= 2; k++) {
            leaf(cx, cy, (p.scale * (60 + p.depth * 40)) / 60, sway + k * 0.55, alpha);
          }
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx - 6 * p.depth, cy + 70 * p.depth);
          ctx.strokeStyle = `rgba(58,20,8,${0.3 + p.depth * 0.3})`;
          ctx.lineWidth = 5 * p.depth;
          ctx.stroke();
        });

      pollen.forEach((pt) => {
        pt.y -= pt.speed / 2000;
        pt.x += Math.sin(t + pt.drift) * 0.0006;
        if (pt.y < -0.05) pt.y = 1.05;
        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,210,150,0.5)";
        ctx.fill();
      });
    };

    const frameMilk = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const poolY = h * 0.8;
      const poolGrad = ctx.createLinearGradient(0, poolY, 0, h);
      poolGrad.addColorStop(0, "rgba(234,244,248,0.28)");
      poolGrad.addColorStop(1, "rgba(234,244,248,0.05)");
      ctx.fillStyle = poolGrad;
      ctx.fillRect(0, poolY, w, h - poolY);

      milkStreams.forEach((s) => {
        const x0 = w * s.px;
        ctx.beginPath();
        ctx.moveTo(x0, -10);
        for (let y = 0; y <= poolY; y += 14) {
          const wob = Math.sin(t * s.speed + y * 0.025 + s.phase) * s.amp * (y / poolY);
          ctx.lineTo(x0 + wob, y);
        }
        ctx.strokeStyle = "rgba(234,244,248,0.55)";
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = s.width * 0.3;
        ctx.stroke();
      });

      rippleTimer += 1;
      if (rippleTimer > 22) {
        rippleTimer = 0;
        const s = milkStreams[Math.floor(Math.random() * milkStreams.length)];
        ripples.push({ x: w * s.px, y: poolY, r: 4, a: 0.5 });
      }
      ripples.forEach((r) => {
        r.r += 0.75;
        r.a -= 0.009;
      });
      ripples = ripples.filter((r) => r.a > 0);
      ripples.forEach((r) => {
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.r, r.r * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${r.a})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      powder.forEach((pt) => {
        pt.y -= pt.speed / 3000;
        pt.x += Math.sin(t * 0.5 + pt.drift) * 0.0004;
        if (pt.y < -0.05) pt.y = 1.05;
        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(234,244,248,0.65)";
        ctx.fill();
      });
    };

    const frameSyrup = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      grains.forEach((g) => {
        ctx.save();
        ctx.translate(g.x * w, g.y * h);
        ctx.rotate(g.rot + t * 0.05);
        ctx.fillStyle = `rgba(233,207,122,${g.a})`;
        ctx.fillRect(-g.w / 2, -g.h / 2, g.w, g.h);
        ctx.restore();
      });

      drips.forEach((d) => {
        const cycle = (t * d.speed + d.phase) % 4;
        const x = w * d.px;
        if (cycle < 2.6) {
          const y = -20 + (cycle / 2.6) * (h * 0.62);
          const stretch = 1 + cycle * 0.15;
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(1, stretch);
          ctx.beginPath();
          ctx.arc(0, 0, d.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(233,207,122,0.85)";
          ctx.fill();
          ctx.restore();
          ctx.strokeStyle = "rgba(233,207,122,0.4)";
          ctx.lineWidth = d.size * 0.35;
          ctx.beginPath();
          ctx.moveTo(x, -20);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          const settle = (cycle - 2.6) / 1.4;
          const y = h * 0.64;
          const spreadX = d.size * (1 + settle * 1.8);
          const spreadY = d.size * (0.6 - settle * 0.3);
          ctx.beginPath();
          ctx.ellipse(x, y, spreadX, Math.max(2, spreadY), 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184,134,47,${0.5 * (1 - settle)})`;
          ctx.fill();
        }
      });
    };

    const draw = () => {
      if (!running) return;
      clock += 0.016;
      if (kind === "oil") frameOil(clock);
      else if (kind === "palm") framePalm(clock);
      else if (kind === "milk") frameMilk(clock);
      else if (kind === "syrup") frameSyrup(clock);
      raf = requestAnimationFrame(draw);
    };

    if (active) {
      running = true;
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [kind, active]);

  if (kind === "video" || kind === "image") return null;

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
