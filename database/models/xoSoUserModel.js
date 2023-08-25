const mongoose = require('mongoose')

const xoSoUserSchema = new mongoose.Schema({
    userId: String,
    soLuong: [String]
})

const xoSoUserModel = mongoose.model('xosouser', xoSoUserSchema)

module.exports = xoSoUserModel