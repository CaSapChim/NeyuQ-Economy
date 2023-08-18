const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
    username: String,
    userId: String,
    soLuong: Number,
})

const warnModel = mongoose.model('warn', warnSchema)

module.exports = warnModel