// schemaTypes/page.ts
import { defineType, defineField } from "sanity";

/**
 * Reusable Portable Text config with a custom "highlight" decorator.
 * In the editor, you select text and click "Highlight" => frontend renders it in sky-400.
 */
const portableTextWithHighlight = defineField({
  name: "portableTextWithHighlight",
  title: "Portable Text",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        decorators: [
          { title: "Highlight", value: "highlight" }, // <-- THE KEY
        ],
      },
    },
  ],
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",

  fields: [
    // --------------------------------------------------
    // Base fields (génériques)
    // --------------------------------------------------
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // Portable Text générique (page CMS simple)
    defineField({
      name: "content",
      title: "Content",
      type: portableTextWithHighlight.type,
      of: portableTextWithHighlight.of,
    }),

    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),

    // ==================================================
    // ORCHESTRA — Champs structurés (Page Cabinet)
    // ==================================================

    // ---------------------------
    // HERO (Cabinet)
    // ---------------------------
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "badgeEmoji",
          title: "Badge Emoji",
          type: "string",
          description: "Ex: 🤖",
        }),
        defineField({
          name: "badgeText",
          title: "Badge Text",
          type: "string",
          description: "Ex: Conseil augmenté par l’IA",
        }),

        // --- Legacy (keep for now) ---
        defineField({
          name: "title",
          title: "Hero Title (legacy string)",
          type: "string",
          description: "Ancien champ. On migre progressivement vers le champ rich.",
        }),
        defineField({
          name: "titleHighlights",
          title: "Title highlights (legacy)",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "description",
          title: "Hero Description (legacy text)",
          type: "text",
        }),
        defineField({
          name: "descriptionHighlights",
          title: "Description highlights (legacy)",
          type: "array",
          of: [{ type: "string" }],
        }),

        // --- New (recommended) ---
        defineField({
          name: "titleRich",
          title: "Hero Title (rich)",
          type: portableTextWithHighlight.type,
          of: portableTextWithHighlight.of,
          description: "Recommandé : surlignage directement dans Sanity (Highlight).",
        }),
        defineField({
          name: "descriptionRich",
          title: "Hero Description (rich)",
          type: portableTextWithHighlight.type,
          of: portableTextWithHighlight.of,
          description: "Recommandé : surlignage directement dans Sanity (Highlight).",
        }),

        defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
        defineField({
          name: "primaryCtaHref",
          title: "Primary CTA href",
          type: "string",
          description: 'Ex: "/methode-orchestra"',
        }),

        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
        defineField({
          name: "secondaryCtaHref",
          title: "Secondary CTA href",
          type: "string",
          description: 'Ex: "/contact"',
        }),
      ],
    }),

    // ---------------------------
    // 3 sections Cabinet
    // ---------------------------
    defineField({
      name: "cabinetSections",
      title: "Cabinet — Sections",
      type: "object",
      fields: [
        defineField({
          name: "vision",
          title: "Vision du Cabinet",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title (legacy string)", type: "string" }),
            defineField({
              name: "titleRich",
              title: "Title (rich)",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({
              name: "content",
              title: "Content",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
          ],
        }),

        defineField({
          name: "human",
          title: "Place de l’humain",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title (legacy string)", type: "string" }),
            defineField({
              name: "titleRich",
              title: "Title (rich)",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({
              name: "content",
              title: "Content",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
          ],
        }),

        defineField({
          name: "ai",
          title: "Usage encadré de l’IA",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title (legacy string)", type: "string" }),
            defineField({
              name: "titleRich",
              title: "Title (rich)",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
            defineField({ name: "emoji", title: "Emoji", type: "string" }),
            defineField({
              name: "content",
              title: "Content",
              type: portableTextWithHighlight.type,
              of: portableTextWithHighlight.of,
            }),
          ],
        }),
      ],
    }),

    // ---------------------------
    // CTA bloc Cabinet
    // ---------------------------
    defineField({
      name: "cabinetCta",
      title: "Cabinet — Bloc CTA",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title (legacy string)", type: "string" }),
        defineField({
          name: "titleRich",
          title: "Title (rich)",
          type: portableTextWithHighlight.type,
          of: portableTextWithHighlight.of,
        }),

        defineField({ name: "text", title: "Text (legacy)", type: "text" }),
        defineField({
          name: "textRich",
          title: "Text (rich)",
          type: portableTextWithHighlight.type,
          of: portableTextWithHighlight.of,
        }),

        defineField({ name: "primaryLabel", title: "Primary button label", type: "string" }),
        defineField({ name: "primaryHref", title: "Primary button href", type: "string" }),
        defineField({ name: "secondaryLabel", title: "Secondary button label", type: "string" }),
        defineField({ name: "secondaryHref", title: "Secondary button href", type: "string" }),
      ],
    }),
  ],
});
