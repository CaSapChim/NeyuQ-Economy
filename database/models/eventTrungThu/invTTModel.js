const mongoose = require('mongoose');

const trungThuInvSchema = new mongoose.Schema({
    userId: String,
    name: String,
    soLuong: {
        type: Number,
        default: 0
    },
});

const trungThuInvModel = mongoose.model("trungthuinv", trungThuInvSchema);

module.exports = trungThuInvModel;