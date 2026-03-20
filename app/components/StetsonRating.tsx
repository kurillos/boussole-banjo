interface StetsonRatingProps {
  rating: number;
}

export default function StetsonRating({ rating }: StetsonRatingProps) {
  const displayRating = Math.min(Math.max(Math.round(rating), 0), 5);

  return (
    <div 
      className="flex items-center gap-1 my-2" 
      aria-label={`Note: ${displayRating} sur 5 stetsons`}
    >
      {[...Array(5)].map((_, i) => (
        <span 
          key={i} 
          className={`text-2xl transition-all duration-300 ${
            i < displayRating 
              ? 'opacity-100 filter-none scale-110' 
              : 'opacity-20 grayscale scale-100'
          }`}
        >
          🤠
        </span>
      ))}
      <span className="ml-2 font-serif text-sm text-[#4E3524]/60 uppercase tracking-widest">
        ({displayRating}/5)
      </span>
    </div>
  );
}