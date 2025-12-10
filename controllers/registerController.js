const db = require("../db/queries");

function renderRegisterForm(req, res) {

    res.render("registerForm", {
        title: "Register Account"
    });
}

async function postRegisterForm(req, res) {

}

module.exports = {
    renderRegisterForm,
    postRegisterForm
};