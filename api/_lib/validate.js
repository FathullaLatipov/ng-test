/**
 * Server-side validation of the CMS document before it is stored.
 * Values that later become href attributes must be plain http(s) links
 * (a stored `javascript:` URL would run in every visitor's browser).
 */

function httpUrl(value) {
  try {
    const u = new URL(String(value).trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u : null;
  } catch {
    return null;
  }
}

const host = (u) => u.hostname.toLowerCase().replace(/^www\./, "");

/** Returns an error message (Russian, shown in the admin) or null when the document is fine. */
export function validateCms(data) {
  const checks = [];

  const contact = data?.contact || {};
  checks.push(["Instagram", contact.instagram, ["instagram.com"]]);
  checks.push(["Telegram", contact.telegram, ["t.me", "telegram.me", "telegram.dog"]]);
  checks.push(["Сайт завода (J.I.B.)", data?.jib?.website, null]);
  for (const c of Array.isArray(data?.companies) ? data.companies : []) {
    checks.push([`Сайт компании «${c?.name ?? ""}»`, c?.website, null]);
  }

  for (const [label, value, hosts] of checks) {
    if (value === undefined || value === null || String(value).trim() === "") continue;
    const u = httpUrl(value);
    if (!u) return `${label}: ссылка должна начинаться с https:// (другие схемы запрещены).`;
    if (hosts && !hosts.includes(host(u))) return `${label}: допустимы только ссылки на ${hosts.join(" / ")}.`;
  }
  return null;
}
