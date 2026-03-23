import React from 'react';
import { translations } from '../translations.js';

const SoupsMenu = ({ translations }) => {
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

  const SoupCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-3">
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2" style={{color: 'var(--primary-color)'}}>
          {translations.items[item.name]?.name || item.name}
        </h3>
        <p className="text-xs mb-3 leading-relaxed" style={{color: 'var(--text-dark)'}}>
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm" style={{color: 'var(--text-dark)'}}>
            <span>{convertPrice(item.price)}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 shadow-lg menu-image" style={{borderColor: 'var(--primary-color)'}}>
          <img 
            src={`/${getImageName(item.name)}`}
            alt={translations.items[item.name]?.name || item.name}
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {soupsData.map((item, index) => (
          <SoupCard key={`soup-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SoupsMenu;
