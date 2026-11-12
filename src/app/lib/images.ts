/**
 * Responsive images.
 *
 * Every bundled photo in src/assets is also built (by vite-imagetools) in several widths.
 * `srcSetFor(url)` / `pickSrc(url)` map the ordinary asset URL (the one stored in components or
 * in the CMS defaults) to those variants — phones get small files, desktops / retina get big ones.
 * URLs that are not bundled assets (admin-entered links, remote photos) pass through unchanged.
 */

type Variant = { w: number; url: string };

/* Photos get 480/800/1200/1600 px variants (logos and brand marks are tiny already).
   Vite needs the glob options as literals, hence the repetition. */
const base = import.meta.glob(
  ["../../assets/*.webp", "../../assets/aris/*.webp", "../../assets/semey/*.webp", "../../assets/jib/field.webp", "../../assets/jib/oil-bottles.webp", "!../../assets/*logo*", "!../../assets/nabil*"],
  { eager: true, import: "default" },
) as Record<string, string>;

const sets = import.meta.glob(
  ["../../assets/*.webp", "../../assets/aris/*.webp", "../../assets/semey/*.webp", "../../assets/jib/field.webp", "../../assets/jib/oil-bottles.webp", "!../../assets/*logo*", "!../../assets/nabil*"],
  { eager: true, import: "default", query: { w: "480;800;1200;1600", format: "webp", as: "srcset" } },
) as Record<string, string>;

const REG = new Map<string, { srcSet: string; variants: Variant[] }>();
for (const key of Object.keys(base)) {
  const srcSet = sets[key];
  if (!srcSet) continue;
  const variants = srcSet
    .split(",")
    .map((p) => p.trim().split(/\s+/))
    .map(([url, w]) => ({ url, w: parseInt(w, 10) }))
    .filter((v) => v.url && v.w > 0)
    .sort((a, b) => a.w - b.w);
  if (variants.length) REG.set(base[key], { srcSet, variants });
}

/** `srcset` attribute for a bundled photo (undefined for anything else) */
export function srcSetFor(url?: string): string | undefined {
  return url ? REG.get(url)?.srcSet : undefined;
}

/**
 * Best single file for CSS `background-image` (which has no srcset):
 * the smallest variant that still covers the space the photo occupies at the current viewport.
 * `cols` = how many columns the photo spans the viewport in on desktop (cards in a 3-col grid → 3).
 */
export function pickSrc(url: string | undefined, cols = 1): string {
  if (!url) return "";
  const entry = REG.get(url);
  if (!entry) return url;
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const dpr = typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  const eff = vw <= 680 ? 1 : vw <= 1024 ? Math.min(cols, 2) : cols;
  const need = (vw / eff) * dpr;
  return (entry.variants.find((v) => v.w >= need) ?? entry.variants[entry.variants.length - 1]).url;
}
