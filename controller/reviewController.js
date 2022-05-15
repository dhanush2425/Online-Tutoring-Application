const { reviewModel } = require("../models/review");
const tutorController = require("./tutorController");

module.exports.publishReview = async (req, res, next) => {
    await reviewModel.create({
        studentId: req.body.studentId,
        studentName: req.body.studentName,
        tutorId: req.body.tutorId,
        review: req.body.review,
        stars: req.body.stars,
        timeStamp: new Date()
    }).then(async (review) => {
        await tutorController.addReviewAndRatings(req, res, next);
        res.json(review);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
}

module.exports.deleteReview = async (req, res, next) => {
    await reviewModel.findByIdAndDelete(req.params.id)
        .then(async function (result) {
            await tutorController.deleteReviewRatings(req, res, next, result);
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(400);
        })
}

module.exports.updateReview = async (req, res, next) => {
    await reviewModel.findOneAndUpdate({ _id: req.params.id },
        {
            review: req.body.review,
            stars: req.body.stars,
            timeStamp: new Date()
        }).then(async function (oldResult) {
            const newResult = await reviewModel.findById(req.params.id);
            await tutorController.updateReviewRatings(req, res, next, oldResult, newResult);
            res.sendStatus(200);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(400);
        })
}

