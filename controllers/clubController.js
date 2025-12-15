const db = require("../db/queries");

function renderClubForm(req, res) {
    if (!req.user) return res.redirect("/login");

    res.render("club", {
        title: "Join The Club!",
    });
}

async function postClubForm(req, res, next) {
    try {
        if (!req.user) return res.redirect("/login");

        const code = req.body.clubcode;

        if (code !== process.env.CLUB_CODE) {
            return res.redirect("/club");
        }

        await db.postJoinClub(req.user.id);
        return res.redirect("/club");
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    renderClubForm,
    postClubForm
};