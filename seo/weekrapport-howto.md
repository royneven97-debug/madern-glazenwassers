# Weekrapport contactkliks — instellen

Meet hoe vaak er op de bel-, WhatsApp- en e-mailknoppen van de website wordt
geklikt, en mailt daar elke maandagochtend een overzicht van.

## Wat er gemeten wordt

Elke klik op een `tel:`-, `wa.me`- of `mailto:`-link stuurt een `contact_klik`
event naar Vercel Web Analytics, met twee eigenschappen:

- `soort` — bellen / whatsapp / email
- `pagina` — het pad waar geklikt werd, bijv. `/glazenwassen-particulier`

Het gebeurt via één click-listener in `components/analytics/ContactTracking.tsx`,
niet via een `onClick` per knop. Nieuwe bel- of WhatsApp-links worden dus
automatisch meegeteld.

Vercel Web Analytics is cookieloos en slaat geen persoonsgegevens op. Er is
**geen cookiebanner** voor nodig.

## Wat er NIET in zit

Telefoontjes die iemand rechtstreeks vanuit het Google Bedrijfsprofiel start
(knop "Bellen" in Google Maps of de zoekresultaten). Die persoon komt nooit op
de website, dus geen enkele websitemeting kan dat zien. Die cijfers staan in het
Bedrijfsprofiel zelf onder Prestaties, en vereisen een aparte Google-koppeling.

## Eenmalig instellen

1. **Web Analytics aanzetten** in het Vercel-project: tabblad Analytics →
   Enable. Vanaf dat moment worden events verzameld (met terugwerkende kracht
   werkt het niet).

2. **API-token maken**: Vercel → Account Settings → Tokens → Create. Scope op
   het team waar het project onder valt.

3. **Environment variables** zetten in het Vercel-project (Settings →
   Environment Variables, scope Production):

   | Variabele | Waarde |
   |---|---|
   | `VERCEL_ANALYTICS_TOKEN` | het token uit stap 2 |
   | `ANALYTICS_PROJECT_ID` | `prj_...` uit Project Settings → General |
   | `VERCEL_TEAM_ID` | `team_...` uit Team Settings → General |
   | `CRON_SECRET` | zelf te kiezen willekeurige tekenreeks |
   | `RAPPORT_TO` | optioneel; standaard dezelfde ontvangers als `OFFERTE_TO` |

   `SMTP_USER` en `SMTP_PASS` staan er al voor het offerteformulier en worden
   hergebruikt; het rapport gaat dus via hetzelfde Google Workspace-account.

4. **Opnieuw deployen** zodat de variabelen actief worden.

## Wanneer draait het

`vercel.json` → `0 6 * * 1`, dus maandag 06:00 UTC. Dat is 08:00 in de zomer en
07:00 in de winter, Nederlandse tijd. Vercel start cronjobs binnen het uur na het
ingestelde tijdstip.

## Handmatig testen

Met `CRON_SECRET` ingesteld:

```bash
curl -H "Authorization: Bearer <CRON_SECRET>" \
  https://www.madernglazenwassers.nl/api/cron/weekrapport
```

Antwoord `{"ok":true,"totaal":N}` betekent dat de mail eruit is.

## Als er geen mail komt

Kijk in Vercel → Logs bij `/api/cron/weekrapport`. De route logt expliciet welke
stap faalt:

- `VERCEL_ANALYTICS_TOKEN of project-id ontbreekt` → stap 3 niet af.
- `Analytics-fout: 403` → het token heeft geen toegang, of het queryen van de
  Web Analytics API zit niet in het huidige Vercel-abonnement. De cijfers zijn
  dan nog wel zichtbaar in het Analytics-tabblad zelf.
- `SMTP-fout` → probleem bij het versturen, niet bij het meten. Controleer of
  het Google app-wachtwoord in `SMTP_PASS` nog geldig is.
