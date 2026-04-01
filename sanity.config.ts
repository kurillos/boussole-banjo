"use client";

import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";

// Import des variables d'environnement et API
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { assistWithPresets } from "@/sanity/plugins/assist";
import { resolveHref } from "@/sanity/lib/utils";

// Import de tes schémas
import chronique from "@/sanity/schemas/chronique";
import author from "@/sanity/schemas/documents/author";
import settings from "@/sanity/schemas/singletons/settings";
import about from "./sanity/schemas/about";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    // On enregistre tous les types ici
    types: [chronique, settings, author, about],
  },
  plugins: [
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "chronique" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "Ce document est utilisé sur toutes les pages",
            tone: "caution",
          }),
          chronique: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Sans titre",
                  href: resolveHref("chronique", doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    // CONFIGURATION DE LA STRUCTURE (Le menu à gauche)
    structureTool({
      structure: (S) =>
        S.list()
          .title("Boussole & Banjo - Gazette")
          .items([
            // 1. On force l'affichage du Manifeste en haut (en mode "Page Unique")
            S.listItem()
              .title("Manifeste")
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
                  .title("Mon Manifeste")
              ),
            S.divider(),
            // 2. On affiche le reste (Chroniques, Auteurs) automatiquement
            ...S.documentTypeListItems().filter(
              (item) => 
                !["about", "settings", "assist.instruction.context"].includes(item.getId()!)
            ),
            S.divider(),
            // 3. Les paramètres du site en bas
            S.listItem()
              .title("Paramètres du site")
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),
          ]),
    }),
    unsplashImageAsset(),
    assistWithPresets(),
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});