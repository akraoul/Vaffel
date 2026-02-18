# VAFFEL Menu

Menu interactif multilingue pour le café VAFFEL avec support pour 3 langues (Russe, Chinois, Anglais).

## 🚀 Fonctionnalités
- **Multilingue** : RU, ZH, EN avec drapeaux
- **Multi-devise** : BYN, RUB, USD
- **Design moderne** : Header dégradé foncé, footer assorti
- **Images circulaires** : Cadres ronds pour les plats
- **Responsive** : Adapté mobile et desktop
- **Animations** : Effets de flottement et survol

## 🛠️ Technologies
- **React 18** avec hooks
- **Vite** pour le build
- **Tailwind CSS** pour le style
- **PostCSS** pour le traitement CSS

## 📦 Déploiement

### Build
```bash
npm run build
```

### Vercel
1. Connecter votre repository GitHub à Vercel
2. Vercel détectera automatiquement le projet Vite
3. Le build utilisera `npm run build`
4. Le dossier `dist` sera déployé

### Configuration
- **Fichier de configuration** : `vercel.json`
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Install Command** : `npm install`

## 📁 Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── WafflesMenu.jsx
│   ├── SoupsMenu.jsx
│   ├── DrinksMenu.jsx
│   └── Footer.jsx
├── translations.js
├── App.jsx
└── main.jsx

public/
├── images/ (à ajouter)
└── README.md (nomenclature des images)
```

## 🌐 Langues supportées
- **RU** : Русский (défaut)
- **ZH** : 中文
- **EN** : English

## 📝 Notes
- Les images utilisent les noms français indépendamment de la langue
- Le design utilise une palette de couleurs moderne avec orange (#ff4800)
- Les icônes remplacent les textes dans le footer
- Le header est compact avec dégradé foncé
