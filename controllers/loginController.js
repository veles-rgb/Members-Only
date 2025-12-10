const db = require("../db/queries");

function renderLoginForm(req, res) {

    res.render("loginForm", {
        title: "Login"
    });
}

async function postLoginForm(req, res) {

}

module.exports = {
    renderLoginForm,
    postLoginForm
};