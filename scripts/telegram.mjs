/**
 * Telegram bot helper for the lead pipeline.
 *
 *   node scripts/telegram.mjs webhook https://your-site.uz   register the webhook (status buttons work on the live site)
 *   node scripts/telegram.mjs info                           show webhook status
 *   node scripts/telegram.mjs delete                         remove the webhook
 *   node scripts/telegram.mjs poll                           local testing: process button presses via polling
 *                                                            (needs NO webhook; stop the live webhook first)
 *
 * Reads TELEGRAM_BOT_TOKEN / TELEGRAM_WEBHOOK_SECRET from the environment or from ./.env
 */
import fs from "node:fs";
import path from "node:path";
import { handleUpdate } from "../api/telegram.js";

for (const line of (fs.existsSync(path.join(process.cwd(), ".env")) ? fs.readFileSync(path.join(process.cwd(), ".env"), "utf8") : "").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
  if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is not set");
  process.exit(1);
}
const api = async (method, payload = {}) => {
  const r = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return r.json();
};

const [cmd, arg] = process.argv.slice(2);

if (cmd === "webhook") {
  if (!arg || !/^https:\/\//.test(arg)) {
    console.error("Usage: node scripts/telegram.mjs webhook https://your-site.uz");
    process.exit(1);
  }
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || !/^[A-Za-z0-9_-]{16,256}$/.test(secret)) {
    console.error("Set TELEGRAM_WEBHOOK_SECRET first (16+ chars: letters, digits, _ or -). The webhook is not registered without it.");
    process.exit(1);
  }
  const res = await api("setWebhook", {
    url: arg.replace(/\/$/, "") + "/api/telegram",
    allowed_updates: ["callback_query"],
    secret_token: secret,
  });
  console.log(res.ok ? "Webhook set ✓" : "Failed: " + res.description);
} else if (cmd === "info") {
  const res = await api("getWebhookInfo");
  const i = res.result || {};
  console.log({ url: i.url || "(none)", pending: i.pending_update_count, last_error: i.last_error_message || null });
} else if (cmd === "delete") {
  const res = await api("deleteWebhook");
  console.log(res.ok ? "Webhook removed ✓" : "Failed: " + res.description);
} else if (cmd === "poll") {
  const info = await api("getWebhookInfo");
  if (info.result?.url) {
    console.error("A webhook is active (" + info.result.url + "). Run `delete` first, polling cannot work together with it.");
    process.exit(1);
  }
  console.log("Polling for button presses… (Ctrl+C to stop)");
  let offset = 0;
  for (;;) {
    const res = await api("getUpdates", { offset, timeout: 25, allowed_updates: ["callback_query"] });
    if (!res.ok) {
      console.error("getUpdates failed:", res.description);
      await new Promise((r) => setTimeout(r, 3000));
      continue;
    }
    for (const u of res.result) {
      offset = u.update_id + 1;
      console.log("press:", u.callback_query?.data, "from", u.callback_query?.from?.first_name);
      await handleUpdate(u).catch((e) => console.error("handler error:", e.message));
    }
  }
} else {
  console.log("Commands: webhook <https url> | info | delete | poll");
}
