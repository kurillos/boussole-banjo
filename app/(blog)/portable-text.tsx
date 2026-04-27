/**
 * This component uses Portable Text to render a post body.
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
// On importe l'outil qui transforme les données Sanity en URL d'image
import { urlForImage } from "@/sanity/lib/utils";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    // --- AJOUT DU BLOC TYPES POUR LES IMAGES ---
    types: {
      image: ({ value }) => {
        return (
          <div className="my-8 space-y-2">
            <img
              className="mx-auto rounded-xl shadow-md border border-stone-200"
              src={urlForImage(value).url()}
              alt={value.alt || "Illustration Boussole & Banjo"}
            />
            {value.caption && (
              <p className="text-center text-sm italic text-stone-500">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
    },
    // --- FIN DE L'AJOUT ---
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
          <a href={value?.href} rel="noreferrer noopener" className="underline decoration-stone-400">
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className={["prose", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}