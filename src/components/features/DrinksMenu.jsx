import React, { useState, useEffect } from 'react';

export const DrinksMenu = ({ translations }) => {
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('drinkLikes');
    const savedUserLikes = localStorage.getItem('userDrinkLikes');
    if (savedLikes) setLikes(JSON.parse(savedLikes));
    if (savedUserLikes) setUserLikes(JSON.parse(savedUserLikes));
  }, []);

  const handleLike = (itemName) => {
    const newLikes = { ...likes, [itemName]: (likes[itemName] || 0) + 1 };
    const newUserLikes = { ...userLikes, [itemName]: true };
    setLikes(newLikes);
    setUserLikes(newUserLikes);
    localStorage.setItem('drinkLikes', JSON.stringify(newLikes));
    localStorage.setItem('userDrinkLikes', JSON.stringify(newUserLikes));
  };

  const handleUnlike = (itemName) => {
    const newLikes = { ...likes, [itemName]: Math.max(0, (likes[itemName] || 0) - 1) };
    const newUserLikes = { ...userLikes, [itemName]: false };
    setLikes(newLikes);
    setUserLikes(newUserLikes);
    localStorage.setItem('drinkLikes', JSON.stringify(newLikes));
    localStorage.setItem('userDrinkLikes', JSON.stringify(newUserLikes));
  };
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
  const frenchNames = {
    'АМЕРИКАНО': 'americano.jpg',
    'КАПУЧИНО': 'cappuccino.jpg',
    'ЛАТТЕ КЛАССИЧЕСКИЙ': 'latte.jpg',
    'ФЛЭТ УАЙТ': 'boisson/ф_у.jpg',
    'СИРОПЫ': 'sirop.jpg',
    'ЧАЙ': 'the-assorti.jpg',
    'МЯТА | ЕЖЕВИКА': 'boisson/м_е.jpg',
    'ЛАВАНДА | ГРЕЙПФРУТ': 'boisson/л_г.jpg',
    'ЛИЧИ | АНАНАС': 'boisson/л_а.jpg',
    'МИНДАЛЬ | ВИШНЯ': 'boisson/м_в.jpg',
    'ЭСПРЕССО ТОНИК': 'boisson/э_т.jpg',
    'МАТЧА-ТОНИК': 'boisson/м_т.jpg'
  };
  return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

  const drinksData = {
    'ГОРЯЧИЕ НАПИТКИ': [
      {
        name: 'АМЕРИКАНО',
        volume: '0.12 л',
        price: 5.00
      },
      {
        name: 'КАПУЧИНО',
        volumes: [
          { size: '0.2 л', price: 6.00 },
          { size: '0.3 л', price: 7.00 }
        ]
      },
      {
        name: 'ЛАТТЕ КЛАССИЧЕСКИЙ',
        volume: '0.3 л',
        price: 8.00
      },
      {
        name: 'ФЛЭТ УАЙТ',
        volume: '0.3 л',
        price: 6.00
      },
      {
        name: 'СИРОПЫ',
        volume: '0.03 л',
        price: 1.00
      },
      {
        name: 'ЧАЙ',
        volume: '0.3 л',
        price: 5.00
      }
    ],
    'ХОЛОДНЫЕ НАПИТКИ': [
      {
        name: 'МЯТА | ЕЖЕВИКА',
        volume: '0.3 л',
        price: 7.50,
        description: translations.items['МЯТА | ЕЖЕВИКА'].description
      },
      {
        name: 'ЛАВАНДА | ГРЕЙПФРУТ',
        volume: '0.3 л',
        price: 7.50,
        description: translations.items['ЛАВАНДА | ГРЕЙПФРУТ'].description
      },
      {
        name: 'ЛИЧИ | АНАНАС',
        volume: '0.3 л',
        price: 7.50,
        description: translations.items['ЛИЧИ | АНАНАС'].description
      },
      {
        name: 'МИНДАЛЬ | ВИШНЯ',
        volume: '0.3 л',
        price: 7.50,
        description: translations.items['МИНДАЛЬ | ВИШНЯ'].description
      },
      {
        name: 'ЭСПРЕССО ТОНИК',
        volume: '0.3 л',
        price: 8.00,
        description: translations.items['ЭСПРЕССО ТОНИК'].description
      },
      {
        name: 'МАТЧА-ТОНИК',
        volume: '0.3 л',
        price: 8.50,
        description: translations.items['МАТЧА-ТОНИК'].description
      }
    ]
  };

const DrinkCard = ({ item }) => {
  // Guard clause pour éviter les erreurs
  if (!item || typeof item !== 'object') {
    return <div className="menu-card light-contour p-4 text-center">Boisson non disponible</div>;
  }
  
  // Vérification des propriétés requises
  if (!item.name) {
    return <div className="menu-card light-contour p-4 text-center">Nom de boisson manquant</div>;
  }
  
  try {
    return (
      <div className="menu-card light-contour flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2" style={{color: 'var(--primary-color)'}}>
            {translations.items[item.name]?.name || item.name || 'Nom non disponible'}
          </h3>
          {item.description && (
            <p className="text-xs mb-2 leading-relaxed" style={{color: 'var(--text-dark)'}}>
              {item.description}
            </p>
          )}
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm" style={{color: 'var(--text-dark)'}}>
              {item.volumes ? (
                <div className="space-y-1">
                  {item.volumes.map((vol, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{vol.size || 'Taille inconnue'}:</span>
                      <span className="ml-4">{convertPrice(vol.price || 0)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span>{convertPrice(item.price || 0)}</span>
              )}
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
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 shadow-lg menu-image" style={{borderColor: 'var(--primary-color)'}}>
            <img 
              src={`/${getImageName(item.name)}`}
              alt={translations.items[item.name]?.name || item.name || 'Image non disponible'}
              className="w-full h-full object-cover"
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
    console.error('Error in DrinkCard:', error, 'Item data:', item);
    return <div className="menu-card light-contour p-4 text-center">Erreur d'affichage</div>;
  }
};

  return (
    <div className="space-y-4">
      {Object.entries(drinksData).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h2 className="text-2xl font-bold text-center mb-3" style={{color: '#303030'}}>
            {translations.categories[category] || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {items && items.map((item, index) => (
              item && <DrinkCard key={`${category}-${index}`} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
