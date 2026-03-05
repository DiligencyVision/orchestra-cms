# ORCHESTRA — CMS (Sanity v5)

Studio Sanity v5 du projet ORCHESTRA — source de vérité pour tous les contenus éditoriaux du site vitrine CMS-first.

> Copie personnelle conservée dans le cadre du BTS SIO SLAM.  
> Repo officiel : github.com/DiligencyVision/orchestra-cms

---

## 🎯 Rôle

Ce repo contient le Studio Sanity — interface d'administration des contenus du site ORCHESTRA.
Toutes les pages du site sont pilotées depuis ce CMS. Le frontend Next.js consomme les contenus via l'API Sanity (requêtes GROQ).

---

## 🗂️ Architecture des contenus

### Type `page` (type unique)
Toutes les pages du site sont des instances de ce type :
- `title` · `slug` · `seoTitle` · `seoDescription`
- `hero` : titre rich text, sous-titre, fond (solid / image / vidéo)
- `sections` : blocs de contenu modulaires
- `finalCta` : appel à l'action final commun

### Pages gérées
| Page | Slug |
|------|------|
| Accueil | `/` |
| Le Cabinet | `/cabinet` |
| Méthode ORCHESTRA | `/methode` |
| Fonctionnement | `/fonctionnement` |
| Expertises | `/expertises` |
| FAQ | `/faq` |
| Contact | `/contact` |

### Type `globalSettings` (singleton)
Données partagées entre toutes les pages :
- Identité visuelle (brand, couleur, font, logo)
- Navigation Header (liens, CTA)
- Contenu Footer (colonnes, copyright)
- SEO global (metaTitle, metaDescription, ogImage)

---

## ⚙️ Stack

- Sanity v5 · TypeScript
- Studio déployé sur orchestra-cms.sanity.studio

---

## 🔗 Lien avec le frontend

Ce repo est indépendant du frontend Next.js (`orchestra-e6`).
Le frontend consomme les contenus via l'API Sanity avec des requêtes GROQ centralisées dans `lib/sanity/queries.ts`.

Principe cardinal : **le CMS est la source de vérité — le frontend est le moteur de rendu.**

---

## 🚀 Lancer en local
```bash
npm install
npm run dev
```
→ http://localhost:3333

---

## 🧠 Retours d'expérience clés

- Toujours aligner schéma Sanity → requête GROQ → typage TypeScript → composant React
- Redémarrer le Studio après toute modification de schéma
- Ne jamais modifier plusieurs couches simultanément
- Tester le rendu si un champ CMS est vide (prévoir des fallbacks)

---

## 👤 Auteur

Walter Jean Charles — Stage Diligency Vision — 2026
