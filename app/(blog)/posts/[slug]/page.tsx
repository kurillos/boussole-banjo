import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import PortableText from "../../portable-text"; 
import CoverImage from "../../cover-image";
import SpotifyPlayer from "../../../components/SpotifyPlayer";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await sanityFetch({ 
    query: postQuery, 
    params: { slug } 
  });

  if (!post) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-5 py-10 max-w-4xl">
      {/* Titre style Journal */}
      <h1 className="text-5xl md:text-7xl font-serif mb-8 text-[#4E3524] uppercase leading-tight tracking-tighter">
        {post.title}
      </h1>

      {/* Image de couverture avec ombre portée */}
      <div className="mb-10 shadow-2xl rounded-xl overflow-hidden border border-[#4E3524]/10">
        <CoverImage image={post.coverImage} priority />
      </div>

      {/* Lecteur Spotify intégré */}
      {post.spotifyUrl && <SpotifyPlayer url={post.spotifyUrl} />}

      {/* Corps de la chronique */}
      <div className="prose prose-lg prose-stone max-w-none font-serif text-[#4E3524]/90 leading-relaxed italic-quotes">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>Le contenu de cette chronique est en cours de rédaction...</p>
        )}
      </div>
    </article>
  );
}