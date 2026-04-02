export const dynamic = "force-dynamic";
export const revalidate = 0;

import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import PortableText from "../portable-text";

const manifesteQuery = groq`*[_type == "about"][0]{
  title,
  content
}`;

export default async function ManifestePage() {
  // On enlève "revalidate: 0" d'ici car ta fonction ne le reconnaît pas
  const data = await sanityFetch({ 
    query: manifesteQuery 
  });

  if (!data) {
    return (
      <div className="py-40 text-center font-serif text-[#4E3524] bg-[#fdf6e3] min-h-screen">
        <h2 className="text-2xl italic font-bold">Toujours rien...</h2>
        <p className="mt-4 opacity-70">Le manuscrit est perdu dans la poussière.</p>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#fdf6e3]">
      <header className="w-full border-b-2 border-[#4E3524] pt-16 pb-12 mb-12">
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-[#4E3524] uppercase tracking-tighter leading-none">
            {data.title}
          </h1>
          <p className="text-[#4E3524]/60 font-mono uppercase tracking-[0.3em] text-[10px] md:text-xs mt-10">
            Boussole & Banjo — Édition n°1
          </p>
        </div>
      </header>

      <div className="container mx-auto px-5 mb-24">
        <article className="max-w-3xl mx-auto">
          <div className="prose prose-lg md:prose-xl prose-stone font-serif text-[#4E3524]/90 leading-relaxed">
            <PortableText value={data.content} />
          </div>
        </article>
      </div>
    </main>
  );
}