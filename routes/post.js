const router = require("express").Router();
const postController = require("../controller/postController");

router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.put("/:postId/like", postController.likePost);
router.get("/:postId", postController.findPost);
router.get("/post/timeline", postController.getAllPost);

module.exports = router;
