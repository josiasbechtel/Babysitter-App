'use client';

import { useState } from "react";

import { RoleExperience, UserRole } from "@/lib/domain";

type MvpWorkbenchProps = {
  experiences: RoleExperience[];
};

const severityLabel: Record<string, string> = {
  info: "Hinweis",
  attention: "Pruefen",
  critical: "Sofort"
};

export function MvpWorkbench({ experiences }: MvpWorkbenchProps) {
  const [activeRole, setActiveRole] = useState<UserRole>("family");
  const experience =
    experiences.find((entry) => entry.role === activeRole) ?? experiences[0];

  return (
    <div className="workbench-shell">
      <section className="role-strip" aria-label="Rollenansicht">
        {experiences.map((entry) => (
          <button
            key={entry.role}
            type="button"
            className={entry.role === activeRole ? "role-pill active" : "role-pill"}
            onClick={() => setActiveRole(entry.role)}
          >
            <span>{entry.label}</span>
            <small>{entry.heading}</small>
          </button>
        ))}
      </section>

      <section className="hero-band">
        <div>
          <p className="eyebrow">MVP Workflow</p>
          <h2>{experience.heading}</h2>
          <p className="hero-copy">{experience.intro}</p>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{experience.jobs.length}</strong>
            <span>aktive Einsatzobjekte</span>
          </div>
          <div>
            <strong>{experience.applications.length}</strong>
            <span>relevante Bewerbungen</span>
          </div>
          <div>
            <strong>{experience.safetyCases.length}</strong>
            <span>offene Safety-Faelle</span>
          </div>
        </div>
      </section>

      <section className="app-grid">
        <article className="surface">
          <header className="surface-head">
            <p className="eyebrow">Prioritaeten</p>
            <h3>Was dieses Interface leisten muss</h3>
          </header>
          <ul className="plain-list">
            {experience.priorities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="surface">
          <header className="surface-head">
            <p className="eyebrow">Trust Layer</p>
            <h3>Vertrauen als Produktlogik</h3>
          </header>
          <div className="stack">
            {experience.trustChecklist.map((item) => (
              <div className="line-item" key={item.label}>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="surface span-2">
          <header className="surface-head">
            <p className="eyebrow">Auftraege und Einsaetze</p>
            <h3>Statusgetriebene Einsatzlogik</h3>
          </header>
          <div className="table-like">
            {experience.jobs.map((job) => (
              <div className="job-row" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <p>
                    {job.city} · {job.date} · {job.hours}
                  </p>
                </div>
                <div>
                  <span className="status-chip">{job.status}</span>
                  <p>{job.pay}</p>
                </div>
                <div>
                  <p>{job.children}</p>
                  <p>
                    Kontakt {job.contactUnlocked ? "freigegeben" : "gesperrt"}
                  </p>
                </div>
                <div className="requirements">
                  {job.requirements.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="surface">
          <header className="surface-head">
            <p className="eyebrow">Bewerbungen</p>
            <h3>Matching ohne Datenleck</h3>
          </header>
          <div className="stack">
            {experience.applications.length === 0 ? (
              <p className="empty-copy">
                In dieser Rolle stehen gerade keine Bewerbungen im Fokus.
              </p>
            ) : (
              experience.applications.map((application) => (
                <div className="line-item" key={application.id}>
                  <div className="line-header">
                    <strong>{application.sitterName}</strong>
                    <span className="status-chip">{application.status}</span>
                  </div>
                  <p>{application.note}</p>
                  <div className="tag-row">
                    {application.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>
                  <small>Letzte Aktivitaet: {application.responseTime}</small>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="surface">
          <header className="surface-head">
            <p className="eyebrow">Safety Queue</p>
            <h3>Operative Eingriffe</h3>
          </header>
          <div className="stack">
            {experience.safetyCases.length === 0 ? (
              <p className="empty-copy">
                Keine offenen Safety-Faelle in dieser Perspektive.
              </p>
            ) : (
              experience.safetyCases.map((item) => (
                <div className="line-item" key={item.id}>
                  <div className="line-header">
                    <strong>{item.title}</strong>
                    <span className={`status-chip severity-${item.severity}`}>
                      {severityLabel[item.severity]}
                    </span>
                  </div>
                  <p>Verantwortlich: {item.owner}</p>
                  <small>{item.nextAction}</small>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="surface span-2">
          <header className="surface-head">
            <p className="eyebrow">Audit Trail</p>
            <h3>Nachvollziehbare Systemereignisse</h3>
          </header>
          <div className="audit-list">
            {experience.auditTrail.map((entry) => (
              <div className="audit-row" key={entry.id}>
                <strong>{entry.at}</strong>
                <div>
                  <p>
                    {entry.actor} · {entry.action}
                  </p>
                  <small>{entry.reason}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
