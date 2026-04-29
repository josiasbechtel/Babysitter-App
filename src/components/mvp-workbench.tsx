'use client';

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AppView, Application, Job, RoleExperience, UserRole } from "@/lib/domain";

type MvpWorkbenchProps = {
  experiences: RoleExperience[];
  initialRole: UserRole;
  initialView: AppView;
};

type RoleTab = {
  id: AppView;
  label: string;
};

const roleTabs: Record<UserRole, RoleTab[]> = {
  family: [
    { id: 'dashboard', label: 'Gesuche' },
    { id: 'jobs', label: 'Bewerbungen' },
    { id: 'profile', label: 'Buchung' }
  ],
  babysitter: [
    { id: 'dashboard', label: 'Feed' },
    { id: 'applications', label: 'Bewerbungen' },
    { id: 'jobs', label: 'Einsatz' }
  ],
  admin: [
    { id: 'dashboard', label: 'Queue' },
    { id: 'applications', label: 'Profile' },
    { id: 'trust', label: 'Audit' }
  ]
};

const statusLabel = {
  draft: 'Entwurf',
  published: 'Live',
  under_review: 'Pruefung',
  matched: 'Match',
  confirmed: 'Bestaetigt',
  completed: 'Abgeschlossen',
  cancelled: 'Storniert',
  submitted: 'Neu',
  shortlisted: 'Shortlist',
  accepted: 'Zusage',
  declined: 'Abgelehnt',
  withdrawn: 'Zurueckgezogen'
} as const;

const severityLabel = {
  info: 'Hinweis',
  attention: 'Pruefen',
  critical: 'Sofort'
} as const;

function getDefaultView(role: UserRole) {
  return roleTabs[role][0]?.id ?? 'dashboard';
}

function buildUrl(role: UserRole, view: AppView) {
  return `/?role=${role}&view=${view}`;
}

function tabExists(role: UserRole, view: AppView) {
  return roleTabs[role].some((item) => item.id === view);
}

