import { useEffect, useState, useCallback, useRef } from "react";
import { DEFAULT_CMS } from "./defaults";
import type { CmsData } from "./types";

const STORAGE_KEY = "nobel-group-cms-v2";
const AUTH_KEY = "nobel-group-admin-auth";
const PASS_KEY = "nobel-group-admin-pass";
const API_URL = "/api/cms";

/** Demo fallback — server ADMIN_PASSWORD is source of truth */
export const ADMIN_PASSWORD = "nobel2026";

function cloneDefault(): CmsData {
  return structuredClone(DEFAULT_CMS);
}

export function mergeCms(parsed: Partial<CmsData> | null | undefined): CmsData {
  const base = cloneDefault();
  if (!parsed) return base;
  return {
    ...base,
    ...parsed,
    homeHero: { ...base.homeHero, ...parsed.homeHero },
    keyStats: {
      ...base.keyStats,
      ...parsed.keyStats,
      items: parsed.keyStats?.items?.length ? parsed.keyStats.items : base.keyStats.items,
    },
    about: {
      ...base.about,
      ...parsed.about,
      capabilities: parsed.about?.capabilities?.length ? parsed.about.capabilities : base.about.capabilities,
      values: parsed.about?.values?.length ? parsed.about.values : base.about.values,
    },
    business: {
      ...base.business,
      ...parsed.business,
      directions: parsed.business?.directions?.length ? parsed.business.directions : base.business.directions,
    },
    brands: {
      ...base.brands,
      ...parsed.brands,
      own: parsed.brands?.own?.length ? parsed.brands.own : base.brands.own,
      exclusive: parsed.brands?.exclusive?.length ? parsed.brands.exclusive : base.brands.exclusive,
      distributed: parsed.brands?.distributed?.length ? parsed.brands.distributed : base.brands.distributed,
      categories: parsed.brands?.categories?.length ? parsed.brands.categories : base.brands.categories,
    },
    geography: {
      ...base.geography,
      ...parsed.geography,
      rows: parsed.geography?.rows?.length ? parsed.geography.rows : base.geography.rows,
      factories: parsed.geography?.factories?.length ? parsed.geography.factories : base.geography.factories,
      plants: parsed.geography?.plants?.length ? parsed.geography.plants : base.geography.plants,
    },
    why: {
      ...base.why,
      ...parsed.why,
      reasons: parsed.why?.reasons?.length ? parsed.why.reasons : base.why.reasons,
    },
    partnership: {
      ...base.partnership,
      ...parsed.partnership,
      audiences: parsed.partnership?.audiences?.length ? parsed.partnership.audiences : base.partnership.audiences,
      coopTypes: parsed.partnership?.coopTypes?.length ? parsed.partnership.coopTypes : base.partnership.coopTypes,
    },
    careers: {
      ...base.careers,
      ...parsed.careers,
      values: parsed.careers?.values?.length ? parsed.careers.values : base.careers.values,
      roles: parsed.careers?.roles?.length ? parsed.careers.roles : base.careers.roles,
    },
    contact: { ...base.contact, ...parsed.contact },
    companiesHero: { ...base.companiesHero, ...parsed.companiesHero },
    companies: parsed.companies?.length ? parsed.companies : base.companies,
    news: parsed.news?.length ? parsed.news : base.news,
  };
}

function cacheLocal(data: CmsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function readLocalCache(): CmsData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return mergeCms(JSON.parse(raw) as Partial<CmsData>);
  } catch {
    return null;
  }
}

function broadcast(data: CmsData) {
  window.dispatchEvent(new CustomEvent("ng-cms-updated", { detail: data }));
}

export async function fetchCmsFromServer(): Promise<{ data: CmsData; storage: string }> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`CMS API ${res.status}`);
  const json = (await res.json()) as { ok: boolean; data: CmsData | null; storage?: string };
  const data = mergeCms(json.data);
  cacheLocal(data);
  return { data, storage: json.storage || "unknown" };
}

export async function saveCmsToServer(data: CmsData): Promise<CmsData> {
  const password = sessionStorage.getItem(PASS_KEY) || ADMIN_PASSWORD;
  const next = { ...data, updatedAt: new Date().toISOString() };
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Password": password,
    },
    body: JSON.stringify(next),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; data?: CmsData; error?: string };
  if (!res.ok || !json.ok) {
    throw new Error(json.error || `Не удалось сохранить (${res.status})`);
  }
  const saved = mergeCms(json.data || next);
  cacheLocal(saved);
  broadcast(saved);
  return saved;
}

export function loadCms(): CmsData {
  return readLocalCache() || cloneDefault();
}

/** Local optimistic update (no server) */
export function applyLocalCms(data: CmsData) {
  const next = { ...data, updatedAt: new Date().toISOString() };
  cacheLocal(next);
  broadcast(next);
  return next;
}

export function resetCms() {
  return applyLocalCms(cloneDefault());
}

export async function loginAdmin(password: string): Promise<boolean> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "auth", password }),
    });
    const json = (await res.json()) as { ok?: boolean };
    if (json.ok) {
      sessionStorage.setItem(AUTH_KEY, "1");
      sessionStorage.setItem(PASS_KEY, password);
      return true;
    }
    return false;
  } catch {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      sessionStorage.setItem(PASS_KEY, password);
      return true;
    }
    return false;
  }
}

export function isAdminAuthed() {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function setAdminAuthed(ok: boolean) {
  if (ok) sessionStorage.setItem(AUTH_KEY, "1");
  else {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(PASS_KEY);
  }
}

export function useCms() {
  const [data, setData] = useState<CmsData>(() =>
    typeof window === "undefined" ? cloneDefault() : loadCms(),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<string>("local");
  const [saving, setSaving] = useState(false);
  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: remote, storage: mode } = await fetchCmsFromServer();
        if (cancelled) return;
        setData(remote);
        setStorage(mode);
        setError(null);
        broadcast(remote);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Ошибка загрузки CMS");
        setData(loadCms());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<CmsData>).detail;
      if (detail) setData(detail);
    };
    window.addEventListener("ng-cms-updated", onUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener("ng-cms-updated", onUpdate);
    };
  }, []);

  /** Optimistic local edit — site updates instantly in this browser */
  const patch = useCallback(<K extends keyof CmsData>(key: K, value: CmsData[K]) => {
    const next = applyLocalCms({ ...dataRef.current, [key]: value });
    dataRef.current = next;
    setData(next);
    return next;
  }, []);

  /** Persist full snapshot to backend */
  const update = useCallback(async (next?: CmsData) => {
    const payload = next ?? dataRef.current;
    dataRef.current = payload;
    setData(payload);
    setSaving(true);
    setError(null);
    try {
      const saved = await saveCmsToServer(payload);
      dataRef.current = saved;
      setData(saved);
      return saved;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Ошибка сохранения";
      setError(msg);
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  const persist = useCallback(async () => update(dataRef.current), [update]);

  return {
    data,
    update,
    patch,
    persist,
    loading,
    saving,
    error,
    storage,
    setError,
    reload: async () => {
      setLoading(true);
      try {
        const { data: remote, storage: mode } = await fetchCmsFromServer();
        setData(remote);
        setStorage(mode);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    },
  };
}

export function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
