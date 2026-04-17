import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export const SoupsMenu = ({ translations }) => {
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
        if (like.item_type === 'soup') {
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
          if (like.item_type === 'soup') {
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
      const data = await api.likeMenuItem(itemName, 'soup', userId);
      setLikes(prev => ({ ...prev, [itemName]: data.likes }));
      setUserLikes(prev => ({ ...prev, [itemName]: true }));
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  const handleUnlike = async (itemName) => {
    try {
      const data = await api.unlikeMenuItem(itemName, 'soup', userId);
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

  const SoupCard = ({ item }) => {
  // Guard clause pour éviter les erreurs
  if (!item || typeof item !== 'object') {
    return <div className="menu-card light-contour p-4 text-center">Soupe non disponible</div>;
  }
  
  // Vérification des propriétés requises
  if (!item.name) {
    return <div className="menu-card light-contour p-4 text-center">Nom de soupe manquant</div>;
  }
  
  try {
    return (
      <div className="menu-card light-contour flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2" style={{color: 'var(--primary-color)'}}>
            {translations.items[item.name]?.name || item.name || 'Nom non disponible'}
          </h3>
          <p className="text-xs mb-3 leading-relaxed" style={{color: 'var(--text-dark)'}}>
            {item.description || 'Description non disponible'}
          </p>
          <div className="flex justify-between items-center">
            <div className="font-semibold text-sm" style={{color: 'var(--text-dark)'}}>
              <span>{convertPrice(item.price || 0)}</span>
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
    console.error('Error in SoupCard:', error, 'Item data:', item);
    return <div className="menu-card light-contour p-4 text-center">Erreur d'affichage</div>;
  }
};

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {soupsData && soupsData.map((item, index) => (
          item && <SoupCard key={`soup-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};
