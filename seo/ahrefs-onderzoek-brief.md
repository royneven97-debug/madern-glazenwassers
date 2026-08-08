# Ahrefs + GSC onderzoeksbrief — Madern Glazenwassers

**Fase 1: marktomvang meten.** Doel is één vraag beantwoorden: is er buiten het Google
Map Pack genoeg zoekvolume om extra pagina's te rechtvaardigen? Pas als het antwoord
ja is, doen we het volledige clusteronderzoek.

Alle exports naar `C:\Users\Admin\Downloads` — laat de standaard bestandsnaam staan,
daar herken ik ze aan.

---

## Export 1 — Het complete keyword-universum (Ahrefs Keywords Explorer)

1. Ga naar **Keywords Explorer**.
2. Zet het land op **Netherlands**.
3. Plak deze 10 seeds in het zoekveld (één per regel):

```
glazenwasser
glazenwassen
glazenwasserij
glazenbewassing
ruitenwasser
ramen wassen
ramen laten wassen
zonnepanelen reinigen
dakgoot reinigen
gevelreiniging
```

4. Zoeken. Ahrefs behandelt dit als één set.
5. Klik in het **linkermenu** op **Matching terms**.
6. **Geen filters instellen.** Ik wil ook de termen met volume 0-10 zien; die vormen samen
   vaak de helft van het echte verkeer en verraden hoe mensen praten.
7. Rechtsboven **Export → CSV**.

> Staat het aantal rijen boven de 10.000 en kap je export af: zet dan één filter aan,
> **Volume: minimaal 10**, en exporteer opnieuw. Meld even dat je dat gedaan hebt.

**Waarom:** hieruit haal ik de totale markt, de opsplitsing lokaal/landelijk, en de
long-tail die geen map pack triggert. Ik snijd zelf de Apeldoorn-termen eruit.

---

## Export 2 — Waar de concurrentie wél op rankt (Content Gap)

Eerst de concurrenten bepalen:

1. Google op **"glazenwasser apeldoorn"**.
2. Scroll **voorbij** het kaartje/map pack naar de gewone blauwe resultaten.
3. Noteer de eerste **4 domeinen** die daar staan. Sla Google-eigen resultaten,
   Werkspot, Trustoo, Marktplaats en andere verzamelsites over — dat zijn geen
   concurrenten maar marktplaatsen.

Dan in Ahrefs:

4. Ga naar **Competitive Analysis** (of Site Explorer → **Content gap**).
5. Bovenaan (het "this target doesn't rank for"-veld): `madernglazenwassers.nl`
6. Daaronder de 4 domeinen uit stap 3.
7. **Show keywords**, daarna **Export → CSV**.

**Waarom:** dit is de directste lijst met gaten in de site. Alles wat zij hebben en jij
niet, met volume erbij.

---

## Export 3 — Wat je nú al binnenhaalt (Google Search Console)

Dit is je eigen data en daarmee betrouwbaarder dan elke tool.

1. Open **Search Console** → property `madernglazenwassers.nl`.
2. Links **Prestaties → Zoekresultaten**.
3. Zet de periode op **Laatste 3 maanden**.
4. Zet bovenaan alle vier de vinkjes aan: **Klikken, Vertoningen, CTR, Positie**.
5. Rechtsboven **Exporteren → CSV downloaden**. Je krijgt een zip met o.a.
   `Queries.csv` en `Pages.csv` — laat die zip gewoon in Downloads staan, ik pak beide.

**Waarom:** Ahrefs schat volumes, GSC meet ze. Als een term in Ahrefs op 20 staat maar
jij 300 vertoningen hebt, dan klopt Ahrefs niet en GSC wel. Ook zie ik hier of pagina's
inmiddels geïndexeerd zijn (stand 24-07 was nog "Ontdekt, niet geïndexeerd").

---

## Wat ik ermee doe

| Vraag | Uit welke bron |
|---|---|
| Hoe groot is de totale markt in zoekopdrachten per maand? | Export 1 |
| Welk deel daarvan zit buiten het map pack (informatief, zakelijk, buiten Apeldoorn)? | Export 1 + 2 |
| Waar sta je al zonder het te weten? | Export 3 |
| Welke pagina's ontbreken en zijn ze het waard? | Export 2 + 3 |

Daarna krijg je van mij één beslisadvies: doorpakken met het volledige clusteronderzoek,
of stoppen en de energie in reviews en backlinks steken.

