const pool = require("./pool");

async function getAllMessages() {
    const result = await pool.query(`
        SELECT messages.id, messages.title, messages.message, messages.timestamp, users.username
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

module.exports = {
    getAllMessages,
    getMessageById,
    postRegister,
    postJoinClub,
    postNewMessage
};