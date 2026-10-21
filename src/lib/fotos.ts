/**
 * Voorbereiding van de foto's die met een offerteaanvraag meegaan.
 *
 * Een telefoonfoto is al snel 3 tot 5 MB. Vercel kapt een verzoek boven de
 * 4,5 MB af, dus vijf originelen zouden het formulier laten vastlopen op
 * precies het meest voorkomende geval. Daarom gaat elke foto eerst door de
 * canvas: langste zijde terug naar 1600 pixels en opnieuw opgeslagen als JPEG.
 * Dat levert doorgaans 200 tot 500 kB per foto, en is ruim genoeg om een
 * dichtgeslibde dakgoot of een lastig bereikbaar raam te beoordelen.
 */

export const MAX_FOTOS = 5;

/** Alles bij elkaar; blijft met een marge onder de grens van Vercel. */
export const MAX_TOTAAL = 3.5 * 1024 * 1024;

/** Hierboven komt het niet van een telefoon of camera, en openen we het niet. */
const MAX_ORIGINEEL = 30 * 1024 * 1024;

const MAX_ZIJDE = 1600;
const KWALITEIT = 0.82;

/** Een fout met een tekst die de bezoeker zo te zien krijgt. */
export class FotoFout extends Error {}

/**
 * Decodeert het bestand. `createImageBitmap` is de nette route en zet de foto
 * meteen rechtop volgens de EXIF-stand, zodat een staande telefoonfoto niet
 * gekanteld in de mail belandt. Oudere browsers kennen die optie niet en
 * sommige formaten (HEIC van een iPhone) kunnen ze helemaal niet openen,
 * vandaar de terugval en uiteindelijk `null`.
 */
async function laadAfbeelding(bestand: File): Promise<ImageBitmap | HTMLImageElement | null> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(bestand, { imageOrientation: "from-image" });
    } catch {
      try {
        return await createImageBitmap(bestand);
      } catch {
        // Formaat dat deze browser niet kan decoderen; onder via <img>.
      }
    }
  }

  const url = URL.createObjectURL(bestand);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("niet te openen"));
      img.src = url;
    });
  } catch {
    return null;
  } finally {
    // De afbeelding is op dit punt al gedecodeerd, dus de URL mag weg.
    URL.revokeObjectURL(url);
  }
}

function afmetingen(bron: ImageBitmap | HTMLImageElement): { breedte: number; hoogte: number } {
  return "naturalWidth" in bron
    ? { breedte: bron.naturalWidth, hoogte: bron.naturalHeight }
    : { breedte: bron.width, hoogte: bron.height };
}

/** Houdt de naam leesbaar in de mailbox, met de juiste extensie. */
function jpegNaam(naam: string): string {
  const kaal = (naam.split(/[\/]/).pop() || "foto").replace(/\.[^.]+$/, "");
  return `${kaal.slice(0, 60) || "foto"}.jpg`;
}

/**
 * Verkleint één foto. Geeft het origineel terug als verkleinen niets oplevert,
 * en gooit een `FotoFout` als hij echt niet mee kan.
 */
export async function verkleinFoto(bestand: File): Promise<File> {
  if (bestand.size > MAX_ORIGINEEL) {
    throw new FotoFout(`${bestand.name} is te groot om te versturen.`);
  }

  const bron = await laadAfbeelding(bestand);
  if (!bron) {
    // Niet te openen in deze browser. Past hij alsnog, dan gaat hij
    // ongewijzigd mee; Roy kan een HEIC gewoon openen.
    if (bestand.size <= MAX_TOTAAL) return bestand;
    throw new FotoFout(
      `${bestand.name} kan deze browser niet verkleinen. Stuur hem als JPEG of PNG.`,
    );
  }

  const { breedte, hoogte } = afmetingen(bron);
  const factor = Math.min(1, MAX_ZIJDE / Math.max(breedte, hoogte, 1));
  const doelBreedte = Math.max(1, Math.round(breedte * factor));
  const doelHoogte = Math.max(1, Math.round(hoogte * factor));

  const canvas = document.createElement("canvas");
  canvas.width = doelBreedte;
  canvas.height = doelHoogte;
  const ctx = canvas.getContext("2d");

  try {
    if (!ctx) {
      if (bestand.size <= MAX_TOTAAL) return bestand;
      throw new FotoFout(`${bestand.name} kon niet worden verkleind.`);
    }
    ctx.drawImage(bron, 0, 0, doelBreedte, doelHoogte);
  } finally {
    if ("close" in bron) bron.close();
  }

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", KWALITEIT),
  );
  if (!blob) {
    if (bestand.size <= MAX_TOTAAL) return bestand;
    throw new FotoFout(`${bestand.name} kon niet worden verkleind.`);
  }

  // Een kleine, goed gecomprimeerde foto wordt door herverpakken alleen maar
  // groter. Dan is het origineel de betere keuze.
  if (factor === 1 && blob.size >= bestand.size && bestand.size <= MAX_TOTAAL) {
    return bestand;
  }

  return new File([blob], jpegNaam(bestand.name), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}
