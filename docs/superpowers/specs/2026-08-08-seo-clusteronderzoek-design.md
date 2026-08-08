# Ontwerp — SEO-uitbreiding Madern Glazenwassers op basis van clusteronderzoek

**Datum:** 2026-08-08
**Status:** ter review
**Onderzoeksdata:** `seo/onderzoek-bevindingen.md`, ruwe exports in `C:\Users\Admin\Downloads`
**Bronnen:** 5 Ahrefs-exports (3.367 ontdubbelde keywords, 233.120 vol/mnd) + GSC 3 maanden

---

## 1. Aanleiding en afbakening

Madern staat goed in het Google Map Pack maar haalt organisch bijna niets binnen:
**1.871 vertoningen en 23 klikken in drie maanden**, homepage gemiddeld positie 7,4.

Het onderzoek moest één vraag beantwoorden: is er buiten het map pack genoeg vraag om
werk te rechtvaardigen? Antwoord: ja, maar niet waar we het zochten. De regionale vijver
is klein (3.520/mnd). De winst zit in **woordkeuze**, niet in meer pagina's.

**Uitgangspunt (bevestigd door Roy):** werkgebied blijft Apeldoorn plus directe
randgemeenten. Geen uitbreiding naar tientallen plaatsen.

## 2. De drie bevindingen die het ontwerp sturen

**A. Synoniem-kloof.** De site gebruikt vaktaal, de markt gebruikt spreektaal.

| Markt typt | Volume | Site gebruikt | Volume | Factor |
|---|---|---|---|---|
| dakgoot schoonmaken | 2.600 | dakgootreiniging | 150 | 17× |
| zonnepanelen schoonmaken | 4.400 | zonnepanelen reinigen | 1.000 | 4,4× |
| glasbewassing | 1.400 | (ontbreekt) | 0 | — |

Correct in de huidige site en dus ongemoeid: `gevelreiniging` (1.900 vs "gevel reinigen"
1.500), `glazenwasser` (3.500 vs "ramenwasser" 1.000), `dakkapel reinigen` (700 vs
"dakkapel schoonmaken" 450).

**B. Dakgoot is regionaal bijna zo groot als ramen** (1.220 vs 1.590/mnd), terwijl die
pagina op positie 77 staat. Dakkapel (350 regio, 7.520 landelijk) heeft geen pagina.
Rolluik/kozijn/zonwering: 0 in de regio.

**C. Zakelijk bestaat niet als zoekkanaal.** 11 keywords, 260/mnd totaal. `vve
glazenwasser` = 0, `ramen wassen kantoor` = 0. Zakelijke groei loopt via acquisitie,
niet via SEO.

## 3. Ontwerp

Drie lagen. Laag 1 is het grootste rendement per uur werk en gaat eerst.

### Laag 1 — Woordkeuze repareren (bestaande pagina's)

Datamodel blijft ongewijzigd: alles loopt via `src/lib/services.ts` en
`src/lib/serviceContent.ts`. Slug-wijziging betekent map hernoemen onder `src/app/`
plus permanente redirect in `next.config.ts`.

#### 1.1 `/dakgootreiniging` → `/dakgoot-schoonmaken`

| | |
|---|---|
| Primair | dakgoot schoonmaken (2.600, KD 1) |
| Secundair | dakgoten schoonmaken (800), dakgoot reinigen (700), dakgoot schoonmaken prijs (400), dakgoten laten schoonmaken (100), dakgoot laten schoonmaken (70) |
| Lokaal | dakgoten schoonmaken apeldoorn (150), dakgoot schoonmaken twello (100), dakgoot schoonmaken apeldoorn (20) |
| H1 | Dakgoot schoonmaken Apeldoorn |
| Nu | positie 77,5 · 337 vertoningen · 1 klik |

"Dakgootreiniging" blijft één keer in de tekst staan als synoniem, niet als target.

#### 1.2 `/zonnepanelen-reinigen` → `/zonnepanelen-schoonmaken`

| | |
|---|---|
| Primair | zonnepanelen schoonmaken (4.400, KD 10) |
| Secundair | zonnepanelen reinigen (1.000), zonnepanelen laten reinigen (250), zonnepanelen wassen (250), zonnepanelen laten schoonmaken (200) |
| Lokaal | zonnepanelen schoonmaken apeldoorn (60) |
| H1 | Zonnepanelen schoonmaken Apeldoorn |
| Nu | positie 21,2 · 271 vertoningen · 1 klik |

#### 1.3 `/glazenwassen-particulier` — slug blijft

**Bewust geen wijziging naar "ramen wassen".** Dat woord doet 4.800 maar heeft intentie
`Informational, Non-local`: doe-het-zelvers. De koopvariant "ramen laten wassen" doet
slechts 100. Verplaatsing zou commerciële intentie inruilen voor verkeer dat niet koopt.

Wel toevoegen: **glasbewassing** (1.400) en glasbewassing particulier (100) als H2 en in
de lopende tekst. Doelwoord blijft "glazenwasser particulier" (GSC: 85 + 30 vertoningen
op positie 6,5).

#### 1.4 `glasbewassing` site-breed opnemen

Homepage, `/diensten` en `/glazenwassen-particulier`. Target `glasbewassing apeldoorn`
(150, KD 3) — nu positie 13,2 met 71 vertoningen zonder dat het woord ergens staat.
Sluit bovendien aan op osmose: `osmose glasbewassing` (100), `osmose systeem
glasbewassing` (90).

### Laag 2 — Vier nieuwe pagina's

#### 2.1 `/dakkapel-reinigen`

