import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recentRequests = new Map<string, number[]>();
const RATE_LIMIT_MS = 60 * 1000;
const MAX_PER_WINDOW = 3;

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

  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const hits = (recentRequests.get(ip) || []).filter((t) => now - t < RATE_LIMIT_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return NextResponse.json({ error: "Trop de demandes. Réessaie dans une minute." }, { status: 429 });
  }
  hits.push(now);
  recentRequests.set(ip, hits);

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `TestiWall <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "⚡ Demande d'activation Pro — TestiWall",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #6366f1;">Nouvelle demande d'activation Pro</h2>
          <p>Un client vient de payer (ou le prétend 🙂) et demande l'activation de son compte :</p>
          <p style="background:#f3f4f6;border-radius:8px;padding:12px 16px;font-family:monospace;font-size:15px;">${email}</p>
          <p>Pour l'activer :</p>
          <pre style="background:#1f2937;color:#d1d5db;padding:12px;border-radius:8px;font-size:12px;overflow-x:auto;">curl -X POST ${process.env.NEXT_PUBLIC_APP_URL}/api/admin/set-plan \\
  -H "x-admin-secret: $ADMIN_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"${email}","plan":"pro"}'</pre>
          <p style="color:#9ca3af;font-size:12px;">Vérifie que le paiement est bien arrivé sur PayPal avant d'activer.</p>
        </div>
      `,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande. Réessaie plus tard." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
