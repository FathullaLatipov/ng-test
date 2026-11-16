import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const REDIS_KEY = "nobel-group:cms";
const LOCAL_FILE = path.join(process.cwd(), "data", "cms.json");

function redisConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function redisCommand(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Redis command failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function redisGet() {
  const json = await redisCommand(["GET", REDIS_KEY]);
  if (json.result == null) return null;
  return typeof json.result === "string" ? JSON.parse(json.result) : json.result;
}

async function redisSet(data) {
  await redisCommand(["SET", REDIS_KEY, JSON.stringify(data)]);
}

function fileGet() {
  try {
    if (!fs.existsSync(LOCAL_FILE)) return null;
    return JSON.parse(fs.readFileSync(LOCAL_FILE, "utf8"));
  } catch {
    return null;
  }
}

function fileSet(data) {
  const dir = path.dirname(LOCAL_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCAL_FILE, JSON.stringify(data, null, 2), "utf8");
}

/**
 * Admin password comes only from ADMIN_PASSWORD. The old built-in default ("nobel2026") is public in the
 * repository, so it is accepted only for local development (never on Vercel).
 */
export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.VERCEL ? "" : "nobel2026";
}

/** Constant-time check; an empty/unset password never matches */
export function passwordOk(candidate) {
  const expected = getAdminPassword();
  if (!expected || typeof candidate !== "string" || !candidate) return false;
  const a = crypto.createHash("sha256").update(candidate).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function getStorageMode() {
  if (redisConfigured()) return "redis";
  if (process.env.VERCEL) return "none";
  return "file";
}

export async function readCms() {
  if (redisConfigured()) return redisGet();
  if (process.env.VERCEL) return null;
  return fileGet();
}

export async function writeCms(data) {
  const mode = getStorageMode();
  if (mode === "redis") {
    await redisSet(data);
    return { mode };
  }
  if (mode === "file") {
    fileSet(data);
    return { mode };
  }
  const err = new Error(
    "На Vercel нужно подключить Upstash Redis (UPSTASH_REDIS_REST_URL и UPSTASH_REDIS_REST_TOKEN).",
  );
  err.code = "NO_STORAGE";
  throw err;
}
