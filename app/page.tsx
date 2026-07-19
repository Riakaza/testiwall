import Link from "next/link";
import { LazySplineHero } from "@/components/LazySplineHero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-accent">Testi</span>Wall
        </h1>
        <div className="flex gap-3 items-center">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-dark transition-all shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30"
          >
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-6">
        {/* Hero */}
        <div className="w-full max-w-6xl mt-12 animate-fade-in">
          <LazySplineHero />
        </div>

        {/* CTA sous le hero */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-6">
            100% gratuit — aucune carte bancaire
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold max-w-3xl leading-[1.1] tracking-tight mx-auto">
            Un mur d&apos;{" "}
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              avis clients
            </span>{" "}
            sur ton site en 2 minutes
          </h2>

          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Tes clients laissent un avis via un lien. Tu l&apos;affiches sur ton
            site en un copier-coller. Gratuit, sans coder.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-8 py-3.5 bg-accent text-white rounded-xl text-lg font-semibold hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5"
            >
              Créer mon espace gratuit
            </Link>
            <Link
              href="#how"
              className="px-6 py-3.5 text-gray-600 font-medium hover:text-black transition-colors"
            >
              Comment ça marche ?
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div id="how" className="mt-32 mb-20 max-w-4xl w-full animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-12">
            Simple comme 1, 2, 3
          </h3>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Crée ton espace</h4>
              <p className="text-sm text-gray-500">
                Donne un nom et personnalise la question posée à tes clients.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">Partage le lien</h4>
              <p className="text-sm text-gray-500">
                Envoie le lien de collecte à tes clients par email, DM ou sur ton site.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Affiche sur ton site</h4>
              <p className="text-sm text-gray-500">
                Copie-colle le widget sur ton site. Les témoignages approuvés s&apos;affichent automatiquement.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 px-6 py-6 text-center text-sm text-gray-400">
        TestiWall &mdash; Collecte et affiche tes avis clients. Gratuitement.
      </footer>
    </div>
  );
}
