import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { space_id, author_name, author_email, author_title, content, rating } = body;

  if (!space_id || !author_name || !author_email || !content) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const supabase = getSupabase();

  // Extract IP from request headers (Vercel sets x-forwarded-for)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  // Rate limiting: max 5 submissions per IP per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recentCount } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true })
    .eq("submitted_from_ip", ip)
    .gte("created_at", oneHourAgo);

  if (recentCount !== null && recentCount >= 5) {
    return NextResponse.json(
      { error: "Trop de soumissions. Réessaie dans une heure." },
      { status: 429 }
    );
  }

  // Check if this email already submitted for this space
  const { data: existing } = await supabase
    .from("testimonials")
    .select("id")
    .eq("space_id", space_id)
    .eq("author_email", author_email.trim().toLowerCase())
    .neq("status", "unverified")
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "Tu as déjà laissé un témoignage pour cet espace." },
      { status: 409 }
    );
  }

  // Generate verification token
  const token = crypto.randomUUID();

  // Insert testimonial as unverified
  const { error: insertError } = await supabase.from("testimonials").insert({
    space_id,
    author_name: author_name.trim(),
    author_email: author_email.trim().toLowerCase(),
    author_title: author_title?.trim() || null,
    content: content.trim(),
    rating: rating || 5,
    status: "unverified",
    email_verified: false,
    verification_token: token,
    submitted_from_ip: ip,
  });

  if (insertError) {
    if (insertError.message.includes("unique_verified_email_per_space")) {
      return NextResponse.json(
        { error: "Tu as déjà laissé un témoignage pour cet espace." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Send verification email via Gmail SMTP
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/testimonials/verify?token=${token}`;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `TestiWall <${process.env.GMAIL_USER}>`,
      to: author_email.trim().toLowerCase(),
      subject: "Confirme ton témoignage — TestiWall",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #6366f1;">Confirme ton témoignage</h2>
          <p>Salut ${author_name.trim()},</p>
          <p>Clique sur le bouton ci-dessous pour confirmer que c'est bien toi qui as laissé ce témoignage :</p>
          <a href="${verifyUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 16px 0;">
            Confirmer mon témoignage
          </a>
          <p style="color: #6b7280; font-size: 14px;">Si tu n'as pas laissé de témoignage, ignore cet email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">TestiWall — La preuve sociale qui convertit.</p>
        </div>
      `,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email de vérification." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, needsVerification: true });
}
