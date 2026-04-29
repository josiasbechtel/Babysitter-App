import { RoleExperience } from "@/lib/domain";

export const architectureLayers = [
  {
    title: "App Layer",
    detail:
      "Next.js App Router mit klar getrennten Flows fuer Babysitter, Familien und Admin. Server Components fuer lesende Daten, spaeter Server Actions fuer Mutationen."
  },
  {
    title: "Domain Layer",
    detail:
      "Klare Statusmodelle fuer Profile, Auftraege, Bewerbungen, Matches, Bewertungen und Safety-Faelle. Keine impliziten Seiteneffekte."
  },
  {
    title: "Trust Layer",
    detail:
      "Kontaktdaten bleiben bis zur Zusage verborgen. Verifikation, Moderation, Audit-Logs und Admin-Eingriffe sind Kernfunktionen des Produkts."
  },
  {
    title: "Data Layer",
    detail:
      "Im MVP fuer die UI mit Demo-Daten befuellt. In Phase 2 fuer Supabase-Tabellen, RLS-Rollen, Storage und Benachrichtigungen vorbereitet."
  }
];

export const releasePhases = [
  "Phase 1: Rollen, Profile, Auftragsfluss, Bewerbungen, Matching und Admin-Monitoring",
  "Phase 2: Auth, Supabase-Datenmodell, RLS, Verifikation, Dateiuploads und Benachrichtigungen",
  "Phase 3: Chat, Zahlungen, Wiederbuchungen, Eskalationsfaelle und operative Automatisierungen"
];

