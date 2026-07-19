import Link from "next/link";

export default function CGU() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-accent font-bold text-lg">← Retour</Link>
        <h1 className="text-3xl font-bold mt-6 mb-8">Conditions Générales d&apos;Utilisation</h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Les présentes CGU encadrent l&apos;accès et l&apos;utilisation des services proposés sur le site TestiWall. En utilisant nos services, vous acceptez sans réserve les présentes CGU.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">1. Objet du service</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          TestiWall est un outil en ligne permettant de collecter, gérer et afficher des témoignages clients. Le service est proposé à titre entièrement gratuit.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">2. Inscription et Accès</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          L&apos;accès au service nécessite la création d&apos;un compte. L&apos;utilisateur s&apos;engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">3. Obligations de l&apos;utilisateur</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>Ne pas publier de témoignages mensongers, diffamatoires, injurieux ou violant les droits de tiers.</li>
          <li>Ne pas utiliser le service pour usurper une identité.</li>
          <li>Ne pas tenter d&apos;accéder de manière non autorisée aux serveurs.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">4. Données et modération</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          L&apos;utilisateur est seul responsable des témoignages qu&apos;il collecte et affiche. L&apos;éditeur se réserve le droit de supprimer tout contenu qui violerait les CGU ou la loi française.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">5. Suppression de compte</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          L&apos;utilisateur peut à tout moment supprimer son compte et toutes ses données directement depuis le dashboard ou en contactant zakariaxarmyxblink@gmail.com.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">6. Propriété intellectuelle</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          La marque TestiWall, le code et la charte graphique sont la propriété de l&apos;éditeur. L&apos;utilisation du service ne concède aucun droit de propriété intellectuelle.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">7. Limitation de responsabilité</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Le service est fourni « en l&apos;état ». L&apos;éditeur ne saurait être tenu responsable des pertes de données ou de l&apos;interruption du service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">8. Modification des CGU</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          L&apos;éditeur peut modifier les CGU à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800">9. Droit applicable</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Les présentes CGU sont régies par le droit français.
        </p>
      </div>
    </div>
  );
}