> **Fase 1 afgerond 08-08-2026.** Bevindingen staan in `onderzoek-bevindingen.md`.
> Uitkomst: lokale vijver klein (1.500/mnd), maar forse woordkeuze-mismatch en een
> onbenut prijs-cluster. Besluit: door naar fase 2.

---
---

# FASE 2 — clusteronderzoek

Fase 1 legde een fout in mijn eigen aanpak bloot: de seeds waren gebouwd op **mijn**
woordkeuze ("reinigen"), terwijl jouw markt **"schoonmaken"** typt. Alles in die
woordfamilie is nog ongemeten. Fase 2 sluit die blinde vlek plus drie andere.

Vier exports. De laatste twee komen uit dezelfde Ahrefs-sessie, dus het zijn er in de
praktijk drie.

---

## Export 4 — De "schoonmaken"-woordfamilie + aangrenzende diensten

**Keywords Explorer → Netherlands → deze seeds → Matching terms → geen filters → Export**

```
dakgoot schoonmaken, dakgoten schoonmaken, zonnepanelen schoonmaken, ramen schoonmaken, gevel schoonmaken, glasbewassing, dakkapel reinigen, dakkapel schoonmaken, rolluiken reinigen, kozijnen reinigen, zonwering reinigen, serre reinigen, veranda schoonmaken
```

**Waarom:** de eerste vijf sluiten de synoniem-blinde vlek. De laatste zeven testen
of er vraag is naar diensten die Michael met zijn bestaande materiaal en osmose-installatie
gewoon kan leveren. `dakkapel reinigen apeldoorn` gaf al 42 vertoningen in GSC zonder dat
je er een pagina voor hebt — de vraag is of dat een uitschieter is of een patroon.

---

## Export 5 — De zakelijke kant

**Keywords Explorer → Netherlands → deze seeds → Matching terms → geen filters → Export**

```
glazenwasser bedrijf, glasbewassing bedrijf, ramen wassen kantoor, vve glazenwasser, vve onderhoud ramen, schoonmaakbedrijf ramen, glazenwassen contract, glazenwasser abonnement, glasbewassing offerte, bedrijfspand ramen wassen, winkel ramen wassen, school ramen wassen, horeca ramen wassen
```

**Waarom:** in fase 1 vond ik maar 14 zakelijke keywords (1.180/mnd), maar die seeds waren
particulier-gericht. Zakelijk gebruikt ander vocabulaire, heeft zelden een map pack, en
één kantoorcontract is meer waard dan tien particulieren per jaar. Dit is de hoek waar
DROS je nu voorbijloopt.

---

## Export 6 + 7 — Vraag-cluster en topical map (één sessie)

**Keywords Explorer → Netherlands → deze seeds:**

```
glazenwasser, ramen wassen, osmosewater, glasbewassing, zonnepanelen schoonmaken, dakgoot schoonmaken, gevelreiniging
```

Daarna twee keer exporteren vanuit **hetzelfde** resultaat:

- **Export 6:** linkermenu → **Matching terms**, en zet daarbinnen de weergave op
  **Questions** (afhankelijk van je Ahrefs-versie staat dat als apart tabblad in het
  linkermenu, of als knop "Questions" boven de lijst). Export CSV.
- **Export 7:** linkermenu → **Related terms**. Export CSV.

**Waarom Export 6:** vragen zijn waar AI-zoekmachines en de "Mensen vragen ook"-blokken
uit putten. Jouw osmose-artikel staat al op positie 25 met 182 vertoningen — er is meer
vraag in die hoek dan je bedient.

**Waarom Export 7:** dit is het echte clusteronderzoek. Related terms toont onderwerpen
die Google semantisch bij elkaar plaatst, ook als het woord "glazenwasser" er niet in
voorkomt. Daaruit bouw ik de topical map: welke pagina hoort bij welke pillar, en wat
ontbreekt er in je dekking.

---

## Optioneel — Export 8

Google op **"wat kost een glazenwasser"**. Pak het bovenste niet-verzamelsite-domein.
Zet dat in **Site Explorer → Top pages** en exporteer.

**Waarom:** het prijs-cluster is 6.240/mnd zonder map pack en jouw `/tarieven` scoort nul.
Ik wil zien welk paginaformaat daar wint voordat ik die pagina herbouw.

