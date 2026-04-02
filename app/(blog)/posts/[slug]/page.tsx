import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery } from "@/sanity/lib/queries";
import PortableText from "../../portable-text"; 
import CoverImage from "../../cover-image";
import SpotifyPlayer from "../../../components/SpotifyPlayer";
import { urlForImage } from "@/sanity/lib/utils"; 

// 1. Fonction pour les Métadonnées (SEO)
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. On force le type en "any" pour ignorer les erreurs sur les propriétés de "post"
  const post = (await sanityFetch({ 
    query: postQuery, 
    params: { slug }, 
    stega: false 
  })) as any;

  if (!post) return {};

  // 2. On prépare l'image. Si elle n'existe pas, ogImage sera "null"
  const coverImage = post?.coverImage;
  const ogImage = (coverImage && coverImage.asset)
    ? urlForImage(coverImage as any)?.width(1200).height(630).url()
    : null;

  return {
    title: post.title ?? "Chronique",
    description: post.excerpt ?? "",
    openGraph: {
      title: post.title ?? "Chronique",
      description: post.excerpt ?? "",
      // 3. Ici, on n'ajoute "images" QUE si ogImage est une string (donc pas null)
      ...(ogImage ? { 
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
        }] 
      } : {}),
    },
  };
}

// 2. Le Composant de la Page
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // On utilise aussi "as any" ici pour éviter les erreurs dans le JSX
  const post = (await sanityFetch({ 
    query: postQuery, 
    params: { slug } 
  })) as any;

  if (!post) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-5 py-10 max-w-4xl min-h-screen bg-[#fdf6e3]">
      {/* Titre style Journal */}
      <h1 className="text-5xl md:text-7xl font-serif mb-8 text-[#4E3524] uppercase leading-tight tracking-tighter">
        {post.title}
      </h1>

      {/* Image de couverture avec ombre portée */}
      <div className="mb-10 shadow-2xl rounded-xl overflow-hidden border border-[#4E3524]/10">
        <CoverImage image={post.coverImage} priority />
      </div>

      {/* Lecteur Spotify intégré */}
      {post.spotifyUrl && (
        <div className="mb-10">
          <SpotifyPlayer url={post.spotifyUrl} />
        </div>
      )}

      {/* Corps de la chronique */}
      <div className="prose prose-lg prose-stone max-w-none font-serif text-[#4E3524]/90 leading-relaxed manifeste-content">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p className="italic text-[#4E3524]/60">Le contenu de cette chronique est en cours de rédaction...</p>
        )}
      </div>
    </article>
  );
}