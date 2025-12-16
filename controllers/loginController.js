const passport = require("passport");

function renderLoginForm(req, res) {
    if (req.user) return res.redirect("/");

    res.render("loginForm", {
        title: "Login",
    });
}

module.exports = {
    renderLoginForm,
};
