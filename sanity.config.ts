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

// Import des schémas
import chronique from "@/sanity/schemas/chronique";
import author from "@/sanity/schemas/documents/author";
import settings from "@/sanity/schemas/singletons/settings";
import about from "@/sanity/schemas/about";
import partenaire from "@/sanity/schemas/partenaire"; // ← NOUVEAU

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [chronique, settings, author, about, partenaire], // ← AJOUTÉ
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
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            // Manifeste
            S.listItem()
              .title("Manifeste")
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
              ),
            S.divider(),
            // Partenaires ← NOUVEAU
            S.listItem()
              .title("Partenaires")
              .child(
                S.documentTypeList("partenaire")
                  .title("Partenaires")
              ),
            S.divider(),
            // Liste automatique pour Chroniques et Authors
            ...S.documentTypeListItems().filter(
              (item) => !["about", "settings", "partenaire", "assist.instruction.context"].includes(item.getId()!)
            ),
            S.divider(),
            // Paramètres
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
