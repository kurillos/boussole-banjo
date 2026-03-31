export default function SpotifyPlayer({ url }: { url?: string }) {
  if (!url) return null;

  const getEmbedUrl = (originalUrl: string) => {
    try {
      // 1. On enlève tout ce qui est après le "?" (les codes de suivi)
      let cleanUrl = originalUrl.split('?')[0];
      
      // 2. On supprime les codes de langue type /intl-fr/ ou /intl-en/
      cleanUrl = cleanUrl.replace(/\/intl-[a-zA-Z]{2}\//, '/');

      // 3. Si c'est un lien de partage classique, on l'injecte dans le format embed
      // On cherche track, album, ou playlist
      if (cleanUrl.includes('spotify.com') && !cleanUrl.includes('/embed/')) {
        return cleanUrl.replace('spotify.com/', 'spotify.com/embed/');
      }
      
      return cleanUrl;
    } catch (e) {
      return originalUrl;
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="my-10 w-full overflow-hidden rounded-xl shadow-lg border border-[#4E3524]/10">
      <iframe
        src={embedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="bg-transparent"
      ></iframe>
    </div>
  );
}