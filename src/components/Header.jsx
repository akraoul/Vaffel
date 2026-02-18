import React, { useState, useEffect } from 'react';

const Header = ({ activeTab, setActiveTab, language, setLanguage, translations }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class to body
    if (savedDarkMode) {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    // Toggle dark mode class
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const tabs = [
    { id: 'waffles', label: translations.navigation.waffles, icon: '🧇' },
    { id: 'soups', label: translations.navigation.soups, icon: '🍲' },
    { id: 'drinks', label: translations.navigation.drinks, icon: '🥤' }
  ];

  const languages = ['RU', 'ZH', 'EN'];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 neon-border relative dark-mode-transition">
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

        {/* Navigation */}
        <div className="flex justify-center space-x-1 pb-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 tab-button hover-scale stagger-${index + 1} ${
                activeTab === tab.id 
                  ? 'tab-active' 
                  : 'tab-inactive'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Switchers */}
        <div className="flex justify-between items-center pb-2">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 light-contour switcher-button ${
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

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded text-sm font-medium transition-all duration-300 light-contour switcher-button bg-gray-700 text-gray-300 hover:bg-gray-600 hover-scale animate-wiggle"
            aria-label="Toggle dark mode"
          >
            <span className="text-lg animate-heartbeat">
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
