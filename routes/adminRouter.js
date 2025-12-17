const { Router } = require("express");
const router = Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.renderAdmin);

router.post("/users/:id/toggle-member", adminController.postToggleMember);
router.post("/users/:id/toggle-admin", adminController.postToggleAdmin);
router.post("/users/:id/delete", adminController.postDeleteUser);

module.exports = router;
