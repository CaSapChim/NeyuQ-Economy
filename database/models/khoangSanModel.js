const mongoose = require('mongoose')

const khoangSanSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: {
        type: Number,
        default: 0
    }
}) 

const khoangSanModel = mongoose.model('khoangsan', khoangSanSchema)

module.exports = khoangSanModel