"use client";

import { useEffect, useRef, useState } from "react";
import { FotoFout, MAX_FOTOS, MAX_TOTAAL, verkleinFoto } from "@/lib/fotos";

type Props = {
  /** De verkleinde foto's, klaar om met de aanvraag mee te gaan. */
  onFotos: (fotos: File[]) => void;
};

type Gekozen = { bestand: File; url: string };

function leesbaar(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/**
 * Het vak voor foto's bij de offerteaanvraag: aanklikken of erop slepen, en de
 * foto's gaan als bijlage mee met dezelfde verzending. Ze worden in de browser
 * verkleind voordat ze de deur uit gaan, zie lib/fotos.ts.
 */
export function FotoVeld({ onFotos }: Props) {
  const [gekozen, setGekozen] = useState<Gekozen[]>([]);
  const [bezig, setBezig] = useState(false);
  const [sleept, setSleept] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const invoer = useRef<HTMLInputElement>(null);

  // De voorbeelden hangen aan object-URL's. Die geeft de browser pas vrij als
  // we het zeggen, en na een gelukte verzending verdwijnt dit vak in één keer.
  const laatste = useRef<Gekozen[]>([]);
  useEffect(() => {
    laatste.current = gekozen;
  }, [gekozen]);
  useEffect(() => () => laatste.current.forEach((f) => URL.revokeObjectURL(f.url)), []);

  async function voegToe(bestanden: FileList | File[] | null) {
    const nieuw = bestanden ? Array.from(bestanden) : [];
    if (!nieuw.length) return;

    setBezig(true);
    setFout(null);

    // Eén melding is genoeg: de bezoeker ziet in de lijst wat er wel gelukt is.
    let melding: string | null = null;
    let lijst = gekozen;

    for (const bestand of nieuw) {
      if (lijst.length >= MAX_FOTOS) {
        melding ??= `Er kunnen maximaal ${MAX_FOTOS} foto's mee.`;
        break;
      }
      if (!bestand.type.startsWith("image/")) {
        melding ??= `${bestand.name} is geen foto.`;
        continue;
      }
      try {
        const klein = await verkleinFoto(bestand);
        const totaal = lijst.reduce((t, f) => t + f.bestand.size, 0) + klein.size;
        if (totaal > MAX_TOTAAL) {
          melding ??= `${bestand.name} past er niet meer bij. Verstuur de aanvraag en mail de rest als dat nodig is.`;
          continue;
        }
        lijst = [...lijst, { bestand: klein, url: URL.createObjectURL(klein) }];
      } catch (err) {
        melding ??=
          err instanceof FotoFout ? err.message : `${bestand.name} kon niet worden toegevoegd.`;
      }
    }

    setGekozen(lijst);
    onFotos(lijst.map((f) => f.bestand));
    setFout(melding);
    setBezig(false);
    // Leeggooien, anders negeert de browser dezelfde foto een tweede keer.
    if (invoer.current) invoer.current.value = "";
  }

  function verwijder(index: number) {
    const weg = gekozen[index];
    if (weg) URL.revokeObjectURL(weg.url);
    const rest = gekozen.filter((_, i) => i !== index);
    setGekozen(rest);
    onFotos(rest.map((f) => f.bestand));
    setFout(null);
  }

  const vol = gekozen.length >= MAX_FOTOS;

  return (
    <div>
      <span className="block text-sm font-medium text-navy-900">
        Foto&apos;s van de situatie <span className="font-normal text-navy-800/60">(optioneel)</span>
      </span>

      <label
        htmlFor="fotos"
        onDragOver={(e) => {
          e.preventDefault();
          setSleept(true);
        }}
        onDragLeave={() => setSleept(false)}
        onDrop={(e) => {
          e.preventDefault();
          setSleept(false);
          if (!vol && !bezig) void voegToe(e.dataTransfer.files);
        }}
        className={`mt-1.5 flex min-h-[7rem] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-6 text-center transition-colors ${
          sleept ? "border-water-400 bg-water-50" : "border-mist-200 bg-mist-50 hover:border-water-300"
        } ${vol ? "cursor-not-allowed opacity-60" : ""}`}
      >
        {/* Bewust zonder name: de foto's gaan apart mee in lib/lead.ts, niet
            als formulierveld. */}
        <input
          id="fotos"
          ref={invoer}
          type="file"
          accept="image/*"
          multiple
          disabled={vol || bezig}
          onChange={(e) => void voegToe(e.target.files)}
          className="sr-only"
        />
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-water-500"
          aria-hidden
        >
          <path d="M3 17V7a2 2 0 0 1 2-2h3l1.5-2h5L16 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
        <span className="text-sm font-medium text-navy-900">
          {bezig
            ? "Foto's voorbereiden…"
            : vol
              ? `Maximaal ${MAX_FOTOS} foto's`
              : "Foto's kiezen of hierheen slepen"}
        </span>
        <span className="text-xs text-navy-800/60">
          Ramen, dakgoot of pand. Maximaal {MAX_FOTOS} foto&apos;s, ze gaan direct met de aanvraag
          mee.
        </span>
      </label>

      {gekozen.length > 0 && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {gekozen.map((f, i) => (
            <li
              key={f.url}
              className="flex items-center gap-3 rounded-xl border border-mist-200 bg-white p-2"
            >
              {/* Een voorbeeld uit de browser zelf; next/image kan hier niet bij. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.url}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
                aria-hidden
              />
              <span className="min-w-0 flex-1 text-xs text-navy-800/80">
                <span className="block truncate font-medium text-navy-900">{f.bestand.name}</span>
                {leesbaar(f.bestand.size)}
              </span>
              <button
                type="button"
                onClick={() => verwijder(i)}
                className="shrink-0 rounded-full p-1.5 text-navy-800/60 transition-colors hover:bg-mist-100 hover:text-navy-900"
                aria-label={`${f.bestand.name} verwijderen`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {fout && (
        <p role="status" className="mt-2 text-xs text-navy-900">
          {fout}
        </p>
      )}
    </div>
  );
}
