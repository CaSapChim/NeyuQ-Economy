const mongoose = require('mongoose');

const premiumSchema = new mongoose.Schema({
    userId: String,
    premium: {
        type: Boolean,
        default: false
    },
    expire: {
        type: Date,
        default: null
    }
})

const premiumModel = mongoose.model("premium", premiumSchema);

module.exports = premiumModel;