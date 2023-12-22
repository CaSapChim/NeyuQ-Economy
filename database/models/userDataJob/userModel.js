const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        require: true,
        unique: true
    },
    serverId: {
        type: String,
        require: true
    },
    daily: {
        streak: { type: Number, default: 0 },
        timestamp: Date,
    },
    khoangSan: {
        than: { type: Number, default: 0 },
        sat: { type: Number, default: 0 },
        vang: { type: Number, default: 0 },
        kimCuong: { type: Number, default: 0 },
        ngocLucBao: { type: Number, default: 0 },
        saphir: { type: Number, default: 0 },
        ruby: { type: Number, default: 0 },
        titan: { type: Number, default: 0 },
        ametit: { type: Number, default: 0 },
    },
    ca: {
        veryCommon: { type: Number, default: 0},
        unCommon: { type: Number, default: 0},
        common: { type: Number, default: 0},
        rare: { type: Number, default: 0},
        veryRare: { type: Number, default: 0},
        legendary: { type: Number, default: 0},
    },
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
},
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at'
        }
    }
)

const userModel = mongoose.model('User', userSchema);
module.exports = userModel
