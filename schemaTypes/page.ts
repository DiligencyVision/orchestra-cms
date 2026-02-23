// schemaTypes/page.ts
import { defineField, defineType } from "sanity";

/**
 * ============================================================
 * PAGE (Type unique)
 * ============================================================
 * Un seul type "page" pour tout le site (réplicabilité).
 * - Champs communs (SEO + Hero + Final CTA)
 * - Sections spécifiques (Accueil, Cabinet, Méthode...)
 * - Studio lisible via fieldsets repliables
 */

/**
 * Portable Text block réutilisable
 * - Ajoute le bouton "Highlight" dans le Studio
 * - Le front mappe le mark "highlight" -> texte sky
 */
const richTextBlock = {
  type: "block",
  marks: {
    decorators: [{ title: "Highlight", value: "highlight" }],
  },
};

/**
 * Helper: titleLines pour titres multi-lignes (cards, etc.)
 * Exemple : ["Conserver une lecture", "humaine, pragmatique et", "responsable"]
 */
const titleLinesField = defineField({
  name: "titleLines",
  title: "Titre (lignes)",
  type: "array",
  of: [{ type: "string" }],
  description:
    "Chaque élément = une ligne. Permet de reproduire les titres multi-lignes du front sans PortableText.",
  validation: (Rule) => Rule.min(1).max(4),
});

