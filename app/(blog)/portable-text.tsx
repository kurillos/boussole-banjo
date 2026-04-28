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

import { urlFor } from "@/sanity/lib/image";

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
        // L'asset peut être résolu (objet avec _id) ou une référence (objet avec _ref)
        const hasAsset = value?.asset?._ref || value?.asset?._id;
        if (!hasAsset) {
          return null;
        }

        // Si l'asset est déjà résolu, on utilise son URL directement
        const imageUrl = value.asset.url
          ? `${value.asset.url}?w=1200&auto=format`
          : urlFor(value).width(1200).auto("format").url();

        return (
          <div className="my-10 flex flex-col items-center justify-center">
            <img
              className="mx-auto rounded-xl shadow-lg border border-stone-200"
              src={imageUrl}
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
        <h5 className="mb-2 text-sm font-semibold">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold">{children}</h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel="noreferrer noopener" className="underline">
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
