const mongoose = require('mongoose')

const cfsSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    }
})

const cfsModel = mongoose.model('confession', cfsSchema)

module.exports = cfsModel