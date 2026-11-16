import crypto from "node:crypto";
import { STATUS, STATUS_MARK, statusKeyboard, telegramConfigured, tgJson } from "./_lib/telegram.js";

/**
 * Receives Telegram updates (webhook). We only care about presses on the status buttons
 * under a lead: they rewrite the status line at the bottom of that very message.
 */

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const whoIs = (u) => {
  const name = [u.first_name, u.last_name].filter(Boolean).join(" ").trim() || "Сотрудник";
  return u.username ? `${name} (@${u.username})` : name;
};

const timeTashkent = () =>
  new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent", dateStyle: "short", timeStyle: "short" });

async function isStaff(chatId, userId) {
  try {
    const r = await tgJson("getChatMember", { chat_id: chatId, user_id: userId });
    return ["creator", "administrator"].includes(r.result?.status);
  } catch {
    return false;
  }
}

export async function handleUpdate(update) {
  const cq = update?.callback_query;
  if (!cq) return;
  const answer = (text, alert = false) =>
    tgJson("answerCallbackQuery", { callback_query_id: cq.id, text, show_alert: alert }).catch(() => {});

  const m = String(cq.data || "").match(/^st:(ok|hold|cancel)$/);
  const msg = cq.message;
  if (!m || !msg || typeof msg.text !== "string") {
    await answer();
    return;
  }

  // only presses inside OUR lead channel count (the bot may sit in other chats too)
  if (String(msg.chat?.id) !== String(process.env.TELEGRAM_CHAT_ID)) {
    await answer();
    return;
  }

  // only channel admins (staff) may change a status
  if (!(await isStaff(msg.chat.id, cq.from.id))) {
    await answer("Менять статус могут только сотрудники.", true);
    return;
  }

  const key = m[1];
  const cut = msg.text.indexOf(STATUS_MARK);
  const base = cut === -1 ? msg.text : msg.text.slice(0, cut);
  const currentLine = cut === -1 ? "" : msg.text.slice(cut + STATUS_MARK.length).split("\n")[0];
  if (currentLine === STATUS[key]) {
    await answer("Этот статус уже установлен.");
    return;
  }

  const head = `${STATUS_MARK}`;
  const status = `${STATUS[key]}\n👤 ${whoIs(cq.from)} · ${timeTashkent()}`;
  const text = base + head + status;
  const entities = (msg.entities || []).filter((e) => e.offset + e.length <= base.length);
  // bold "Статус:" label
  entities.push({ type: "bold", offset: base.length + 2, length: "📌 Статус:".length });

  try {
    await tgJson("editMessageText", {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      text,
      entities,
      reply_markup: statusKeyboard(),
      disable_web_page_preview: true,
    });
    await answer(`Статус: ${STATUS[key]}`);
  } catch (e) {
    console.error("status update failed:", e?.description || e?.message);
    await answer("Не удалось обновить статус. Попробуйте ещё раз.", true);
  }
}

/** Constant-time comparison of the Telegram secret header */
function secretMatches(given) {
  const a = crypto.createHash("sha256").update(String(given ?? "")).digest();
  const b = crypto.createHash("sha256").update(String(process.env.TELEGRAM_WEBHOOK_SECRET)).digest();
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    send(res, 405, { ok: false });
    return;
  }
  if (!telegramConfigured() || !process.env.TELEGRAM_WEBHOOK_SECRET) {
    // fail closed: without a configured secret the endpoint accepts nothing
    send(res, 503, { ok: false });
    return;
  }
  if (!secretMatches(req.headers["x-telegram-bot-api-secret-token"])) {
    send(res, 401, { ok: false });
    return;
  }
  try {
    const update = typeof req.body === "object" && req.body ? req.body : await readBody(req);
    await handleUpdate(update);
  } catch (e) {
    console.error("telegram webhook error:", e?.message);
  }
  // always 200 so Telegram does not retry the same update
  send(res, 200, { ok: true });
}
