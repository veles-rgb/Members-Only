const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

function renderRegisterForm(req, res) {
    if (req.user) return res.redirect("/");

    res.render("registerForm", {
        title: "Register Account",
        errors: []
    });
}

async function postRegisterForm(req, res, next) {
    if (req.user) return res.redirect("/");

    const errors = validationResult(req);

    const { fullname, username } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).render("registerForm", {
            title: "Register Account",
            errors: errors.array()
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.postRegister(fullname, username, hashedPassword);
        return res.redirect("/login");
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    renderRegisterForm,
    postRegisterForm
};