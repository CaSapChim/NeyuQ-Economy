const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    userId: String,
    planted: Boolean,
    canHarvest: {type: Boolean, default: false},
    soLuongPlanted: {
        type: Number,
        default: 0
    },
    plantName: String,
    plantedAt: Date,
    timeTuoi: {type: Date, default: null},
}); 

const plantModel = mongoose.model("trongcay", plantSchema);
module.exports = plantModel;