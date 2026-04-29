'use client';

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AppView, RoleExperience, SupabaseStatus, UserRole } from "@/lib/domain";
import { appNavigation, getViewTitle } from "@/lib/mvp-data";

type MvpWorkbenchProps = {
  experiences: RoleExperience[];
  initialRole: UserRole;
  initialView: AppView;
  supabase: SupabaseStatus;
};

const severityLabel = {
  info: "Hinweis",
  attention: "Pruefen",
  critical: "Sofort"
} as const;

const statusLabel = {
  draft: "Entwurf",
  published: "Live",
  under_review: "Pruefung",
  matched: "Gematcht",
  confirmed: "Bestaetigt",
  completed: "Abgeschlossen",
  cancelled: "Storniert",
  submitted: "Eingegangen",
  shortlisted: "Shortlist",
  accepted: "Zusage",
  declined: "Abgelehnt",
  withdrawn: "Zurueckgezogen"
} as const;

function buildUrl(role: UserRole, view: AppView) {
  return `/?role=${role}&view=${view}`;
}

export function MvpWorkbench({
  experiences,
  initialRole,
  initialView,
  supabase
}: MvpWorkbenchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);
  const [activeView, setActiveView] = useState<AppView>(initialView);
  const deferredView = useDeferredValue(activeView);

  useEffect(() => {
    setActiveRole(initialRole);
    setActiveView(initialView);
  }, [initialRole, initialView]);

  const experience =
    experiences.find((entry) => entry.role === activeRole) ?? experiences[0];

  const navigate = (role: UserRole, view: AppView) => {
    setActiveRole(role);
    setActiveView(view);

    const next = buildUrl(role, view);
    if (next === `/?${searchParams.toString()}`) {
      return;
    }

    startTransition(() => {
      router.replace(next, { scroll: false });
    });
  };

  const renderContent = () => {
    switch (deferredView) {
      case "jobs":
        return (
          <section className="content-stack">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Einsatzboard</p>
                  <h3>Aktive Auftraege und Matches</h3>
                </div>
                <span className="quiet-pill">{experience.jobs.length} sichtbar</span>
              </div>
              <div className="job-stack">
                {experience.jobs.map((job) => (
                  <article className="job-card" key={job.id}>
                    <div className="job-main">
                      <div>
                        <h4>{job.title}</h4>
                        <p>
                          {job.city} · {job.date} · {job.hours}
                        </p>
                      </div>
                      <span className={`status-dot status-${job.status}`}>
                        {statusLabel[job.status] ?? job.status}
                      </span>
                    </div>
                    <div className="job-meta">
                      <span>{job.pay}</span>
                      <span>{job.children}</span>
                      <span>
                        Kontakt {job.contactUnlocked ? "freigegeben" : "gesperrt"}
                      </span>
                    </div>
                    <div className="tag-strip">
                      {job.requirements.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </section>
        );
      case "applications":
        return (
          <section className="content-stack">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">
                    {activeRole === "admin" ? "Operations" : "Matching"}
                  </p>
                  <h3>{getViewTitle(activeRole, deferredView)}</h3>
                </div>
              </div>
              <div className="list-stack">
                {experience.applications.length === 0 ? (
                  <p className="empty-state">Zurzeit ist in dieser Rolle hier nichts offen.</p>
                ) : (
                  experience.applications.map((application) => (
                    <article className="line-card" key={application.id}>
                      <div className="line-head">
                        <strong>{application.sitterName}</strong>
                        <span className={`status-dot status-${application.status}`}>
                          {statusLabel[application.status] ?? application.status}
                        </span>
                      </div>
                      <p>{application.note}</p>
                      <div className="tag-strip">
                        {application.badges.map((badge) => (
                          <span key={badge}>{badge}</span>
                        ))}
                      </div>
                      <small>Letzte Aktivitaet: {application.responseTime}</small>
                    </article>
                  ))
                )}
              </div>
            </article>
          </section>
        );
      case "trust":
        return (
          <section className="content-grid">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Trust Layer</p>
                  <h3>Regeln und Freigaben</h3>
                </div>
              </div>
              <div className="list-stack">
                {experience.trustChecklist.map((item) => (
                  <article className="line-card" key={item.label}>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </article>
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Safety Queue</p>
                  <h3>Offene Faelle</h3>
                </div>
              </div>
              <div className="list-stack">
                {experience.safetyCases.length === 0 ? (
                  <p className="empty-state">Keine offenen Safety-Faelle in dieser Perspektive.</p>
                ) : (
                  experience.safetyCases.map((item) => (
                    <article className="line-card" key={item.id}>
                      <div className="line-head">
                        <strong>{item.title}</strong>
                        <span className={`severity-pill severity-${item.severity}`}>
                          {severityLabel[item.severity]}
                        </span>
                      </div>
                      <p>Verantwortlich: {item.owner}</p>
                      <small>{item.nextAction}</small>
                    </article>
                  ))
                )}
              </div>
            </article>
            <article className="panel panel-wide">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Audit</p>
                  <h3>Nachvollziehbare Ereignisse</h3>
                </div>
              </div>
              <div className="audit-stack">
                {experience.auditTrail.map((entry) => (
                  <div className="audit-row" key={entry.id}>
                    <span>{entry.at}</span>
                    <div>
                      <strong>
                        {entry.actor} · {entry.action}
                      </strong>
                      <p>{entry.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        );
      case "profile":
        return (
          <section className="content-grid">
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Profilstatus</p>
                  <h3>Onboarding und Sichtbarkeit</h3>
                </div>
              </div>
              <p className="feature-lead">{experience.onboardingStage}</p>
              <div className="list-stack compact-gap">
                {experience.profileSummary.map((item) => (
                  <div className="profile-row" key={item.label}>
                    <span>{item.label}</span>
                    <strong className={item.emphasis ? "strong-emphasis" : undefined}>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Roadmap innerhalb der App</p>
                  <h3>Was als Naechstes getan werden soll</h3>
                </div>
              </div>
              <div className="list-stack">
                {experience.queue.map((item) => (
                  <article className="line-card" key={item.value}>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                    <small>{item.detail}</small>
                  </article>
                ))}
              </div>
            </article>
          </section>
        );
      case "dashboard":
      default:
        return (
          <section className="content-grid">
            <article className="panel panel-wide">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Heute im Fokus</p>
                  <h3>{experience.heading}</h3>
                </div>
                <span className="quiet-pill">{experience.label}</span>
              </div>
              <p className="feature-lead">{experience.intro}</p>
              <div className="metric-grid">
                {experience.metrics.map((item) => (
                  <div className="metric-tile" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{item.helper}</small>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Naechste Schritte</p>
                  <h3>Heute bewegen</h3>
                </div>
              </div>
              <div className="list-stack">
                {experience.queue.map((item) => (
                  <article className="line-card" key={item.value}>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                    <small>{item.detail}</small>
                  </article>
                ))}
              </div>
            </article>
            <article className="panel">
              <div className="panel-header">
                <div>
                  <p className="section-kicker">Timeline</p>
                  <h3>System und Team</h3>
                </div>
              </div>
              <div className="timeline-stack">
                {experience.timeline.map((item) => (
                  <div className="timeline-row" key={item.id}>
                    <span>{item.at}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <p className="brand-kicker">Babysitter App</p>
          <strong>Trust-first Marketplace</strong>
        </div>
        <nav className="rail-nav" aria-label="Arbeitsbereiche">
          {appNavigation.map((item) => (
            <button
              key={item.id}
              className={item.id === activeView ? "nav-chip active" : "nav-chip"}
              onClick={() => navigate(activeRole, item.id)}
              type="button"
            >
              {activeRole === "admin" && item.id === "applications"
                ? "Ops"
                : item.label}
            </button>
          ))}
        </nav>
        <div className="rail-status">
          <p className="section-kicker">Supabase</p>
          <strong>{supabase.configured ? "Bereit fuer Auth und Daten" : "Konfiguration offen"}</strong>
          <small>{supabase.hostLabel}</small>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <p className="section-kicker">Produktiver Rahmen</p>
            <h1>Mobile-first Grundgeruest fuer die Babysitter-Plattform</h1>
          </div>
          <div className="role-toggle" aria-label="Rollen">
            {experiences.map((entry) => (
              <button
                key={entry.role}
                className={entry.role === activeRole ? "role-chip active" : "role-chip"}
                onClick={() => navigate(entry.role, "dashboard")}
                type="button"
              >
                {entry.label}
              </button>
            ))}
          </div>
        </header>

        <section className="hero-strip">
          <div className="hero-copy-block">
            <p className="section-kicker">Aktiver Bereich</p>
            <h2>{getViewTitle(activeRole, deferredView)}</h2>
            <p>{experience.intro}</p>
          </div>
          <div className="hero-side">
            <div className="hero-mini">
              <span>Kontaktdaten</span>
              <strong>erst nach Zusage</strong>
            </div>
            <div className="hero-mini">
              <span>Bewertungen</span>
              <strong>nur nach echtem Einsatz</strong>
            </div>
          </div>
        </section>

        <section className="status-strip">
          <article className="status-banner">
            <span className={supabase.configured ? "status-led ok" : "status-led muted"} />
            <div>
              <strong>
                {supabase.configured
                  ? "Supabase ist fuer den naechsten Schritt vorbereitet"
                  : "Supabase braucht noch Umgebungsvariablen"}
              </strong>
              <p>
                {supabase.configured
                  ? `Projekt erkannt: ${supabase.hostLabel}`
                  : `Fehlt: ${supabase.missing.join(", ")}`}
              </p>
            </div>
          </article>
          <article className="status-banner subtle">
            <span className="status-led ok" />
            <div>
              <strong>App Frame ist bereits mobil ausgelegt</strong>
              <p>Bottom Navigation auf Mobile, Side Rail auf Desktop, klare Workflows pro Rolle.</p>
            </div>
          </article>
        </section>

        {renderContent()}

        <nav className="bottom-nav" aria-label="Mobile Navigation">
          {appNavigation.map((item) => (
            <button
              key={item.id}
              className={item.id === activeView ? "bottom-link active" : "bottom-link"}
              onClick={() => navigate(activeRole, item.id)}
              type="button"
            >
              <span>{item.shortLabel}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
