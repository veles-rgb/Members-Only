const db = require("../db/queries");

async function renderUserProfile(req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!req.user.is_member) return res.redirect("/club");

    const id = req.params.id;

    try {
        const profileUser = await db.getUserById(id);
        if (!profileUser) return res.status(404).render("404", { title: "User Not Found" });

        const messages = await db.getMessagesByUserId(id);

        return res.render("userProfile", {
            title: `User: ${profileUser.username}`,
            profileUser,
            messages,
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    renderUserProfile,
};
