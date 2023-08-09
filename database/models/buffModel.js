const mongoose = require('mongoose')

const buffSchema = new mongoose.Schema({
    userId: String,
    soLuongBuff: Number,
    type: Number,
})

const buffModel = mongoose.model('buff', buffSchema)

module.exports = buffModel