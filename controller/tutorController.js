const tutor = require("../models/tutor");

module.exports.getAllTutors = async (req, res, next) => {
    await tutor.find({}).then(function (tutors) {
        if (tutors) {
            tutors.forEach(function (tut) {
                tut.password = "";
            })
            res.json(tutors);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports.getATutor = async (req, res, next) => {
    await tutor.findById(req.params.id).then(function (tutor) {
        if (tutor) {
            tutor.password = "";
            res.json(tutor);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports.updateTutor = async (req, res, next) => {
    await tutor.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        aboutMe: req.body.aboutMe,
        availableSchedule: req.body.availableSchedule,
        tutoringSubjects: req.body.tutoringSubjects
    }).then(function (result) {
        res.sendStatus(200);
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports.deleteTutor = async (req, res, next) => {
    await tutor.findByIdAndDelete(req.params.id).then(function (tutor) {
        tutor.password = "";
        res.json(tutor);
    }).catch(function (err) {
        console.log(err);
        next();
    })
}

module.exports.addReviewAndRatings = async (req, res, next) => {
    await tutor.findById(req.body.tutorId).then((record) => {
        const currRating = record.averageRatings;
        const currCount = record.numberOfRatings;
        let currTotal = currRating * currCount;
        currTotal+=req.body.stars;
        const rating = ((currTotal) / (currCount + 1));
        record.numberOfRatings = (currCount + 1);
        record.averageRatings = rating;
        let topTenReviews = record.topTenReviews;
        const count = topTenReviews.length;
        topTenReviews.unshift(new Object({
            studentId: req.body.studentId,
            tutorId: req.body.tutorId,
            review: req.body.review,
            stars: req.body.stars,
            studentName: req.body.studentName
        }));
        if (topTenReviews.length > 10) {
            topTenReviews = topTenReviews.slice(0, 10);
        }
        record.topTenReviews = topTenReviews;
        record.save();
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.updateReviewRatings = async (req, res, next, oldResult, newResult) => {

    await tutor.findById(oldResult.tutorId).then((record) => {
        console.log(oldResult, newResult, record);
        let currRating = record.averageRatings;
        const currCount = record.numberOfRatings;
        let currTotal = currRating * currCount;
        currTotal -= oldResult.stars;
        currTotal += newResult.stars;
        currRating = (currTotal / currCount);
        record.averageRatings = currRating;
        record.topTenReviews.forEach((element) => {
            console.log(element.studentId.toString(), oldResult.studentId.toString());
            if (element.studentId.toString() === oldResult.studentId.toString()) {
                element.stars = newResult.stars;
                element.review = newResult.review;
                element.timeStamp = newResult.timeStamp;
            }
        })
        record.save();
    })
}

module.exports.deleteReviewRatings = async (req, res, next, result) => {
    await tutor.findById(result.tutorId).then((record) => {
        let currRating = record.averageRatings;
        let currCount = record.numberOfRatings;
        let currTotalRating = currRating * currCount;
        currTotalRating -= result.stars;
        currCount--;
        record.numberOfRatings = currCount;
        record.averageRatings = (currTotalRating / currCount);
        var filtered =
            record.topTenReviews.filter(function (el) {
                return (el.studentId.toString() != result.studentId);
            });
        record.topTenReviews = filtered;
        record.save();
        //todo : Once u delete get a old rating from reviews table, not needed.

    }).catch((err) => {
        console.log(err);
    })
}