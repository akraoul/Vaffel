import React, { useState } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

export const Header = ({ activeTab, setActiveTab, language, setLanguage, translations }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const tabs = [
    { id: 'waffles', label: translations.navigation.waffles },
    { id: 'soups', label: translations.navigation.soups },
    { id: 'drinks', label: translations.navigation.drinks },
    { id: 'comments', label: translations.comments.title }
  ];

  const languages = ['RU', 'ZH', 'EN'];

  return (
    <header className="sticky top-0 z-50 neon-border relative dark-mode-transition" style={{background: 'linear-gradient(to right, var(--header-bg), var(--header-bg), var(--header-bg))', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div className="container mx-auto px-3">
        {/* Logo and Slogan */}
        <div className="text-center py-1">
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
              <span className="mr-1"></span>
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
              className={`px-2 py-0.5 rounded-md font-medium transition-all duration-300 tab-button hover-scale stagger-${index + 1} ${
                activeTab === tab.id 
                  ? 'tab-active' 
                  : 'tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Switchers */}
        <div className="flex justify-between items-center pb-1">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="px-2 py-1 rounded text-xs font-medium transition-all duration-300 switcher-button hover-scale"
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--text-dark)'
              }}
              aria-label="Select language"
            >
              <span className="flex items-center gap-1">
                {language === 'RU' && <span className="text-sm">🇷🇺</span>}
                {language === 'ZH' && <span className="text-sm">🇨🇳</span>}
                {language === 'EN' && <span className="text-sm">🇺🇸</span>}
                {language}
                <span className="text-xs">▼</span>
              </span>
            </button>
            
            {languageDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 rounded-lg shadow-lg z-50" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--secondary-color)' }}>
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-xs font-medium transition-all duration-200 hover:bg-opacity-80"
                    style={{
                      backgroundColor: language === lang ? 'var(--primary-color)' : 'transparent',
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
            )}
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
              {isDarkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
