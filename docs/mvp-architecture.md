# MVP-Architektur fuer die Babysitter-App

## Produktentscheidung

Bevorzugte Architektur fuer das erste Release:

1. Next.js als einziges Frontend- und BFF-Framework
2. spaeter Supabase fuer Auth, Postgres, Storage und Row Level Security
3. Vercel fuer Hosting und Release-Deployment

Warum:

- schneller Weg zu einem testbaren MVP
- klare Trennung der Rollen ueber Routing, Policies und Domain-Status
- gute Grundlage fuer sichere Erweiterungen ohne fruehe Ueberkomplexitaet

## Rollen

### Babysitter

- pflegt Profil, Nachweise und Verfuegbarkeit
- sieht passende Auftraege
- bewirbt sich auf Einsaetze
- bestaetigt Einsaetze
- erhaelt Bewertungen erst nach Abschluss

### Familie

- erstellt und verwaltet Auftraege
- sieht nur relevante Bewerbungen
- waehlt einen Babysitter aus
- gibt Kontaktdaten erst nach Zusage frei
- bewertet nur nach abgeschlossenem Einsatz

### Admin

- prueft Verifikation
- moderiert Profile, Bewertungen und Safety-Faelle
- kann Status anpassen und Accounts pausieren
- sieht Audit-Trails und operative Warteschlangen

## Kernentitaeten fuer Phase 2

- `users`
- `profiles`
- `family_profiles`
- `sitter_profiles`
- `jobs`
- `applications`
- `matches`
- `reviews`
- `verification_documents`
- `moderation_cases`
- `audit_events`
- `notifications`

## Kritische Statusmodelle

### Job

- `draft`
- `published`
- `under_review`
- `matched`
- `confirmed`
- `completed`
- `cancelled`

### Application

- `submitted`
- `shortlisted`
- `accepted`
- `declined`
- `withdrawn`

### Verification

- `draft`
- `submitted`
- `verified`
- `rejected`

## Sicherheitsregeln fuer das MVP

1. private Kontaktdaten bleiben bis `accepted` oder `matched` verborgen
2. Bewertungen werden nur fuer `completed`-Einsaetze freigegeben
3. Moderationsfaelle muessen im Admin-Bereich priorisiert erscheinen
4. jede sensible Mutation erzeugt einen Audit-Eintrag
5. Admin-Rechte werden strikt von Familien- und Babysitter-Rechten getrennt

## Build-Reihenfolge

1. Rollen- und Navigationsstruktur
2. Profile und Onboarding
3. Job-Erstellung und Listen
4. Bewerbungsprozess
5. Matching und Kontaktfreigabe
6. Einsatzstatus und Bewertungen
7. Admin-Warteschlangen und Moderation
8. Verifikation und Dokumentenlogik
