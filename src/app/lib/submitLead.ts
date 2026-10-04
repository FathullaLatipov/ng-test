export type LeadResult = { ok: true } | { ok: false; message: string };

export async function submitLead(payload: Record<string, string>): Promise<LeadResult> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
  if (!res.ok || !json.ok) {
    return {
      ok: false,
      message:
        json.message ||
        "Заявка не отправлена. Канал доставки ещё не подключён — Nobel Group должен указать получателя.",
    };
  }
  return { ok: true };
}
