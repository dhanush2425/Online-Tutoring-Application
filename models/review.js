const { default: mongoose } = require('mongoose')

const reviewSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    studentName: {
        type: String,
        required: true
    },
    tutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor'
    },
    review: {
        type: String
    },
    stars: {
        type: Number
    },
    timeStamp: {
        type: Date
    }
});

module.exports.reviewModel = mongoose.model('Review', reviewSchema);
module.exports.reviewSchema = reviewSchema;