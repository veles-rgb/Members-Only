const passport = require("passport");

function renderLoginForm(req, res) {
    res.render("loginForm", {
        title: "Login",
    });
}

module.exports = {
    renderLoginForm,
};
