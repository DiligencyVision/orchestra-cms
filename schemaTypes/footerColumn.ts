// orchestra-cms/schemaTypes/footerColumn.ts
import { defineField, defineType } from "sanity";

/**
 * Colonne du footer (hors colonne "Navigation" qui est déjà un cas spécifique).
 * Exemple : "Intégrations possibles", "Principes"
 */
export const footerColumn = defineType({
  name: "footerColumn",
  title: "Colonne footer",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "footerItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),

    /**
     * Texte optionnel sous la liste (ex : "Exemples présentés à titre démonstratif")
     */
    defineField({
      name: "note",
      title: "Note (optionnel)",
      type: "string",
    }),
  ],
});
