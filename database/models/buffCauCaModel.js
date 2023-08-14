const mongoose = require('mongoose')

const buffSchema = new mongoose.Schema({
    userId: String,
    soLuongBuff: Number,
    type: Number,
})

const buffCauCaModel = mongoose.model('buffCauCa', buffSchema)

module.exports = buffCauCaModel