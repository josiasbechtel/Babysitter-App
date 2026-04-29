import { AppView, NavItem, RoleExperience, UserRole } from "@/lib/domain";

export const appNavigation: NavItem[] = [
  { id: "dashboard", label: "Heute", shortLabel: "Heute" },
  { id: "jobs", label: "Einsaetze", shortLabel: "Jobs" },
  { id: "applications", label: "Bewerbungen", shortLabel: "Apps" },
  { id: "trust", label: "Trust", shortLabel: "Trust" },
  { id: "profile", label: "Profil", shortLabel: "Profil" }
];

export const roleExperiences: RoleExperience[] = [
  {
    role: "family",
    label: "Familie",
    heading: "Schnell besetzen, ohne private Daten frueh preiszugeben",
    intro:
      "Familien verwalten aktive Gesuche, vergleichen passende Bewerbungen und oeffnen Kontaktdaten erst nach dokumentierter Zusage.",
    priorities: [
      "Job mit Datum, Ort, Alter der Kinder und Anforderungen erfassen",
      "Bewerbungen nach Vertrauenssignalen und Reaktionszeit vergleichen",
      "Auswahl, Kontaktfreigabe und Einsatzstatus ohne Graubereiche steuern"
    ],
    trustChecklist: [
      {
        label: "Kontakt bleibt gesperrt",
        detail: "Adresse und Telefonnummer werden erst nach akzeptiertem Match freigegeben."
      },
      {
        label: "Nur echte Bewertungen",
        detail: "Bewertungen werden erst nach completed-Einsaetzen freigeschaltet."
      },
      {
        label: "Jeder Status ist pruefbar",
        detail: "Von published bis completed wird jeder Wechsel im Audit-Protokoll abgelegt."
      }
    ],
    metrics: [
      { label: "Aktive Gesuche", value: "3", helper: "2 heute mit neuen Bewerbungen" },
      { label: "Shortlist", value: "5", helper: "davon 2 verifiziert" },
      { label: "Offene Entscheidungen", value: "2", helper: "Rueckmeldung heute noetig" }
    ],
    onboardingStage: "Familienprofil vollstaendig, Kontaktfreigabe-Regeln aktiv",
    queue: [
      {
        label: "Heute entscheiden",
        value: "Freitagabend fuer 2 Kinder",
        detail: "2 starke Kandidatinnen, Kontakt noch gesperrt"
      },
      {
        label: "Naechster Schritt",
        value: "Betreuung am Mittwoch",
        detail: "Jobtext kurz erweitern, damit passende Bewerbungen reinkommen"
      }
    ],
    jobs: [
      {
        id: "job-101",
        title: "Freitagabend fuer 2 Kinder",
        city: "Berlin Prenzlauer Berg",
        date: "08 Mai",
        hours: "18:00-23:30",
        pay: "17 EUR / Std.",
        status: "under_review",
        children: "2 Kinder, 4 und 7 Jahre",
        requirements: ["Abendroutine", "Nichtraucher:in", "Deutsch fliessend"],
        contactUnlocked: false
      },
      {
        id: "job-087",
        title: "Nachmittagsbetreuung am Mittwoch",
        city: "Berlin Mitte",
        date: "13 Mai",
        hours: "15:00-18:30",
        pay: "16 EUR / Std.",
        status: "published",
        children: "1 Kind, 6 Jahre",
        requirements: ["Schulabholung", "Hausaufgaben", "U-Bahn vertraut"],
        contactUnlocked: false
      },
      {
        id: "job-052",
        title: "Samstag mit Kleinkind",
        city: "Berlin Friedrichshain",
        date: "17 Mai",
        hours: "10:30-14:00",
        pay: "18 EUR / Std.",
        status: "matched",
        children: "1 Kind, 2 Jahre",
        requirements: ["Kleinkind-Erfahrung", "Spielplatz", "Mittagsschlaf"],
        contactUnlocked: true
      }
    ],
    applications: [
      {
        id: "app-1",
        jobId: "job-101",
        jobTitle: "Freitagabend fuer 2 Kinder",
        sitterName: "Mara K.",
        badges: ["Identitaet geprueft", "Erste Hilfe", "5 verifizierte Einsaetze"],
        note: "Erfahren mit Abendroutinen und an beiden angefragten Terminen verfuegbar.",
        status: "shortlisted",
        responseTime: "vor 18 Min."
      },
      {
        id: "app-2",
        jobId: "job-101",
        jobTitle: "Freitagabend fuer 2 Kinder",
        sitterName: "Hannah S.",
        badges: ["Ausweis eingereicht", "Studiert Paedagogik"],
        note: "Wohnt in der Naehe und kann auch spontane Folgeeinsaetze uebernehmen.",
        status: "submitted",
        responseTime: "vor 47 Min."
      }
    ],
    safetyCases: [
      {
        id: "fam-safety-1",
        title: "Anfrage nach privater Telefonnummer vor Auswahl",
        severity: "attention",
        owner: "Trust Bot",
        nextAction: "Vorformulierte Antwort senden und Kontakt weiterhin sperren"
      }
    ],
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
    ],
    timeline: [
      {
        id: "fam-timeline-1",
        title: "Bewerbungen eingegangen",
        detail: "2 neue Bewerbungen mit Vertrauenshinweisen",
        at: "Heute 12:34"
      },
      {
        id: "fam-timeline-2",
        title: "Match vorbereitet",
        detail: "Bei Zusage werden Kontaktfelder serverseitig freigeschaltet",
        at: "Heute 14:10"
      }
    ],
    profileSummary: [
      { label: "Haushalt", value: "Berlin Prenzlauer Berg" },
      { label: "Kinder", value: "2 Kinder, 4 und 7 Jahre" },
      { label: "Wunschprofil", value: "Erfahrung, Erste Hilfe, ruhige Abendroutine", emphasis: true }
    ]
  },
  {
    role: "babysitter",
    label: "Babysitter",
    heading: "Passende Jobs sehen und Vertrauen sichtbar machen",
    intro:
      "Babysitter verwalten Profil, Verifikation und Verfuegbarkeit, sehen passende Jobs und verfolgen Bewerbungen ohne Informationschaos.",
    priorities: [
      "Profil mit Nachweisen, Skills und Verfuegbarkeit pflegen",
      "Relevante Einsaetze filtern und strukturiert bewerben",
      "Nach Zusage Einsatz, Kontaktfreigabe und Bewertung nachvollziehen"
    ],
    trustChecklist: [
      {
        label: "Verifikation wirkt im Matching",
        detail: "Gepruefte Ausweise und Erste-Hilfe-Nachweise erscheinen direkt an der Bewerbung."
      },
      {
        label: "Familienkontakt bleibt privat",
        detail: "Adresse und Telefon werden erst nach accepted oder matched sichtbar."
      },
      {
        label: "Fairer Review Flow",
        detail: "Bewertungen entstehen nur aus bestaetigten und abgeschlossenen Einsaetzen."
      }
    ],
    metrics: [
      { label: "Passende Jobs", value: "8", helper: "davon 3 mit Sofortbedarf" },
      { label: "Offene Bewerbungen", value: "2", helper: "1 mit hoher Match-Chance" },
      { label: "Vertrauensscore", value: "4.9", helper: "5 verifizierte Einsaetze" }
    ],
    onboardingStage: "Profil fast live, nur Verfuegbarkeit fuer Samstag fehlt",
    queue: [
      {
        label: "Heute abschliessen",
        value: "Verfuegbarkeit bestaetigen",
        detail: "Ohne Samstags-Slot sinkt das Matching"
      },
      {
        label: "Neu im Feed",
        value: "Freitagabend fuer 2 Kinder",
        detail: "Starker Match auf Abendroutine und Wohnort"
      }
    ],
    jobs: [
      {
        id: "job-101",
        title: "Freitagabend fuer 2 Kinder",
        city: "Berlin Prenzlauer Berg",
        date: "08 Mai",
        hours: "18:00-23:30",
        pay: "17 EUR / Std.",
        status: "under_review",
        children: "2 Kinder, 4 und 7 Jahre",
        requirements: ["Abendroutine", "Vorlesen", "Abendessen vorbereiten"],
        contactUnlocked: false
      },
      {
        id: "job-099",
        title: "Samstag Mittag mit Kleinkind",
        city: "Berlin Friedrichshain",
        date: "09 Mai",
        hours: "11:00-15:00",
        pay: "18 EUR / Std.",
        status: "matched",
        children: "1 Kind, 2 Jahre",
        requirements: ["Kleinkind-Erfahrung", "Spielplatzbegleitung"],
        contactUnlocked: true
      },
      {
        id: "job-054",
        title: "Schulabholung am Donnerstag",
        city: "Berlin Kreuzberg",
        date: "15 Mai",
        hours: "15:00-18:00",
        pay: "16 EUR / Std.",
        status: "published",
        children: "1 Kind, 8 Jahre",
        requirements: ["Hausaufgaben", "zu Fuss erreichbar"],
        contactUnlocked: false
      }
    ],
    applications: [
      {
        id: "app-4",
        jobId: "job-101",
        jobTitle: "Freitagabend fuer 2 Kinder",
        sitterName: "Du",
        badges: ["Identitaet geprueft", "Erste Hilfe", "4.9 Bewertung"],
        note: "Bewerbung fuer Freitagabend gesendet. Rueckmeldung der Familie steht aus.",
        status: "submitted",
        responseTime: "vor 22 Min."
      },
      {
        id: "app-5",
        jobId: "job-099",
        jobTitle: "Samstag Mittag mit Kleinkind",
        sitterName: "Du",
        badges: ["Identitaet geprueft", "Zusage erhalten"],
        note: "Familie hat dich fuer Samstag ausgewaehlt. Adresse ist jetzt freigegeben.",
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
    ],
    timeline: [
      {
        id: "sit-timeline-1",
        title: "Neuer Match-Kandidat",
        detail: "Job in deinem Radius mit Abendroutine und fairer Bezahlung",
        at: "Heute 12:09"
      },
      {
        id: "sit-timeline-2",
        title: "Kontakt entsperrt",
        detail: "Fuer Samstag ist jetzt Adresse und Check-in sichtbar",
        at: "Heute 13:40"
      }
    ],
    profileSummary: [
      { label: "Standort", value: "Berlin Friedrichshain" },
      { label: "Nachweise", value: "Ausweis und Erste Hilfe verifiziert", emphasis: true },
      { label: "Stil", value: "Abendroutine, Kleinkind, Hausaufgabenhilfe" }
    ]
  },
  {
    role: "admin",
    label: "Admin",
    heading: "Trust und Operations priorisieren statt nur mitzulaufen",
    intro:
      "Admins moderieren Profile, pruefen Verifikation, priorisieren Safety-Faelle und koennen jeden sensiblen Schritt im Audit nachvollziehen.",
    priorities: [
      "Verifikations- und Safety-Warteschlangen priorisiert bearbeiten",
      "Kritische Eingriffe mit sauberer Begruendung und Audit-Historie ausfuehren",
      "Kontaktfreigaben und Bewertungsregeln systematisch kontrollieren"
    ],
    trustChecklist: [
      {
        label: "Policy zuerst",
        detail: "Kritische Faelle muessen hoeher priorisiert sein als normale Support-Anfragen."
      },
      {
        label: "Account-Pausierung",
        detail: "Bei fehlender Verifikation oder Beschwerden muss ein Profil sofort pausierbar sein."
      },
      {
        label: "Nachvollziehbare Freigaben",
        detail: "Jede Entsperrung von Kontakt- oder Bewertungsrechten wird begruendet gespeichert."
      }
    ],
    metrics: [
      { label: "Kritische Faelle", value: "2", helper: "innerhalb 30 Min. reagieren" },
      { label: "Verifikation Queue", value: "7", helper: "3 mit fehlendem Dokument" },
      { label: "Geblockte Reviews", value: "4", helper: "1 neue Beschwerde heute" }
    ],
    onboardingStage: "Admin-Panel aktiv, Eskalationsregeln fuer Level 1 definiert",
    queue: [
      {
        label: "Sofort pruefen",
        value: "Aktives Profil ohne vollstaendige Verifikation",
        detail: "Profil pausieren, bis Dokument nachgereicht wurde"
      },
      {
        label: "Heute entscheiden",
        value: "Beschwerde zu kurzfristiger Absage",
        detail: "Review vorlaeufig ausblenden, Vorfall klaeren"
      }
    ],
    jobs: [
      {
        id: "job-099",
        title: "Samstag Mittag mit Kleinkind",
        city: "Berlin Friedrichshain",
        date: "09 Mai",
        hours: "11:00-15:00",
        pay: "18 EUR / Std.",
        status: "confirmed",
        children: "1 Kind, 2 Jahre",
        requirements: ["Kontaktfreigabe protokolliert", "Bewertung spaeter freigeben"],
        contactUnlocked: true
      },
      {
        id: "job-120",
        title: "Abendbetreuung in Mitte",
        city: "Berlin Mitte",
        date: "14 Mai",
        hours: "19:00-22:30",
        pay: "17 EUR / Std.",
        status: "under_review",
        children: "2 Kinder, 5 und 9 Jahre",
        requirements: ["Policy-Pruefung", "Kontakt weiterhin gesperrt"],
        contactUnlocked: false
      }
    ],
    applications: [
      {
        id: "ops-1",
        jobId: "job-120",
        jobTitle: "Abendbetreuung in Mitte",
        sitterName: "Mara K.",
        badges: ["Verifikation offen", "Profil live", "Dokument fehlt"],
        note: "Live-Profil trotz fehlendem Zweitnachweis. Automatische Pause empfohlen.",
        status: "submitted",
        responseTime: "vor 6 Min."
      }
    ],
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
    ],
    timeline: [
      {
        id: "admin-timeline-1",
        title: "Automatische Eskalation",
        detail: "Live-Profil ohne Nachweis in die kritische Queue geschoben",
        at: "Heute 12:20"
      },
      {
        id: "admin-timeline-2",
        title: "Kontaktlogik bestaetigt",
        detail: "Job-099 blieb bis zur Zusage vollstaendig gesperrt",
        at: "Heute 12:16"
      }
    ],
    profileSummary: [
      { label: "Rolle", value: "Trust & Ops Admin", emphasis: true },
      { label: "Verantwortung", value: "Moderation, Verifikation, Eskalationen" },
      { label: "SLA", value: "Kritische Faelle in 30 Minuten" }
    ]
  }
];

export function isRole(value: string | undefined): value is UserRole {
  return value === "family" || value === "babysitter" || value === "admin";
}

export function isView(value: string | undefined): value is AppView {
  return (
    value === "dashboard" ||
    value === "jobs" ||
    value === "applications" ||
    value === "trust" ||
    value === "profile"
  );
}

export function getRoleDefaults(role: UserRole) {
  const defaults: Record<UserRole, AppView> = {
    family: "dashboard",
    babysitter: "jobs",
    admin: "trust"
  };

  return defaults[role];
}

export function getViewTitle(role: UserRole, view: AppView) {
  if (role === "admin" && view === "applications") {
    return "Operations Queue";
  }

  const item = appNavigation.find((entry) => entry.id === view);
  return item?.label ?? "Heute";
}
