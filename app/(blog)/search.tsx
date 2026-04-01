"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// On définit ce qu'est un résultat pour TypeScript
interface SearchResult {
  title: string;
  slug: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  // On précise que c'est un tableau de SearchResult
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 1) {
        setIsSearching(true);
        try {
          const data = await client.fetch(
            `*[_type == "chronique" && (title match $search || excerpt match $search)] | order(date desc)[0..4] {
              title,
              "slug": slug.current
            }`,
            { search: `${query}*` }
          );
          setResults(data || []);
        } catch (error) {
          console.error("Erreur recherche:", error);
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative flex items-center">
      {isOpen ? (
        <div className="flex items-center bg-white/60 backdrop-blur-sm border border-[#4E3524]/20 rounded-full px-3 py-1 animate-in fade-in slide-in-from-right-4">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artiste, album..."
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-[#4E3524] placeholder-[#4E3524]/40 w-32 md:w-48"
          />
          <button onClick={() => { setIsOpen(false); setQuery(""); }}>
            <X size={16} className="text-[#4E3524]/60 hover:text-[#4E3524]" />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-[#4E3524]/60 hover:text-[#4E3524] transition-colors"
        >
          <SearchIcon size={20} />
        </button>
      )}

      {isOpen && query.length > 1 && (
        <div className="absolute top-12 right-0 w-64 bg-[#fdf6e3] border border-[#4E3524]/10 rounded-lg shadow-2xl overflow-hidden z-[60] animate-in fade-in zoom-in-95">
          {isSearching ? (
            <div className="p-4 text-xs italic text-[#4E3524]/50 text-center">Recherche dans les bacs...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((res) => (
                <li key={res.slug}>
                  <Link 
                    href={`/posts/${res.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(""); }}
                    className="block p-3 text-sm text-[#4E3524] hover:bg-[#4E3524] hover:text-[#fdf6e3] transition-colors font-serif border-b border-[#4E3524]/5 last:border-0"
                  >
                    {res.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-xs italic text-[#4E3524]/50 text-center">Aucun disque trouvé.</div>
          )}
        </div>
      )}
    </div>
  );
}