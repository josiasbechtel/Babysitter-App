import { SupabaseStatus } from "@/lib/domain";

export function getSupabaseStatus(): SupabaseStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? null;
  const missing: string[] = [];

  if (!url) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!publishableKey) {
    missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  let hostLabel = "Noch nicht verbunden";

  if (url) {
    try {
      hostLabel = new URL(url).host;
    } catch {
      hostLabel = url;
    }
  }

  return {
    configured: missing.length === 0,
    url,
    hostLabel,
    missing
  };
}
