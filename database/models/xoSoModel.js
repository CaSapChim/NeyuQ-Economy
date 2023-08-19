const mongoose = require('mongoose')

const xoSoSchema = new mongoose.Schema({
    number: Number
})

const xoSoModel = mongoose.model('xoso', xoSoSchema)

module.exports = xoSoModel