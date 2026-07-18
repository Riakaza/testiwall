import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { CollectForm } from "@/components/CollectForm";

export default async function CollectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: space } = await supabase
    .from("spaces")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!space) notFound();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-accent text-xl">✦</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{space.name}</h1>
            <p className="mt-2 text-gray-500">{space.question}</p>
          </div>

          <CollectForm spaceId={space.id} thankYouMsg={space.thank_you_msg} />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Powered by <span className="font-medium">TestiWall</span>
        </p>
      </div>
    </div>
  );
}
