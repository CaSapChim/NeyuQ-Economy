const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
    prefix: String,
    guildId: String
})

const prefixModel = mongoose.model('prefix', prefixSchema)

module.exports = prefixModel