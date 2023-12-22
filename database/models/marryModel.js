const mongoose = require('mongoose')

const marrySchema = new mongoose.Schema({
    userId1: {
        type: String,
    },
    userId2: {
        type: String,
    },
    marriedAt: {
        type: Date,
        default: Date.now()
    },
    level: { type: Number, default: 0},
})

const marryModel = mongoose.model('marry', marrySchema)

module.exports = marryModel