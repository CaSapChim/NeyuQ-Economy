const mongoose = require('mongoose')

const timeSchemaTest = new mongoose.Schema({
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

const timeModelTest = mongoose.model('timetest', timeSchemaTest)

module.exports = timeModelTest