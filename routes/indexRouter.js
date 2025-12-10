const { Router } = require("express");
const router = Router();

const indexController = require("../controllers/indexController");

router.get("/", indexController.renderIndex);


module.exports = router;