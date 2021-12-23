const router = require("express").Router();
const authController = require("../controller/authController");

router.post("/register", authController.createUser);
router.post("/login", authController.findUser);

module.exports = router;
