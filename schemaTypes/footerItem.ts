// orchestra-cms/schemaTypes/footerItem.ts
import { defineField, defineType } from "sanity";

/**
 * Un item de liste dans une colonne du footer.
 * Exemple : "LinkedIn (cabinet / dirigeant)" avec une icône.
 */
export const footerItem = defineType({
  name: "footerItem",
  title: "Item de footer",
  type: "object",
  fields: [
    /**
     * Nom d’icône (clé) : on mappe ensuite vers lucide côté Next.js
     * Ex : "linkedin", "building2", "fileText", "mail", "listChecks", "userCheck", "shieldCheck", "target"
     */
    defineField({
      name: "iconKey",
      title: "Icône (clé)",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "Building2", value: "building2" },
          { title: "FileText", value: "fileText" },
          { title: "Mail", value: "mail" },
          { title: "ListChecks", value: "listChecks" },
          { title: "UserCheck", value: "userCheck" },
          { title: "ShieldCheck", value: "shieldCheck" },
          { title: "Target", value: "target" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    /**
     * Texte affiché
     * Ex : "LinkedIn (cabinet / dirigeant)"
     */
    defineField({
      name: "text",
      title: "Texte",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
