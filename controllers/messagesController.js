const db = require("../db/queries");

async function renderMessageId(req, res, next) {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    try {
        const message = await db.getMessageById(id);
        if (!message) {
            return res.status(404).render("404", { title: "Message Not Found" });
        }

        res.render("messageId", {
            title: message.title,
            message
        });
    } catch (err) {
        next(err);
    }
}

function renderMessageForm(req, res) {

    res.render("messageForm", {
        title: "New Message"
    });
}

async function postNewMessage(req, res) {

}

module.exports = {
    renderMessageId,
    renderMessageForm,
    postNewMessage
};