const { sql } = require('@vercel/postgres');

let initialized = false;

// Initialize database schema
async function initDatabase() {
  try {
    console.log('Initializing database schema...');
    console.log('POSTGRES_URL environment variable:', process.env.POSTGRES_URL ? 'SET' : 'NOT SET');
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        comment TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        reply TEXT,
        admin_name TEXT,
        replied_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    console.error('Error details:', error.toString());
    throw error;
  }
}

// Ensure database is initialized (call this before any DB operation)
async function ensureInit() {
  if (!initialized) {
    await initDatabase();
    initialized = true;
  }
}

// Get all comments
async function getComments() {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT * FROM comments ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

// Create a new comment
async function createComment(name, comment, rating) {
  await ensureInit();
  try {
    const { rows } = await sql`
      INSERT INTO comments (name, comment, rating)
      VALUES (${name}, ${comment}, ${rating || 5})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

// Delete a comment
async function deleteComment(id) {
  await ensureInit();
  try {
    await sql`
      DELETE FROM comments WHERE id = ${id}
    `;
    return { message: 'Comment deleted' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

// Reply to a comment
async function replyToComment(id, reply, adminName) {
  await ensureInit();
  try {
    const { rows } = await sql`
      UPDATE comments 
      SET reply = ${reply}, 
          admin_name = ${adminName}, 
          replied_at = CURRENT_TIMESTAMP 
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error replying to comment:', error);
    throw error;
  }
}

module.exports = {
  initDatabase,
  ensureInit,
  getComments,
  createComment,
  deleteComment,
  replyToComment
};
