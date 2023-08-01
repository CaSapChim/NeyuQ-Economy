const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: Number,
    type: Number
})

const itemModel = mongoose.model('item', itemSchema)

module.exports = itemModel