const db = require("../db/queries");

function requireAdmin(req, res) {
    if (!req.user || !req.user.is_admin) {
        res.redirect("/");
        return false;
    }
    return true;
}

async function renderAdmin(req, res, next) {
    if (!requireAdmin(req, res)) return;

    const q = (req.query.q || "").trim();
    const sort = (req.query.sort || "created_at").trim();
    const dir = (req.query.dir || "desc").trim();

    try {
        const users = await db.getAllUsers({ q, sort, dir });

        return res.render("admin", {
            title: "Admin Panel",
            users,
            q,
            sort,
            dir,
        });
    } catch (err) {
        return next(err);
    }
}

async function postToggleMember(req, res, next) {
    if (!requireAdmin(req, res)) return;

    const id = req.params.id;

    try {
        await db.toggleUserMember(id);
        return res.redirect("/admin");
    } catch (err) {
        return next(err);
    }
}

async function postToggleAdmin(req, res, next) {
    if (!requireAdmin(req, res)) return;

    const id = req.params.id;

    try {
        await db.toggleUserAdmin(id);
        return res.redirect("/admin");
    } catch (err) {
        return next(err);
    }
}

async function postDeleteUser(req, res, next) {
    if (!requireAdmin(req, res)) return;

    const id = req.params.id;

    if (req.user && String(req.user.id) === String(id)) {
        return res.redirect("/admin");
    }

    try {
        await db.deleteUserById(id);
        return res.redirect("/admin");
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    renderAdmin,
    postToggleMember,
    postToggleAdmin,
    postDeleteUser,
};
