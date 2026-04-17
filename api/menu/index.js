const { initDatabase } = require('../_lib/db.js');

module.exports = async function handler(req, res) {
  // Initialize database
  await initDatabase();

  if (req.method === 'POST') {
    try {
      const { item_name, item_type } = req.body;
      // For now, just return success - likes are handled via localStorage
      res.json({ message: 'Menu item liked', item_name, item_type });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { item_name, item_type } = req.body;
      // For now, just return success - likes are handled via localStorage
      res.json({ message: 'Menu item unliked', item_name, item_type });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { item_name, item_type } = req.query;
      // For now, just return 0 - likes are handled via localStorage
      res.json({ likes: 0, item_name, item_type });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
