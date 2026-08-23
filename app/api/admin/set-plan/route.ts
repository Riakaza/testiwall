import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || request.headers.get("x-admin-secret") !== secret) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { email, plan } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }
  if (plan !== "free" && plan !== "pro") {
    return NextResponse.json({ error: 'Plan invalide (attendu : "free" ou "pro").' }, { status: 400 });
  }

  const supabase = getSupabase();

  // Recherche de l'utilisateur par email (pagination admin API)
  const normalizedEmail = email.trim().toLowerCase();
  let userId: string | null = null;
  for (let page = 1; page <= 10 && !userId; page++) {
    const { data } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (!data?.users?.length) break;
    userId =
      data.users.find((u) => u.email?.toLowerCase() === normalizedEmail)?.id ?? null;
    if (data.users.length < 200) break;
  }

  if (!userId) {
    return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
  }

  const { error } = await supabase.from("profiles").update({ plan }).eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId, plan });
}