export const page = defineType({
  name: "page",
  title: "📄 Page",
  type: "document",

  // ============================================================
  // FIELDSETS (organisation visuelle Studio)
  // ============================================================
  fieldsets: [
    {
      name: "identity",
      title: "🧭 Identité & SEO",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "hero",
      title: "🚀 Hero (commun)",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "finalCta",
      title: "🎯 CTA final (commun)",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "home",
      title: "🏠 Accueil",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "cabinet",
      title: "🏛️ Cabinet",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "methode",
      title: "🧠 Méthode ORCHESTRA",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ============================================================
    // 🧭 IDENTITÉ & SEO
    // ============================================================
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      fieldset: "identity",
      description:
        "Titre interne pour l’admin (peut être différent du titre affiché sur la page).",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "identity",
      description: "Identifiant URL unique (ex : 'accueil', 'cabinet').",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO — Title",
      type: "string",
      fieldset: "identity",
      description: "Balise <title>. Laisser vide si non utilisé.",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO — Description",
      type: "text",
      rows: 3,
      fieldset: "identity",
      description: "Meta description. Laisser vide si non utilisé.",
    }),

    // ============================================================
    // 🚀 HERO (commun à toutes les pages)
    // ============================================================
    defineField({
      name: "hero",
      title: "Bloc Hero",
      type: "object",
      fieldset: "hero",
      fields: [
        defineField({ name: "badgeEmoji", title: "Badge — Emoji", type: "string" }),
        defineField({ name: "badgeText", title: "Badge — Texte", type: "string" }),

        defineField({
          name: "titleRich",
          title: "Titre (rich)",
          type: "array",
          of: [richTextBlock],
        }),

        defineField({
          name: "descriptionRich",
          title: "Description (rich)",
          type: "array",
          of: [richTextBlock],
        }),

        defineField({ name: "primaryCtaLabel", title: "CTA primaire — label", type: "string" }),
        defineField({ name: "primaryCtaHref", title: "CTA primaire — lien", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "CTA secondaire — label", type: "string" }),
        defineField({ name: "secondaryCtaHref", title: "CTA secondaire — lien", type: "string" }),
      ],
    }),

    // ============================================================
    // 🎯 CTA FINAL (commun à toutes les pages)
    // ============================================================
    defineField({
      name: "finalCta",
      title: "CTA final (commun)",
      type: "object",
      fieldset: "finalCta",
      description:
        "Bloc CTA de fin de page (carte premium). Même structure sur tout le template, seul le contenu change.",
      fields: [
        defineField({
          name: "titleRich",
          title: "Titre (rich)",
          type: "array",
          of: [richTextBlock],
        }),
        defineField({
          name: "textRich",
          title: "Texte (rich)",
          type: "array",
          of: [richTextBlock],
        }),
        defineField({ name: "primaryLabel", title: "CTA primaire — label", type: "string" }),
        defineField({ name: "primaryHref", title: "CTA primaire — lien", type: "string" }),
        defineField({ name: "secondaryLabel", title: "CTA secondaire — label", type: "string" }),
        defineField({ name: "secondaryHref", title: "CTA secondaire — lien", type: "string" }),
      ],
    }),

    // ============================================================
    // 🏠 ACCUEIL
    // ============================================================
    defineField({
      name: "homeSections",
      title: "Sections Accueil",
      type: "object",
      fieldset: "home",
      fields: [
        defineField({
          name: "approach",
          title: "✨ Notre approche",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "content", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        defineField({
          name: "orchestraCore",
          title: "🤖 ORCHESTRA — Noyau IA",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "content", title: "Texte (rich)", type: "array", of: [richTextBlock] }),

            defineField({
              name: "pillars",
              title: "🧱 Piliers (4)",
              type: "array",
              description: "Exactement 4 éléments pour conserver le layout.",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "line1", title: "Ligne 1", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "line2", title: "Ligne 2", type: "string", validation: (Rule) => Rule.required() }),
                  ],
                },
              ],
              validation: (Rule) => Rule.min(4).max(4),
            }),
          ],
        }),

        defineField({
          name: "humanPlace",
          title: "👤 La place de l’humain",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "intro", title: "Intro (rich)", type: "array", of: [richTextBlock] }),

            defineField({
              name: "cards",
              title: "🃏 Cartes (3)",
              description: "Exactement 3 éléments pour conserver le layout.",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "text", title: "Texte", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
                  ],
                },
              ],
              validation: (Rule) => Rule.min(3).max(3),
            }),

            defineField({ name: "outro", title: "Texte final (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),
      ],
    }),

    // ⚠️ Home CTA existant conservé pour compat (migration plus tard vers finalCta)
    defineField({
      name: "homeCta",
      title: "🎯 CTA final Accueil (legacy)",
      type: "object",
      fieldset: "home",
      fields: [
        defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
        defineField({ name: "textRich", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
        defineField({ name: "primaryLabel", title: "CTA primaire — label", type: "string" }),
        defineField({ name: "primaryHref", title: "CTA primaire — lien", type: "string" }),
        defineField({ name: "secondaryLabel", title: "CTA secondaire — label", type: "string" }),
        defineField({ name: "secondaryHref", title: "CTA secondaire — lien", type: "string" }),
      ],
    }),

    // ============================================================
    // 🏛️ CABINET
    // ============================================================
    defineField({
      name: "cabinetSections",
      title: "Sections Cabinet",
      type: "object",
      fieldset: "cabinet",
      fields: [
        defineField({
          name: "vision",
          title: "👁️ Vision",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({ name: "content", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),
        defineField({
          name: "human",
          title: "🤝 Humain",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({ name: "content", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),
        defineField({
          name: "ai",
          title: "🧠 IA",
          type: "object",
          fields: [
            defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({ name: "content", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),
      ],
    }),

    // ⚠️ Cabinet CTA existant conservé pour compat (migration plus tard vers finalCta)
    defineField({
      name: "cabinetCta",
      title: "🎯 CTA final Cabinet (legacy)",
      type: "object",
      fieldset: "cabinet",
      fields: [
        defineField({ name: "titleRich", title: "Titre (rich)", type: "array", of: [richTextBlock] }),
        defineField({ name: "textRich", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
        defineField({ name: "primaryLabel", title: "CTA primaire — label", type: "string" }),
        defineField({ name: "primaryHref", title: "CTA primaire — lien", type: "string" }),
        defineField({ name: "secondaryLabel", title: "CTA secondaire — label", type: "string" }),
        defineField({ name: "secondaryHref", title: "CTA secondaire — lien", type: "string" }),
      ],
    }),

    // ============================================================
    // 🧠 MÉTHODE ORCHESTRA
    // ============================================================
    defineField({
      name: "methodeSections",
      title: "Sections Méthode ORCHESTRA",
      type: "object",
      fieldset: "methode",
      fields: [
        // 1) Intro
        defineField({
          name: "intro",
          title: "🧩 Une nouvelle façon de travailler",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({ name: "contentRich", title: "Texte (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        // 2) Why
        defineField({
          name: "why",
          title: "❓ Pourquoi ORCHESTRA",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "introRich", title: "Intro (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "label", title: "Label (ex: ORCHESTRA permet de :)", type: "string" }),
            defineField({
              name: "pillars",
              title: "🃏 Cartes (4)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                    titleLinesField,
                  ],
                },
              ],
              validation: (Rule) => Rule.min(4).max(4),
            }),
            defineField({ name: "outroRich", title: "Texte final (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        // 3) Core
        defineField({
          name: "core",
          title: "🧠 Composition du noyau ORCHESTRA",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "introRich", title: "Intro (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "label", title: "Label (ex: Exemples de composants :)", type: "string" }),

            defineField({
              name: "bubbles",
              title: "🫧 Bulles (layout 3 + 2)",
              type: "object",
              fields: [
                defineField({
                  name: "line1",
                  title: "Ligne 1 (3 bulles)",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "text", title: "Texte (multiligne)", type: "text", rows: 4 }),
                      ],
                    },
                  ],
                  validation: (Rule) => Rule.min(3).max(3),
                }),
                defineField({
                  name: "line2",
                  title: "Ligne 2 (2 bulles)",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "text", title: "Texte (multiligne)", type: "text", rows: 4 }),
                      ],
                    },
                  ],
                  validation: (Rule) => Rule.min(2).max(2),
                }),
              ],
            }),

            defineField({ name: "outroRich", title: "Texte final (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        // 4) Human
        defineField({
          name: "human",
          title: "👤 Le rôle central de l’humain",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "introRich", title: "Intro (rich)", type: "array", of: [richTextBlock] }),
            defineField({ name: "label", title: "Label (ex: Les experts humains sont là pour :)", type: "string" }),
            defineField({
              name: "cards",
              title: "🃏 Cartes (4)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                    titleLinesField,
                  ],
                },
              ],
              validation: (Rule) => Rule.min(4).max(4),
            }),
            defineField({ name: "outroRich", title: "Texte final (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        // 5) Workflow
        defineField({
          name: "workflow",
          title: "⚙️ Fonctionnement global",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "introRich", title: "Intro (rich)", type: "array", of: [richTextBlock] }),
            defineField({
              name: "steps",
              title: "🃏 Étapes (4)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                    titleLinesField,
                  ],
                },
              ],
              validation: (Rule) => Rule.min(4).max(4),
            }),
            defineField({ name: "outroRich", title: "Texte final (rich)", type: "array", of: [richTextBlock] }),
          ],
        }),

        // 6) Benefits
        defineField({
          name: "benefits",
          title: "📈 Bénéfices pour le client",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "introRich", title: "Intro (rich)", type: "array", of: [richTextBlock] }),
            defineField({
              name: "cards",
              title: "🃏 Cartes (4)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", title: "Icône (emoji)", type: "string", validation: (Rule) => Rule.required() }),
                    titleLinesField,
                  ],
                },
              ],
              validation: (Rule) => Rule.min(4).max(4),
            }),
          ],
        }),
      ],
    }),
  ],
});