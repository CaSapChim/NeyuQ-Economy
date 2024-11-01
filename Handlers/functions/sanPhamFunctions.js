const sanPhamModel = require('../../database/models/userDataJob/sanPhamModel');

module.exports = async(client) => {
    client.sanPham = (userId, name) => new Promise(async ful => {
        let data = await sanPhamModel.findOne({ userId: userId });
        const sanPham = {
            "sữa": "sua",
            "trứng": "trung",
            "thịt heo": "thitHeo",
            "bột mì": "botMi",
            "bơ": "butter",
            "bánh mì": "banhMi",
            "bánh kem": "banhKem",
            "bánh bí": "banhBi",
            "shushi": "shushi",
            "cá đóng hộp": "caDongHop",
            "thức ăn bò": "thucAnBo",
            "thức ăn gà": "thucAnGa",
            "thức ăn heo": "thucAnHeo"
        };
        const property = sanPham[name];
        if (property)
            return ful(data.sanPhamNS[property]);
    })

    client.addSanPham = async (userId, name, soLuong) => {
        let data = await sanPhamModel.findOne({ userId: userId });
        const sanPham = {
            "sữa": "sua",
            "trứng": "trung",
            "thịt heo": "thitHeo",
            "bột mì": "botMi",
            "bơ": "butter",
            "bánh mì": "banhMi",
            "bánh kem": "banhKem",
            "bánh bí": "banhBi",
            "shushi": "shushi",
            "cá đóng hộp": "caDongHop",
            "thức ăn bò": "thucAnBo",
            "thức ăn gà": "thucAnGa",
            "thức ăn heo": "thucAnHeo"
        };
        const property = sanPham[name];
        if (property)
            data.sanPhamNS[property] += soLuong;
        data.save();
    }

    client.truSanPham = async (userId, name, soLuong) => {
        let data = await sanPhamModel.findOne({ userId: userId });
        const sanPham = {
            "sữa": "sua",
            "trứng": "trung",
            "thịt heo": "thitHeo",
            "bột mì": "botMi",
            "bơ": "butter",
            "bánh mì": "banhMi",
            "bánh kem": "banhKem",
            "bánh bí": "banhBi",
            "shushi": "shushi",
            "cá đóng hộp": "caDongHop",
            "thức ăn bò": "thucAnBo",
            "thức ăn gà": "thucAnGa",
            "thức ăn heo": "thucAnHeo"
        };
        const property = sanPham[name];
        if (property)
            data.sanPhamNS[property] -= soLuong;
        data.save();
    }
}