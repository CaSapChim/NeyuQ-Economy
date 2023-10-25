const mongoose = require('mongoose')
const mongodbURI = require('../config.json').MONGO

module.exports = {
    async initializeMongoose() {
        console.log('Đang kết nối với MongDB...');

        try {
            await mongoose.connect(mongodbURI, {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        } catch(err) {
            console.log('Không kết nối được với database', err);
            process.exit(1)
        }
    },
     models: {
        User: require('./models/userDataJob/userModel.js')
    }
}