const mongoose = require('mongoose')

const khoangSanSchema = new mongoose.Schema({
    userId: String,
    khoangSan: {
        than: { type: Number, default: 0 },
        sat: { type: Number, default: 0 },
        vang: { type: Number, default: 0 },
        kimCuong: { type: Number, default: 0 },
        ngocLucBao: { type: Number, default: 0 },
    }
}) 

const khoangSanModel = mongoose.model('khoangsan', khoangSanSchema)

module.exports = khoangSanModel