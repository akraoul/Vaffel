const { getComments, deleteComment } = require('../../_lib/db.js');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  console.log('API [id] Handler - Method:', req.method, 'ID:', id);

  if (req.method === 'GET') {
    try {
      console.log('GET: Fetching comment with ID:', id);
      const comments = await getComments();
      const comment = comments.find(c => c.id === Number(id));

      if (!comment) {
        console.log('GET: Comment not found');
        return res.status(404).json({ error: 'Not found' });
      }

      console.log('GET: Comment found');
      return res.json(comment);
    } catch (error) {
      console.error('GET Error:', error);
      return res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  if (req.method === 'DELETE') {
    try {
      console.log('DELETE: Deleting comment with ID:', id);
      const result = await deleteComment(id);
      console.log('DELETE: Comment deleted successfully');
      return res.json(result);
    } catch (error) {
      console.error('DELETE Error:', error);
      return res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  console.log('Method not allowed:', req.method);
  res.status(405).end();
}
