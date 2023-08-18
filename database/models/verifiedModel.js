const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    userId: String
})

const verifiedModel = mongoose.model('verify', verifySchema)

module.exports = verifiedModel 