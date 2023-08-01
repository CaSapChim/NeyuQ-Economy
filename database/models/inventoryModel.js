const mongoose = require('mongoose')

const invSchema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        soLuong: { type: mongoose.Schema.Types.Number , default: 0} 
    }
)

const invModel = mongoose.model('inventory', invSchema)

module.exports = invModel