Nieuwe dienst in `services.ts`. Cluster ~2.400/mnd landelijk: dakkapel reinigen (700),
dakkapel schoonmaken (450), dakkapel laten reinigen (150), dakkapel reinigen kosten (150),
dakkapel schoonmaken kosten (150), kunststof dakkapel reinigen (150). Regio 350.
GSC toont al 42 vertoningen op positie 89,7 zonder pagina.

> **Blokkerend:** eerst bevestigen dat Michael dit levert. Volgt het bestaande
> `available: false`-patroon — niets bouwen wat Madern niet doet.

#### 2.2 `/glazenwasser-apeldoorn-de-maten`

**Bewijs komt uitsluitend uit GSC**, niet uit Ahrefs (dat geeft 0 voor wijknamen):
50 vertoningen op **positie 3** zonder eigen pagina. Nieuwe entry in `plaatsen.ts` als
wijk, zelfde `[locatie]`-route.

#### 2.3 `/glazenwasser-apeldoorn-zuid`

Ahrefs 50/mnd, GSC 78 vertoningen op positie 18,7.

#### 2.4 `/tarieven` volledig herbouwen

Krijgt nu **nul vertoningen** terwijl het cluster ~1.800/mnd doet bij KD 0-1:
wat kost een glazenwasser (500), prijs glazenwasser (200), glazenwasser tarieven (150),
glazenwasser prijs (150), glazenwasser kosten (150), kosten glazenwasser (150),
wat kost een glazenwasser per uur (150), per m2 (100), gemiddeld (70),
kosten glazenwasser particulier (60), kosten glazenwasser appartement (40).
Lokaal: glazenwasser apeldoorn kosten (50) — GSC 56 vertoningen op positie 10,7.

Opzet: prijsindicaties per woningtype en per frequentie, uitleg wat de prijs bepaalt,
FAQ met de exacte vraagvormen, en een offerte-CTA.

> **Blokkerend:** Roy levert echte prijsindicaties aan. Prijzen worden niet verzonnen.

### Laag 3 — Kennisbank

Osmose-cluster 19.500/mnd landelijk, vraag-cluster 9.730/mnd met traffic potential tot
4.000. Nul lokaal. Dit is autoriteit en voer voor AI-zoekmachines, **geen directe
leadmotor** — zo moet het ook beoordeeld worden.

| Artikel | Doelwoorden |
|---|---|
| `wat-is-osmosewater` **uitbreiden** (nu pos 24,9) | wat is osmose water (5.550-cluster), wat is osmose (900), hoe werkt osmose, nadelen osmose water |
| Waarmee kun je het beste ramen wassen | waarmee ramen wassen (1.000, TP 3.000), hoe het beste ramen wassen (100, TP 3.600) |
| Hoe vaak zonnepanelen schoonmaken | moet je zonnepanelen schoonmaken (300, TP 7.300), hoe vaak (150, TP 2.200) |
| Hoe vaak dakgoot schoonmaken | hoe vaak dakgoot schoonmaken (150, TP 1.300), wanneer dakgoot schoonmaken (150) |
| Wat kost dakgoot schoonmaken | dakgoot schoonmaken prijs (400), wat kost een dakgoot schoonmaken (100, TP 1.500) |
| Wat is glasbewassing | wat is glasbewassing (60), glasbewassing (1.400) |
| Wat voor water gebruikt een glazenwasser | (80) + welk water gebruikt een glazenwasser (70) |
| `hoe-vaak-ramen-laten-wassen` **uitbreiden** | hoe vaak ramen wassen (200), hoe vaak ramen wassen buiten (90) |

## 4. Wat we bewust niet doen

| Niet doen | Reden |
|---|---|
| Zakelijk/VvE-cluster uitbouwen | 260/mnd totaal. Pagina blijft bestaan als landingsplek, krijgt geen SEO-investering. |
| Rolluiken, kozijnen, zonwering | 1.980 landelijk maar **0** in de regio. |
| Extra plaatspagina's | Buiten het afgesproken werkgebied. |
| DIY-content (raamwisser, telescoopsteel, glazenwasser set) | 8.560/mnd maar levert geen klanten en er valt niets te verkopen. |
| AggregateRating-schema | Blijft uit, self-serving. Ongewijzigd beleid. |

## 5. Volgorde

1. Laag 1 (woordkeuze + redirects) — grootste effect, laagste risico
2. `/tarieven` — zodra prijzen er zijn
3. Wijkpagina's De Maten en Apeldoorn Zuid
4. `/dakkapel-reinigen` — zodra bevestigd
5. Kennisbank, artikel voor artikel

## 6. Meetplan

Nulmeting vastgelegd op 2026-08-08: 1.871 vertoningen, 23 klikken, homepage positie 7,4.
Herijken in GSC na 6 en na 12 weken. `seo/rank-tracker.csv` uitbreiden met de nieuwe
doelzoekwoorden per pagina.

Succescriterium na 12 weken: dakgoot en zonnepanelen uit de 20+ naar de top 10, en
`/tarieven` meetbaar aanwezig (nu nul vertoningen).

## 7. Risico's

| Risico | Aanpak |
|---|---|
| 301 op jong domein geeft tijdelijke dip | Aanvaard: pagina's staan nu op 77 en 21, er valt weinig te verliezen. Redirects in `next.config.ts`, niet client-side. |
| Lokale build faalt op exFAT (D:) | Verifiëren met `tsc --noEmit` plus Vercel-cloudbuild, niet lokaal bouwen. |
| Dakkapel-dienst niet geleverd | `available: false` tot bevestiging. |
| Prijzen ontbreken | `/tarieven` wacht op echte cijfers van Roy. |
| Dunne wijkpagina's | Zelfde diepte als de bestaande locatiepagina's (350-460 woorden), unieke inhoud per wijk. |
