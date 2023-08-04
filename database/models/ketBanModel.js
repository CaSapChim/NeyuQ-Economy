const mongoose = require('mongoose')

const ketbanSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    username: String,
    friends: {
        type: [String],
    },
    addFriendAt: {
        type: Date,
        default: Date.now()
    }
})

const ketBanModel = mongoose.model('ketban', ketbanSchema)

module.exports = ketBanModel