export const roleExperiences: RoleExperience[] = [
  {
    role: "family",
    label: "Familie",
    heading: "Schnell einen sicheren Einsatz besetzen",
    intro:
      "Familien sehen nur relevante Kandidat:innen, arbeiten mit klaren Statuswechseln und geben Kontaktdaten erst nach Zusage frei.",
    priorities: [
      "Auftrag mit Datum, Ort, Kinderzahl und Anforderungen erfassen",
      "Bewerbungen mit Verifikationshinweisen und Reaktionszeit vergleichen",
      "Auswahl dokumentieren und Kontaktdaten erst nach Match oeffnen"
    ],
    trustChecklist: [
      {
        label: "Kontaktfreigabe",
        detail: "Telefon und genaue Adresse bleiben verborgen, bis ein Babysitter bestaetigt wurde."
      },
      {
        label: "Bewertungen nur nach Einsatz",
        detail: "Bewertungen werden erst nach einem abgeschlossenen Einsatz freigeschaltet."
      },
      {
        label: "Statusklarheit",
        detail: "Jeder Auftrag wechselt nachvollziehbar von veroeffentlicht bis abgeschlossen oder storniert."
      }
    ],
    jobs: [
      {
        id: "job-101",
        title: "Freitagabend fuer 2 Kinder",
        city: "Berlin Prenzlauer Berg",
        date: "2026-05-08",
        hours: "18:00-23:30",
        pay: "17 EUR / Stunde",
        status: "under_review",
        children: "2 Kinder, 4 und 7 Jahre",
        requirements: ["Erfahrung mit Abendroutine", "Nichtraucher:in", "Deutsch fliessend"],
        contactUnlocked: false
      },
      {
        id: "job-087",
        title: "Nachmittagsbetreuung am Mittwoch",
        city: "Berlin Mitte",
        date: "2026-05-13",
        hours: "15:00-18:30",
        pay: "16 EUR / Stunde",
        status: "published",
        children: "1 Kind, 6 Jahre",
        requirements: ["Abholung von Schule", "Hausaufgabenbetreuung"],
        contactUnlocked: false
      }
    ],
    applications: [
      {
        id: "app-1",
        sitterName: "Mara K.",
        badges: ["Identitaet geprueft", "Erste Hilfe", "5 verifizierte Einsaetze"],
        note: "Ich habe viel Erfahrung mit Abendroutinen und kann am Freitag komplett.",
        status: "shortlisted",
        responseTime: "vor 18 Min."
      },
      {
        id: "app-2",
        sitterName: "Hannah S.",
        badges: ["Ausweis eingereicht", "Studiert Paedagogik"],
        note: "Ich wohne ganz in der Naehe und habe regelmaessige Betreuungserfahrung.",
        status: "submitted",
        responseTime: "vor 47 Min."
      }
    ],
    safetyCases: [],
    auditTrail: [
      {
        id: "audit-fam-1",
        at: "12:10",
        actor: "Familie Schneider",
        action: "Auftrag veroeffentlicht",
        reason: "Abendbetreuung gesucht"
      },
      {
        id: "audit-fam-2",
        at: "12:34",
        actor: "System",
        action: "Kontakt verborgen gehalten",
        reason: "Noch kein bestaetigtes Match"
      }
    ]
  },
  {
    role: "babysitter",
    label: "Babysitter",
    heading: "Vertrauen aufbauen und passende Jobs finden",
    intro:
      "Babysitter praesentieren sich mit verifizierbaren Profilen, sehen nur passende Einsaetze und wissen jederzeit, was fuer eine Zusage noch fehlt.",
    priorities: [
      "Profil mit Verifikation, Verfuegbarkeit und Erfahrung pflegen",
      "Nur passende Einsaetze sehen und mit strukturierter Bewerbung reagieren",
      "Nach Auswahl Bestätigung, Einsatzstatus und Bewertung sauber nachverfolgen"
    ],
    trustChecklist: [
      {
        label: "Verifikation sichtbar",
        detail: "Identitaets-, Erste-Hilfe- und Erfahrungsnachweise werden als klare Signale im Profil dargestellt."
      },
      {
        label: "Datensparsamkeit",
        detail: "Private Kontaktdaten der Familie sind vor der Zusage nicht sichtbar."
      },
      {
        label: "Faire Bewertungen",
        detail: "Bewertungen koennen nur aus echten, abgeschlossenen Einsaetzen entstehen."
      }
    ],
    jobs: [
      {
        id: "job-101",
        title: "Freitagabend fuer 2 Kinder",
        city: "Berlin Prenzlauer Berg",
        date: "2026-05-08",
        hours: "18:00-23:30",
        pay: "17 EUR / Stunde",
        status: "under_review",
        children: "2 Kinder, 4 und 7 Jahre",
        requirements: ["Abendroutine", "Vorlesen", "Abendessen vorbereiten"],
        contactUnlocked: false
      },
      {
        id: "job-099",
        title: "Samstag Mittag mit Kleinkind",
        city: "Berlin Friedrichshain",
        date: "2026-05-09",
        hours: "11:00-15:00",
        pay: "18 EUR / Stunde",
        status: "matched",
        children: "1 Kind, 2 Jahre",
        requirements: ["Kleinkind-Erfahrung", "Spielplatzbegleitung"],
        contactUnlocked: true
      }
    ],
    applications: [
      {
        id: "app-4",
        sitterName: "Du",
        badges: ["Identitaet geprueft", "Erste Hilfe", "4.9 Bewertung"],
        note: "Bewerbung fuer Freitagabend gesendet. Rueckmeldung der Familie steht aus.",
        status: "submitted",
        responseTime: "vor 22 Min."
      },
      {
        id: "app-5",
        sitterName: "Du",
        badges: ["Identitaet geprueft", "Zusage erhalten"],
        note: "Familie hat dich fuer Samstag ausgewaehlt. Adresse ist nun freigegeben.",
        status: "accepted",
        responseTime: "heute"
      }
    ],
    safetyCases: [],
    auditTrail: [
      {
        id: "audit-sit-1",
        at: "11:48",
        actor: "Mara K.",
        action: "Profil aktualisiert",
        reason: "Erste-Hilfe-Zertifikat hochgeladen"
      },
      {
        id: "audit-sit-2",
        at: "12:02",
        actor: "System",
        action: "Verifikation geprueft",
        reason: "Ausweis und Zertifikat vollstaendig"
      }
    ]
  },
  {
    role: "admin",
    label: "Admin",
    heading: "Vertrauen operativ absichern",
    intro:
      "Admins moderieren Nutzer:innen, pruefen Safety-Faelle, sehen kritische Statuswechsel und koennen sauber nachvollziehen, wer wann was getan hat.",
    priorities: [
      "Verifikationswarteschlangen und problematische Bewertungen triagieren",
      "Kontaktfreigaben, Match-Status und Beschwerden nachvollziehen",
      "Operative Eingriffe mit Audit-Historie dokumentieren"
    ],
    trustChecklist: [
      {
        label: "Moderation",
        detail: "Verdachtige Bewertungen, Profile und Nachrichten muessen mit klaren Eingriffen gesperrt oder freigegeben werden koennen."
      },
      {
        label: "Auditierbarkeit",
        detail: "Jeder sensible Schritt erzeugt einen nachvollziehbaren Eintrag im Admin-Protokoll."
      },
      {
        label: "Safety zuerst",
        detail: "Kritische Meldungen muessen schneller sichtbar sein als normale Operations-Themen."
      }
    ],
    jobs: [
      {
        id: "job-099",
        title: "Samstag Mittag mit Kleinkind",
        city: "Berlin Friedrichshain",
        date: "2026-05-09",
        hours: "11:00-15:00",
        pay: "18 EUR / Stunde",
        status: "confirmed",
        children: "1 Kind, 2 Jahre",
        requirements: ["Kontaktfreigabe protokolliert", "Bewertung spaeter freigeben"],
        contactUnlocked: true
      }
    ],
    applications: [],
    safetyCases: [
      {
        id: "safety-1",
        title: "Neue Beschwerde zu kurzfristiger Absage",
        severity: "attention",
        owner: "Trust Ops",
        nextAction: "Vorfall pruefen und Bewertung vorlaeufig ausblenden"
      },
      {
        id: "safety-2",
        title: "Verifikation unvollstaendig bei aktivem Profil",
        severity: "critical",
        owner: "Admin On Duty",
        nextAction: "Profil automatisch pausieren bis Nachweis vorliegt"
      },
      {
        id: "safety-3",
        title: "Telefonnummer vor Zusage angefragt",
        severity: "info",
        owner: "Policy Queue",
        nextAction: "Systemtext in Bewerbungsmaske anpassen"
      }
    ],
    auditTrail: [
      {
        id: "audit-admin-1",
        at: "12:16",
        actor: "Admin Lea",
        action: "Kontaktfreigabe bestaetigt",
        reason: "Match job-099 akzeptiert"
      },
      {
        id: "audit-admin-2",
        at: "12:20",
        actor: "System",
        action: "Kritischen Fall erstellt",
        reason: "Aktives Profil ohne vollstaendige Verifikation"
      }
    ]
  }
];
