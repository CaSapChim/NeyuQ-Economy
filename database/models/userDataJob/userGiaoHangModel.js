const mongoose = require('mongoose');

const userQuestSchema = new mongoose.Schema({
    userId: String,
    giaohang: {
        banhMi: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        botMi: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        trung: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        shushi: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        thitHeo: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        banhKem: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        banhBi: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        sua: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        butter: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        caDongHop: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        lua: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        hatDau: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        bi: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        caRot: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        khoaiTay: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        },
        duaHau: { 
            isCompleted: { type: Boolean, default: false },
            enable: { type: Boolean, default: false },
            requirement: {type: Number, default: 0},
            reward: {type: Number, default: 0}
        }
    }
})

module.exports = mongoose.model("userQuest", userQuestSchema);