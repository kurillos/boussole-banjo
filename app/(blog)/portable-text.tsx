/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
// Import de l'utilitaire d'image de Sanity
import { urlForImage } from "@/sanity/lib/utils";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        // Vérification de sécurité pour éviter que le build plante si l'image est vide
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-10 flex flex-col items-center justify-center">
            <img
              className="mx-auto rounded-xl shadow-lg border border-stone-200"
              src={urlForImage(value).width(1200).url()}
              alt={value.alt || "Illustration Boussole & Banjo"}
              loading="lazy"
            />
            {value.caption && (
              <span className="mt-4 text-center text-sm italic text-stone-500 font-serif">
                — {value.caption}
              </span>
            )}
          </div>
        );
      },
    },
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold text-stone-800">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold text-stone-800">{children}</h6>
      ),
      // Optionnel : style pour les paragraphes normaux si besoin
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            href={value?.href}
            rel="noreferrer noopener"
            className="underline decoration-stone-400 hover:text-stone-600 transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className={["prose prose-stone max-w-none", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}