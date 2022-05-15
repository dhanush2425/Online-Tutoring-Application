const student = require("../models/student");

module.exports.getAllStudents = async (req, res, next) => {
    await student.find({}).then(function (students) {
        if (students) {
            students.forEach(function (tut) {
                tut.password = "";
            })
            res.json(students);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports.getAStudent = async (req, res, next) => {
    await student.findById(req.params.id).then(function (stdnt) {
        if (stdnt) {
            stdnt.password = "";
            res.json(stdnt);
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports.updateStudent = async (req, res, next) => {
    await student.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        school: req.body.school,
        testimonial: req.body.testimonial
    }).then(function (result) {
        res.sendStatus(200);
    }).catch(function (err) {
        console.log(err);
    })
}