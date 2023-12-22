const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: String,
    follower: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    slogan: {
        type: String,
        default: "Không có"
    },
    color: {
        type: String,
        default: "Grey"
    }
})

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;