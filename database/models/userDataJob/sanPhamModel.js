const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
    userId: String,
    sanPhamNS: {
        sua: { type: Number, default: 0},
        trung: { type: Number, default: 0},
        thitHeo: { type: Number, default: 0},
        botMi: { type: Number, default: 0},
        butter: { type: Number, default: 0},
        banhMi: { type: Number, default: 0},
        shushi: { type: Number, default: 0},
        caDongHop: { type: Number, default: 0},
        banhBi: { type: Number, default: 0},
        banhKem: { type: Number, default: 0},
        thucAnBo: { type: Number, default: 0},
        thucAnGa: { type: Number, default: 0},
        thucAnHeo: { type: Number, default: 0},
    }
})

const sanPhamModel = mongoose.model('sanpham', sanPhamSchema);
module.exports = sanPhamModel
