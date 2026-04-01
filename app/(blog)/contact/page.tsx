export default function ContactPage() {
  return (
    <div className="py-20 bg-[#fdf6e3] min-h-[70vh]">
      {/* Cette div remplace le Container manquant */}
      <div className="container mx-auto px-5">
        
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-serif text-[#4E3524] mb-8 uppercase tracking-tighter">
            Contact & Soumissions
          </h1>
          
          <p className="text-lg text-[#4E3524]/80 leading-relaxed mb-12 italic font-sans">
            &quot;Que vous soyez un label indépendant, un festival de Bluegrass ou un groupe avec un banjo désaccordé, ma porte est toujours ouverte.&quot;
          </p>
          
          <div className="bg-white/40 backdrop-blur-sm p-10 border border-[#4E3524]/10 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-[#4E3524] mb-4 uppercase tracking-widest font-serif">
              Envoyez vos galettes
            </h2>
            <p className="mb-8 text-[#4E3524]/70 leading-relaxed">
              Pour toute demande de chronique, partenariat, envoi de vinyles ou accréditation presse :
            </p>
            
            <a 
              href="mailto:contact@boussole-banjo.fr" 
              className="text-xl md:text-2xl font-mono font-bold text-[#4E3524] hover:text-[#D2B48C] transition-colors break-all"
            >
              boussoleetbanjo@gmail.com
            </a>
          </div>

          <div className="mt-16 flex justify-center opacity-20">
            <div className="h-[1px] w-12 bg-[#4E3524]"></div>
            <div className="mx-4 -mt-2 text-[#4E3524] text-xs">◈</div>
            <div className="h-[1px] w-12 bg-[#4E3524]"></div>
          </div>

          <div className="mt-12 text-sm text-[#4E3524]/50 italic leading-loose">
            Note : Je privilégie les sorties physiques (Vinyles / CD) pour le plaisir de l&apos;objet, <br />
            mais j&apos;écoute religieusement tous les liens Bandcamp & Spotify reçus.
          </div>
        </div>

      </div>
    </div>
  );
}