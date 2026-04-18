const { addCommentLike, removeCommentLike, getCommentLikeCount, getUserCommentLikeStatus, getUserCommentLikes, getAllCommentLikes, ensureCommentLikesTable } = require('../../_lib/db.js');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  const commentId = parseInt(id);

  console.log('Comment Likes API - Method:', req.method, 'ID:', id, 'Parsed ID:', commentId);

  if (isNaN(commentId)) {
    return res.status(400).json({ error: 'Invalid comment ID' });
  }

  // Ensure the comment_likes table exists
  try {
    await ensureCommentLikesTable();
  } catch (error) {
    console.error('Error ensuring comment_likes table:', error);
  }

  if (req.method === 'POST') {
    try {
      const { user_id } = req.body;
      console.log('POST - user_id:', user_id);
      if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id' });
      }
      // Check if user already liked this comment
      const hasLiked = await getUserCommentLikeStatus(commentId, user_id);
      if (hasLiked) {
        const count = await getCommentLikeCount(commentId);
        return res.json({ message: 'Already liked', id, likes: count, already_liked: true });
      }
      await addCommentLike(commentId, user_id);
      const count = await getCommentLikeCount(commentId);
      res.json({ message: 'Liked', id, likes: count });
    } catch (error) {
      console.error('Error liking comment:', error);
      console.error('Error details:', error.toString());
      // Handle duplicate key error gracefully
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        const count = await getCommentLikeCount(commentId);
        return res.json({ message: 'Already liked', id, likes: count, already_liked: true });
      }
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
      await removeCommentLike(commentId, user_id);
      const count = await getCommentLikeCount(commentId);
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
        const count = await getCommentLikeCount(commentId);
        const hasLiked = await getUserCommentLikeStatus(commentId, user_id);
        res.json({ likes: count, id, has_liked: hasLiked });
      } else {
        const count = await getCommentLikeCount(commentId);
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
