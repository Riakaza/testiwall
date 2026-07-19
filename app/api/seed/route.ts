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
    author_name: "Thomas V.",
    author_email: "thomas.design.pro@outlook.fr",
    author_title: "Web Designer freelance",
    content: "J'utilise TestiWall sur la page d'accueil de mon portfolio pour rassurer mes nouveaux clients. L'intégration du widget est ultra simple, j'ai juste eu un petit doute avec le CSS sur mobile mais c'était réglé en 2 min. Ça fait tout de suite plus pro que de copier-coller des captures d'écran.",
    rating: 5,
  },
  {
    author_name: "Sarah L.",
    author_email: "sarah.coaching.fit@gmail.com",
    author_title: "Coach en ligne",
    content: "J'ai installé ça sur ma page de vente pour mes programmes de coaching. Ça convertit mieux, c'est clair. Par contre j'aimerais bien pouvoir changer la police des avis pour que ça colle parfaitement à ma charte. Sinon l'outil fait le job, c'est gratuit et ça bug jamais.",
    rating: 4,
  },
  {
    author_name: "Julien M.",
    author_email: "j.martin.dev@protonmail.com",
    author_title: "Fondateur de SaaS",
    content: "Je lance mon premier SaaS et j'avais pas le budget pour Testimonial.to. TestiWall m'a sauvé. La collecte via le lien direct est hyper fluide, mes bêta-testeurs ont pu laisser leur avis en 30 secondes. Manque peut-être un tri par date mais pour le prix, rien à dire.",
    rating: 5,
  },
  {
    author_name: "Clara B.",
    author_email: "clara.formation.web@yahoo.fr",
    author_title: "Formatrice en ligne",
    content: "Je suis formatrice et franchement la technique c'est pas mon truc. J'ai pu configurer le wall d'avis toute seule sans demander de l'aide. Mes élèves laissent leurs retours après la formation et ça s'affiche direct sur mon site. Simple, rapide, efficace.",
    rating: 5,
  },
  {
    author_name: "Marc-Antoine D.",
    author_email: "ma.dev.indie@icloud.com",
    author_title: "Développeur indie",
    content: "J'ai testé au moins 4 outils d'avis avant celui-là. TestiWall est bien plus léger et ne ralentit pas le chargement de mon site. L'interface est un peu rudimentaire c'est vrai, mais elle va droit au but. Exactement ce qu'il me fallait.",
    rating: 4,
  },
];

export async function POST() {
  const supabase = getSupabase();

  // Find or create the testiwall space
  let spaceId: string;

  const { data: existing } = await supabase
    .from("spaces")
    .select("id")
    .eq("slug", "testiwall")
    .single();

  if (existing) {
    spaceId = existing.id;
    // Delete old testimonials
    await supabase.from("testimonials").delete().eq("space_id", spaceId);
  } else {
    // Get first user as owner
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const owner = users?.[0];
    if (!owner) {
      return NextResponse.json({ error: "Aucun utilisateur trouvé." }, { status: 400 });
    }

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
    spaceId = space.id;
  }

  // Insert new testimonials
  const rows = DEMO_TESTIMONIALS.map((t) => ({
    ...t,
    space_id: spaceId,
    status: "approved",
    email_verified: true,
    verification_token: null,
  }));

  const { error: insertError } = await supabase.from("testimonials").insert(rows);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, spaceId, testimonials: rows.length });
}
