import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-accent font-bold text-lg">← Retour</Link>
        <h1 className="text-3xl font-bold mt-6 mb-8">Mentions Légales</h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), il est précisé aux utilisateurs du site TestiWall l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">1. Éditeur du site</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Le site <strong>TestiWall</strong> (accessible à l&apos;adresse <a href="https://testiwall-kappa.vercel.app" className="underline text-blue-600">https://testiwall-kappa.vercel.app</a>) est édité par :
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Nom / Prénom :</strong> Zakaria</li>
          <li><strong>Statut :</strong> Personne physique</li>
          <li><strong>Adresse de courrier électronique :</strong> zakariaxarmyxblink@gmail.com</li>
          <li><strong>Directeur de la publication :</strong> Zakaria</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">2. Hébergeur du site</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Hébergeur :</strong> Vercel Inc.</li>
          <li><strong>Adresse postale :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
          <li><strong>Site web :</strong> https://vercel.com</li>
        </ul>
        <p className="text-gray-600 mb-4 leading-relaxed">
          La base de données du site est propulsée par <strong>Supabase</strong>, avec des serveurs situés au sein de l&apos;Union Européenne.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">3. Propriété intellectuelle</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Le design, les textes, les graphismes, la technologie et le code source de TestiWall sont la propriété exclusive de l&apos;éditeur, à l&apos;exception des contenus (témoignages, noms) soumis volontairement par les utilisateurs du service, qui restent la propriété de leurs auteurs respectifs.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">4. Responsabilité</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          L&apos;éditeur s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour des informations diffusées sur ce site. L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du site, d&apos;une interruption de service, ou de la publication de témoignages rédigés par des tiers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">5. Contact</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Pour toute question ou signalement de contenu illicite : <strong>zakariaxarmyxblink@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}
