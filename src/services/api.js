import { CONFIG } from '../constants/config';

export const api = {
  // Comments API
  async getComments() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  async createComment(commentData) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('Failed to create comment');
    return response.json();
  },

  async deleteComment(id) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete comment');
    return response.json();
  },

  async replyToComment(id, replyData) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments/${id}/reply`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData),
    });
    if (!response.ok) throw new Error('Failed to reply to comment');
    return response.json();
  },

  async likeComment(id, userId) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) throw new Error('Failed to like comment');
    return response.json();
  },

  async unlikeComment(id, userId) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments/${id}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) throw new Error('Failed to unlike comment');
    return response.json();
  },

  async getCommentLikes(id, userId) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/comments/${id}/like?user_id=${userId}`);
    if (!response.ok) throw new Error('Failed to get comment likes');
    return response.json();
  },

  // Menu Items API
  async likeMenuItem(itemName, itemType, userId) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/menu/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_name: itemName, item_type: itemType, user_id: userId }),
    });
    if (!response.ok) throw new Error('Failed to like menu item');
    return response.json();
  },

  async unlikeMenuItem(itemName, itemType, userId) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/menu/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_name: itemName, item_type: itemType, user_id: userId }),
    });
    if (!response.ok) throw new Error('Failed to unlike menu item');
    return response.json();
  },

  async getMenuItemLikes(itemName, itemType) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/menu/like?item_name=${itemName}&item_type=${itemType}`);
    if (!response.ok) throw new Error('Failed to get menu item likes');
    return response.json();
  },

  async getAllMenuLikes() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/menu/like`);
    if (!response.ok) throw new Error('Failed to get all menu likes');
    return response.json();
  },
};
