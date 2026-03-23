import React from 'react';
import { translations } from '../translations.js';

const DrinksMenu = ({ translations }) => {
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
    [Object.keys(translations.categories)[0]]: [
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
    [Object.keys(translations.categories)[1]]: [
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

const DrinkCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>
          {translations.items[item.name]?.name || item.name}
        </h3>
        {item.description && (
          <p className="text-sm mb-3 leading-relaxed" style={{color: 'var(--text-dark)'}}>
            {item.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <div className="font-semibold" style={{color: 'var(--text-dark)'}}>
            {item.volumes ? (
              <div className="space-y-1">
                {item.volumes.map((vol, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{vol.size}:</span>
                    <span className="ml-4">{convertPrice(vol.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span>{convertPrice(item.price)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 shadow-lg menu-image" style={{borderColor: 'var(--primary-color)'}}>
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
    <div className="space-y-8">
      {Object.entries(drinksData).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{color: 'var(--text-dark)', borderColor: 'var(--primary-color)'}}>
            {translations.categories[category]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <DrinkCard key={`${category}-${index}`} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrinksMenu;
