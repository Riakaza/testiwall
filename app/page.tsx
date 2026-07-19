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
            href="#faq"
            className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-accent transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
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
        <div className="w-full max-w-6xl mt-6 sm:mt-12 animate-fade-in">
          <LazySplineHero />
        </div>

        {/* CTA sous le hero */}
        <div className="text-center mt-4 sm:mt-10 animate-fade-in px-2">
          <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4 sm:mb-6">
            100% gratuit — aucune carte bancaire
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-[1.15] tracking-tight mx-auto">
            Un mur d&apos;{" "}
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              avis clients
            </span>{" "}
            sur ton site en 2 minutes
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Tes clients laissent un avis via un lien. Tu l&apos;affiches sur ton
            site en un copier-coller. Gratuit, sans coder.
          </p>
          <p className="text-xs text-gray-400 mt-2">Gratuit aujourd&apos;hui. Un plan Pro arrivera pour les features avancées.</p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
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
        <div id="how" className="mt-16 sm:mt-32 mb-12 sm:mb-20 max-w-4xl w-full animate-fade-in">
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
        <div id="faq" className="mt-12 sm:mt-20 mb-12 sm:mb-20 max-w-4xl w-full mx-auto px-2 animate-fade-in">
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
        <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-20 text-center animate-fade-in px-2">
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
              loading="lazy"
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

      <section id="contact" className="bg-white border-t py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-2">Un problème ? Une idée ?</h3>
          <p className="text-gray-600 mb-8">Contacte-moi directement — je réponds vite.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:zakariaxarmyxblink@gmail.com"
              className="inline-block bg-accent text-white rounded-xl px-6 py-3 font-medium hover:bg-accent-dark transition-colors shadow-md shadow-accent/20"
            >
              M&apos;envoyer un email
            </a>
            <a
              href="https://discord.com/users/riakaza0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#5865F2] text-[#5865F2] rounded-xl px-6 py-3 font-medium hover:bg-[#5865F2]/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              Discord : riakaza0
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">Bug, idée de feature, ou juste dire bonjour — je suis dispo.</p>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-400">
        <p className="mb-3">TestiWall &mdash; Collecte et affiche tes avis clients. Gratuitement.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-accent transition-colors">CGU</Link>
          <Link href="/confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Tous les systèmes opérationnels
        </div>
      </footer>
    </div>
  );
}
