const mongoose = require('mongoose')

const buffSchema = new mongoose.Schema({
    userId: String,
    soLuongBuff: Number,
    type: Number,
})

const buffMineModel = mongoose.model('buffmine', buffSchema)

module.exports = buffMineModel