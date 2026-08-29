// Leest de contactkliks terug uit Vercel Web Analytics.
//
// Vereiste env-vars (in Vercel instellen):
//   VERCEL_ANALYTICS_TOKEN  – Vercel API-token met leesrechten op het project
//   VERCEL_TEAM_ID          – team-id waar het project onder valt (team_...)
//   ANALYTICS_PROJECT_ID    – optioneel; standaard het automatische VERCEL_PROJECT_ID

const API = "https://api.vercel.com/v1/query/web-analytics/events";

export type KlikRegel = { label: string; aantal: number };

export type WeekCijfers = {
  totaal: number;
  perSoort: KlikRegel[];
  perPagina: KlikRegel[];
};

function config() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.ANALYTICS_PROJECT_ID || process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !projectId) return null;
  return { token, projectId, teamId };
}

async function aggregeer(
  by: string,
  since: Date,
  until: Date,
): Promise<KlikRegel[]> {
  const cfg = config();
  if (!cfg) return [];

  const params = new URLSearchParams({
    projectId: cfg.projectId,
    since: since.toISOString(),
    until: until.toISOString(),
    by,
    filter: "eventName eq 'contact_klik'",
    limit: "20",
  });
  if (cfg.teamId) params.set("teamId", cfg.teamId);

  const res = await fetch(`${API}/aggregate?${params}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[weekrapport] Analytics-fout:", res.status, await res.text());
    return [];
  }

  const json: unknown = await res.json();
  const rows = (json as { data?: unknown }).data;
  if (!Array.isArray(rows)) return [];

  return rows
    .map((row) => {
      const r = row as Record<string, unknown>;
      // De API geeft de groepeerwaarde terug onder de by-sleutel; het aantal
      // heet afhankelijk van het endpoint "total", "count" of "value".
      const label = r[by] ?? r.key ?? r.value;
      const aantal = r.total ?? r.count ?? r.events;
      return {
        label: typeof label === "string" && label ? label : "onbekend",
        aantal: typeof aantal === "number" ? aantal : 0,
      };
    })
    .filter((r) => r.aantal > 0)
    .sort((a, b) => b.aantal - a.aantal);
}

export async function haalWeekCijfers(
  since: Date,
  until: Date,
): Promise<WeekCijfers> {
  const [perSoort, perPagina] = await Promise.all([
    aggregeer("eventData/soort", since, until),
    aggregeer("eventData/pagina", since, until),
  ]);

  return {
    totaal: perSoort.reduce((sum, r) => sum + r.aantal, 0),
    perSoort,
    perPagina,
  };
}

export function analyticsIsGeconfigureerd(): boolean {
  return config() !== null;
}
