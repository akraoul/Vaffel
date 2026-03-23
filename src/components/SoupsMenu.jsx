import React from 'react';
import { translations } from '../translations.js';

const SoupsMenu = ({ translations }) => {
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const handleImageClick = (imageSrc) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'max-w-full max-h-full rounded-lg shadow-2xl cursor-pointer';
    img.onclick = () => document.body.removeChild(modal);
    
    modal.appendChild(img);
    document.body.appendChild(modal);
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

  const SoupCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>
          {translations.items[item.name].name}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{color: 'var(--text-dark)'}}>
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="font-semibold" style={{color: 'var(--text-dark)'}}>
            <span>{convertPrice(item.price)}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 shadow-lg menu-image cursor-pointer transition-transform hover:scale-105" style={{borderColor: 'var(--primary-color)'}} onClick={() => handleImageClick(`/${getImageName(item.name)}.jpg`)}>
          <img 
            src={`/${getImageName(item.name)}.jpg`}
            alt={translations.items[item.name].name}
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {soupsData.map((item, index) => (
          <SoupCard key={`soup-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SoupsMenu;
