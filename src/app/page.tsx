import { MvpWorkbench } from "@/components/mvp-workbench";
import { getRoleDefaults, isRole, isView, roleExperiences } from "@/lib/mvp-data";

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

  return (
    <main className="page-shell">
      <MvpWorkbench
        experiences={roleExperiences}
        initialRole={role}
        initialView={view}
      />
    </main>
  );
}
