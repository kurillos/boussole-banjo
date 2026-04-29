import Link from "next/link";
import Container from "./container";
import Search from "./search";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3]/90 backdrop-blur-md border-b border-[#4E3524]/10">
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between gap-2">
          
          {/* Logo */}
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

            {/* Lien Partenaires — caché sur très petit mobile */}
            <Link href="/partenaires" className="hidden xs:block hover:underline decoration-[#4E3524]/30 underline-offset-4">
              Partenaires
            </Link>
            
            {/* Contact */}
            <Link 
              href="/contact" 
              className="hidden sm:block px-4 py-2 bg-[#4E3524] text-[#fdf6e3] rounded-sm hover:bg-[#4E3524]/90 transition-colors shadow-sm"
            >
              Contact
            </Link>

            <div className="scale-90 md:scale-100">
               <Search />
            </div>

            {/* Bouton Admin (Cadenas) */}
            <Link 
              href="/studio" 
              className="hidden md:flex p-2 text-[#4E3524]/40 hover:text-[#4E3524] transition-colors"
              title="Accès Studio"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </Link>
            
          </div>
        </div>
      </Container>
    </nav>
  );
}
