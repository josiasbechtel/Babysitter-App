# Babysitter MVP

Ein erstes Next.js-App-Router-MVP fuer eine vertrauenswuerdige Babysitter-Vermittlungsplattform.

## Zielbild

Dieses Projekt bildet die Kernlogik einer sicheren Marktplatz-App fuer:

- Babysitter
- Familien
- Admin

Das MVP priorisiert Vertrauen vor Wachstum:

- klare Statusmodelle fuer Auftraege, Bewerbungen und Einsaetze
- Schutz privater Kontaktdaten bis zur bestaetigten Auswahl
- Bewertungen nur nach echten, abgeschlossenen Einsaetzen
- sichtbare Verifikation und nachvollziehbare Moderation
- ein operatives Admin-Backend statt reiner Statistik

## Enthalten im ersten Stand

- Next.js 16 App Router Grundstruktur
- zentrale Rollenansicht fuer Familie, Babysitter und Admin
- demo-basierte UI fuer:
  - Auftraege
  - Bewerbungen
  - Safety Queue
  - Audit Trail
- Release-Phasen fuer MVP bis produktionsfaehige Plattform

## Empfohlene naechste Umsetzungsschritte

1. Supabase fuer Auth, Tabellen, RLS und Storage anbinden
2. Tabellen fuer profiles, family_profiles, sitter_profiles, jobs, applications, matches, reviews, verification_documents, moderation_cases und audit_events anlegen
3. Server Actions und Route Handlers fuer Mutationen aufbauen
4. Admin-spezifische Policies und Moderationsworkflows absichern
5. Benachrichtigungen, Uploads und verifizierte Bewertungslogik produktiv machen

## Lokal starten

```bash
npm install
npm run dev
```

## Deployment

Das Projekt ist fuer Deployment auf Vercel vorbereitet. Sobald das Repository auf GitHub liegt, kann Vercel direkt daraus bauen.

Letzter Trigger fuer den ersten Vercel-Deploy: 2026-04-29.
Letzter Git-Trigger nach Vercel-Integration: 2026-04-29.
