const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    userId: String,
    soLuong: {
        type: Number,
        default: 10
    }
})

const landModel = mongoose.model('land', landSchema);

module.exports = landModel;