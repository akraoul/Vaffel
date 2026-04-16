import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDatabase, getDb } from './database.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
await initDatabase();

// Routes
app.get('/api/comments', (req, res) => {
  try {
    const db = getDb();
    db.all('SELECT * FROM comments ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/comments', (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    
    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const db = getDb();
    db.run(
      'INSERT INTO comments (name, comment, rating) VALUES (?, ?, ?)',
      [name, comment, rating || 5],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          db.get('SELECT * FROM comments WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(201).json(row);
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/comments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    db.run('DELETE FROM comments WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Comment deleted' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/comments/:id/reply', (req, res) => {
  try {
    const { id } = req.params;
    const { reply, admin_name, admin_password } = req.body;
    
    // Simple admin password check
    if (admin_password !== 'vaffel2026') {
      return res.status(401).json({ error: 'Invalid admin password' });
    }
    
    if (!reply || !admin_name) {
      return res.status(400).json({ error: 'Reply and admin name are required' });
    }

    const db = getDb();
    db.run(
      'UPDATE comments SET reply = ?, admin_name = ?, replied_at = CURRENT_TIMESTAMP WHERE id = ?',
      [reply, admin_name, id],
      (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          db.get('SELECT * FROM comments WHERE id = ?', [id], (err, row) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.json(row);
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
