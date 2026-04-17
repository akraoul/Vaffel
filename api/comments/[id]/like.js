module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'POST') {
    return res.json({ message: 'Liked', id });
  }

  if (req.method === 'DELETE') {
    return res.json({ message: 'Unliked', id });
  }

  res.status(405).end();
}
