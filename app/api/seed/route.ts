import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const DEMO_TESTIMONIALS = [
  {
    author_name: "Thomas Dubois",
    author_email: "t.dubois@freelance-design.fr",
    author_title: "Designer UI/UX indépendant",
    content: "J'avais toujours la flemme de relancer mes clients pour obtenir des avis. Avec TestiWall, j'ai automatisé la collecte via un lien direct après chaque fin de projet, et ça a boosté mon taux de conversion sur mon portfolio.",
    rating: 5,
  },
  {
    author_name: "Sophie Martin",
    author_email: "contact@les-petits-ateliers.fr",
    author_title: "Fondatrice chez Les Petits Ateliers",
    content: "L'intégration sur mon site WordPress a été pliée en 5 minutes. Le rendu est super propre, ça fait tout de suite plus sérieux quand les prospects arrivent sur ma page d'accueil.",
    rating: 5,
  },
  {
    author_name: "Julien Lefebvre",
    author_email: "julien.dev@codeworks.io",
    author_title: "Développeur Fullstack & Maker",
    content: "Simple et efficace, rien à dire. J'utilise surtout la fonction d'importation CSV pour centraliser tous mes avis au même endroit. Ça m'évite de gérer plusieurs widgets différents.",
    rating: 4,
  },
  {
    author_name: "Camille Fournier",
    author_email: "camille.f@marketing-digital.net",
    author_title: "Consultante SEO",
    content: "Ce qui m'a convaincue, c'est la possibilité de personnaliser le design du mur pour qu'il colle parfaitement à ma charte graphique. Enfin un outil qui va droit à l'essentiel.",
    rating: 5,
  },
  {
    author_name: "Nicolas Moreau",
    author_email: "n.moreau@tech-services.fr",
    author_title: "Gérant de TechServices",
    content: "On a commencé à utiliser TestiWall pour nos clients B2B et on a vu une vraie différence sur le temps de décision de nos leads. Le widget est très lisible sur mobile.",
    rating: 5,
  },
];

export async function POST() {
  const supabase = getSupabase();

  // Check if space already exists
  const { data: existing } = await supabase
    .from("spaces")
    .select("id")
    .eq("slug", "testiwall")
    .single();

  if (existing) {
    return NextResponse.json({ message: "L'espace testiwall existe déjà.", id: existing.id });
  }

  // Get first user as owner (or create without owner for demo)
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const owner = users?.[0];

  if (!owner) {
    return NextResponse.json({ error: "Aucun utilisateur trouvé. Crée un compte d'abord." }, { status: 400 });
  }

  // Create space
  const { data: space, error: spaceError } = await supabase
    .from("spaces")
    .insert({
      user_id: owner.id,
      name: "TestiWall",
      slug: "testiwall",
      question: "Qu'est-ce que tu penses de TestiWall ?",
      thank_you_msg: "Merci pour ton retour !",
    })
    .select("id")
    .single();

  if (spaceError) {
    return NextResponse.json({ error: spaceError.message }, { status: 500 });
  }

  // Insert testimonials
  const rows = DEMO_TESTIMONIALS.map((t) => ({
    ...t,
    space_id: space.id,
    status: "approved",
    email_verified: true,
    verification_token: null,
  }));

  const { error: insertError } = await supabase.from("testimonials").insert(rows);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, spaceId: space.id, testimonials: rows.length });
}
