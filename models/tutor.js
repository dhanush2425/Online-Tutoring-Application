const { default: mongoose } = require('mongoose')
const user = require('./User')
const { reviewSchema } = require('./review')

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: false
    },
    hoursRange: [
        {
            range: {
                type: String,
                required: false
            }
        }
    ]
});

const tutorSchema = new mongoose.Schema({
    averageRatings: {
        type: Number,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        default: 0
    },
    totalTutoringHours: {
        type: Number,
        default: 0
    },
    aboutMe: {
        type: String
    },
    tutoringSubjects: [
        {
            type: String
        }
    ],
    availableSchedule: [scheduleSchema],
    topTenReviews: [reviewSchema]
});



const Tutor = user.discriminator('Tutor', tutorSchema);


module.exports = mongoose.model('Tutor');