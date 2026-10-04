import fs from "node:fs";
import path from "node:path";

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
    send(res, 400, { ok: false, message: "Некорректные данные формы." });
    return;
  }

  if (body.website) {
    send(res, 200, { ok: true });
    return;
  }
  if (body.consent !== "yes") {
    send(res, 400, { ok: false, message: "Нужно согласие на обработку данных." });
    return;
  }
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  if (!name || (!email && !phone)) {
    send(res, 400, { ok: false, message: "Укажите имя и email или телефон." });
    return;
  }

  const entry = {
    at: new Date().toISOString(),
    form: body.form || "lead",
    name,
    company: body.company || "",
    email,
    phone,
    topic: body.topic || body.type || "",
    product: body.product || "",
    message: body.message || "",
    fileName: body.fileName || "",
  };

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
      message:
        "Заявка не доставлена: для production нужен LEAD_WEBHOOK_URL и ответственный получатель Nobel Group.",
    });
    return;
  }

  const file = path.join(process.cwd(), "data", "leads.json");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : [];
  prev.push(entry);
  fs.writeFileSync(file, JSON.stringify(prev, null, 2));
  send(res, 200, { ok: true });
}
