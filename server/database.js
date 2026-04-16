import sqlite3 from 'sqlite3';

let db;

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('./comments.db', (err) => {
      if (err) {
        reject(err);
      } else {
        db.run(`
          CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            comment TEXT NOT NULL,
            rating INTEGER DEFAULT 5,
            reply TEXT,
            admin_name TEXT,
            replied_at DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Database initialized');
            resolve();
          }
        });
      }
    });
  });
}

export function getDb() {
  return db;
}
