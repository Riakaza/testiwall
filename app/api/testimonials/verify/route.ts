import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(page("Lien invalide", "Le lien de vérification est invalide.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const supabase = getSupabase();

  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("id, status")
    .eq("verification_token", token)
    .single();

  if (!testimonial) {
    return new NextResponse(page("Lien expiré", "Ce lien n'est plus valide ou a déjà été utilisé.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (testimonial.status !== "unverified") {
    return new NextResponse(page("Déjà vérifié", "Ton témoignage a déjà été confirmé. Merci !", true), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const { error } = await supabase
    .from("testimonials")
    .update({
      status: "pending",
      email_verified: true,
      verification_token: null,
    })
    .eq("id", testimonial.id);

  if (error) {
    return new NextResponse(page("Erreur", "Une erreur est survenue. Réessaie plus tard.", false), {
      headers: { "Content-Type": "text/html" },
    });
  }

  return new NextResponse(page("Témoignage confirmé !", "Ton témoignage a été vérifié avec succès. Il sera visible une fois approuvé.", true), {
    headers: { "Content-Type": "text/html" },
  });
}

function page(title: string, message: string, success: boolean) {
  const color = success ? "#10b981" : "#ef4444";
  const icon = success ? "✓" : "✕";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — TestiWall</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f9fafb;">
<div style="text-align:center;padding:32px;max-width:400px;">
<div style="width:64px;height:64px;border-radius:50%;background:${color}20;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;color:${color};">${icon}</div>
<h1 style="font-size:22px;color:#111827;margin:0 0 8px;">${title}</h1>
<p style="color:#6b7280;font-size:15px;line-height:1.5;">${message}</p>
</div>
</body>
</html>`;
}
