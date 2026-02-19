// orchestra-cms/schemaTypes/globalSettings.ts

import { defineField, defineType } from "sanity";

/**
 * Document global : source de vérité unique pour :
 * - Header (marque + navigation + tagline mobile)
 * - Footer (description + navigation + colonnes dynamiques + légal)
 *
 * Objectif :
 * - Centraliser 100% du contenu global dans Sanity
 * - Supprimer tout texte codé en dur côté Next.js
 * - Préparer une architecture scalable et réplicable
 */
export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",

  fields: [
    // =========================================================
    // HEADER
    // =========================================================
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        /**
         * Nom affiché dans le header (marque)
         * Ex : ORCHESTRA
         */
        defineField({
          name: "brandLabel",
          title: "Nom / Marque",
          type: "string",
          initialValue: "ORCHESTRA",
          validation: (Rule) => Rule.required(),
        }),

        /**
         * Navigation principale (desktop + mobile)
         * Chaque item utilise le type réutilisable "navLink"
         */
        defineField({
          name: "navItems",
          title: "Liens de navigation",
          type: "array",
          of: [{ type: "navLink" }],
          validation: (Rule) => Rule.required().min(1),
        }),

        /**
         * Phrase affichée en bas du menu mobile
         */
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
        /**
         * Description affichée sous la marque
         */
        defineField({
          name: "brandDescription",
          title: "Description marque",
          type: "text",
          rows: 4,
          initialValue:
            "Cabinet de conseil en stratégie et organisation, fondé sur une collaboration structurée entre expertise humaine et intelligence artificielle.",
          validation: (Rule) => Rule.required(),
        }),

        /**
         * Titre de la colonne navigation
         */
        defineField({
          name: "navTitle",
          title: "Titre colonne navigation",
          type: "string",
          initialValue: "Navigation",
          validation: (Rule) => Rule.required(),
        }),

        /**
         * Liens footer (liste dédiée, indépendante du header)
         */
        defineField({
          name: "navItems",
          title: "Liens footer (Navigation)",
          type: "array",
          of: [{ type: "navLink" }],
          validation: (Rule) => Rule.required().min(1),
        }),

        /**
         * Colonnes dynamiques supplémentaires
         * Ex :
         * - Intégrations possibles
         * - Principes
         *
         * Chaque colonne utilise le type "footerColumn"
         */
        defineField({
          name: "columns",
          title: "Colonnes additionnelles",
          type: "array",
          of: [{ type: "footerColumn" }],
          validation: (Rule) => Rule.required().min(1),
        }),

        /**
         * Copyright bas de page
         */
        defineField({
          name: "copyright",
          title: "Copyright",
          type: "string",
          initialValue:
            "© 2026 ORCHESTRA — Site vitrine démonstrateur",
          validation: (Rule) => Rule.required(),
        }),

        /**
         * Ligne légale (simple string pour l'instant)
         */
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
