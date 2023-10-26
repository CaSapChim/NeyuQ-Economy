const khoangSanModel = require('../../database/models/userDataJob/userKSModel');

module.exports = async (client) => {
    client.khoangsan = (userId, name) => new Promise(async ful => {
        const data = await khoangSanModel.findOne({ userId: userId });
        if(!data) {
            return ful(0);
        }
        if (name == "Than")
            return ful(data.khoangSan.than);     
        else if (name == "Sắt")
            return ful(data.khoangSan.sat);         
        else if ( name == "Vàng")
            return ful(data.khoangSan.vang);  
        else if (name == "Kim cương")
            return ful(data.khoangSan.kimCuong);
        else
            return ful(data.khoangSan.ngocLucBao);
      })
    
      client.addKS = async (userId, name, soLuong) => {
        try {
            let data = await khoangSanModel.findOne({ userId: userId });
            if (!data) {
                data = new khoangSanModel({
                    userId: userId
                });
            }
            if (name == "Than")
                data.khoangSan.than += soLuong;
            else if (name == "Sắt")
                data.khoangSan.sat += soLuong;
            else if ( name == "Vàng")
                data.khoangSan.vang += soLuong;
            else if (name == "Kim cương")
                data.khoangSan.kimCuong += soLuong;
            else
                data.khoangSan.ngocLucBao += soLuong;
            await data.save()
        } catch(err) {
            console.log('Lỗi add ks:', err)
        }
      }
    
      client.truKS = async (userId, name, soLuong) => {
        try {
            let data = await khoangSanModel.findOne({ userId: userId });
            if (name == "Than")
                data.khoangSan.than -= soLuong;
            else if (name == "Sắt")
                data.khoangSan.sat -= soLuong;
            else if ( name == "Vàng")
                data.khoangSan.vang -= soLuong;
            else if (name == "Kim cương")
                data.khoangSan.kimCuong -= soLuong;
            else
                data.khoangSan.ngocLucBao -= soLuong;
            await data.save()
        } catch(err) {
          console.log('Lỗi add cá:', err)
        }
      }
}