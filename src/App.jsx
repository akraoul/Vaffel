import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { WafflesMenu } from './components/features/WafflesMenu';
import { SoupsMenu } from './components/features/SoupsMenu';
import { DrinksMenu } from './components/features/DrinksMenu';
import { Comments } from './components/features/Comments';
import { AdminPanel } from './components/features/AdminPanel';
import { Footer } from './components/layout/Footer';
import { translations } from './constants/translations';

function App() {
  const [activeTab, setActiveTab] = useState('waffles');
  const [language, setLanguage] = useState('RU');
  const [isAdminView, setIsAdminView] = useState(false);

  const currentTranslation = translations[language];

  useEffect(() => {
    // Check if URL contains /admin
    if (window.location.pathname === '/admin') {
      setIsAdminView(true);
    } else {
      setIsAdminView(false);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'waffles':
        return <WafflesMenu translations={currentTranslation.waffles} />;
      case 'soups':
        return <SoupsMenu translations={currentTranslation.soups} />;
      case 'drinks':
        return <DrinksMenu translations={currentTranslation.drinks} />;
      case 'comments':
        return <Comments translations={currentTranslation.comments} />;
      default:
        return <WafflesMenu translations={currentTranslation.waffles} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background patterns */}
      <div className="fixed inset-0 dots-pattern pointer-events-none"></div>
      <div className="fixed inset-0 triangle-pattern pointer-events-none"></div>
      
      {isAdminView ? (
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <AdminPanel translations={currentTranslation.comments} />
        </main>
      ) : (
        <>
          <Header 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            language={language}
            setLanguage={setLanguage}
            translations={currentTranslation}
          />
          
          <main className="flex-grow container mx-auto px-3 py-6 relative z-10">
            {renderContent()}
          </main>
          
          <Footer translations={currentTranslation.footer} />
        </>
      )}
    </div>
  );
}

export default App;
