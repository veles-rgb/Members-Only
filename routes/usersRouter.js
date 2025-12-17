const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");

router.get("/:id", usersController.renderUserProfile);

module.exports = router;
