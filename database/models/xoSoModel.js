const mongoose = require('mongoose')

const xoSoSchema = new mongoose.Schema({
    userId: [String], 
    giaiDB: {
        type: Number,
        default: 0
    },
    giaiNhat: {
        type: Number,
        default: 0
    },
    giaiNhi: {
        type: Number,
        default: 0
    },
    giaiBa: {
        type: Number,
        default: 0
    },
    giaiKK: {
        type: Number,
        default: 0
    },

})

const xoSoModel = mongoose.model('xoso', xoSoSchema)

module.exports = xoSoModel