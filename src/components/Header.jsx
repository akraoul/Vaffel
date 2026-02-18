import React from 'react';

const Header = ({ activeTab, setActiveTab, currency, setCurrency, language, setLanguage, translations }) => {
  const tabs = [
    { id: 'waffles', label: translations.navigation.waffles },
    { id: 'soups', label: translations.navigation.soups },
    { id: 'drinks', label: translations.navigation.drinks }
  ];

  const currencies = ['BYN', 'RUB', 'USD'];
  const languages = ['RU', 'ZH', 'EN'];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 neon-border relative">
      <div className="container mx-auto px-4">
        {/* Logo and Slogan */}
        <div className="text-center py-3">
          <h1 className="font-playfair text-5xl font-bold text-orange mb-2 floating-element">
            VAFFEL
          </h1>
          <p className="text-xs text-gray-100 font-medium italic">
            {translations.header.slogan}
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex justify-center space-x-1 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 light-contour ${
                activeTab === tab.id ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Language and Currency Switchers */}
        <div className="flex justify-center space-x-6 pb-2">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 light-contour ${
                    language === lang 
                      ? 'bg-orange text-white glow-effect' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {lang === 'RU' && <span className="text-base">🇷🇺</span>}
                    {lang === 'ZH' && <span className="text-base">🇨🇳</span>}
                    {lang === 'EN' && <span className="text-base">🇺🇸</span>}
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {currencies.map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 light-contour ${
                    currency === curr 
                      ? 'bg-orange text-white glow-effect' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {translations.currency[curr]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