function JobCard({ job, cta }: { job: Job; cta?: string }) {
  return (
    <article className="app-card list-card">
      <div className="row-between top-align">
        <div>
          <strong>{job.title}</strong>
          <p>
            {job.city} · {job.date} · {job.hours}
          </p>
        </div>
        <span className={`badge status-${job.status}`}>{statusLabel[job.status] ?? job.status}</span>
      </div>
      <div className="detail-row">
        <span>{job.pay}</span>
        <span>{job.children}</span>
        <span>Kontakt {job.contactUnlocked ? 'offen' : 'gesperrt'}</span>
      </div>
      <div className="chip-row">
        {job.requirements.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {cta ? (
        <div className="action-row">
          <button type="button" className="secondary-button">
            Merken
          </button>
          <button type="button" className="primary-button">
            {cta}
          </button>
        </div>
      ) : null}
    </article>
  );
}

function ApplicationCard({
  application,
  primary,
  secondary
}: {
  application: Application;
  primary?: string;
  secondary?: string;
}) {
  return (
    <article className="app-card list-card">
      <div className="row-between top-align">
        <div>
          <strong>{application.sitterName}</strong>
          <p>{application.jobTitle}</p>
        </div>
        <span className={`badge status-${application.status}`}>
          {statusLabel[application.status] ?? application.status}
        </span>
      </div>
      <p>{application.note}</p>
      <div className="chip-row">
        {application.badges.map((badge) => (
          <span key={badge}>{badge}</span>
        ))}
      </div>
      <small>{application.responseTime}</small>
      {primary || secondary ? (
        <div className="action-row">
          {secondary ? (
            <button type="button" className="secondary-button">
              {secondary}
            </button>
          ) : null}
          {primary ? (
            <button type="button" className="primary-button">
              {primary}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function MvpWorkbench({
  experiences,
  initialRole,
  initialView
}: MvpWorkbenchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);
  const [activeView, setActiveView] = useState<AppView>(initialView);
  const deferredView = useDeferredValue(activeView);

  useEffect(() => {
    setActiveRole(initialRole);
    setActiveView(tabExists(initialRole, initialView) ? initialView : getDefaultView(initialRole));
  }, [initialRole, initialView]);

  const experience = experiences.find((entry) => entry.role === activeRole) ?? experiences[0];
  const selectedView = tabExists(activeRole, deferredView) ? deferredView : getDefaultView(activeRole);
  const primaryJob = experience.jobs[0];
  const primaryApplication = experience.applications[0];

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

  const renderFamily = () => {
    if (selectedView === 'jobs') {
      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Bewerbungen</span>
                <h2>Kandidat:innen vergleichen</h2>
              </div>
            </div>
            <div className="stack-list">
              {experience.applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  secondary="Kurzliste"
                  primary="Zusage senden"
                />
              ))}
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Auswahl</span>
                <h2>Freigabe</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Favorit</span>
                <strong>{primaryApplication?.sitterName ?? 'Noch offen'}</strong>
              </div>
              <div className="summary-row">
                <span>Kontakt</span>
                <strong>bleibt bis Zusage gesperrt</strong>
              </div>
              <div className="summary-row">
                <span>Naechster Schritt</span>
                <strong>Match bestaetigen</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (selectedView === 'profile') {
      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Buchung</span>
                <h2>Match und Kontaktdaten</h2>
              </div>
              <span className="badge status-confirmed">Bestaetigt</span>
            </div>
            <div className="split-grid">
              <article className="booking-card">
                <span>Babysitter</span>
                <strong>{primaryApplication?.sitterName ?? 'Mara K.'}</strong>
                <p>Telefon: +49 176 555 18 20</p>
              </article>
              <article className="booking-card">
                <span>Einsatz</span>
                <strong>{primaryJob?.title ?? 'Freitagabend fuer 2 Kinder'}</strong>
                <p>
                  {primaryJob?.date ?? '08 Mai'} · {primaryJob?.hours ?? '18:00-23:30'}
                </p>
              </article>
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Danach</span>
                <h2>Nach dem Einsatz</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Check-in</span>
                <strong>90 Min. vorher</strong>
              </div>
              <div className="summary-row">
                <span>Bewertung</span>
                <strong>erst nach Abschluss</strong>
              </div>
              <div className="summary-row">
                <span>Status</span>
                <strong>einsatzbereit</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="content-grid">
        <section className="panel panel-wide">
          <div className="section-head">
            <div>
              <span className="section-kicker">Gesuche</span>
              <h2>Betreuung anlegen</h2>
            </div>
            <button type="button" className="primary-button">
              Veroeffentlichen
            </button>
          </div>
          <div className="input-grid">
            <div className="input-card">
              <span>Wann</span>
              <strong>Freitag, 08. Mai</strong>
            </div>
            <div className="input-card">
              <span>Zeit</span>
              <strong>18:00 bis 23:30</strong>
            </div>
            <div className="input-card">
              <span>Ort</span>
              <strong>Berlin Prenzlauer Berg</strong>
            </div>
            <div className="input-card">
              <span>Kinder</span>
              <strong>2 Kinder, 4 und 7 Jahre</strong>
            </div>
          </div>
        </section>
        <section className="panel side-panel">
          <div className="section-head">
            <div>
              <span className="section-kicker">Aktiv</span>
              <h2>Offene Gesuche</h2>
            </div>
          </div>
          <div className="stack-list compact-list">
            {experience.jobs.slice(0, 2).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderBabysitter = () => {
    if (selectedView === 'applications') {
      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Bewerbungen</span>
                <h2>Meine Rueckmeldungen</h2>
              </div>
            </div>
            <div className="stack-list">
              {experience.applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Heute</span>
                <h2>Status</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Offen</span>
                <strong>{experience.applications.length}</strong>
              </div>
              <div className="summary-row">
                <span>Zusage</span>
                <strong>1</strong>
              </div>
              <div className="summary-row">
                <span>Kontakt</span>
                <strong>1 freigegeben</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (selectedView === 'jobs') {
      const confirmedJob = experience.jobs.find((job) => job.contactUnlocked) ?? primaryJob;

      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Einsatz</span>
                <h2>Naechster Check-in</h2>
              </div>
              <span className="badge status-accepted">Zusage erhalten</span>
            </div>
            <div className="split-grid">
              <article className="booking-card">
                <span>Adresse</span>
                <strong>Boxhagener Platz 7</strong>
                <p>Berlin Friedrichshain</p>
              </article>
              <article className="booking-card">
                <span>Familie</span>
                <strong>Familie Weber</strong>
                <p>+49 171 220 45 80</p>
              </article>
              <article className="booking-card wide-booking-card">
                <span>Einsatz</span>
                <strong>{confirmedJob?.title ?? 'Samstag Mittag mit Kleinkind'}</strong>
                <p>
                  {confirmedJob?.date ?? '09 Mai'} · {confirmedJob?.hours ?? '11:00-15:00'}
                </p>
              </article>
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Checkliste</span>
                <h2>Vor dem Start</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Ankunft</span>
                <strong>10:45</strong>
              </div>
              <div className="summary-row">
                <span>Rueckfrage</span>
                <strong>Allergien klaeren</strong>
              </div>
              <div className="summary-row">
                <span>Bewertung</span>
                <strong>nach completed</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="content-grid">
        <section className="panel panel-wide">
          <div className="section-head">
            <div>
              <span className="section-kicker">Feed</span>
              <h2>Passende Jobs</h2>
            </div>
          </div>
          <div className="stack-list">
            {experience.jobs.map((job) => (
              <JobCard key={job.id} job={job} cta="Jetzt bewerben" />
            ))}
          </div>
        </section>
        <section className="panel side-panel">
          <div className="section-head">
            <div>
              <span className="section-kicker">Profil</span>
              <h2>Sichtbar im Match</h2>
            </div>
          </div>
          <div className="chip-column">
            {(experience.applications[0]?.badges ?? []).map((badge) => (
              <span key={badge} className="profile-chip">
                {badge}
              </span>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderAdmin = () => {
    if (selectedView === 'applications') {
      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Profile Review</span>
                <h2>Freigaben und Sperren</h2>
              </div>
            </div>
            <div className="stack-list">
              {experience.applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  secondary="Freigeben"
                  primary="Profil pausieren"
                />
              ))}
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Regeln</span>
                <h2>Systemstatus</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Kontaktfreigabe</span>
                <strong>nur nach Match</strong>
              </div>
              <div className="summary-row">
                <span>Reviews</span>
                <strong>nur nach Einsatz</strong>
              </div>
              <div className="summary-row">
                <span>Audit</span>
                <strong>aktiv</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (selectedView === 'trust') {
      return (
        <div className="content-grid">
          <section className="panel panel-wide">
            <div className="section-head">
              <div>
                <span className="section-kicker">Audit</span>
                <h2>Systemereignisse</h2>
              </div>
            </div>
            <div className="timeline-list">
              {experience.auditTrail.map((entry) => (
                <article className="timeline-item" key={entry.id}>
                  <span>{entry.at}</span>
                  <div>
                    <strong>{entry.action}</strong>
                    <p>
                      {entry.actor} · {entry.reason}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="panel side-panel">
            <div className="section-head">
              <div>
                <span className="section-kicker">Heute</span>
                <h2>Log</h2>
              </div>
            </div>
            <div className="summary-list">
              <div className="summary-row">
                <span>Eingriffe</span>
                <strong>2</strong>
              </div>
              <div className="summary-row">
                <span>Faelle offen</span>
                <strong>{experience.safetyCases.length}</strong>
              </div>
              <div className="summary-row">
                <span>Match-Logs</span>
                <strong>vollstaendig</strong>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="content-grid">
        <section className="panel panel-wide">
          <div className="section-head">
            <div>
              <span className="section-kicker">Queue</span>
              <h2>Offene Safety-Faelle</h2>
            </div>
          </div>
          <div className="stack-list">
            {experience.safetyCases.map((item) => (
              <article className="app-card list-card" key={item.id}>
                <div className="row-between top-align">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.owner}</p>
                  </div>
                  <span className={`badge severity-${item.severity}`}>{severityLabel[item.severity]}</span>
                </div>
                <p>{item.nextAction}</p>
                <div className="action-row">
                  <button type="button" className="secondary-button">
                    Oeffnen
                  </button>
                  <button type="button" className="primary-button">
                    Bearbeiten
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="panel side-panel">
          <div className="section-head">
            <div>
              <span className="section-kicker">Prioritaet</span>
              <h2>Heute</h2>
            </div>
          </div>
          <div className="summary-list">
            <div className="summary-row">
              <span>Kritisch</span>
              <strong>{experience.safetyCases.filter((item) => item.severity === 'critical').length}</strong>
            </div>
            <div className="summary-row">
              <span>Pruefen</span>
              <strong>{experience.safetyCases.filter((item) => item.severity === 'attention').length}</strong>
            </div>
            <div className="summary-row">
              <span>Hinweise</span>
              <strong>{experience.safetyCases.filter((item) => item.severity === 'info').length}</strong>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderContent = () => {
    if (activeRole === 'family') {
      return renderFamily();
    }

    if (activeRole === 'babysitter') {
      return renderBabysitter();
    }

    return renderAdmin();
  };

  return (
    <div className="app-shell">
      <aside className="role-rail">
        <div className="brand-lockup">
          <span className="brand-kicker">Kinderzeit</span>
          <strong>Babysitter App</strong>
        </div>
        <nav className="role-nav" aria-label="Rollen">
          {experiences.map((entry) => (
            <button
              key={entry.role}
              className={entry.role === activeRole ? 'role-button active' : 'role-button'}
              onClick={() => navigate(entry.role, getDefaultView(entry.role))}
              type="button"
            >
              <span>{entry.label}</span>
              <small>{roleTabs[entry.role].map((tab) => tab.label).join(' · ')}</small>
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace-shell">
        <header className="workspace-header">
          <div>
            <span className="section-kicker">{experience.label}</span>
            <h1>{experience.heading}</h1>
          </div>
        </header>

        <nav className="tab-bar" aria-label="Ansichten">
          {roleTabs[activeRole].map((tab) => (
            <button
              key={tab.id}
              className={tab.id === selectedView ? 'tab-button active' : 'tab-button'}
              onClick={() => navigate(activeRole, tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {renderContent()}
      </section>
    </div>
  );
}
