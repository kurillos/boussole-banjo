import PortableText from "@/app/(blog)/portable-text";
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";

export default async function ManifestePage() {
  const data = await sanityFetch({ 
    query: groq`*[_type == "about"][0]` 
  });

  if (!data) return <div className="text-center py-20">L'éditorial est sous presse...</div>;

  return (
    <article className="container mx-auto px-5 py-16 max-w-3xl">
      {/* L'en-tête de la gazette */}
      <header className="border-b-2 border-[#4E3524] pb-8 mb-12 text-center">
        <h1 className="text-6xl md:text-8xl font-serif text-[#4E3524] uppercase tracking-tighter">
          {data.title || "Manifeste"}
        </h1>
        <p className="text-[#4E3524]/60 font-mono uppercase tracking-[0.3em] mt-4 text-sm">
          Boussole & Banjo — Édition n°1
        </p>
      </header>

      {/* C'est ICI que tout ton texte (I, II, III, IV) va s'afficher */}
      <div className="prose prose-lg prose-stone max-w-none font-serif text-[#4E3524]/90 leading-relaxed manifeste-content">
        <PortableText value={data.content as any} />
      </div>

      <footer className="mt-16 pt-8 border-t border-[#4E3524]/10 text-center italic font-serif text-[#4E3524]/70">
        "Pour que la musique reste une histoire de poussière et de cordes."
      </footer>
    </article>
  );
}