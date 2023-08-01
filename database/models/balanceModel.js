const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    userId: String,
    coins : Number
})

const balanceModel = mongoose.model('balance', balanceSchema)

module.exports = balanceModel