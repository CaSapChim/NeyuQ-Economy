const mongoose = require('mongoose');

const scoreTTSchema = new mongoose.Schema({
    userId: String,
    score: {
        type: Number,
        default: 0
    },
});

const scoreTTModel = mongoose.model("scoretrungthu", scoreTTSchema);

module.exports = scoreTTModel;