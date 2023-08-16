const mongoose = require("mongoose")

const caScoreSchema = new mongoose.Schema({
    userId: String,
    score: {
        type: Number,
        default: 0
    }
})

const caScoreModel = mongoose.model('caScore', caScoreSchema)

module.exports = caScoreModel