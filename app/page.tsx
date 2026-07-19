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
            <Link
              href="#faq"
              className="px-6 py-3.5 text-gray-600 font-medium hover:text-black transition-colors"
            >
              FAQ
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

        {/* FAQ */}
        <div id="faq" className="mt-20 mb-20 max-w-4xl w-full mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Questions fréquentes
            </h3>
            <p className="text-gray-500 text-sm">
              Tout ce que tu dois savoir avant de te lancer.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Est-ce vraiment gratuit ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Oui, 100%. Pas de plan payant caché, pas de limite sur le nombre de témoignages ou d&apos;espaces.
              </p>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Comment mes clients laissent un témoignage ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Tu leur envoies un lien. Ils remplissent un formulaire simple (nom, email, note, message). Leur email est vérifié automatiquement.
              </p>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Je peux choisir quels témoignages afficher ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Oui. Chaque témoignage passe par toi d&apos;abord. Tu approuves, rejettes ou supprimes depuis ton dashboard.
              </p>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Ça marche sur quel type de site ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Tous. WordPress, Wix, Webflow, Carrd, Shopify, HTML... C&apos;est un simple copier-coller d&apos;iframe.
              </p>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Les témoignages sont-ils vérifiés ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Oui. Chaque personne doit confirmer son email avant que le témoignage soit visible. Un badge &quot;vérifié&quot; s&apos;affiche.
              </p>
            </details>

            <details className="group border-b border-gray-200">
              <summary className="flex items-center justify-between py-5 text-left font-medium text-gray-900 cursor-pointer hover:text-accent list-none [&::-webkit-details-marker]:hidden">
                <span>Je peux personnaliser le widget ?</span>
                <svg className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                Oui. Tu peux changer la couleur d&apos;accent et activer le mode sombre pour matcher ton site.
              </p>
            </details>
          </div>
        </div>

        {/* Dogfooding Widget Section */}
        <div className="w-full max-w-4xl mx-auto mb-20 text-center animate-fade-in">
          <h3 className="text-2xl font-bold mb-2">
            Ce que nos utilisateurs en pensent
          </h3>
          <p className="text-gray-500 text-sm mb-8">
            Propulsé par TestiWall — on mange notre propre cuisine.
          </p>

          <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
            <iframe
              src="/embed/testiwall"
              className="w-full h-[400px] border-none"
              title="TestiWall Widget"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors group"
            >
              Crée ton mur de témoignages <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 px-6 py-6 text-center text-sm text-gray-400">
        TestiWall &mdash; Collecte et affiche tes avis clients. Gratuitement.
      </footer>
    </div>
  );
}
