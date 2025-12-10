const { Router } = require("express");
const router = Router();

const registerController = require("../controllers/registerController");

router.get("/", registerController.renderRegisterForm);
router.post("/", registerController.postRegisterForm);

module.exports = router;