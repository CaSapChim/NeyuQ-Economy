const mongoose = require('mongoose')

const caSchema = new mongoose.Schema({
    userId: String,
    ca: {
        veryCommon: { type: Number, default: 0},
        unCommon: { type: Number, default: 0},
        common: { type: Number, default: 0},
        rare: { type: Number, default: 0},
        veryRare: { type: Number, default: 0},
        legendary: { type: Number, default: 0},
    }
})

const caModel = mongoose.model('fish', caSchema)

module.exports = caModel