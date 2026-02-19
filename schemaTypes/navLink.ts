// orchestra-cms/schemaTypes/navLink.ts

import { defineField, defineType } from "sanity";

/**
 * Type objet réutilisable pour tous les liens du site.
 *
 * Objectif :
 * - Servir pour la navigation du Header
 * - Servir pour les liens du Footer
 * - Éviter toute duplication de structure
 *
 * Ce type est volontairement générique et scalable.
 */
export const navLink = defineType({
  name: "navLink",
  title: "Lien de navigation",
  type: "object",

  fields: [
    /**
     * Texte affiché à l’écran
     * Ex : "Le Cabinet"
     */
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    /**
     * URL du lien
     * Ex :
     * - /cabinet (interne)
     * - https://linkedin.com/... (externe)
     */
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Ex: /cabinet ou https://…",
      validation: (Rule) => Rule.required(),
    }),

    /**
     * Indique si ce lien est un bouton CTA
     * Permettra côté Next.js d'appliquer un style spécifique
     */
    defineField({
      name: "isCta",
      title: "Lien de type CTA (bouton)",
      type: "boolean",
      initialValue: false,
    }),

    /**
     * Ouvrir dans un nouvel onglet (liens externes par exemple)
     */
    defineField({
      name: "openInNewTab",
      title: "Ouvrir dans un nouvel onglet",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
