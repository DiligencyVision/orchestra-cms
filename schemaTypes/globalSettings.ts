// orchestra-cms/schemaTypes/globalSettings.ts

import { defineField, defineType } from "sanity";

/**
 * Document global : source de vérité unique pour :
 * - Identité visuelle (couleur, police, logo)
 * - Header (marque + navigation + tagline mobile)
 * - Footer (description + navigation + colonnes dynamiques + légal)
 * - SEO global (titre, description, og:image)
 *
 * Objectif :
 * - Centraliser 100% du contenu global dans Sanity
 * - Permettre la réplication sans modification de code
 * - Un non-tech peut configurer un nouveau client entièrement depuis Studio
 *
 * CONTRAT FRONT — brandFont
 * Les valeurs de brandFont sont contractuelles avec layout.tsx.
 * La table de correspondance dans layout.tsx doit rester synchronisée :
 *   "inter"    → Inter    (next/font/google)
 *   "poppins"  → Poppins  (next/font/google)
 *   "manrope"  → Manrope  (next/font/google)
 *   "dm-sans"  → DM_Sans  (next/font/google)
 *   "sora"     → Sora     (next/font/google)
 * Si une font est ajoutée ici, elle DOIT être ajoutée dans le fontMap de layout.tsx.
 */
export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",

  fields: [
    // =========================================================
    // IDENTITÉ VISUELLE
    // =========================================================
    defineField({
      name: "brand",
      title: "Identité visuelle",
      type: "object",
      description:
        "Couleur principale, police et logo du site. Modifiable sans toucher au code.",
      fields: [
        /**
         * Couleur principale (brand color)
         * Injectée comme variable CSS --color-brand dans layout.tsx
         * Utilisée pour les highlights RichText, boutons primaires, accents.
         * Format attendu : hex 6 caractères (#rrggbb)
         */
        defineField({
          name: "brandColor",
          title: "Couleur principale",
          type: "string",
          description:
            "Couleur d'accentuation du site. Format hex uniquement (ex : #38bdf8).",
          initialValue: "#38bdf8",
          validation: (Rule) =>
            Rule.required()
              .regex(/^#[0-9A-Fa-f]{6}$/, {
                name: "hex color",
                invert: false,
              })
              .error("Format attendu : #rrggbb (ex: #38bdf8)"),
        }),

        /**
         * Police principale
         * CONTRAT : valeurs synchronisées avec le fontMap de layout.tsx.
         * Ne pas ajouter une valeur ici sans l'ajouter dans layout.tsx.
         * Injectée comme variable CSS --font-brand dans layout.tsx.
         */
        defineField({
          name: "brandFont",
          title: "Police principale",
          type: "string",
          description:
            "Police utilisée pour les titres et le corps de texte. Chaque option est préchargée par le front.",
          initialValue: "inter",
          options: {
            list: [
              { title: "Inter (défaut — neutre, très lisible)", value: "inter" },
              { title: "Poppins (géométrique, moderne)", value: "poppins" },
              { title: "Manrope (élégant, tech)", value: "manrope" },
              { title: "DM Sans (propre, professionnel)", value: "dm-sans" },
              { title: "Sora (futuriste, cabinet IA)", value: "sora" },
            ],
            layout: "radio",
          },
          validation: (Rule) => Rule.required(),
        }),

        /**
         * Logo principal (fond sombre)
         * Affiché dans le header à la place du brandLabel texte.
         * Si absent : fallback automatique sur header.brandLabel.
         * Format : PNG ou WebP avec fond transparent.
         * SVG exclu volontairement — pipeline next/image + CDN.
         */
        defineField({
          name: "brandLogo",
          title: "Logo",
          type: "image",
          description:
            "Logo affiché dans le header. Format : PNG ou WebP, fond transparent. Si absent, le nom de la marque est affiché en texte.",
          options: {
            accept: "image/png,image/webp",
            hotspot: false,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              description:
                "Décrit le logo pour l'accessibilité (ex : Logo ORCHESTRA).",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "height",
              title: "Hauteur affichée (px)",
              type: "number",
              description:
                "Hauteur du logo dans le header. Min : 16px, Max : 80px. Défaut : 32px.",
              initialValue: 32,
              validation: (Rule) => Rule.required().min(16).max(80),
            }),
          ],
        }),
      ],
    }),

    // =========================================================
    // SEO GLOBAL
    // =========================================================
    defineField({
      name: "seo",
      title: "SEO global",
      type: "object",
      description:
        "Métadonnées par défaut utilisées sur toutes les pages sans SEO spécifique.",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Titre par défaut",
          type: "string",
          description: "Affiché dans l'onglet navigateur et sur Google.",
          initialValue: "ORCHESTRA — Conseil augmenté par l'IA",
          validation: (Rule) =>
            Rule.required()
              .max(60)
              .warning("Idéalement moins de 60 caractères pour Google"),
        }),

        defineField({
          name: "metaDescription",
          title: "Description par défaut",
          type: "text",
          rows: 3,
          description: "Affiché dans les résultats Google sous le titre.",
          initialValue:
            "Cabinet de conseil en stratégie et organisation, fondé sur une collaboration structurée entre expertise humaine et intelligence artificielle.",
          validation: (Rule) =>
            Rule.required()
              .max(160)
              .warning("Idéalement moins de 160 caractères pour Google"),
        }),

        defineField({
          name: "ogImage",
          title: "Image de partage (og:image)",
          type: "image",
          description:
            "Image affichée lors du partage sur LinkedIn, Twitter, etc. Format recommandé : 1200×630px.",
          options: {
            accept: "image/png,image/jpeg,image/webp",
            hotspot: true,
          },
        }),
      ],
    }),

    // =========================================================
    // HEADER
    // =========================================================
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        /**
         * Nom affiché dans le header
         * Fallback automatique si aucun logo uploadé dans brand.brandLogo
         */
        defineField({
          name: "brandLabel",
          title: "Nom / Marque",
          type: "string",
          description:
            "Affiché dans le header si aucun logo n'est uploadé. Ex : ORCHESTRA",
          initialValue: "ORCHESTRA",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "navItems",
          title: "Liens de navigation",
          type: "array",
          of: [{ type: "navLink" }],
          validation: (Rule) => Rule.required().min(1),
        }),

        defineField({
          name: "mobileTagline",
          title: "Phrase sous le menu mobile",
          type: "string",
          initialValue:
            "L'IA soutient l'analyse, l'humain pilote la décision.",
        }),
      ],
    }),

    // =========================================================
    // FOOTER
    // =========================================================
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "brandDescription",
          title: "Description marque",
          type: "text",
          rows: 4,
          initialValue:
            "Cabinet de conseil en stratégie et organisation, fondé sur une collaboration structurée entre expertise humaine et intelligence artificielle.",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "navTitle",
          title: "Titre colonne navigation",
          type: "string",
          initialValue: "Navigation",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "navItems",
          title: "Liens footer (Navigation)",
          type: "array",
          of: [{ type: "navLink" }],
          validation: (Rule) => Rule.required().min(1),
        }),

        /**
         * Colonnes additionnelles — optionnelles (0 à 6)
         * ✅ CORRECTION architecte point C :
         * Pas de required().min(1) — certains clients n'auront pas ces colonnes.
         */
        defineField({
          name: "columns",
          title: "Colonnes additionnelles",
          type: "array",
          of: [{ type: "footerColumn" }],
          validation: (Rule) => Rule.max(6),
        }),

        defineField({
          name: "copyright",
          title: "Copyright",
          type: "string",
          initialValue: "© 2026 ORCHESTRA — Site vitrine démonstrateur",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "legalText",
          title: "Texte légal",
          type: "string",
          initialValue:
            "Mentions légales · Politique de confidentialité",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});