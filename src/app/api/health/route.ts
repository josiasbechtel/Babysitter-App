import { NextResponse } from "next/server";

import { getSupabaseStatus } from "@/lib/supabase/env";

export async function GET() {
  const supabase = getSupabaseStatus();

  return NextResponse.json({
    ok: true,
    app: "babysitter-mvp",
    supabase
  });
}
