const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    hour: {
        type: Number,
        default: 0
    },
    day: {
        type: Number,
        default: 1
    },
    month: {
        type: Number,
        default: 1
    },
    year: {
        type: Number,
        default: 0
    }
})

const timeModel = mongoose.model('time', timeSchema)

module.exports = timeModel