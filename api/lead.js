import fs from "node:fs";
import path from "node:path";
import { STATUS, STATUS_MARK, statusKeyboard, telegramConfigured, tgCall, tgJson } from "./_lib/telegram.js";

/* ───────────────────────── helpers ───────────────────────── */

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 6 * 1024 * 1024) {
        reject(new Error("too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
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

/** Trim + hard length cap; always a string */
/** Trim, cap the length and drop characters that could fake the bot's status block (📌) */
const clean = (v, max = 500) => String(v ?? "").replace(/\u0000/g, "").replace(/\u{1F4CC}/gu, "").trim().slice(0, max);

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Best-effort per-instance rate limit (serverless instances are short-lived, so this only stops bursts) */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 2000) hits.clear();
  return list.length > 12;
}

const FORM_LABEL = {
  partnership: "🤝 Партнёрство",
  contact: "✉️ Обращение (Контакты)",
  career: "👤 Карьера — резюме",
};

const ALLOWED_FILE_TYPES = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

/* ───────────────────────── Telegram ───────────────────────── */

function buildMessage(entry) {
  const row = (icon, label, value) => (value ? `${icon} <b>${label}:</b> ${escapeHtml(value)}` : "");
  const when = new Date(entry.at).toLocaleString("ru-RU", { timeZone: "Asia/Tashkent", dateStyle: "short", timeStyle: "short" });
  const lines = [
    `<b>${FORM_LABEL[entry.form] || "📩 Новая заявка"}</b>`,
    "",
    row("👤", "Имя", entry.name),
    row("🏢", "Компания", entry.company),
    row("📞", "Телефон", entry.phone),
    row("📧", "Email", entry.email),
    row("🏷", entry.form === "career" ? "Должность" : "Тема / тип", entry.topic),
    row("📦", "Продукт / направление", entry.product),
  ].filter((l) => l !== "");
  if (entry.message) {
    lines.push("", "💬 <b>Сообщение:</b>", escapeHtml(entry.message));
  }
  if (entry.fileName) lines.push("", `📎 Резюме: ${escapeHtml(entry.fileName)}${entry.hasFile ? "" : " (файл не передан)"}`);
  lines.push("", `🕒 ${escapeHtml(when)} (Ташкент)`, `🌐 Источник: форма на сайте${entry.test ? " · ТЕСТ" : ""}`);
  let text = lines.join("\n");
  if (text.length > 3800) text = text.slice(0, 3790) + "…";
  // status block lives at the very end; staff change it with the buttons below the message
  return text + STATUS_MARK + STATUS.new;
}

async function sendToTelegram(entry, file) {
  const chat_id = process.env.TELEGRAM_CHAT_ID;
  await tgJson("sendMessage", {
    chat_id,
    text: buildMessage({ ...entry, hasFile: Boolean(file) }),
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: statusKeyboard(),
  });
  if (file) {
    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("caption", `Резюме: ${entry.name}`.slice(0, 200));
    form.append("document", new Blob([file.buffer], { type: file.type }), file.name);
    await tgCall("sendDocument", { method: "POST", body: form });
  }
}

/* ───────────────────────── handler ───────────────────────── */

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    send(res, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = typeof req.body === "object" && req.body ? req.body : await readBody(req);
  } catch {
    send(res, 400, { ok: false, message: "Некорректные данные формы или файл слишком большой." });
    return;
  }

  const ip = String(req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  if (rateLimited(ip)) {
    send(res, 429, { ok: false, message: "Слишком много заявок за короткое время. Попробуйте позже." });
    return;
  }

  if (body.website) {
    // honeypot: pretend success
    send(res, 200, { ok: true });
    return;
  }
  if (body.consent !== "yes") {
    send(res, 400, { ok: false, message: "Нужно согласие на обработку данных." });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  if (!name || (!email && !phone)) {
    send(res, 400, { ok: false, message: "Укажите имя и email или телефон." });
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    send(res, 400, { ok: false, message: "Проверьте адрес email." });
    return;
  }

  const entry = {
    at: new Date().toISOString(),
    form: clean(body.form, 30) || "lead",
    name,
    company: clean(body.company, 160),
    email,
    phone,
    topic: clean(body.topic || body.type, 160),
    product: clean(body.product, 160),
    message: clean(body.message, 3000),
    fileName: clean(body.fileName, 160),
    test: body.test === "yes",
  };

  // optional resume attachment (base64, ≤ ~3 MB)
  let file = null;
  if (body.fileData) {
    const type = clean(body.fileType, 100);
    if (!ALLOWED_FILE_TYPES[type]) {
      send(res, 400, { ok: false, message: "Допустимы файлы PDF, DOC или DOCX." });
      return;
    }
    const buffer = Buffer.from(String(body.fileData), "base64");
    if (buffer.length === 0 || buffer.length > 3.2 * 1024 * 1024) {
      send(res, 400, { ok: false, message: "Файл резюме должен быть не больше 3 МБ." });
      return;
    }
    const base = (entry.fileName || "resume").replace(/[^\w.\-() а-яА-ЯёЁ]/g, "_").slice(0, 100);
    file = { buffer, type, name: base.toLowerCase().endsWith(ALLOWED_FILE_TYPES[type]) ? base : base + ALLOWED_FILE_TYPES[type] };
  }

  try {
    if (telegramConfigured()) {
      await sendToTelegram(entry, file);
      send(res, 200, { ok: true });
      return;
    }

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!forwarded.ok) {
        send(res, 502, { ok: false, message: "Получатель заявки не принял сообщение." });
        return;
      }
      send(res, 200, { ok: true });
      return;
    }

    if (process.env.VERCEL) {
      send(res, 503, {
        ok: false,
        reason: "not_configured",
        message: "Заявка не доставлена: на сервере не настроен получатель (TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID).",
      });
      return;
    }

    // local development without Telegram: keep a JSON log
    const logFile = path.join(process.cwd(), "data", "leads.json");
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    const prev = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, "utf8")) : [];
    prev.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(prev, null, 2));
    send(res, 200, { ok: true });
  } catch (e) {
    console.error("lead delivery failed:", e?.telegram ? e.message : "unexpected error");
    send(res, 502, { ok: false, message: "Не удалось доставить заявку. Попробуйте ещё раз или позвоните нам." });
  }
}
