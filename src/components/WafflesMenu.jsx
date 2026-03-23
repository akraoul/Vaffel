import React from 'react';
import { translations } from '../translations.js';

const WafflesMenu = ({ translations }) => {
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
    const frenchNames = {
      'КЛУБНИЧНЫЙ КУЛИ': 'vaffel/клуб',
      'ШОКОЛАД БАНАН': 'vaffel/банан',
      'ЦЫПЛЕНОК 2 СЫРА': 'vaffel/2_сыр',
      'НОРВЕЖСКАЯ РЫБКА': 'vaffel/лег',
      'ИТАЛЬЯНСКАЯ КЛАССИКА': 'vaffel/ит',
      'ГОВЯДИНА ПО-БУРГУНДСКИ': 'vaffel/гавяд',
      'ГАВАЙИ': 'vaffel/гава',
      'ЦЫПЛЕНОК МАНГО-КАРРИ': 'vaffel/манго',
      'ДЖОННИ ПЕППЕРОНИ': 'johnny-pepperoni',
      'ВВQ': 'bbq',
      'ЛЕГЕНДА НОРВЕГИИ': 'legende-de-norvege',
      'СНИКЕРС': 'snickers',
      'ЦЕЗАРЬ': 'cesar',
      'ГРИК': 'grec'
    };
    return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  const wafflesData = {
    [Object.keys(translations.categories)[0]]: [
      {
        name: 'КЛУБНИЧНЫЙ КУЛИ',
        miniPrice: 10.50,
        fullPrice: 14.10,
        description: 'Сладкая вафля, воздушный крем, клубничный кули, сахарная пудра'
      },
      {
        name: 'ШОКОЛАД БАНАН',
        miniPrice: 10.50,
        fullPrice: 14.10,
        description: 'Сладкая вафля, воздушный крем, шоколадная паста, банан, сахарная пудра'
      }
    ],
    [Object.keys(translations.categories)[1]]: [
      {
        name: 'ЦЫПЛЕНОК 2 СЫРА',
        miniPrice: 11.90,
        fullPrice: 16.50,
        description: 'Шпинатная вафля, авторский тар-тар, цыпленок, чеддер, пармезан, айсберг, томат'
      },
      {
        name: 'НОРВЕЖСКАЯ РЫБКА',
        miniPrice: 13.40,
        fullPrice: 20.50,
        description: 'Шпинатная вафля, воздушный чиз, свежий огурчик, лосось сс, руккола'
      },
      {
        name: 'ИТАЛЬЯНСКАЯ КЛАССИКА',
        miniPrice: 13.40,
        fullPrice: 18.50,
        description: 'Шпинатная вафля, фисташковая паста, мортаделла, айсберг, воздушный чиз, чимичурри'
      }
    ],
    [Object.keys(translations.categories)[2]]: [
      {
        name: 'ГОВЯДИНА ПО-БУРГУНДСКИ',
        miniPrice: 20.50,
        fullPrice: null,
        description: 'Сырная вафля, говяжья котлета, чеддер, луковый джем, чесночный, томат, айсберг'
      },
      {
        name: 'ГАВАЙИ',
        miniPrice: 12.90,
        fullPrice: 17.50,
        description: 'Сырная вафля, цыпленок, ананас, моцарелла, воздушный чиз, айсберг, сладкий Чили'
      },
      {
        name: 'ЦЫПЛЕНОК МАНГО-КАРРИ',
        miniPrice: 12.90,
        fullPrice: 17.50,
        description: 'Сырная вафля, цыпленок, манго карри, чесночный, томат, айсберг'
      }
    ]
  };

  const WaffleCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-3" style={{color: 'var(--primary-color)'}}>
          {translations.items[item.name]?.name || item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed" style={{color: 'var(--text-dark)'}}>
          {translations.items[item.name]?.description || item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-green-800 font-semibold" style={{color: 'var(--text-dark)'}}>
            {item.miniPrice && item.fullPrice ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Мини:</span>
                  <span className="ml-4">{convertPrice(item.miniPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Фул:</span>
                  <span className="ml-4">{convertPrice(item.fullPrice)}</span>
                </div>
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
            src={`/${getImageName(item.name)}.jpg`}
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
      {Object.entries(wafflesData).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-2xl font-bold border-b-2 pb-2 mb-4" style={{color: 'var(--text-dark)', borderColor: 'var(--primary-color)'}}>
            {translations.categories[category]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <WaffleCard key={`${category}-${index}`} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WafflesMenu;
