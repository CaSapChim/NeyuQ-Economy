const mongoose = require('mongoose')

const toolCauCaSchema = new mongoose.Schema({
    userId: String,
    name: String,
    type: Number,
    soLuong: Number
})

const toolCauCaModel = mongoose.model('toolCauCa', toolCauCaSchema)

module.exports = toolCauCaModel