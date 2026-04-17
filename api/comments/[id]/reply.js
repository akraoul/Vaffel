const { replyToComment } = require('../../_lib/db.js');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { reply, admin_name, admin_password } = req.body;

  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!reply || !admin_name) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const updated = await replyToComment(id, reply, admin_name);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
