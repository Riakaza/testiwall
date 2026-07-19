import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Testimonial } from "@/lib/types";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 30) return `Il y a ${diffDays} jours`;
  if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

export default async function EmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const supabase = await createClient();

  const { data: space } = await supabase
    .from("spaces")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!space) notFound();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("space_id", space.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(20);

  const rawAccent = typeof resolvedSearchParams.accent === "string" ? resolvedSearchParams.accent : "";
  const accentColor = /^[0-9a-fA-F]{6}$/.test(rawAccent) ? rawAccent : "6366f1";

  const themeParam = typeof resolvedSearchParams.theme === "string" ? resolvedSearchParams.theme : "light";
  const isDark = themeParam === "dark";

  const sortParam = typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : "recent";
  const sorted = [...(testimonials || [])];
  if (sortParam === "rating") sorted.sort((a: Testimonial, b: Testimonial) => b.rating - a.rating);
  else if (sortParam === "oldest") sorted.sort((a: Testimonial, b: Testimonial) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const theme = {
    bodyBg: isDark ? "#1f2937" : "transparent",
    cardBg: isDark ? "#374151" : "#ffffff",
    cardBorder: isDark ? "1px solid #4b5563" : "1px solid #e5e7eb",
    textPrimary: isDark ? "#f9fafb" : "#1f2937",
    textSecondary: isDark ? "#d1d5db" : "#6b7280",
    textMuted: isDark ? "#9ca3af" : "#9ca3af",
    authorName: isDark ? "#ffffff" : "#111827",
    badgeBg: isDark ? "#064e3b" : "#ecfdf5",
    badgeText: isDark ? "#34d399" : "#059669",
    boxShadow: isDark
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
  };

  return (
    <html style={{ background: theme.bodyBg }}>
      <body style={{ margin: 0, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "transparent" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            padding: "16px",
          }}
        >
          {sorted.length > 0 ? (
            sorted.map((t: Testimonial) => (
              <div
                key={t.id}
                style={{
                  border: theme.cardBorder,
                  borderRadius: "16px",
                  padding: "24px",
                  background: theme.cardBg,
                  boxShadow: theme.boxShadow,
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < t.rating ? "#f59e0b" : (isDark ? "#4b5563" : "#e5e7eb"),
                        fontSize: "18px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    margin: "0 0 16px",
                    lineHeight: 1.6,
                    color: theme.textPrimary,
                    fontSize: "15px",
                  }}
                >
                  &ldquo;{t.content}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, #${accentColor}, #${accentColor}dd)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {t.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: theme.authorName }}>
                      {t.author_name}
                      {t.email_verified && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          fontSize: "10px",
                          fontWeight: 500,
                          color: theme.badgeText,
                          background: theme.badgeBg,
                          padding: "2px 6px",
                          borderRadius: "99px",
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                          Vérifié
                        </span>
                      )}
                    </div>
                    {t.author_title && (
                      <div style={{ fontSize: "12px", color: theme.textSecondary }}>
                        {t.author_title}
                      </div>
                    )}
                    <div style={{ fontSize: "11px", color: theme.textMuted, marginTop: "2px" }}>
                      {timeAgo(t.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 20px",
              textAlign: "center",
            }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke={`#${accentColor}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "16px" }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 600, color: theme.textPrimary }}>
                Aucun témoignage pour le moment
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: theme.textMuted }}>
                Sois le premier à partager ton expérience !
              </p>
            </div>
          )}
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "12px",
            fontSize: "11px",
            color: theme.textMuted,
          }}
        >
          Powered by{" "}
          <a
            href="https://testiwall-kappa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              color: `#${accentColor}`,
              textDecoration: "none"
            }}
          >
            TestiWall
          </a>
        </div>
      </body>
    </html>
  );
}
