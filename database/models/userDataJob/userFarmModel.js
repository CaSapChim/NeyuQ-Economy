const mongoose = require('mongoose')

const userFarmSchema = new mongoose.Schema({
    userId: String,
    plant: {
        hatLua: { type: Number, default: 0 },
        hatDau: { type: Number, default: 0 },
        hatBi: { type: Number, default: 0 },
        hatDuaHau: { type: Number, default: 0 },
        khoaiTay: { type: Number, default: 0 },
        caRot: { type: Number, default: 0 },
        lua: { type: Number, default: 0 },
        bi: { type: Number, default: 0 },
        duaHau: { type: Number, default: 0 },
    },
    animal: {
        bo: { type: Number, default: 0 },
        ga: { type: Number, default: 0 },
        heo: { type: Number, default: 0 },
    },
    land: {
        type: Number, default: 20
    }
}) 

const userFarmModel = mongoose.model('userfarm', userFarmSchema)

module.exports = userFarmModel;