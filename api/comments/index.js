const { initDatabase, getComments, createComment } = require('../../lib/db.js');

export default async function handler(req, res) {
  // Initialize database
  await initDatabase();

  if (req.method === 'GET') {
    try {
      const comments = await getComments();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
