const { Router } = require("express");
const router = Router();

const registerController = require("../controllers/registerController");
const validateRegister = require("../validators/validateRegister");

router.get("/", registerController.renderRegisterForm);
router.post("/", validateRegister, registerController.postRegisterForm);

module.exports = router;