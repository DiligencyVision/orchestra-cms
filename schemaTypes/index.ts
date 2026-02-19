// orchestra-cms/schemaTypes/index.ts

import { page } from "./page";
import { navLink } from "./navLink";
import { footerItem } from "./footerItem";
import { footerColumn } from "./footerColumn";
import { globalSettings } from "./globalSettings";

/**
 * Centralisation de tous les schémas du CMS.
 *
 * Chaque nouveau type doit être ajouté ici.
 * L’ordre n’a pas d’impact fonctionnel,
 * mais on garde une logique claire :
 * - Types de base
 * - Types réutilisables
 * - Document global
 */
export const schemaTypes = [
  page,           // Pages dynamiques (déjà en place)
  navLink,        // Type réutilisable pour les liens (header + footer)
  footerItem,     // Item individuel d’une colonne footer
  footerColumn,   // Colonne complète du footer
  globalSettings, // Document singleton pour Header & Footer
];
