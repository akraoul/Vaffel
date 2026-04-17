const { getComments, deleteComment } = require('../../_lib/db.js');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const comments = await getComments();
      const comment = comments.find(c => c.id === Number(id));

      if (!comment) {
        return res.status(404).json({ error: 'Not found' });
      }

      return res.json(comment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const result = await deleteComment(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).end();
}
