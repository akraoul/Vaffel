import { sql } from '@vercel/postgres';

// Initialize database schema
export async function initDatabase() {
  try {
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
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Get all comments
export async function getComments() {
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
export async function createComment(name, comment, rating) {
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
export async function deleteComment(id) {
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
export async function replyToComment(id, reply, adminName) {
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
