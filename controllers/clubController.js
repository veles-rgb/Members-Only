const db = require("../db/queries");

function renderClubForm(req, res) {

    res.render("club", {
        title: "Join The Club!"
    });
}

async function postClubForm(req, res) {

}

module.exports = {
    renderClubForm,
    postClubForm
};