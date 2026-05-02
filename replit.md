# ProformaAfrica

Application web simple permettant de générer rapidement des factures, devis et proformas en PDF, sans backend, sans authentification, sans base de données.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **PDF**: `@react-pdf/renderer` + `file-saver`
- **Icônes**: `@phosphor-icons/react`
- **Polices**: Unbounded (titres) + Plus Jakarta Sans (corps) via `next/font/google`

## Structure

```
src/
├── app/
│   ├── layout.tsx        # Layout racine avec polices Google
│   ├── page.tsx          # Page principale (formulaire + aperçu)
│   ├── icon.svg          # Favicon
│   └── globals.css       # Styles globaux + variables CSS
├── components/
│   ├── Formulaire.tsx    # Formulaire complet (saisie utilisateur)
│   ├── Apercu.tsx        # Aperçu live du document
│   └── FacturePDF.tsx    # Document PDF + fonction generatePDF
├── lib/
│   └── utils.ts          # formatMontant, calculerTotaux, genererNumero...
└── types.ts              # DonneesFacture, LigneService, etc.
```

## Fonctionnalités

- Formulaire 5 sections : entreprise, document, client, services, note
- Upload de logo en base64 (intégré au PDF)
- Aperçu temps réel synchronisé
- Calcul automatique HT, TVA et TTC par ligne et total
- 5 devises : XOF, XAF, MAD, EUR, USD
- 4 modes de paiement (Mobile Money révèle un champ supplémentaire)
- Génération PDF côté client via `@react-pdf/renderer`

## Configuration Replit

- Le serveur de dev tourne sur `0.0.0.0:5000` (`next dev -H 0.0.0.0 -p 5000`)
- Workflow `Start application` exécute `npm run dev`
- Déploiement `autoscale` configuré : `npm run build` puis `npm run start`

## Notes techniques

- Les valeurs initiales aléatoires (numéro, dates, IDs de lignes) sont injectées côté client via `useEffect` pour éviter les erreurs d'hydratation Next.js.
- `generatePDF` est importé dynamiquement (`await import('./FacturePDF')`) pour différer le chargement de `@react-pdf/renderer` jusqu'au clic utilisateur.
- Le bouton de téléchargement est désactivé tant que `nomEntreprise` ou `nomClient` est vide.
