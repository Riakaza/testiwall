import Link from "next/link";

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-accent font-bold text-lg">← Retour</Link>
        <h1 className="text-3xl font-bold mt-6 mb-8">Politique de Confidentialité</h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          La protection de vos données personnelles est une priorité pour TestiWall. Cette page vous informe sur la façon dont nous collectons, utilisons et protégeons vos données, conformément au RGPD.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">1. Données collectées</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Utilisateurs :</strong> Nom, adresse e-mail (authentification).</li>
          <li><strong>Auteurs de témoignages :</strong> Nom, adresse e-mail, note, texte du témoignage.</li>
          <li><strong>Données techniques :</strong> Adresse IP (sécurité et anti-spam).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">2. Finalités</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>Fourniture et gestion du service TestiWall.</li>
          <li>Affichage des témoignages sur les murs configurés.</li>
          <li>Sécurisation du site et détection des abus.</li>
          <li>Support utilisateur.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">3. Base légale</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Exécution du contrat</strong> (CGU) pour l&apos;utilisation du service.</li>
          <li><strong>Consentement</strong> des auteurs lors de la soumission.</li>
          <li><strong>Intérêt légitime</strong> pour la sécurité (collecte IP).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">4. Stockage des données</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Vos données ne sont jamais vendues. Elles sont stockées chez :
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Supabase :</strong> Base de données, serveurs en Europe.</li>
          <li><strong>Vercel :</strong> Hébergement web.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">5. Durée de conservation</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Vos données sont conservées tant que votre compte est actif. En cas de suppression de compte, toutes les données sont effacées définitivement. Les adresses IP sont conservées maximum 12 mois.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">6. Cookies</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          TestiWall n&apos;utilise <strong>aucun cookie de tracking ou publicitaire</strong>. Seuls des cookies techniques de session (authentification) sont utilisés. Ils ne nécessitent pas de consentement (directive CNIL).
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">7. Vos droits</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>Droit d&apos;accès, de rectification et de suppression.</li>
          <li>Droit à l&apos;effacement (droit à l&apos;oubli).</li>
          <li>Droit de retirer votre consentement à tout moment.</li>
          <li>Droit d&apos;opposition et de limitation du traitement.</li>
        </ul>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Contact : <strong>zakariaxarmyxblink@gmail.com</strong>. Vous pouvez aussi saisir la CNIL (cnil.fr).
        </p>
      </div>
    </div>
  );
}
