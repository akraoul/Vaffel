import React from 'react';

const SoupsMenu = ({ currency, translations }) => {
  const convertPrice = (price) => {
    if (currency === 'BYN') return `${price} BYN`;
    if (currency === 'RUB') return `${(price * 30).toFixed(0)} Р`;
    if (currency === 'USD') return `${(price * 0.40).toFixed(2)} $`;
    return `${price} BYN`;
  };

  const soupsData = [
    {
      name: 'КУРИНЫЙ БУЛЬОН',
      price: 8.50,
      description: translations.items['КУРИНЫЙ БУЛЬОН'].description
    },
    {
      name: 'ТЫКВЕННЫЙ СУП',
      price: 9.00,
      description: translations.items['ТЫКВЕННЫЙ СУП'].description
    }
  ];

  const getImageName = (itemKey) => {
  const frenchNames = {
    'КУРИНЫЙ БУЛЬОН': 'bouillon-de-poulet',
    'ТЫКВЕННЫЙ СУП': 'soupe-a-la-citrouille'
  };
  return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

const SoupCard = ({ item }) => (
    <div className="menu-card light-contour flex items-center gap-4">
      <div className="flex-1">
        <h3 className="font-playfair text-2xl font-bold text-orange mb-3">
          {translations.items[item.name].name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-green-800 font-semibold text-lg">
            {convertPrice(item.price)}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-orange shadow-lg">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {soupsData.map((item, index) => (
          <SoupCard key={`soup-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SoupsMenu;
