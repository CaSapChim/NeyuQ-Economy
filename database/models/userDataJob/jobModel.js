const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId: String,
    miner: {
        exp: { type: Number, default: 0},
        limit: { type: Number, default: 100},
        level: { type: Number, default: 0},
        thongThao: { type: Number, default: 0}
    },
    fisher: {
        exp: { type: Number, default: 0},
        limit: { type: Number, default: 100},
        level: { type: Number, default: 0},
        thongThao: { type: Number, default: 0}
    },    
    farmer: {
        exp: { type: Number, default: 0},
        limit: { type: Number, default: 100},
        level: { type: Number, default: 0},
        thongThao: { type: Number, default: 0}
    }
})

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;