const mongoose = require('mongoose');

const tuoiCaySchema = new mongoose.Schema({
    userId: String,
    tuoiCay: {
        daTuoi: {type: Boolean, default: false},
        timeTuoi: {type: Date, default: null}
    }
})

const tuoiCayModel = mongoose.model("tuoicay", tuoiCaySchema);

module.exports = tuoiCayModel;
