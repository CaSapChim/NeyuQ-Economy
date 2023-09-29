const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    userId: String,
    planted: Boolean,
    soLuongPlanted: {
        type: Number,
        default: 0
    },
    plantName: String,
    plantedAt: Date,
}); 

const plantModel = mongoose.model("trongcay", plantSchema);
module.exports = plantModel;