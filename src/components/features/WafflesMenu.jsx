import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const WafflesMenu = ({ translations }) => {
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Generate or get user ID
    let savedUserId = localStorage.getItem('vaffel_user_id');
    if (!savedUserId) {
      savedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('vaffel_user_id', savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchLikes();
    }
  }, [userId]);

  const fetchLikes = async () => {
    try {
      const data = await api.getAllMenuLikes();
      const likesMap = {};
      data.likes.forEach(like => {
        if (like.item_type === 'waffle') {
          likesMap[like.item_name] = like.count;
        }
      });
      setLikes(likesMap);

      // Fetch user's like status for all items at once
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/menu/like?user_id=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        const userLikeStatus = {};
        userData.user_likes.forEach(like => {
          if (like.item_type === 'waffle') {
            userLikeStatus[like.item_name] = true;
          }
        });
        setUserLikes(userLikeStatus);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async (itemName) => {
    try {
      const data = await api.likeMenuItem(itemName, 'waffle', userId);
      setLikes(prev => ({ ...prev, [itemName]: data.likes }));
      setUserLikes(prev => ({ ...prev, [itemName]: true }));
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  const handleUnlike = async (itemName) => {
    try {
      const data = await api.unlikeMenuItem(itemName, 'waffle', userId);
      setLikes(prev => ({ ...prev, [itemName]: data.likes }));
      setUserLikes(prev => ({ ...prev, [itemName]: false }));
    } catch (error) {
      console.error('Error unliking item:', error);
    }
  };
  const convertPrice = (price) => {
    return `${price.toFixed(2)} BYN`;
  };

  const getImageName = (itemKey) => {
    const frenchNames = {
      'КЛУБНИЧНЫЙ КУЛИ': 'vaffel/клуб.jpg',
      'ШОКОЛАД БАНАН': 'vaffel/банан.jpg',
      'ЦЫПЛЕНОК 2 СЫРА': 'vaffel/2_сыр.jpg',
      'НОРВЕЖСКАЯ РЫБКА': 'vaffel/лег.jpg',
      'ИТАЛЬЯНСКАЯ КЛАССИКА': 'vaffel/ит.jpg',
      'ГОВЯДИНА ПО-БУРГУНДСКИ': 'vaffel/гавяд.jpg',
      'ГАВАЙИ': 'vaffel/гава.jpg',
      'ЦЫПЛЕНОК МАНГО-КАРРИ': 'vaffel/манго.jpg'
    };
    return frenchNames[itemKey] || itemKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  const wafflesData = {
    'КЛАССИЧЕСКОЕ ТЕСТО': [
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
    'ШПИНАТНОЕ ТЕСТО': [
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
    'СЫРНОЕ ТЕСТО': [
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

  const WaffleCard = ({ item }) => {
  // Guard clause pour éviter les erreurs
  if (!item || typeof item !== 'object') {
    return <div className="menu-card light-contour p-4 text-center">Item non disponible</div>;
  }
  
  // Vérification des propriétés requises
  if (!item.name) {
    return <div className="menu-card light-contour p-4 text-center">Nom d'item manquant</div>;
  }
  
  try {
    // Validation des prix pour éviter les erreurs
    const hasValidPricing = (item.miniPrice && item.fullPrice) || item.price;
    
    return (
      <div className="menu-card light-contour flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2" style={{color: 'var(--primary-color)'}}>
            {translations.items[item.name]?.name || item.name || 'Nom non disponible'}
          </h3>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed" style={{color: 'var(--text-dark)'}}>
            {translations.items[item.name]?.description || item.description || 'Описание отсутствует'}
          </p>
          <div className="flex justify-between items-center">
            <div className="text-green-800 font-semibold text-sm" style={{color: 'var(--text-dark)'}}>
              {hasValidPricing ? (
                item.miniPrice && item.fullPrice ? (
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
                )
              ) : (
                <span>Prix non disponible</span>
              )}
            </div>
            <button
              onClick={() => userLikes[item.name] ? handleUnlike(item.name) : handleLike(item.name)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: userLikes[item.name] ? 'var(--primary-color)' : 'var(--secondary-color)', color: userLikes[item.name] ? 'white' : '#303030' }}
            >
              <span>{userLikes[item.name] ? '❤️' : '🤍'}</span>
              <span className="text-sm font-bold">{likes[item.name] || 0}</span>
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
    console.error('Error in WaffleCard:', error, 'Item data:', item);
    return <div className="menu-card light-contour p-4 text-center">Erreur d'affichage</div>;
  }
};

  return (
    <div className="space-y-4">
      {Object.entries(wafflesData).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h2 className="text-2xl font-bold text-center mb-3" style={{color: '#303030'}}>
            {translations.categories[category] || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {items && items.map((item, index) => (
              item && <WaffleCard key={`${category}-${index}`} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
