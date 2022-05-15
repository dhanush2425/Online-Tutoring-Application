const { Router } = require("express");
const authController = require("../controller/authController");
const upload = require("../controller/uploadimagecontroller");

const router = Router();

router.post("/signup", upload.single("image"), authController.signup);
router.post("/login", authController.login);

module.exports = router;
