import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Testimonial } from "@/lib/types";

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

  return (
    <html>
      <body style={{ margin: 0, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "transparent" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t: Testimonial) => (
              <div
                key={t.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "24px",
                  background: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < t.rating ? "#f59e0b" : "#e5e7eb",
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
                    color: "#1f2937",
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
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
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
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                      {t.author_name}
                    </div>
                    {t.author_title && (
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {t.author_title}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px 0" }}>
              Aucun témoignage pour le moment.
            </p>
          )}
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "12px",
            fontSize: "11px",
            color: "#9ca3af",
          }}
        >
          Powered by <span style={{ fontWeight: 600 }}>TestiWall</span>
        </div>
      </body>
    </html>
  );
}
