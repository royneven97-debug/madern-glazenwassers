import { NextResponse } from "next/server";
import { herkomstUit, meldBezoek, meldKlik } from "@/lib/hub";

/**
 * Ontvangt de bezoeken en contactkliks van de eigen pagina's en zet ze door
 * naar de hub. Deze tussenstap bestaat zodat de projectsleutel op de server
 * blijft.
 */
export const runtime = "nodejs";

const SOORTEN = ["BELLEN", "WHATSAPP", "EMAIL"] as const;
type Soort = (typeof SOORTEN)[number];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const soort = typeof body.soort === "string" ? body.soort.toUpperCase() : "";
  const herkomst = herkomstUit(body);

  if (soort === "BEZOEK") {
    const apparaat = body.apparaat === "mobiel" || body.apparaat === "desktop" ? body.apparaat : undefined;
    await meldBezoek(herkomst, apparaat);
    return NextResponse.json({ ok: true });
  }

  if (!(SOORTEN as readonly string[]).includes(soort)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const pagina = typeof body.pagina === "string" ? body.pagina.slice(0, 200) : undefined;
  await meldKlik(soort as Soort, pagina, herkomst);

  return NextResponse.json({ ok: true });
}
