const { Router } = require("express");
const passport = require("passport");
const loginController = require("../controllers/loginController");

const router = Router();

router.get("/", loginController.renderLoginForm);
router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

module.exports = router;