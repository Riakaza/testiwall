import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PATCH(request: NextRequest) {
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, name, question, thank_you_msg } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Space ID is required" }, { status: 400 });
  }

  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (!trimmedName || trimmedName.length > 100) {
    return NextResponse.json(
      { error: "Le nom est requis (100 caractères max)." },
      { status: 400 }
    );
  }
  if (
    (question && String(question).length > 300) ||
    (thank_you_msg && String(thank_you_msg).length > 300)
  ) {
    return NextResponse.json(
      { error: "Question et message de merci : 300 caractères max." },
      { status: 400 }
    );
  }

  const supabase = getSupabase();

  const { data: space } = await supabase
    .from("spaces")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!space) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updates: Record<string, string> = { name: trimmedName };
  if (typeof question === "string" && question.trim()) {
    updates.question = question.trim();
  }
  if (typeof thank_you_msg === "string" && thank_you_msg.trim()) {
    updates.thank_you_msg = thank_you_msg.trim();
  }

  const { error } = await supabase.from("spaces").update(updates).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
