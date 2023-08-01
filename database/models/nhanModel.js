const mongoose = require('mongoose')

const nhanSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: Number,
    type: Number
})

const nhanModel = mongoose.model('nhan', nhanSchema)

module.exports = nhanModel