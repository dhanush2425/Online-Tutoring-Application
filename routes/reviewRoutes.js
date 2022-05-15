const { Router } = require("express");
const reviewController = require("../controller/reviewController");

const router = Router();

router.post("/review", reviewController.publishReview);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);
router.get("/test", (req, res, next) => {
    console.log(req);
    console.log(req.cookies);
    console.log(req.cookies.jwt);
    res.json({ message: "Hello" });
})

module.exports = router;