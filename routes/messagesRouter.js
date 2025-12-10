const { Router } = require("express");
const router = Router();

const messagesController = require("../controllers/messagesController");

router.get("/new", messagesController.renderMessageForm);
router.post("/new", messagesController.postNewMessage);
router.get("/:id", messagesController.renderMessageId);


module.exports = router;