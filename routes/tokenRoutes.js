const { Router } = require("express");
const auth = require("../middlewares/authMiddleware")
const router = Router();

router.get("/token", auth.validate);

module.exports = router;