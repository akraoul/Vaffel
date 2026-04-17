const { getComments, createComment, initDatabase } = require('../_lib/db.cjs');

module.exports = async function handler(req, res) {
  console.log('API Comments Handler - Method:', req.method);
  console.log('API Comments Handler - Body:', req.body);

  if (req.method === 'GET') {
    try {
      console.log('GET: Initializing database...');
      await initDatabase();
      console.log('GET: Fetching comments...');
      const comments = await getComments();
      console.log('GET: Comments fetched successfully');
      return res.status(200).json(comments);
    } catch (error) {
      console.error('GET Error:', error);
      return res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  if (req.method === 'POST') {
    try {
      console.log('POST: Initializing database...');
      await initDatabase();
      console.log('POST: Creating comment with data:', req.body);
      const { name, comment, rating } = req.body;

      if (!name || !comment) {
        return res.status(400).json({ error: 'Name and comment required' });
      }

      const newComment = await createComment(name, comment, rating);
      console.log('POST: Comment created successfully');
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('POST Error:', error);
      return res.status(500).json({ error: error.message, details: error.toString() });
    }
  }

  res.status(405).end();
}
