import React, { useState, useEffect } from 'react';

export const SoupsMenu = ({ translations }) => {
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});

  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem('soupLikes');
      const savedUserLikes = localStorage.getItem('userSoupLikes');
      if (savedLikes) setLikes(JSON.parse(savedLikes));
      if (savedUserLikes) setUserLikes(JSON.parse(savedUserLikes));
    } catch (error) {
      console.error('Error loading likes from localStorage:', error);
    }
  }, []);

  const handleLike = (itemName) => {
    const newLikes = { ...likes, [itemName]: (likes[itemName] || 0) + 1 };
    const newUserLikes = { ...userLikes, [itemName]: true };
    setLikes(newLikes);
    setUserLikes(newUserLikes);
    try {
      localStorage.setItem('soupLikes', JSON.stringify(newLikes));
      localStorage.setItem('userSoupLikes', JSON.stringify(newUserLikes));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  };

  const handleUnlike = (itemName) => {
    const newLikes = { ...likes, [itemName]: Math.max(0, (likes[itemName] || 0) - 1) };
    const newUserLikes = { ...userLikes, [itemName]: false };
    setLikes(newLikes);
    setUserLikes(newUserLikes);
    try {
      localStorage.setItem('soupLikes', JSON.stringify(newLikes));
      localStorage.setItem('userSoupLikes', JSON.stringify(newUserLikes));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  };
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
    const frenchNames = {
      'КУРИНЫЙ БУЛЬОН': 'bouillon-de-poulet.jpg',
      'ТЫКВЕННЫЙ СУП': 'soupe-a-la-citrouille.jpg',
      'МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ': 'мп.jpeg'
    };
    return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  const soupsData = [
    {
      name: 'ТЫКВЕННЫЙ СУП',
      price: 9.90,
      description: translations.items['ТЫКВЕННЫЙ СУП'].description
    },
    {
      name: 'СУП ДНЯ',
      price: 9.90,
      description: translations.items['СУП ДНЯ'].description
    },
    {
      name: 'МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ',
      price: 15.00,
      description: translations.items['МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ'].description
    }
  ];

  const SoupCard = ({ item }) => {
  // Guard clause pour éviter les erreurs
  if (!item || typeof item !== 'object') {
    return <div className="menu-card light-contour p-4 text-center">Soupe non disponible</div>;
  }
  
  // Vérification des propriétés requises
  if (!item.name) {
    return <div className="menu-card light-contour p-4 text-center">Nom de soupe manquant</div>;
  }
  
  try {
    return (
      <div className="menu-card light-contour flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2" style={{color: 'var(--primary-color)'}}>
            {translations.items[item.name]?.name || item.name || 'Nom non disponible'}
          </h3>
          <p className="text-xs mb-3 leading-relaxed" style={{color: 'var(--text-dark)'}}>
            {item.description || 'Description non disponible'}
          </p>
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm" style={{color: 'var(--text-dark)'}}>
              <span>{convertPrice(item.price || 0)}</span>
            </div>
            <button
              onClick={() => userLikes[item.name] ? handleUnlike(item.name) : handleLike(item.name)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: userLikes[item.name] ? 'var(--primary-color)' : 'var(--secondary-color)', color: userLikes[item.name] ? 'white' : '#303030' }}
            >
              <span>{userLikes[item.name] ? '❤️' : '🤍'}</span>
              <span className="text-xs font-medium">{likes[item.name] || 0}</span>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 shadow-lg menu-image" style={{borderColor: 'var(--border-color)'}}>
            <img 
              src={`/${getImageName(item.name)}`}
              alt={translations.items[item.name]?.name || item.name || 'Image non disponible'}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center">No Image</div>';
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in SoupCard:', error, 'Item data:', item);
    return <div className="menu-card light-contour p-4 text-center">Erreur d'affichage</div>;
  }
};

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {soupsData && soupsData.map((item, index) => (
          item && <SoupCard key={`soup-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};
