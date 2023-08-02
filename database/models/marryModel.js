const mongoose = require('mongoose')

const marrySchema = new mongoose.Schema({
    userId1: {
        type: String,
        require: true
    },
    userId2: {
        type: String,
        require: true
    },
    marriedAt: {
        type: Date,
        default: Date.now()
    }
})

const marryModel = mongoose.model('marry', marrySchema)

module.exports = marryModel