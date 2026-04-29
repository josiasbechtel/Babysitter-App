import { MvpWorkbench } from "@/components/mvp-workbench";
import { architectureLayers, releasePhases, roleExperiences } from "@/lib/mvp-data";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="intro-grid">
        <div>
          <p className="eyebrow">Babysitter Marketplace MVP</p>
          <h1>Next.js-Struktur fuer eine vertrauenswuerdige Vermittlungsplattform</h1>
          <p className="lead">
            Dieses erste MVP zeigt die Kernlogik fuer Babysitter, Familien und
            Admin. Fokus: klare Rollen, geschuetzte Kontaktdaten, saubere
            Statuswechsel, verifizierbare Bewertungen und ein operatives
            Moderations-Backend.
          </p>
        </div>
        <div className="surface architecture-panel">
          <p className="eyebrow">Architektur</p>
          <h2>Vier Schichten fuer den Start</h2>
          <div className="stack">
            {architectureLayers.map((layer) => (
              <div className="line-item" key={layer.title}>
                <strong>{layer.title}</strong>
                <p>{layer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MvpWorkbench experiences={roleExperiences} />

      <section className="roadmap-band">
        <div>
          <p className="eyebrow">Release-Plan</p>
          <h2>Empfohlene Reihenfolge fuer die Umsetzung</h2>
        </div>
        <ol className="roadmap-list">
          {releasePhases.map((phase) => (
            <li key={phase}>{phase}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
