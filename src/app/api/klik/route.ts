import { NextResponse } from "next/server";
import { meldKlik } from "@/lib/hub";

/**
 * Ontvangt de contactkliks van de eigen pagina's en zet ze door naar de hub.
 * Deze tussenstap bestaat zodat de projectsleutel op de server blijft.
 */
export const runtime = "nodejs";

const SOORTEN = ["BELLEN", "WHATSAPP", "EMAIL"] as const;
type Soort = (typeof SOORTEN)[number];

export async function POST(request: Request) {
  let body: { soort?: unknown; pagina?: unknown; bron?: unknown; landing?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const soort = typeof body.soort === "string" ? body.soort.toUpperCase() : "";
  if (!(SOORTEN as readonly string[]).includes(soort)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const pagina = typeof body.pagina === "string" ? body.pagina.slice(0, 200) : undefined;
  const bron = typeof body.bron === "string" ? body.bron.slice(0, 100) : undefined;
  const landing = typeof body.landing === "string" ? body.landing.slice(0, 200) : undefined;
  await meldKlik(soort as Soort, pagina, { bron, landing });

  return NextResponse.json({ ok: true });
}
