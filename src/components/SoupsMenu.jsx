import React from 'react';
import { translations } from '../translations.js';

const SoupsMenu = ({ translations }) => {
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
    const frenchNames = {
      'КУРИНЫЙ БУЛЬОН': 'bouillon-de-poulet',
      'ТЫКВЕННЫЙ СУП': 'soupe-a-la-citrouille'
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
  // Vérifier si l'item existe dans les traductions
  const translation = translations.items[item.name];
  
  return (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-3" style={{color: 'var(--primary-color)'}}>
          {translation?.name || item.name}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{color: 'var(--text-dark)'}}>
          {translation?.description || item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="font-semibold" style={{color: 'var(--text-dark)'}}>
            <span>{convertPrice(item.price)}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 shadow-lg menu-image" style={{borderColor: 'var(--primary-color)'}}>
          <img 
            src={`/${getImageName(item.name)}.jpg`}
            alt={translation?.name || item.name}
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
};

  return (
    <div className="space-y-8">
      {/* Section des soupes */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{color: 'var(--text-dark)', borderColor: 'var(--primary-color)'}}>
          {translations.soups.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {soupsData.filter(item => item.name === 'ТЫКВЕННЫЙ СУП' || item.name === 'СУП ДНЯ').map((item, index) => (
            <SoupCard key={`soup-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Section des plats chauds */}
      {soupsData.filter(item => item.name === 'МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ').length > 0 && (
        <div>
          <h3 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{color: 'var(--text-dark)', borderColor: 'var(--primary-color)'}}>
            Горячее блюдо
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {soupsData.filter(item => item.name === 'МИТБОЛЫ С ВОЗДУШНЫМ КАРТОФЕЛЬНЫМ МУССОМ').map((item, index) => (
              <SoupCard key={`hot-${index}`} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoupsMenu;
