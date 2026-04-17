const { initDatabase, getComments, createComment, deleteComment, replyToComment } = require('../_lib/db.js');

module.exports = async function handler(req, res) {
  // Initialize database
  await initDatabase();

  const { id } = req.query;

  // GET /api/comments - Get all comments
  if (req.method === 'GET' && !id) {
    try {
      const comments = await getComments();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // GET /api/comments/:id - Get single comment
  else if (req.method === 'GET' && id) {
    try {
      const comments = await getComments();
      const comment = comments.find(c => c.id === parseInt(id));
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // POST /api/comments - Create comment
  else if (req.method === 'POST') {
    try {
      const { name, comment, rating } = req.body;
      
      if (!name || !comment) {
        return res.status(400).json({ error: 'Name and comment are required' });
      }

      const newComment = await createComment(name, comment, rating);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // DELETE /api/comments/:id - Delete comment
  else if (req.method === 'DELETE' && id) {
    try {
      const result = await deleteComment(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // PUT /api/comments/:id/reply - Reply to comment
  else if (req.method === 'PUT' && req.url.endsWith('/reply')) {
    try {
      const { reply, admin_name, admin_password } = req.body;
      
      // Simple admin password check
      if (admin_password !== 'vaffel2026') {
        return res.status(401).json({ error: 'Invalid admin password' });
      }
      
      if (!reply || !admin_name) {
        return res.status(400).json({ error: 'Reply and admin name are required' });
      }

      const updatedComment = await replyToComment(id, reply, admin_name);
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // POST /api/comments/:id/like - Like comment
  else if (req.method === 'POST' && req.url.endsWith('/like')) {
    try {
      res.json({ message: 'Comment liked', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // DELETE /api/comments/:id/like - Unlike comment
  else if (req.method === 'DELETE' && req.url.endsWith('/like')) {
    try {
      res.json({ message: 'Comment unliked', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
