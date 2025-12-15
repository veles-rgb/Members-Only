const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function renderMessageId(req, res, next) {
    if (!req.user) return res.redirect("/login");

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
    if (!req.user) return res.redirect("/login");

    res.render("messageForm", {
        title: "New Message",
        errors: []
    });
}

async function postNewMessage(req, res, next) {
    if (!req.user) return res.redirect("/login");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("messageForm", {
            title: "New Message",
            errors: errors.array()
        });
    }

    try {
        const { title, message } = req.body;

        await db.postNewMessage(req.user.id, title, message);
        res.redirect("/");
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    renderMessageId,
    renderMessageForm,
    postNewMessage
};