# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TestiWall — SaaS de collecte et affichage de témoignages clients (alternative gratuite à Testimonial.to).
Stack : Next.js 16 (App Router), Supabase (Auth + Postgres + RLS), Tailwind CSS 4, déployé sur Vercel.
URL prod : https://testiwall-kappa.vercel.app
Scope MVP figé : auth, espaces de collecte, formulaire public avec vérification email, dashboard, widget embed iframe.

## Commands

```bash
# Install (TOUJOURS pnpm en mode hoisted sur Windows, npm échoue avec ENOTEMPTY)
pnpm install --config.node-linker=hoisted

# Si erreur "Ignored build scripts" :
pnpm approve-builds

# Dev server (http://localhost:3000)
pnpm dev

# Build
pnpm build

# Lint
pnpm lint
```

## Architecture

Next.js App Router — pas de `src/` directory, tout à la racine.

**Routes (app/):**
- `/` — landing page (hero 3D Spline lazy-loaded + CTA + section "comment ça marche")
- `/login`, `/signup` — auth pages
- `/dashboard` — liste des espaces (protégé par middleware)
- `/dashboard/[id]` — gestion des témoignages d'un espace (stats, liens, embed, liste)
- `/collect/[slug]` — formulaire public de soumission (avec honeypot + vérification email)
- `/embed/[slug]` — widget iframe pour afficher les témoignages approuvés
- `/api/testimonials/submit` — API route : validation, honeypot, unicité email, envoi email de vérification via Resend
- `/api/testimonials/verify` — API route : vérifie le token email, passe le témoignage de `unverified` à `pending`

**Components:**
- `components/ui/` — composants shadcn (card, spotlight, splite)
- `components/LazySplineHero.tsx` — wrapper client pour le dynamic import SSR:false du hero 3D
- `components/SplineHero.tsx` — hero 3D de la landing page
- `components/CollectForm.tsx` — formulaire de collecte (appelle `/api/testimonials/submit`, inclut honeypot)
- `components/TestimonialManager.tsx` — gestion/filtrage/approbation des témoignages (badge "vérifié")
- `components/EmbedInstructions.tsx` — onglets d'instructions embed + lien vidéo YouTube
- `components/CopyButton.tsx` — bouton copier dans le presse-papier
- `components/CreateSpaceForm.tsx` — formulaire création d'espace
- `components/SpaceCard.tsx` — carte d'un espace dans le dashboard
- `components/LogoutButton.tsx` — bouton déconnexion

**Lib:**
- `lib/supabase-server.ts` — client Supabase côté serveur (cookies via `next/headers`)
- `lib/supabase-client.ts` — client Supabase côté browser (`createBrowserClient`)
- `lib/types.ts` — interfaces TypeScript (Profile, Space, Testimonial)
- `lib/utils.ts` — helper `cn()` (clsx + tailwind-merge) pour shadcn

**Auth flow:**
- `middleware.ts` intercepte `/dashboard/:path*` → redirige vers `/login` si pas de user
- Le middleware recrée un client Supabase à chaque requête pour rafraîchir les cookies de session

**Sécurité témoignages (3 couches) :**
1. Honeypot — champ invisible `website` dans le formulaire, si rempli → silently drop
2. Unicité email — index unique `(space_id, author_email) WHERE status != 'unverified'`
3. Vérification email — soumission → status `unverified` → email Resend avec token → clic → status `pending`

**Database (Supabase Postgres):**
- 3 tables : `profiles`, `spaces`, `testimonials`
- `testimonials` a les colonnes `email_verified`, `verification_token`, status check inclut `unverified`
- RLS activé partout. Trigger auto-création profil au signup.
- Les API routes utilisent `SUPABASE_SERVICE_ROLE_KEY` (bypass RLS) via `getSupabase()` instancié à l'exécution (pas au niveau module — sinon erreur au build)
- Schema complet dans `supabase-schema.sql` (à coller dans le SQL Editor Supabase)

## Performance

- Hero 3D Spline chargé via `next/dynamic` SSR:false + `<link rel="preload">` du .splinecode dans layout
- `optimizePackageImports: ["framer-motion"]` dans next.config.ts
- Vidéo YouTube dans EmbedInstructions chargée en `loading="lazy"`

## Design system

- Couleur d'accent : indigo (`--accent: #6366f1`) définie dans `globals.css`
- Variables CSS custom : `--accent`, `--accent-light`, `--accent-dark`
- Logo : "Testi" en couleur accent + "Wall" en noir
- Composants UI avec coins arrondis (rounded-xl/2xl), ombres colorées, hover effects
- Animations : `animate-fade-in`, `animate-scale-in` (définis dans globals.css)
- Fond des pages : gradient subtil `from-gray-50 to-indigo-50/20`
- Navbar sticky semi-transparente avec backdrop-blur

## Dependencies clés (au-delà de Next/React/Supabase)

- `@splinetool/react-spline` — scènes 3D interactives (hero landing)
- `framer-motion` — animations (Spotlight)
- `clsx` + `tailwind-merge` — utilitaire `cn()` pour classes conditionnelles
- `tailwindcss` v4

## Environment Variables

Fichier `.env.local` (jamais commit) :
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000  (en prod: https://testiwall-kappa.vercel.app)
```

## Conventions

- Tout composant avec état/events doit avoir `'use client'` en première ligne
- Toujours fournir des fichiers complets (pas de diffs/snippets partiels)
- Interface en français (labels, boutons, messages)
- Si erreurs d'hydratation liées à la locale Windows FR : ajouter `suppressHydrationWarning` sur `<html>` et `<body>`
- Ne pas ajouter de features hors scope MVP (pas de vidéo, multi-langue, Zapier, analytics avancés, teams)
- API routes : toujours instancier le client Supabase dans une fonction `getSupabase()`, pas au niveau module (sinon le build échoue car les env vars ne sont pas dispo au build time)
