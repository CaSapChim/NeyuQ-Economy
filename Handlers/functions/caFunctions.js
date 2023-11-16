const userModel = require("../../database/models/userDataJob/userModel");

module.exports = async(client) => {
    client.ca = (userId, name) => new Promise(async ful => {
        const data = await userModel.findOne({ userId: userId });
        if(!data) return ful(0);
            const caObj = {
            "Very Common": "veryCommon",
            "Common": "common",
            "Uncommon": "unCommon",
            "Rare": "rare",
            "Very Rare": "veryRare",
            "Legendary": "legendary",
        };
        const property = caObj[name];
        if (property)
            return ful(data.ca[property]);
      })

    client.addCa = async (userId, name, soLuong) => {
        try {   
            let data = await userModel.findOne({ userId: userId });
            if (!data) {
                data = new userModel({
                    userId: userId
                });
            }
            const caObj = {
                "Very Common": "veryCommon",
                "Common": "common",
                "Uncommon": "unCommon",
                "Rare": "rare",
                "Very Rare": "veryRare",
                "Legendary": "legendary",
            };
            const property = caObj[name];
            if (property)
                data.ca[property] += soLuong;
            await data.save();
        } catch(err) {  
            console.log("Lỗi addCa: ", err);
        }
    }

    client.truCa = async (userId, name, soLuong) => {
        try {   
            let data = await userModel.findOne({ userId: userId });
            const caObj = {
                "Very Common": "veryCommon",
                "Common": "common",
                "Uncommon": "unCommon",
                "Rare": "rare",
                "Very Rare": "veryRare",
                "Legendary": "legendary",
            };
            const property = caObj[name];
            if (property)
                data.ca[property] -= soLuong;
            await data.save();
        } catch(err) {  
            console.log("Lỗi addCa: ", err);
        }
    }
}