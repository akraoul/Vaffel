# VAFFEL Café - Interactive Menu

A modern, responsive web application for the VAFFEL café menu, built with React and Tailwind CSS.

## Features

- **Interactive Navigation**: Sticky tabs for filtering menu categories (ВАФЛИ, СУПЫ, НАПИТКИ)
- **Multi-language Support**: Russian, French, and English language options
- **Currency Conversion**: Support for BYN, RUB, and USD currencies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, warm design with custom color palette and typography
- **SEO Optimized**: Semantic HTML structure with proper meta tags

## Menu Structure

### ВАФЛИ (Waffles)
- **КЛАССИЧЕСКОЕ ТЕСТО** (Classic Dough)
  - ДЖОКЕР, ШТРУДЕЛЬ, СНИКЕРС
- **ШПИНАТНОЕ ТЕСТО** (Spinach Dough)
  - ЛЕГЕНДА НОРВЕГИИ, ЦЕЗАРЬ, ГРИК
- **СЫРНОЕ ТЕСТО** (Cheese Dough)
  - ДЖОННИ ПЕППЕРОНИ, ЧИКЕН ЧИЗ, ГАВАЙСКАЯ
- **ТОМАТНОЕ ТЕСТО** (Tomato Dough)
  - ЧИКЕН ПРАЙМ, МОЛЧАЛИВЫЙ БИФ, ВВQ

### СУПЫ (Soups)
- КУРИНЫЙ БУЛЬОН
- ТЫКВЕННЫЙ СУП

### НАПИТКИ (Drinks)
- **КОФЕ** (Coffee)
  - АМЕРИКАНО, КАПУЧИНО, ЛАТТЕ КЛАССИЧЕСКИЙ, ТЫКВЕННЫЙ ЛАТТЕ
- **ЧАЙ И НЕ ЧАЙ** (Tea and Not Tea)
  - ОЛД МАНИ, СМОРОДИНА ДРАЙВ, ЧАЙ В АССОРТИМЕНТЕ, ЧАЙ С ЛИМОНОМ И КОРИЦЕЙ
- **АВТОРСКИЕ НАПИТКИ** (Author's Drinks)
  - АБРИКОСОВЫЙ ПОПКОРН, ГРЕЙП, ВАНИЛЬНОЕ ЯБЛОКО, МЯТНАЯ ЕЖЕВИКА

## Design System

### Color Palette
- **Brun profond** (#2C1A0D): Main text color
- **Beige crème** (#F8F0E3): Background color
- **Terracotta doux** (#C97C5D): Titles and accents
- **Vert sauge** (#A7C4A0): Subcategories and prices
- **Gris clair** (#F0F0F0): Card hover background

### Typography
- **Playfair Display**: Elegant serif font for titles
- **Montserrat**: Clean sans-serif font for body text

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd vaffel-menu
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Technologies Used

- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation tool
- **Autoprefixer**: CSS vendor prefixing

## Project Structure

```
vaffel-menu/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── WafflesMenu.jsx
│   │   ├── SoupsMenu.jsx
│   │   ├── DrinksMenu.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Contact Information

**VAFFEL Café**
- Address: Минск, ТЦ GALLERIA
- Phone: +375 29 000 00 00
- Hours: Открыты каждый день с 9:00 до 22:00

## License

MIT License - see LICENSE file for details.
