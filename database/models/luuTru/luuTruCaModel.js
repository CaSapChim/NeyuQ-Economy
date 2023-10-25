const mongoose = require('mongoose');

const luuTruCaSchema = new mongoose.Schema({
    userId: String,
    veryCommon: { type: Number, default: 0},
    common: { type: Number, default: 0},
    unCommon: { type: Number, default: 0},
    rare: { type: Number, default: 0},
    veryRare: { type: Number, default: 0},
    Lengendary: { type: Number, default: 0},

})

const luuTruCaSModel = mongoose.model('luutruca', luuTruCaSchema);
module.exports = luuTruCaSModel
