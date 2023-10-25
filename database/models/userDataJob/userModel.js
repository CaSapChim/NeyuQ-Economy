const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        require: true,
        unique: true
    },
    serverId: {
        type: String,
        require: true
    },
    daily: {
        streak: { type: Number, default: 0 },
        timestamp: Date,
    },
    job: {
        jobType: {
            type: String, default: "" 
        },
        currentExpJob: {
            type: Number, default: 0
        },
        maxExpJob: {
            type: Number, default: 100
        },
        levelJob: {
            type: Number, default: 1
        }
    }
    
},
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at'
        }
    }
)

const userModel = mongoose.model('User', userSchema);
module.exports = userModel
