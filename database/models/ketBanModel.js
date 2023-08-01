const mongoose = require('mongoose')

const ketbanSchema = new mongoose.Schema({
    userId1: {
        type: String,
        require: true
    },
    userId2: {
        type: String,
        require: true
    },
    addFriendAt: {
        type: Date,
        default: Date.now()
    }
})

const ketBanModel = mongoose.model('ketban', ketbanSchema)

module.exports = ketBanModel