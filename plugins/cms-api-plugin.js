import fs from "node:fs";
import path from "node:path";
import { getAdminPassword, getStorageMode, readCms, writeCms } from "../api/_lib/storage.js";
import leadHandler from "../api/lead.js";

/** Load .env into process.env for local dev (Vercel injects real env vars in production) */
function loadDotEnv() {
  const file = path.join(process.cwd(), ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!m || line.trim().startsWith("#")) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadDotEnv();

function sendJson(res, status, body) {
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

/** Local /api/cms during `npm run dev` — stores to data/cms.json */
export function cmsApiPlugin() {
  return {
    name: "nobel-cms-api",
    configureServer(server) {
      // Ensure data dir exists
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] || "";
        if (url === "/api/lead") return leadHandler(req, res);
        if (url !== "/api/cms") return next();

        try {
          if (req.method === "GET") {
            const data = await readCms();
            return sendJson(res, 200, { ok: true, data, storage: getStorageMode() });
          }

          if (req.method === "POST") {
            const body = await readBody(req);
            if (body?.action === "auth") {
              const ok = body.password === getAdminPassword();
              return sendJson(res, ok ? 200 : 401, { ok });
            }
            return sendJson(res, 400, { ok: false, error: "Unknown action" });
          }

          if (req.method === "PUT") {
            if (!checkAuth(req)) {
              return sendJson(res, 401, { ok: false, error: "Неверный пароль" });
            }
            const body = await readBody(req);
            if (!body || typeof body !== "object" || !body.homeHero) {
              return sendJson(res, 400, { ok: false, error: "Некорректные данные CMS" });
            }
            const next = { ...body, updatedAt: new Date().toISOString() };
            const { mode } = await writeCms(next);
            return sendJson(res, 200, { ok: true, data: next, storage: mode });
          }

          return sendJson(res, 405, { ok: false, error: "Method not allowed" });
        } catch (e) {
          const status = e?.code === "NO_STORAGE" ? 503 : 500;
          return sendJson(res, status, { ok: false, error: e?.message || "Server error" });
        }
      });
    },
  };
}
