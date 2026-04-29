import { MvpWorkbench } from "@/components/mvp-workbench";
import {
  architectureLayers,
  getRoleDefaults,
  isRole,
  isView,
  releasePhases,
  roleExperiences
} from "@/lib/mvp-data";
import { getSupabaseStatus } from "@/lib/supabase/env";

type HomeProps = {
  searchParams: Promise<{
    role?: string;
    view?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const role = isRole(params.role) ? params.role : "family";
  const view = isView(params.view) ? params.view : getRoleDefaults(role);
  const supabase = getSupabaseStatus();

  return (
    <main className="page-shell">
      <MvpWorkbench
        experiences={roleExperiences}
        initialRole={role}
        initialView={view}
        supabase={supabase}
      />

      <section className="foundation-band">
        <div className="foundation-head">
          <div>
            <p className="section-kicker">Produktgeruest</p>
            <h2>Was dieser Frame schon abbildet</h2>
          </div>
          <p>
            Das UI folgt deinem Marketplace-Konzept: Rollen sind getrennt, Kontakt bleibt geschuetzt,
            Statuswechsel sind sichtbar und der Admin sieht eine echte Trust-Queue statt nur Zahlen.
          </p>
        </div>

        <div className="foundation-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="section-kicker">Architektur</p>
                <h3>Bausteine fuer den Start</h3>
              </div>
            </div>
            <div className="list-stack">
              {architectureLayers.map((layer) => (
                <article className="line-card" key={layer.title}>
                  <strong>{layer.title}</strong>
                  <p>{layer.detail}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="section-kicker">Release-Plan</p>
                <h3>Empfohlene Reihenfolge</h3>
              </div>
            </div>
            <ol className="roadmap-list">
              {releasePhases.map((phase) => (
                <li key={phase}>{phase}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>
    </main>
  );
}
