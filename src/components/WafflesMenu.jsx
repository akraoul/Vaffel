import React from 'react';
import { translations } from '../translations.js';

const WafflesMenu = ({ translations }) => {
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
    const frenchNames = {
      'КЛУБНИЧНЫЙ КУЛИ': 'klubnichnyy-kuli',
      'ШОКОЛАД БАНАН': 'shokolad-banan',
      'СНИКЕРС': 'snickers',
      'ЦЫПЛЕНОК 2 СЫРА': 'tsyplyonok-2-syra',
      'НОРВЕЖСКАЯ РЫБКА': 'norvezhskaya-rybka',
      'ИТАЛЬЯНСКАЯ КЛАССИКА': 'ilyanskaya-klassika',
      'ГОВЯДИНА ПО-БУРГУНДСКИ': 'govyadina-po-burgundski',
      'ГАВАЙИ': 'gavayi',
      'ЦЫПЛЕНОК МАНГО-КАРРИ': 'tsyplyonok-mango-karri',
      'ЛЕГЕНДА НОРВЕГИИ': 'legende-de-norvege',
      'ЦЕЗАРЬ': 'cesar',
      'ГРИК': 'grec',
      'ДЖОННИ ПЕППЕРОНИ': 'johnny-pepperoni',
      'ВВQ': 'bbq'
    };
    return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  const wafflesData = {
    [Object.keys(translations.categories)[0]]: [
      {
        name: 'КЛУБНИЧНЫЙ КУЛИ',
        miniPrice: 10.30,
        fullPrice: 13.90,
        description: 'Сладкая вафля, воздушный крем, клубничный кули, сахарная пудра'
      },
      {
        name: 'ШОКОЛАД БАНАН',
        miniPrice: 10.30,
        fullPrice: 13.90,
        description: 'Сладкая вафля, воздушный крем, шоколадная паста, банан, сахарная пудра'
      },
      {
        name: 'СНИКЕРС',
        miniPrice: 10.30,
        fullPrice: 13.90,
        description: translations.items['СНИКЕРС'].description
      }
    ],
    [Object.keys(translations.categories)[1]]: [
      {
        name: 'ЦЫПЛЕНОК 2 СЫРА',
        miniPrice: 12.90,
        fullPrice: 19.90,
        description: 'Шпинатная вафля, авторский тар-тар, цыпленок, чеддер, пармезан, айсберг, томат'
      },
      {
        name: 'НОРВЕЖСКАЯ РЫБКА',
        miniPrice: 11.50,
        fullPrice: 15.90,
        description: 'Шпинатная вафля, воздушный чиз, свежий огурчик, лосось сс, рукола'
      },
      {
        name: 'ИТАЛЬЯНСКАЯ КЛАССИКА',
        miniPrice: 10.50,
        fullPrice: 15.90,
        description: 'Шпинатная вафля, фисташковая паста, мортаделла, айсберг, воздушный чиз, чимичурри'
      }
    ],
    [Object.keys(translations.categories)[2]]: [
      {
        name: 'ГОВЯДИНА ПО-БУРГУНДСКИ',
        miniPrice: 12.40,
        fullPrice: 17.90,
        description: 'Сырная вафля, говяжья котлета, чеддер, луковый джем, чесночный, томат, айсберг'
      },
      {
        name: 'ГАВАЙИ',
        miniPrice: 12.40,
        fullPrice: 16.90,
        description: 'Сырная вафля, цыпленок, ананас, моцарелла, воздушный чиз, айсберг, сладкий Чили'
      },
      {
        name: 'ЦЫПЛЕНОК МАНГО-КАРРИ',
        price: 17.90,
        description: 'Сырная вафля, цыпленок, манго карри, чесночный, томат, айсберг'
      }
    ],
    [Object.keys(translations.categories)[3]]: [
      {
        name: 'ЧИКЕН ПРАЙМ',
        price: 18.90,
        description: translations.items['ЧИКЕН ПРАЙМ'].description
      },
      {
        name: 'МОЛЧАЛИВЫЙ БИФ',
        price: 20.50,
        description: translations.items['МОЛЧАЛИВЫЙ БИФ'].description
      },
      {
        name: 'ВВQ',
        price: 19.90,
        description: translations.items['ВВQ'].description
      }
    ]
  };

  const WaffleCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="font-playfair text-2xl font-bold text-orange mb-3">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-green-800 font-semibold">
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
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-orange shadow-lg menu-image">
          <img 
            src={`/${getImageName(item.name)}.jpg`}
            alt={item.name}
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
          <h3 className="font-playfair text-2xl font-bold text-green-800 border-b-2 border-green-800 pb-2 mb-4">
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
