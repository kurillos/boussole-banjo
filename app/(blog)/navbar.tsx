import Link from "next/link";
import Container from "./container";
import Search from "./search";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6e3]/90 backdrop-blur-md border-b border-[#4E3524]/10">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Nom du site */}
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter text-[#4E3524] font-serif hover:opacity-80 transition-opacity"
          >
            Boussole & Banjo.
          </Link>

          {/* Liens de navigation */}
          <div className="flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#4E3524]">
            <Link href="/" className="hover:underline decoration-[#4E3524]/30 underline-offset-4">
              Chroniques
            </Link>

            <Link href="/manifeste">Manifeste</Link>
            
            <Link 
              href="/contact" 
              className="px-4 py-2 bg-[#4E3524] text-[#fdf6e3] rounded-sm hover:bg-[#4E3524]/90 transition-colors shadow-sm"
            >
              Contact
            </Link>

            <Search />
            
          </div>
        </div>
      </Container>
    </nav>
  );
}