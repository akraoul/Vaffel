import React, { useState } from 'react';
import Header from './components/Header';
import WafflesMenu from './components/WafflesMenu';
import SoupsMenu from './components/SoupsMenu';
import DrinksMenu from './components/DrinksMenu';
import Footer from './components/Footer';
import { translations } from './translations.js';

function App() {
  const [activeTab, setActiveTab] = useState('waffles');
  const [language, setLanguage] = useState('RU');

  const currentTranslation = translations[language];

  const renderContent = () => {
    switch (activeTab) {
      case 'waffles':
        return <WafflesMenu translations={currentTranslation.waffles} />;
      case 'soups':
        return <SoupsMenu translations={currentTranslation.soups} />;
      case 'drinks':
        return <DrinksMenu translations={currentTranslation.drinks} />;
      default:
        return <WafflesMenu translations={currentTranslation.waffles} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background patterns */}
      <div className="fixed inset-0 dots-pattern pointer-events-none"></div>
      <div className="fixed inset-0 triangle-pattern pointer-events-none"></div>
      
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        translations={currentTranslation}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {renderContent()}
      </main>
      
      <Footer translations={currentTranslation.footer} />
    </div>
  );
}

export default App;
