const mongoose = require('mongoose')

const banSchema = new mongoose.Schema({
    username: String,
    userId: String
})

const banModel = mongoose.model('ban', banSchema)

module.exports = banModel