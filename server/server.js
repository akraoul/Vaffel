import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initDatabase, getDb } from './database.js';

const fastify = Fastify({ logger: true });
const PORT = 3001;

// Register CORS plugin
await fastify.register(cors, {
  origin: true,
});

// Initialize database
await initDatabase();

// Routes
fastify.get('/api/comments', async (request, reply) => {
  try {
    const db = getDb();
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments ORDER BY created_at DESC', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return rows;
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

fastify.post('/api/comments', async (request, reply) => {
  try {
    const { name, comment, rating } = request.body;
    
    if (!name || !comment) {
      return reply.status(400).send({ error: 'Name and comment are required' });
    }

    const db = getDb();
    const newComment = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO comments (name, comment, rating) VALUES (?, ?, ?)',
        [name, comment, rating || 5],
        function(err) {
          if (err) {
            reject(err);
          } else {
            db.get('SELECT * FROM comments WHERE id = ?', [this.lastID], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          }
        }
      );
    });
    return reply.status(201).send(newComment);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

fastify.delete('/api/comments/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const db = getDb();
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM comments WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    return { message: 'Comment deleted' };
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

fastify.put('/api/comments/:id/reply', async (request, reply) => {
  try {
    const { id } = request.params;
    const { reply: replyText, admin_name, admin_password } = request.body;
    
    // Simple admin password check
    if (admin_password !== 'vaffel2026') {
      return reply.status(401).send({ error: 'Invalid admin password' });
    }
    
    if (!replyText || !admin_name) {
      return reply.status(400).send({ error: 'Reply and admin name are required' });
    }

    const db = getDb();
    const updatedComment = await new Promise((resolve, reject) => {
      db.run(
        'UPDATE comments SET reply = ?, admin_name = ?, replied_at = CURRENT_TIMESTAMP WHERE id = ?',
        [replyText, admin_name, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            db.get('SELECT * FROM comments WHERE id = ?', [id], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          }
        }
      );
    });
    return updatedComment;
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
