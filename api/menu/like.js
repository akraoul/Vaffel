const { addLike, removeLike, getLikeCount, getUserLikeStatus, getAllLikes, getUserLikes } = require('../_lib/db.js');

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { item_name, item_type, user_id } = req.body;
      if (!item_name || !item_type || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      await addLike(item_name, item_type, user_id);
      const count = await getLikeCount(item_name, item_type);
      res.json({ message: 'Menu item liked', item_name, item_type, likes: count });
    } catch (error) {
      console.error('Error liking menu item:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { item_name, item_type, user_id } = req.body;
      if (!item_name || !item_type || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      await removeLike(item_name, item_type, user_id);
      const count = await getLikeCount(item_name, item_type);
      res.json({ message: 'Menu item unliked', item_name, item_type, likes: count });
    } catch (error) {
      console.error('Error unliking menu item:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { item_name, item_type, user_id } = req.query;
      if (item_name && item_type && user_id) {
        const count = await getLikeCount(item_name, item_type);
        const hasLiked = await getUserLikeStatus(item_name, item_type, user_id);
        res.json({ likes: count, item_name, item_type, has_liked: hasLiked });
      } else if (item_name && item_type) {
        const count = await getLikeCount(item_name, item_type);
        res.json({ likes: count, item_name, item_type });
      } else if (user_id) {
        const userLikes = await getUserLikes(user_id);
        res.json({ user_likes: userLikes });
      } else {
        const allLikes = await getAllLikes();
        res.json({ likes: allLikes });
      }
    } catch (error) {
      console.error('Error getting menu item likes:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
