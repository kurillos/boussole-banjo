import Link from "next/link";
import Container from "./container";
import Search from "./search";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3]/90 backdrop-blur-md border-b border-[#4E3524]/10">
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between gap-2">
          
          {/* Logo : On réduit un peu la taille sur mobile */}
          <Link 
            href="/" 
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-[#4E3524] font-serif hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Boussole & Banjo.
          </Link>

          {/* Liens de navigation */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-widest text-[#4E3524]">
            
            <Link href="/" className="hover:underline decoration-[#4E3524]/30 underline-offset-4">
              Chroniques
            </Link>

            <Link href="/manifeste" className="hover:underline decoration-[#4E3524]/30 underline-offset-4">
              Manifeste
            </Link>
            
            {/* Contact : Caché sur mobile, visible dès le petit format tablette (sm) */}
            <Link 
              href="/contact" 
              className="hidden sm:block px-4 py-2 bg-[#4E3524] text-[#fdf6e3] rounded-sm hover:bg-[#4E3524]/90 transition-colors shadow-sm"
            >
              Contact
            </Link>

            {/* Recherche : On peut la garder ou la cacher selon la place */}
            <div className="scale-90 md:scale-100">
               <Search />
            </div>
            
          </div>
        </div>
      </Container>
    </nav>
  );
}