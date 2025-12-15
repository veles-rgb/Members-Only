const db = require("../db/queries");

async function renderIndex(req, res) {
    const messages = await db.getAllMessages();

    res.render("index", {
        title: "Home",
        messages
    });
}

module.exports = {
    renderIndex,
};