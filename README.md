# VAFFEL Café - Interactive Menu

A modern, responsive web application for the VAFFEL café menu, built with React and Tailwind CSS with a professional architecture.

## Features

- **Interactive Navigation**: Sticky tabs for filtering menu categories (ВАФЛИ, СУПЫ, НАПИТКИ)
- **Multi-language Support**: Russian, Chinese, French, and English language options
- **Currency Conversion**: Support for BYN, RUB, and USD currencies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, warm design with custom color palette and typography
- **Comment System**: Customer reviews with admin reply functionality
- **Dark Mode**: Theme switching capability
- **SEO Optimized**: Semantic HTML structure with proper meta tags

## Architecture

This project follows modern React best practices with a scalable folder structure:

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer)
│   ├── features/        # Feature-specific components
│   └── common/          # Reusable common components
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── context/             # React Context providers
├── utils/               # Utility functions
├── constants/           # Configuration constants
├── styles/              # Global styles
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## Key Features

### Menu Structure

#### ВАФЛИ (Waffles)
- **КЛАССИЧЕСКОЕ ТЕСТО** (Classic Dough)
  - КЛУБНИЧНЫЙ КУЛИ, ШОКОЛАД БАНАН
- **ШПИНАТНОЕ ТЕСТО** (Spinach Dough)
  - ЦЫПЛЕНОК 2 СЫРА, НОРВЕЖСКАЯ РЫБКА, ИТАЛЬЯНСКАЯ КЛАССИКА
- **СЫРНОЕ ТЕСТО** (Cheese Dough)
  - ГОВЯДИНА ПО-БУРГУНДСКИ, ГАВАЙИ, ЦЫПЛЕНОК МАНГО-КАРРИ

#### СУПЫ (Soups)
- ТЫКВЕННЫЙ СУП
- СУП ДНЯ
- МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ

#### НАПИТКИ (Drinks)
- **Hot Drinks**: АМЕРИКАНО, КАПУЧИНО, ЛАТТЕ КЛАССИЧЕСКИЙ, ФЛЭТ УАЙТ, СИРОПЫ, ЧАЙ
- **Cold Drinks**: МЯТА | ЕЖЕВИКА, ЛАВАНДА | ГРЕЙПФРУТ, ЛИЧИ | АНАНАС, МИНДАЛЬ | ВИШНЯ, ЭСПРЕССО ТОНИК, МАТЧА-ТОНИК

### Comment System
- Customer reviews with ratings (1-5 stars)
- Admin panel for managing comments
- Admin replies to customer reviews
- Accessible via `/admin` route

## Design System

### Color Palette
- **Orange** (#FF9400): Primary accent color, buttons, highlights
- **Light Gray** (#D4D4DC): Secondary color, backgrounds in light mode
- **Dark Gray** (#303030): Main text color, backgrounds in dark mode
- **White** (#FFFFFF): Card backgrounds, clean surfaces

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

### Backend Setup

The project includes a backend server for comment management:

```bash
cd server
npm install
npm start
```

The backend runs on `http://localhost:3001`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Technologies Used

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Custom hooks for state management
- **Context API**: Global state management

### Backend
- **Express**: Node.js web framework
- **SQLite**: Lightweight database for comment storage
- **CORS**: Cross-origin resource sharing

### Development Tools
- **PostCSS**: CSS transformation tool
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting

## Project Structure

```
vaffel-menu/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   └── features/       # Menu components, Comments, AdminPanel
│   ├── hooks/              # Custom hooks (useComments, useDarkMode)
│   ├── services/           # API service layer
│   ├── context/            # React Context providers
│   ├── constants/          # Configuration constants
│   ├── styles/             # Global CSS
│   ├── App.jsx             # Main application
│   └── main.jsx            # Entry point
├── server/                 # Backend server
│   ├── server.js           # Express server
│   ├── database.js         # SQLite database setup
│   └── package.json
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Admin Access

To access the admin panel:
1. Navigate to `http://localhost:5173/admin`
2. Enter admin name and password
3. Default password: `vaffel2026` (configurable in `src/constants/config.js`)

## Contact Information

**VAFFEL Café**
- Address: Минск, ТЦ GALLERIA
- Phone: +375 29 798 45 02
- Hours: Ежедневно (Every day)

## License

MIT License - see LICENSE file for details.
