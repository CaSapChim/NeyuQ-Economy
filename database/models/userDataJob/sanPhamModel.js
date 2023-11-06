const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
    userId: String,
    sanPhamNS: {
        sua: { type: Number, default: 0},
        trung: { type: Number, default: 0},
        thitHeo: { type: Number, default: 0},
        botMi: { type: Number, default: 0},
        bo: { type: Number, default: 0},
        banhMi: { type: Number, default: 0},
        shushi: { type: Number, default: 0},
        caDongHop: { type: Number, default: 0},
    },
    foodAnimal: {
        bo: { type: Number, default: 0},
        ga: { type: Number, default: 0},
        heo: { type: Number, default: 0},
    }
})

const sanPhamModel = mongoose.model('sanpham', sanPhamSchema);
module.exports = sanPhamModel
