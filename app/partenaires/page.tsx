import { sanityFetch } from "@/sanity/lib/fetch";
import { partenairesQuery } from "@/sanity/lib/queries";

const CATEGORY_LABELS: Record<string, string> = {
  sellier: "Sellier / Maroquinerie",
  tatoueur: "Tatoueur",
  musique: "Luthier / Musique",
  mode: "Mode & Chapellerie",
  bar: "Bar & Restauration",
  autre: "Autre",
};

export const metadata = {
  title: "Partenaires — Boussole & Banjo",
  description: "Les artisans et créateurs qui partagent l'esprit Boussole & Banjo.",
};

export default async function PartenairesPage() {
  const partenaires = (await sanityFetch({ query: partenairesQuery })) as any[];

  return (
    <main className="min-h-screen bg-[#fdf6e3]">
      {/* En-tête */}
      <div className="border-b border-[#4E3524]/10 py-16 text-center">
        <p className="text-xs uppercase tracking-widest text-[#4E3524]/50 font-medium mb-4">
          Dans notre sillage
        </p>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#4E3524] uppercase tracking-tighter">
          Partenaires
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-[#4E3524]/70 font-serif text-lg leading-relaxed px-5">
          Des artisans, créateurs et passionnés qui incarnent l'esprit de la country moderne — l'authenticité avant tout.
        </p>
      </div>

      {/* Grille */}
      <div className="container mx-auto px-5 py-16 max-w-5xl">
        {partenaires && partenaires.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partenaires.map((p) => (
              <PartenaireCard key={p._id} partenaire={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#4E3524]/50 font-serif italic text-lg py-20">
            Les partenaires arrivent bientôt...
          </p>
        )}
      </div>
    </main>
  );
}

function PartenaireCard({ partenaire }: { partenaire: any }) {
  const logoUrl = partenaire.logo?.asset?.url
    ? `${partenaire.logo.asset.url}?w=400&auto=format`
    : null;

  const card = (
    <div className="group flex flex-col bg-[#fdf6e3] border border-[#4E3524]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Logo */}
      <div className="flex items-center justify-center bg-[#4E3524]/5 h-48 p-6">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`Logo ${partenaire.name}`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-4xl text-[#4E3524]/20 font-serif font-bold uppercase">
            {partenaire.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-6">
        {/* Catégorie */}
        <span className="text-[10px] uppercase tracking-widest text-[#4E3524]/40 font-medium mb-2">
          {CATEGORY_LABELS[partenaire.category] || partenaire.category}
        </span>

        {/* Nom */}
        <h2 className="text-xl font-serif font-bold text-[#4E3524] mb-3 leading-tight">
          {partenaire.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#4E3524]/70 font-serif leading-relaxed flex-1">
          {partenaire.description}
        </p>

        {/* Lien site web */}
        {partenaire.website && (
          <a
            href={partenaire.website}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#4E3524] font-medium hover:underline decoration-[#4E3524]/30 underline-offset-4"
          >
            Visiter
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );

  return card;
}
