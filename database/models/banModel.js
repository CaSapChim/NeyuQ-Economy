const mongoose = require('mongoose')

const banSchema = new mongoose.Schema({
    userId: String
})

const banModel = mongoose.model('ban', banSchema)

module.exports = banModel