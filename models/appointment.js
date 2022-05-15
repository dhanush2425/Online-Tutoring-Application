const { default: mongoose } = require('mongoose')

const appointmentSchema = new mongoose.Schema(
    {
        tutorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tutor'
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        tutorName: {
            type: String,
            required: true
        },
        tutorEmail: {
            type: String,
            required: true
        },
        studentName: {
            type: String,
            required: true
        },
        studentEmail: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        approved: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model('Appointment', appointmentSchema);