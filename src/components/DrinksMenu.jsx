import React from 'react';

const DrinksMenu = ({ currency, translations }) => {
  const convertPrice = (price) => {
    if (currency === 'BYN') return `${price} BYN`;
    if (currency === 'RUB') return `${(price * 30).toFixed(0)} Р`;
    if (currency === 'USD') return `${(price * 0.40).toFixed(2)} $`;
    return `${price} BYN`;
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
        name: 'ТЫКВЕННЫЙ ЛАТТЕ',
        volume: '0.3 л',
        price: 8.00
      }
    ],
    [Object.keys(translations.categories)[1]]: [
      {
        name: 'ОЛД МАНИ',
        volume: '0.3 л',
        price: 6.90,
        description: translations.items['ОЛД МАНИ'].description
      },
      {
        name: 'СМОРОДИНА ДРАЙВ',
        volume: '0.3 л',
        price: 6.90,
        description: translations.items['СМОРОДИНА ДРАЙВ'].description
      },
      {
        name: 'ЧАЙ В АССОРТИМЕНТЕ',
        volume: '0.3 л',
        price: 5.00,
        description: translations.items['ЧАЙ В АССОРТИМЕНТЕ'].description
      },
      {
        name: 'ЧАЙ С ЛИМОНОМ И КОРИЦЕЙ',
        volume: '0.3 л',
        price: 5.00
      }
    ],
    [Object.keys(translations.categories)[2]]: [
      {
        name: 'АБРИКОСОВЫЙ ПОПКОРН',
        volume: '370 мл',
        price: 6.90,
        description: translations.items['АБРИКОСОВЫЙ ПОПКОРН'].description
      },
      {
        name: 'ГРЕЙП',
        volume: '370 мл',
        price: 6.90,
        description: translations.items['ГРЕЙП'].description
      },
      {
        name: 'ВАНИЛЬНОЕ ЯБЛОКО',
        volume: '370 мл',
        price: 6.90,
        description: translations.items['ВАНИЛЬНОЕ ЯБЛОКО'].description
      },
      {
        name: 'МЯТНАЯ ЕЖЕВИКА',
        volume: '370 мл',
        price: 6.90,
        description: translations.items['МЯТНАЯ ЕЖЕВИКА'].description
      }
    ]
  };

  const getImageName = (itemKey) => {
  const frenchNames = {
    'АМЕРИКАНО': 'americano',
    'КАПУЧИНО': 'cappuccino',
    'ЛАТТЕ КЛАССИЧЕСКИЙ': 'latte',
    'ТЫКВЕННЫЙ ЛАТТЕ': 'latte-citrouille',
    'ОЛД МАНИ': 'old-man',
    'СМОРОДИНА ДРАЙВ': 'cassis-drive',
    'ЧАЙ В АССОРТИМЕНТЕ': 'the-assorti',
    'ЧАЙ С ЛИМОНОМ И КОРИЦЕЙ': 'the-citron-cannelle',
    'АБРИКОСОВЫЙ ПОПКОРН': 'pop-corn-abricot',
    'ГРЕЙП': 'pamplemousse',
    'ВАНИЛЬНОЕ ЯБЛОКО': 'pomme-vanille',
    'МЯТНАЯ ЕЖЕВИКА': 'mure-menthe'
  };
  return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

const DrinkCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="font-playfair text-xl font-bold text-orange mb-2">
          {translations.items[item.name].name}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {item.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <div className="text-green-800 font-semibold">
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
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-orange shadow-lg menu-image">
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
      {Object.entries(drinksData).map(([category, items]) => (
        <section key={category} className="space-y-4">
          <h3 className="font-playfair text-2xl font-bold text-green-800 border-b-2 border-green-800 pb-2 mb-4">
            {translations.categories[category]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <DrinkCard key={`${category}-${index}`} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DrinksMenu;
