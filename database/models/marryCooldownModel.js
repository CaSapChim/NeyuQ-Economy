const mongoose = require('mongoose')

const cooldownmarryschema = new mongoose.Schema({
    userId: {
        type: String,
    },
    lastHon: {type: Date, default: null}
})

const coolDownMarryModel = mongoose.model('cooldownmarry', cooldownmarryschema)

module.exports = coolDownMarryModel