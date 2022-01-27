const router = require("express").Router();
const conversationController = require("../controller/conversationController");

router.post("/", conversationController.createConversation);
router.get("/:userId", conversationController.getConversation);

module.exports = router;
