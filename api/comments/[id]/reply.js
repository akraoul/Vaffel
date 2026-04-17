const { initDatabase, replyToComment } = require('../../lib/db.js');

module.exports = async function handler(req, res) {
  // Initialize database
  await initDatabase();

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
