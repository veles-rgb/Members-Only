const { Router } = require("express");
const router = Router();

const clubController = require("../controllers/clubController");

router.get("/", clubController.renderClubForm);
router.post("/", clubController.postClubForm);

module.exports = router;