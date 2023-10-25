const mongoose = require('mongoose');

const luuTruKSSchema = new mongoose.Schema({
    userId: String,
    than: { type: Number, default: 0},
    sat: { type: Number, default: 0},
    vang: { type: Number, default: 0},
    kimCuong: { type: Number, default: 0},
    ngocLucBao: { type: Number, default: 0},
})

const luuTruKSSModel = mongoose.model('User', luuTruKSSchema);
module.exports = luuTruKSSModel