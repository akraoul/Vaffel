const { initDatabase } = require('../../../lib/db.js');

module.exports = async function handler(req, res) {
  // Initialize database
  await initDatabase();

  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      // For now, just return success - likes are handled via localStorage
      res.json({ message: 'Comment liked', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      // For now, just return success - likes are handled via localStorage
      res.json({ message: 'Comment unliked', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
