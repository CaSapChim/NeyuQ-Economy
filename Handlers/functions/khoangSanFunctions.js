const userModel = require('../../database/models/userDataJob/userKSModel');

module.exports = async (client) => {
    client.khoangsan = (userId, name) => new Promise(async ful => {
        const data = await userModel.findOne({ userId: userId });
        if(!data) {
            return ful(0);
        }
        const khoangSan = {
            "Than": "than",
            "Sắt": "sat",
            "Vàng": "vang",
            "Kim cương": "kimCuong",
            "Ngọc lục bảo": "ngocLucBao",
        }
        const property = khoangSan[name];
        if (property) {
            return ful(data.khoangSan[property]);
        }
      })
    
      client.addKS = async (userId, name, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            if (!data) {
                data = new userModel({
                    userId: userId
                });
            }
            const khoangSan = {
                "Than": "than",
                "Sắt": "sat",
                "Vàng": "vang",
                "Kim cương": "kimCuong",
                "Ngọc lục bảo": "ngocLucBao",
            }
            const property = khoangSan[name];
            if (property) {
                data.khoangSan[property] += soLuong;
            }
            await data.save()
        } catch(err) {
            console.log('Lỗi add ks:', err)
        }
      }
    
      client.truKS = async (userId, name, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            const khoangSan = {
                "Than": "than",
                "Sắt": "sat",
                "Vàng": "vang",
                "Kim cương": "kimCuong",
                "Ngọc lục bảo": "ngocLucBao",
            }
            const property = khoangSan[name];
            if (property) {
                data.khoangSan[property] -= soLuong;
            }
            await data.save()
        } catch(err) {
          console.log('Lỗi add cá:', err)
        }
      }
}