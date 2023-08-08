const mongoose = require('mongoose')

const dropGiftSchema = new mongoose.Schema({
    userId: String,
    soLuong: {
        type: Number,
        default: 0
    },
    mayman: {
        type: Number,
        default: 0
    }
})

const dropGiftModel = mongoose.model('dropgift', dropGiftSchema)

module.exports = dropGiftModel