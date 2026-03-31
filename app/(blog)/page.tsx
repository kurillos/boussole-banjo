import Link from "next/link";
import { Suspense } from "react";
import { Lock } from "lucide-react";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import MoreStories from "./more-stories";
import Onboarding from "./onboarding";

import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery } from "@/sanity/lib/queries";

import StetsonRating from "../components/StetsonRating";

function Intro() {
  return (
    <section className="mt-16 mb-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between border-b-2 border-[#4E3524]/10 pb-10">
      <h1 className="text-6xl font-serif tracking-tighter leading-tight lg:pr-8 lg:text-8xl text-[#4E3524] uppercase">
        Boussole <span className="text-[#D2B48C]">&</span> Banjo
      </h1>
      <div className="mt-5 text-center text-lg lg:pl-8 lg:text-left italic text-[#4E3524]/70 font-sans tracking-widest uppercase">
        Chroniques de la Country moderne & authentique
      </div>
    </section>
  );
}

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  rating,
}: any) {
  return (
    /* On utilise <> pour grouper les éléments sans ajouter de div inutile */
    <>
      <div className="fixed top-4 right-4 z-50">
        <Link 
          href="/studio" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4E3524]/10 text-[#4E3524]/40 hover:bg-[#4E3524] hover:text-white transition-all duration-300 backdrop-blur-sm border border-[#4E3524]/20 shadow-sm group"
          title="Accéder au Studio"
        >
          <Lock size={18} className="group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      <article className="relative bg-white/40 backdrop-blur-sm border border-[#4E3524]/10 p-6 md:p-10 rounded-2xl shadow-xl transition-transform hover:scale-[1.005]">
        <Link className="group mb-8 block md:mb-16 overflow-hidden rounded-lg shadow-2xl" href={`/posts/${slug}`}>
          <CoverImage image={coverImage} priority />
        </Link>
        <div className="mb-8 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
          <div>
            <h3 className="text-pretty mb-4 text-4xl leading-tight lg:text-6xl font-serif text-[#4E3524] uppercase">
              <Link href={`/posts/${slug}`} className="hover:text-[#D2B48C] transition-colors">
                {title}
              </Link>
            </h3>
            
            <div className="mb-6">
              <StetsonRating rating={rating || 0} />
            </div>

            <div className="mb-4 text-lg md:mb-0 font-sans text-[#4E3524]/60">
              <DateComponent dateString={date} />
            </div>
          </div>
          <div>
            {excerpt && (
              <p className="text-pretty mb-4 text-lg leading-relaxed text-[#4E3524]/80">
                {excerpt}
              </p>
            )}
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
        </div>
      </article>
    </>
  );
}

export default async function Page() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <div className="container mx-auto px-5 pb-20">
      <Intro />
      {heroPost ? (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
          rating={heroPost.rating}
        />
      ) : (
        <Onboarding />
      )}
      
      {heroPost?._id && (
        <aside className="mt-20 border-t border-[#4E3524]/10 pt-16">
          <h2 className="mb-8 text-4xl font-serif text-[#4E3524] uppercase tracking-tighter">
            Dernières Pistes
          </h2>
          <Suspense>
            <MoreStories skip={heroPost._id} limit={100} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}