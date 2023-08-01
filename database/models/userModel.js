const mongoose = require('mongoose');
const invModel = require('./inventoryModel');
const cupModel = require('./itemModel');

const userSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    serverId: {
        type: String,
        require: true
    },
    daily: {
        streak: { type: Number, default: 0 },
        timestamp: Date,
    },
    inventory: [invModel.schema]
    
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
