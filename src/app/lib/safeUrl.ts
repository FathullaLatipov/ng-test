/**
 * URLs that come from the CMS (admin-editable) end up in href attributes.
 * Only plain http(s) links may pass — never javascript:, data:, vbscript: etc.
 */

export function safeHttpUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : undefined;
  } catch {
    return undefined;
  }
}

const hostIn = (hosts: string[]) => (value?: string | null) => {
  const href = safeHttpUrl(value);
  if (!href) return undefined;
  const host = new URL(href).hostname.toLowerCase().replace(/^www\./, "");
  return hosts.includes(host) ? href : undefined;
};

/** Instagram profile link (instagram.com only) */
export const safeInstagram = hostIn(["instagram.com"]);
/** Telegram link (t.me / telegram.me only) */
export const safeTelegram = hostIn(["t.me", "telegram.me", "telegram.dog"]);
