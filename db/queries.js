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

async function postNewMessage(params) {

}

module.exports = {
    getAllMessages,
    getMessageById
};