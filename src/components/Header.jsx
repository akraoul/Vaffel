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
    <header className="sticky top-0 z-50 neon-border relative dark-mode-transition" style={{background: 'linear-gradient(to right, var(--dark-color), var(--dark-color), var(--dark-color))', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}>
      <div className="container mx-auto px-4">
        {/* Logo and Slogan */}
        <div className="text-center py-2">
          <h1 className="text-4xl font-bold mb-1 floating-element" style={{color: 'var(--primary-color)'}}>
            VAFFEL
          </h1>
          <p className="text-xs font-medium italic" style={{color: 'var(--text-light)'}}>
            {translations.header.slogan}
          </p>
          <div className="mt-2">
            <a 
              href="https://eda.yandex.ru/restaurant/vaffel_opajk?utm_campaign=superapp_taxi_web&utm_medium=referral&utm_source=rst_shared_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover-scale"
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white'
              }}
              aria-label="Commander sur Yandex"
            >
              <span className="mr-1">🛵</span>
              {translations.header.orderButton}
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-1 pb-1">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-md font-medium transition-all duration-300 tab-button hover-scale stagger-${index + 1} ${
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
        <div className="flex justify-between items-center pb-1">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 switcher-button ${
                    language === lang 
                      ? 'glow-effect' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: language === lang ? 'var(--primary-color)' : 'var(--secondary-color)',
                    color: language === lang ? 'white' : 'var(--text-dark)'
                  }}
                >
                  <span className="flex items-center gap-1">
                    {lang === 'RU' && <span className="text-sm">🇷🇺</span>}
                    {lang === 'ZH' && <span className="text-sm">🇨🇳</span>}
                    {lang === 'EN' && <span className="text-sm">🇺🇸</span>}
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-2 py-1 rounded text-xs font-medium transition-all duration-300 switcher-button hover-scale animate-wiggle"
            style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-dark)'
            }}
            aria-label="Toggle dark mode"
          >
            <span className="text-sm animate-heartbeat">
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
