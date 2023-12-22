const mongoose = require("mongoose");

const thanhTuuSchema = new mongoose.Schema({
    userId: String,
    mine: { type: Number, default: 0},
    cauca: { type: Number, default: 0},
    farm: { type: Number, default: 0},
    saphir: { type: Number, default: 0 },
    ruby: { type: Number, default: 0 },
    titan: { type: Number, default: 0 },
    ametit: { type: Number, default: 0 },
    veryRare: { type: Number, default: 0},
    legendary: { type: Number, default: 0},
})

const thanhTuuModel = mongoose.model("thanhtuu", thanhTuuSchema);

module.exports = thanhTuuModel;