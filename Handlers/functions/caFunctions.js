const caModel = require("../../database/models/userDataJob/userFishModel");

module.exports = async(client) => {
    client.ca = (userId, name) => new Promise(async ful => {
        const data = await caModel.findOne({ userId: userId });
        if(!data) return ful(0);
        if (name == "Very Common")
            return ful(data.ca.veryCommon);     
        else if (name == "Common")
            return ful(data.ca.common);         
        else if ( name == "Uncommon")
            return ful(data.ca.unCommon);  
        else if (name == "Rare")
            return ful(data.ca.rare);
        else if (name == "Very Rare")
            return ful(data.ca.veryRare);
        else    
            return ful(data.ca.legendary);
      })

    client.addCa = async (userId, name, soLuong) => {
        try {   
            let data = await caModel.findOne({ userId: userId });
            if (!data) {
                data = new caModel({
                    userId: userId
                });
            }
            if (name == "Very Common")
                data.ca.veryCommon += soLuong;
            else if (name == "Common") 
                data.ca.common += soLuong;
            else if (name == "Uncommon") 
                data.ca.unCommon += soLuong;
            else if (name == "Rare")
                data.ca.rare += soLuong;
            else if (name == "Very Rare")
                data.ca.veryRare += soLuong;
            else
                data.ca.legendary += soLuong;
            await data.save();
        } catch(err) {  
            console.log("Lỗi addCa: ", err);
        }
    }

    client.truCa = async (userId, name, soLuong) => {
        try {   
            let data = await caModel.findOne({ userId: userId });
            if (name == "Very Common")
                data.ca.veryCommon -= soLuong;
            else if (name == "Common") 
                data.ca.common -= soLuong;
            else if (name == "Uncommon") 
                data.ca.unCommon -= soLuong;
            else if (name == "Rare")
                data.ca.rare -= soLuong;
            else if (name == "Very Rare")
                data.ca.veryRare -= soLuong;
            else
                data.ca.legendary -= soLuong;
            await data.save();
        } catch(err) {  
            console.log("Lỗi addCa: ", err);
        }
    }
}