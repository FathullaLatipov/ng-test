import { getAdminPassword, getStorageMode, readCms, writeCms } from "./_lib/storage.js";

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

function checkAuth(req) {
  const header = req.headers["x-admin-password"] || req.headers["authorization"] || "";
  const value = String(header).replace(/^Bearer\s+/i, "").trim();
  return value && value === getAdminPassword();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Password, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    if (req.method === "GET") {
      const data = await readCms();
      send(res, 200, {
        ok: true,
        data,
        storage: getStorageMode(),
      });
      return;
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      if (body?.action === "auth") {
        const ok = body.password === getAdminPassword();
        send(res, ok ? 200 : 401, { ok });
        return;
      }
      send(res, 400, { ok: false, error: "Unknown action" });
      return;
    }

    if (req.method === "PUT") {
      if (!checkAuth(req)) {
        send(res, 401, { ok: false, error: "Неверный пароль" });
        return;
      }
      const body = await readBody(req);
      if (!body || typeof body !== "object" || !body.homeHero) {
        send(res, 400, { ok: false, error: "Некорректные данные CMS" });
        return;
      }
      const next = { ...body, updatedAt: new Date().toISOString() };
      const { mode } = await writeCms(next);
      send(res, 200, { ok: true, data: next, storage: mode });
      return;
    }

    send(res, 405, { ok: false, error: "Method not allowed" });
  } catch (e) {
    const status = e?.code === "NO_STORAGE" ? 503 : 500;
    send(res, status, { ok: false, error: e?.message || "Server error" });
  }
}
