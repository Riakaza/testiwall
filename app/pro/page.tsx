import type { Metadata } from "next";
import Link from "next/link";
import { ProRequestForm } from "@/components/ProRequestForm";

export const metadata: Metadata = {
  title: "TestiWall Pro — Témoignages illimités, sans branding",
  description:
    "Passe en Pro : témoignages illimités, widget sans marque TestiWall et badge de note moyenne sur tes murs d'avis.",
};

const PAYPAL_BASE = "https://www.paypal.com/paypalme/zakariazoubai";

const freeFeatures = [
  "Jusqu'à 15 témoignages vérifiés par espace",
  "Espaces illimités",
  "Widget embed personnalisable",
  "Vérification email anti-faux avis",
];

const proFeatures = [
  "Témoignages illimités",
  "Widget 100% à ta marque (badge TestiWall masqué)",
  'Badge "★ 4.9/5 · N avis vérifiés" sur ton mur',
  "Support prioritaire",
];

function Check({ pro = false }: { pro?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 ${pro ? "text-accent" : "text-emerald-500"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Testi</span>Wall
        </Link>
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Se connecter
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Tarifs simples, sans surprise
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Passe en <span className="text-accent">Pro</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Ton mur de témoignages devient ta marque : plus de limites, plus de badge TestiWall,
            juste la preuve sociale qui convertit.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col">
            <h2 className="font-bold text-gray-900 mb-1">Gratuit</h2>
            <p className="text-sm text-gray-400 mb-6">Pour tester et petits projets</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold tracking-tight">0 €</span>
              <span className="text-gray-400 text-sm ml-1">pour toujours</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block text-center w-full py-2.5 bg-white text-accent border border-accent/40 rounded-lg font-medium hover:bg-accent/5 transition-all"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Pro mensuel */}
          <div className="relative bg-white rounded-2xl border-2 border-accent p-8 shadow-xl shadow-accent/10 flex flex-col">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Populaire
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Pro</h2>
            <p className="text-sm text-gray-400 mb-6">Sans engagement</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold tracking-tight">4,99 €</span>
              <span className="text-gray-400 text-sm ml-1">/ mois</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check pro />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`${PAYPAL_BASE}/4.99`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
            >
              Payer avec PayPal
            </a>
          </div>

          {/* Pro annuel */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col">
            <h2 className="font-bold text-gray-900 mb-1">Pro Annuel</h2>
            <p className="text-sm text-gray-400 mb-6">2 mois offerts</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold tracking-tight">49 €</span>
              <span className="text-gray-400 text-sm ml-1">/ an</span>
              <div className="mt-1">
                <span className="text-xs line-through text-gray-300">59,88 €</span>{" "}
                <span className="text-xs text-emerald-600 font-semibold">-18 %</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check pro />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`${PAYPAL_BASE}/49`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-2.5 bg-white text-accent border border-accent/40 rounded-lg font-medium hover:bg-accent/5 transition-all"
            >
              Payer avec PayPal
            </a>
          </div>
        </div>

        <section className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Déjà payé ? Active ton compte</h2>
          <p className="text-gray-500 text-sm mb-8">
            Entre l&apos;email de ton compte TestiWall. Activation automatique en moins de <strong>15 minutes</strong> après
            réception du paiement. ⚡
          </p>
          <ProRequestForm />
        </section>

        <p className="text-center text-xs text-gray-400 mt-10 max-w-md mx-auto">
          Paiement sécurisé via PayPal. Sans engagement : le plan mensuel se réactive simplement
          chaque mois via le même lien.
        </p>
      </main>
    </div>
  );
}
