const { initDatabase, deleteComment } = require('../../lib/db.js');

module.exports = async function handler(req, res) {
  // Initialize database
  await initDatabase();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const result = await deleteComment(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
