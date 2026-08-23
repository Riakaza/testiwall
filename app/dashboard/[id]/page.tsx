import { createClient } from "@/lib/supabase-server";
import { redirect, notFound } from "next/navigation";
import { SpaceDetailContent } from "@/components/SpaceDetailContent";
import type { Testimonial } from "@/lib/types";
import { headers } from "next/headers";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: space } = await supabase
    .from("spaces")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!space) notFound();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("space_id", space.id)
    .order("created_at", { ascending: false });

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const collectUrl = `${baseUrl}/collect/${space.slug}`;
  const embedUrl = `${baseUrl}/embed/${space.slug}`;

  return (
    <SpaceDetailContent
      space={{
        id: space.id,
        name: space.name,
        slug: space.slug,
        question: space.question,
        thank_you_msg: space.thank_you_msg,
      }}
      testimonials={(testimonials as Testimonial[]) || []}
      collectUrl={collectUrl}
      embedUrl={embedUrl}
      baseUrl={baseUrl}
    />
  );
}
