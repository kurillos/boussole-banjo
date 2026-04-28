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
        // DEBUG : affiche en rouge ce que Sanity renvoie si l'asset est manquant
        if (!value?.asset?._ref) {
          return (
            <pre style={{ background: "red", color: "white", padding: "8px", fontSize: "10px" }}>
              {JSON.stringify(value, null, 2)}
            </pre>
          );
        }
        return (
          <div className="my-10 flex flex-col items-center justify-center">
            <img
              className="mx-auto rounded-xl shadow-lg border border-stone-200"
              src={urlFor(value).width(1200).auto("format").url()}
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
