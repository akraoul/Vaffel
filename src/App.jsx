import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { translations } from './constants/translations';

// Lazy load components for better performance
const WafflesMenu = lazy(() => import('./components/features/WafflesMenu'));
const SoupsMenu = lazy(() => import('./components/features/SoupsMenu'));
const DrinksMenu = lazy(() => import('./components/features/DrinksMenu'));
const Comments = lazy(() => import('./components/features/Comments'));
const AdminPanel = lazy(() => import('./components/features/AdminPanel'));

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
        return (
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <WafflesMenu translations={currentTranslation.waffles} />
          </Suspense>
        );
      case 'soups':
        return (
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <SoupsMenu translations={currentTranslation.soups} />
          </Suspense>
        );
      case 'drinks':
        return (
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <DrinksMenu translations={currentTranslation.drinks} />
          </Suspense>
        );
      case 'comments':
        return (
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <Comments translations={currentTranslation.comments} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <WafflesMenu translations={currentTranslation.waffles} />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {isAdminView ? (
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <Suspense fallback={<div className="text-center py-8">Chargement...</div>}>
            <AdminPanel translations={currentTranslation.comments} />
          </Suspense>
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
