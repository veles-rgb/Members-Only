const pool = require("./pool");

async function getAllMessages() {
    const result = await pool.query(`
    SELECT
      messages.id,
      messages.title,
      messages.message,
      messages.timestamp,
      users.id AS user_id,
      users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.timestamp DESC;
  `);

    return result.rows;
}

async function getMessageById(id) {
    const result = await pool.query(`
    SELECT
      messages.id,
      messages.title,
      messages.message,
      messages.timestamp,
      users.id AS user_id,
      users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    WHERE messages.id = $1
  `, [id]);

    return result.rows[0];
}

async function postRegister(name, username, passwordHash) {
    await pool.query(
        "INSERT INTO users (name, username, password_hash) VALUES ($1, $2, $3)",
        [
            name,
            username,
            passwordHash
        ]
    );
}

async function postJoinClub(id) {
    await pool.query(
        "UPDATE users SET is_member = true WHERE id = $1",
        [id]
    );
}

async function postNewMessage(id, title, message) {
    await pool.query(
        "INSERT INTO messages (title, message, user_id) VALUES ($2, $3, $1)",
        [id, title, message]
    );
}

async function postDeleteMessage(id) {
    await pool.query(
        "DELETE FROM messages WHERE id = $1",
        [id]
    );
}

async function getAllUsers({ q = "", sort = "created_at", dir = "desc" } = {}) {
    const allowedSort = new Set(["username", "name", "is_member", "is_admin", "created_at"]);
    const safeSort = allowedSort.has(sort) ? sort : "created_at";

    const safeDir = String(dir).toLowerCase() === "asc" ? "ASC" : "DESC";

    const params = [];
    let where = "";

    if (q && q.length > 0) {
        params.push(`%${q}%`);
        params.push(`%${q}%`);
        where = `WHERE username ILIKE $1 OR name ILIKE $2`;
    }

    const sql = `
    SELECT id, username, name, is_member, is_admin, created_at
    FROM users
    ${where}
    ORDER BY ${safeSort} ${safeDir}, id ${safeDir}
  `;

    const { rows } = await pool.query(sql, params);
    return rows;
}

async function toggleUserMember(id) {
    await pool.query(
        `UPDATE users
     SET is_member = NOT is_member
     WHERE id = $1`,
        [id]
    );
}

async function toggleUserAdmin(id) {
    await pool.query(
        `UPDATE users
     SET is_admin = NOT is_admin
     WHERE id = $1`,
        [id]
    );
}

async function deleteUserById(id) {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
}

async function getUserById(id) {
    const { rows } = await pool.query(
        `SELECT id, name, username, created_at, is_member, is_admin
     FROM users
     WHERE id = $1`,
        [id]
    );
    return rows[0];
}

async function getMessagesByUserId(userId) {
    const { rows } = await pool.query(
        `SELECT m.id, m.title, m.message, m.timestamp, u.username
     FROM messages m
     JOIN users u ON m.user_id = u.id
     WHERE m.user_id = $1
     ORDER BY m.timestamp DESC`,
        [userId]
    );
    return rows;
}


module.exports = {
    getAllMessages,
    getMessageById,
    postRegister,
    postJoinClub,
    postNewMessage,
    postDeleteMessage,
    getAllUsers,
    toggleUserMember,
    toggleUserAdmin,
    deleteUserById,
    getUserById,
    getMessagesByUserId,
};