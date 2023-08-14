const mongoose = require('mongoose')

const cupSchema = new mongoose.Schema({
    userId: String,
    name: String,
    type: Number,
    soLuong: Number
})

const cupModel = mongoose.model('cup', cupSchema)

module.exports = cupModel