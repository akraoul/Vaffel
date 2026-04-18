const { addCommentLike, removeCommentLike, getCommentLikeCount, getUserCommentLikeStatus, getUserCommentLikes, getAllCommentLikes } = require('../../_lib/db.js');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  console.log('Comment Likes API - Method:', req.method, 'ID:', id);

  if (req.method === 'POST') {
    try {
      const { user_id } = req.body;
      console.log('POST - user_id:', user_id);
      if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id' });
      }
      await addCommentLike(id, user_id);
      const count = await getCommentLikeCount(id);
      res.json({ message: 'Liked', id, likes: count });
    } catch (error) {
      console.error('Error liking comment:', error);
      console.error('Error details:', error.toString());
      res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { user_id } = req.body;
      console.log('DELETE - user_id:', user_id);
      if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id' });
      }
      await removeCommentLike(id, user_id);
      const count = await getCommentLikeCount(id);
      res.json({ message: 'Unliked', id, likes: count });
    } catch (error) {
      console.error('Error unliking comment:', error);
      console.error('Error details:', error.toString());
      res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  if (req.method === 'GET') {
    try {
      const { user_id } = req.query;
      console.log('GET - user_id:', user_id);
      if (user_id) {
        const count = await getCommentLikeCount(id);
        const hasLiked = await getUserCommentLikeStatus(id, user_id);
        res.json({ likes: count, id, has_liked: hasLiked });
      } else {
        const count = await getCommentLikeCount(id);
        res.json({ likes: count, id });
      }
    } catch (error) {
      console.error('Error getting comment likes:', error);
      console.error('Error details:', error.toString());
      res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  res.status(405).end();
}
