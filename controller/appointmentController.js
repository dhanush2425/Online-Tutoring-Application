const appointmentModel = require("../models/appointment")

module.exports.getAllAppointments = async (req, res, next) => {
    await appointmentModel.find({}).then(function (appointments) {
        res.json(appointments)
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports.getAnAppointment = async (req, res, next) => {
    await appointmentModel.findById(req.params.id).then(function (appointment) {
        if (appointment) {
            res.json(appointment)
        } else {
            res.sendStatus(404);
        }
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports.getAllTutorAppointments = async (req, res, next) => {
    await appointmentModel.find({ tutorId: req.params.id }).then((appointments) => {
        res.json(appointments);
    })
}

module.exports.getAllStudentAppointments = async (req, res, next) => {
    await appointmentModel.find({ studentId: req.params.id }).then((appointments) => {
        res.json(appointments);
    })
}

module.exports.getTutorsTimeSpecificAppointments = async (req, res, next) => {
    console.log(req.query);
    await appointmentModel.findOne({ tutorId: req.query.tutorId, date: req.query.date, time: req.query.time }).then((appointment) => {
        if (appointment) {
            console.log(appointment);
            res.json(appointment);
        } else {
            res.json(null);
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
}

module.exports.makeAnAppointment = async (req, res, next) => {
    await appointmentModel.create({
        tutorId: req.body.tutorId,
        studentId: req.body.studentId,
        date: req.body.date,
        time: req.body.time,
        tutorName: req.body.tutorName,
        tutorEmail: req.body.tutorEmail,
        studentName: req.body.studentName,
        studentEmail: req.body.studentEmail
    }).then(function (appointment) {
        res.json(appointment)
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(400);
    })
}

module.exports.removeAnAppointment = async (req, res, next) => {
    await appointmentModel.findByIdAndDelete(req.params.id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(400);
        })
}

module.exports.updateAnAppointment = async (req, res, next) => {
    await appointmentModel.findOneAndUpdate({ _id: req.params.id },
        {
            approved: req.body.approved
        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(400);
        })
}
