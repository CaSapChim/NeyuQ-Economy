const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    userId: String,
    coins : {type: Number, default: 0},
    token: {type: Number, default: 0},
})

const balanceModel = mongoose.model('balance', balanceSchema)

module.exports = balanceModel