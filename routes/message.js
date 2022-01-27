const router = require("express").Router();
const messageController = require("../controller/messageController");

router.post("/", messageController.createMessage);
router.get("/:conversationId", messageController.getMessage);

module.exports = router;
