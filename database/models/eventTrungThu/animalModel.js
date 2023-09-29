const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: {
        type: Number,
        default: 0
    }
})

const animalModel = mongoose.model('animal', animalSchema);

module.exports = animalModel;