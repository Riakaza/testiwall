import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function GET() {
  const supabase = getSupabase();

  const { data: space } = await supabase
    .from("spaces")
    .select("id")
    .eq("slug", "testiwall")
    .single();

  if (!space) {
    return NextResponse.json({ error: "Space not found" }, { status: 404 });
  }

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id")
    .eq("space_id", space.id);

  if (!testimonials || testimonials.length === 0) {
    return NextResponse.json({ error: "No testimonials" }, { status: 404 });
  }

  const daysOffsets = [3, 12, 28, 45, 60];

  const updates = testimonials.map((t, i) => {
    const daysAgo = daysOffsets[i] || (i + 1) * 10;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return supabase
      .from("testimonials")
      .update({ created_at: date.toISOString() })
      .eq("id", t.id);
  });

  await Promise.all(updates);

  return NextResponse.json({ success: true, updated: testimonials.length });
}
