import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="text-center animate-scale-in">
        <Link href="/" className="text-2xl font-bold tracking-tight inline-block mb-6">
          <span className="text-accent">Testi</span>Wall
        </Link>
        <h1 className="text-7xl font-extrabold tracking-tight text-accent mb-3">404</h1>
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Cette page n&apos;existe pas
        </p>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
          Le lien est peut-être erroné ou l&apos;espace a été supprimé.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
