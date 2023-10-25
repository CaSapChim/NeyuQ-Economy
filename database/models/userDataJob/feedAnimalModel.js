const mongoose = require('mongoose');

const feedAnimalSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: {
        type: Number,
        default: 0
    },
    fed: {
        type: Boolean,
        default: false
    },
    fedAt: Date
})

const feedAnimalModel = mongoose.model('feedanimal', feedAnimalSchema);

module.exports = feedAnimalModel;