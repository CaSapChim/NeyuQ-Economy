const mongoose = require('mongoose')

const caSchema = new mongoose.Schema({
    userId: String,
    soLuong: {
        type: Number,
        default: 0
    }
})

const caModel = mongoose.model('fish', caSchema)

module.exports = caModel