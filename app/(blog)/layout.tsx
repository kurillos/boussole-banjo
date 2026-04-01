import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import PortableText from "./portable-text";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Navbar from "./navbar";
import { GoogleAnalytics } from '@next/third-parties/google';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footerData = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="fr" className={`${inter.variable} bg-[#fdf6e3] text-black`}>
      <body>
        <section className="min-h-screen flex flex-col bg-old-paper">
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-[#fdf6e3] border-t border-[#4E3524]/20 py-12">
            <div className="container mx-auto px-5">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                
                {/* Logo / Nom du journal */}
                <div className="text-3xl font-bold tracking-tighter leading-tight text-[#4E3524] font-serif">
                  Boussole & Banjo.
                </div>

                {/* Section Droite : Texte ou Copyright */}
                <div className="flex flex-col items-center md:items-end gap-2">
                  {footerData.length > 0 ? (
                    <PortableText
                      className="prose-sm text-[#4E3524]/70 italic text-center md:text-right"
                      value={footerData as PortableTextBlock[]}
                    />
                  ) : (
                    <p className="text-[#4E3524]/70 italic text-sm text-center md:text-right">
                      L'actualité country & folk au format papier jauni.
                    </p>
                  )}
                  <div className="text-[10px] text-[#4E3524]/40 uppercase tracking-[0.2em] font-mono">
                    © {new Date().getFullYear()} — Poussière & Cordes
                  </div>
                </div>
              </div>

              {/* Séparateur décoratif Western */}
              <div className="mt-10 flex justify-center opacity-20">
                <div className="h-[1px] w-16 bg-[#4E3524]"></div>
                <div className="mx-4 -mt-2 text-[#4E3524] text-xs">◈</div>
                <div className="h-[1px] w-16 bg-[#4E3524]"></div>
              </div>
            </div>
          </footer>
        </section>

        {/* Outils de prévisualisation Vercel/Sanity */}
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
        <GoogleAnalytics gaId="G-HM43BXEXBB" />
      </body>
    </html>
  );
}