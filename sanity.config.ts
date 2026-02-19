// orchestra-cms/sanity.config.ts

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

/**
 * Configuration principale du Studio Sanity
 *
 * - Global Settings est configuré en singleton
 * - Impossible de créer plusieurs documents "Global Settings"
 * - Structure propre et contrôlée
 */

export default defineConfig({
  name: "default",
  title: "ORCHESTRA",

  projectId: "48hcot9x",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ================================
            // Pages (liste normale)
            // ================================
            S.documentTypeListItem("page").title("Pages"),

            // ================================
            // Global Settings (singleton)
            // ================================
            S.listItem()
              .title("Global Settings")
              .id("globalSettings")
              .child(
                S.document()
                  .schemaType("globalSettings")
                  .documentId("19697895-e0fe-498f-9355-2f4a635f0d50")
              ),
          ]),
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
