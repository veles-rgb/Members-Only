const { Router } = require("express");
const router = Router();

const messagesController = require("../controllers/messagesController");
const validateNewMessage = require("../validators/validateNewMessage");

router.get("/new", messagesController.renderMessageForm);
router.post("/new", validateNewMessage, messagesController.postNewMessage);
router.get("/:id", messagesController.renderMessageId);
router.post("/delete", messagesController.postDeleteMessage);


module.exports = router;