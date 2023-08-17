const mongoose = require('mongoose')

const trackingSchema = new mongoose.Schema({
    userId: String,
    enable: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: ''
    }
})

const trackingCaModel = mongoose.model('trackingCa', trackingSchema)

module.exports = trackingCaModel