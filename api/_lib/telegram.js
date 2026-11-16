/** Shared Telegram helpers for the lead pipeline (never log the URL: it contains the bot token). */

export const STATUS = {
  new: "🆕 Новая — ожидает обработки",
  ok: "✅ Подтверждён",
  hold: "⏸ На удержании",
  cancel: "❌ Отменён",
};

/** Marker that starts the status block at the end of a lead message */
export const STATUS_MARK = "\n\n📌 Статус: ";

export function telegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export async function tgCall(method, init) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;
  const r = await fetch(url, init);
  const json = await r.json().catch(() => ({}));
  if (!r.ok || !json.ok) {
    const err = new Error(`Telegram ${method} failed: ${json.description || r.status}`);
    err.telegram = true;
    err.description = json.description || "";
    throw err;
  }
  return json;
}

export const tgJson = (method, payload) =>
  tgCall(method, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

/** Inline keyboard under every lead: the three statuses staff can choose from */
export function statusKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "✅ Подтверждён", callback_data: "st:ok" },
        { text: "⏸ На удержании", callback_data: "st:hold" },
        { text: "❌ Отменён", callback_data: "st:cancel" },
      ],
    ],
  };
}
