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
    await sql`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        item_name TEXT NOT NULL,
        item_type TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(item_name, item_type, user_id)
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS comment_likes (
        id SERIAL PRIMARY KEY,
        comment_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(comment_id, user_id),
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
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

// Get like count for an item
async function getLikeCount(itemName, itemType) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT COUNT(*) as count FROM likes
      WHERE item_name = ${itemName} AND item_type = ${itemType}
    `;
    return parseInt(rows[0].count);
  } catch (error) {
    console.error('Error getting like count:', error);
    throw error;
  }
}

// Check if a user has liked an item
async function getUserLikeStatus(itemName, itemType, userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT * FROM likes
      WHERE item_name = ${itemName} AND item_type = ${itemType} AND user_id = ${userId}
    `;
    return rows.length > 0;
  } catch (error) {
    console.error('Error getting user like status:', error);
    throw error;
  }
}

// Add a like
async function addLike(itemName, itemType, userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      INSERT INTO likes (item_name, item_type, user_id)
      VALUES (${itemName}, ${itemType}, ${userId})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
}

// Remove a like
async function removeLike(itemName, itemType, userId) {
  await ensureInit();
  try {
    await sql`
      DELETE FROM likes
      WHERE item_name = ${itemName} AND item_type = ${itemType} AND user_id = ${userId}
    `;
    return { message: 'Like removed' };
  } catch (error) {
    console.error('Error removing like:', error);
    throw error;
  }
}

// Get all likes for all items
async function getAllLikes() {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT item_name, item_type, COUNT(*) as count FROM likes
      GROUP BY item_name, item_type
    `;
    return rows;
  } catch (error) {
    console.error('Error getting all likes:', error);
    throw error;
  }
}

// Get all likes for a specific user
async function getUserLikes(userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT item_name, item_type FROM likes
      WHERE user_id = ${userId}
    `;
    return rows;
  } catch (error) {
    console.error('Error getting user likes:', error);
    throw error;
  }
}

// Get like count for a comment
async function getCommentLikeCount(commentId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT COUNT(*) as count FROM comment_likes
      WHERE comment_id = ${commentId}
    `;
    return parseInt(rows[0].count);
  } catch (error) {
    console.error('Error getting comment like count:', error);
    throw error;
  }
}

// Check if a user has liked a comment
async function getUserCommentLikeStatus(commentId, userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT * FROM comment_likes
      WHERE comment_id = ${commentId} AND user_id = ${userId}
    `;
    return rows.length > 0;
  } catch (error) {
    console.error('Error getting user comment like status:', error);
    throw error;
  }
}

// Add a comment like
async function addCommentLike(commentId, userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      INSERT INTO comment_likes (comment_id, user_id)
      VALUES (${commentId}, ${userId})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding comment like:', error);
    throw error;
  }
}

// Remove a comment like
async function removeCommentLike(commentId, userId) {
  await ensureInit();
  try {
    await sql`
      DELETE FROM comment_likes
      WHERE comment_id = ${commentId} AND user_id = ${userId}
    `;
    return { message: 'Comment like removed' };
  } catch (error) {
    console.error('Error removing comment like:', error);
    throw error;
  }
}

// Get all comment likes for a user
async function getUserCommentLikes(userId) {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT comment_id FROM comment_likes
      WHERE user_id = ${userId}
    `;
    return rows;
  } catch (error) {
    console.error('Error getting user comment likes:', error);
    throw error;
  }
}

// Get all comment likes with counts
async function getAllCommentLikes() {
  await ensureInit();
  try {
    const { rows } = await sql`
      SELECT comment_id, COUNT(*) as count FROM comment_likes
      GROUP BY comment_id
    `;
    return rows;
  } catch (error) {
    console.error('Error getting all comment likes:', error);
    throw error;
  }
}

module.exports = {
  initDatabase,
  ensureInit,
  getComments,
  createComment,
  deleteComment,
  replyToComment,
  getLikeCount,
  getUserLikeStatus,
  addLike,
  removeLike,
  getAllLikes,
  getUserLikes,
  getCommentLikeCount,
  getUserCommentLikeStatus,
  addCommentLike,
  removeCommentLike,
  getUserCommentLikes,
  getAllCommentLikes
};
