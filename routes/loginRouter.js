const { Router } = require("express");
const router = Router();

const loginController = require("../controllers/loginController");

router.get("/", loginController.renderLoginForm);
router.post("/", loginController.postLoginForm);

module.exports = router;