const { default: mongoose } = require('mongoose')
const user = require('./User')

const Student = user.discriminator('Student', new mongoose.Schema({
    school: {
        type: String,
        required: false
    },
    testimonial: {
        type: String,
        required: false
    }
})
);


module.exports = mongoose.model('Student');;