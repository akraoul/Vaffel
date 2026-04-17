const { getComments, createComment } = require('../_lib/db.js');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const comments = await getComments();
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, comment, rating } = req.body;

      if (!name || !comment) {
        return res.status(400).json({ error: 'Name and comment required' });
      }

      const newComment = await createComment(name, comment, rating);
      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).end();
}
