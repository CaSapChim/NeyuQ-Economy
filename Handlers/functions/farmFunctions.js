const userModel = require("../../database/models/userDataJob/userModel");
const feedAnimalModel = require("../../database/models/userDataJob/feedAnimalModel");
const plantModel = require('../../database/models/userDataJob/plantModel');
const emoji = require('../../emoji.json');

module.exports = async(client) => {
    client.nongSan = (userId, name) => new Promise(async ful => {
        let data = await userModel.findOne({ userId: userId });
        if(!data) return ful(0);
        const nongSan = {
            "hạt lúa": "hatLua",
            "hạt đậu": "hatDau",
            "hạt bí": "hatBi",
            "hạt dưa hấu": "hatDuaHau",
            "khoai tây": "khoaiTay",
            "cà rốt": "caRot",
            "lúa": "lua",
            "bí": "bi",
            "dưa hấu": "duaHau",
        };
        const property = nongSan[name];
        if (property)
            return ful(data.plant[property]);
      })
    
    client.addNongSan = async (userId, name, soLuong) => {
        try {
            const nongSan = {
                "hạt lúa": "hatLua",
                "hạt đậu": "hatDau",
                "hạt bí": "hatBi",
                "hạt dưa hấu": "hatDuaHau",
                "khoai tây": "khoaiTay",
                "cà rốt": "caRot",
                "lúa": "lua",
                "bí": "bi",
                "dưa hấu": "duaHau",
            };
            let data = await userModel.findOne({ userId: userId });
            if (!data) {
                data = new userModel({
                    userId: userId
                });
            }
           const property = nongSan[name];
           if (property) 
               data.plant[property] += soLuong;
            await data.save();
        } catch(err) {
            console.log('Lỗi add nông sản: ', err);
        }
    }

    client.truNongSan = async (userId, name, soLuong) => {
        try {
            const nongSan = {
                "hạt lúa": "hatLua",
                "hạt đậu": "hatDau",
                "hạt bí": "hatBi",
                "hạt dưa hấu": "hatDuaHau",
                "khoai tây": "khoaiTay",
                "cà rốt": "caRot",
                "lúa": "lua",
                "bí": "bi",
                "dưa hấu": "duaHau",
            };
            let data = await userModel.findOne({ userId: userId });
            if (!data) {
                data = new userModel({
                    userId: userId
                });
            }
           if (!data) {
               data = new userModel({
                   userId: userId
               });
           }

           const property = nongSan[name];
           if (property) 
               data.plant[property] -= soLuong;
            await data.save();
        } catch(err) {
            console.log('Lỗi trừ nông sản: ', err);
        }
    }
    
    client.trongCay = async (userId, name, soLuong) => {
    try { 
        let data = await plantModel.findOne({ userId: userId, plantName: name})
        if (!data) {
        data = new plantModel({
            userId: userId,
            plantName: name,
            soLuongPlanted: soLuong,
            planted: true,
            plantedAt: new Date()
        })
        } else if(!data.plantedAt) {
        await plantModel.findOneAndUpdate(
            {userId: userId, plantName: name},
            {plantedAt: new Date(), soLuongPlanted: soLuong, planted: true}
        )
        } else {
        data.soLuongPlanted += soLuong;
        }
        await data.save();
    } catch(err) {
        console.log('Lỗi trồng cây: ', err);
    }
    }

    client.thuHoach = async (userId, name) => {
    try {
        let data = await plantModel.findOne({ userId: userId, plantName: name});
        if (!data || !data.plantedAt) { 
            data = new plantModel({
            userId: userId,
            planted: false,
            plantedAt: new Date(),
            plantName: name
        });
        } else {
        await plantModel.findOneAndUpdate(
            {userId: userId, plantName: name},
            {planted : false, soLuongPlanted: 0, $unset: {plantedAt: 1}}
        )
        await data.save();
        }
    } catch(err) {
        console.log('Lỗi thu hoạch: ', err);
    }
    }

    client.xemDat = (userId) => new Promise(async ful => {
        let data = await userModel.findOne({ userId: userId });
        return ful(data.land);
    })

    client.addDat = async (userId, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            data.land += soLuong;
            await data.save();
        } catch (err) {
            console.log('Lỗi add đất');
        }
    }

    client.truDat = async (userId, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            data.land -= soLuong;
            await data.save();
        } catch(err) {
            console.log('Lỗi trừ đất: ', err);
        }
    }

    // Xem số lượng cây đã được trồng
    client.plant = (userId, name) => new Promise(async ful => {
        let data = await plantModel.findOne({ userId: userId, plantName: name });
        if (!data) return ful(0);
        ful(data.soLuongPlanted);
    })

    // Xem animal mình có
    client.xemAnimal = (userId, name) => new Promise(async ful => {
        let data = await userModel.findOne({ userId: userId });
        if (name == "bò") return ful(data.animal.bo);
        if (name == "gà") return ful(data.animal.ga);
        if (name == "heo") return ful(data.animal.heo);
    })

    // Xem số vật đã được cho ăn 
    client.animalFed = (userId, name) => new Promise(async ful => {
        let data = await feedAnimalModel.findOne({ userId: userId, name: name });
        if (!data) {
            return ful(0);
        }
        ful(data.soLuong);
    })

    client.addAnimal = async(userId, name, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            const animal = {
                "bò": "bo",
                "gà": "ga",
                "heo": "heo",
            };
            
           const property = animal[name];
           if (property) 
               data.animal[property] += soLuong;
            data.save();
        } catch(err) {
            console.log('Lỗi add động vật: ', err);
        }
    }

    client.truAnimal = async(userId, name, soLuong) => {
        try {
            let data = await userModel.findOne({ userId: userId });
            const animal = {
                "bò": "bo",
                "gà": "ga",
                "heo": "heo",
            };
            
           const property = animal[name];
           if (property) 
               data.animal[property] -= soLuong;
            data.save();
        } catch(err) {
            console.log("Lỗi truAnimal: ", err);
        }
    }

    client.choAn = async (userId, name, soLuong) => {
        try { 
            let data = await feedAnimalModel.findOne({ userId: userId, name: name});
            if (!data) {
                data = new feedAnimalModel({
                    userId: userId,
                    name: name,
                    soLuong: soLuong,
                    fed: true,
                    fedAt: new Date()
                })
                client.truAnimal(userId, name, soLuong);
            } 
            else if (!data.fedAt) {
                await feedAnimalModel.findOneAndUpdate(
                    {userId: userId, name: name},
                    {fedAt: new Date(), soLuong: soLuong, fed: true}
                );
                client.truAnimal(userId, name, soLuong);
            } else {
                client.truAnimal(userId, name, soLuong);
                data.soLuong += soLuong;
            }
            await data.save();
        } catch(err) {
            console.log('Lỗi cho ăn: ', err);
        }
    }

    client.vatSua = async(userId) => {    
        try {
            let data = await feedAnimalModel.findOne({ userId: userId, name: "bò"});
            if (!data || !data.fedAt) {
                    data = new feedAnimalModel({
                    userId: userId,
                    name: "bò",
                    fed: false,
                    fedAt: new Date()
                })
            } else {
                await feedAnimalModel.findOneAndUpdate(
                    {userId: userId, name: "bò"},
                    {fed: false, soLuong: 0, $unset: {fedAt: 1}}
                )
            }
            await data.save();
        } catch(err) {
            console.log('Lỗi vắt sữa: ', err);
        }
    }

    client.layTrung = async(userId) => {
        try {
            let data = await feedAnimalModel.findOne({ userId: userId, name: "gà"});
            if (!data || !data.fedAt) {
            data = new feedAnimalModel({
                userId: userId,
                name: "gà",
                fed: false,
                fedAt: new Date()
            })
            } else {
            await feedAnimalModel.findOneAndUpdate(
                {userId: userId, name: "gà"},
                {fed: false, soLuong: 0, $unset: {fedAt: 1}}
            )
            }
            await data.save();
        } catch(err) {
            console.log('Lỗi lấy trứng: ', err);
        }
    }

    client.thit = async (userId) => {
        try {
            let data = await feedAnimalModel.findOne({ userId: userId, name: "heo" });
            if (!data || !data.fedAt) {
                data = new feedAnimalModel({
                    userId: userId,
                    name: "heo",
                    fed: false,
                    fedAt: new Date()
                })
                } else {
                await feedAnimalModel.findOneAndUpdate(
                    {userId: userId, name: "heo"},
                    {fed: false, soLuong: 0, $unset: {fedAt: 1}}
                )
                }
                await data.save();
        } catch(err) {
            console.log("Lỗi thit: ", err);
        }
    }

    client.checkTimePlant = (userId, name) => new Promise(async ful => {
        let data = await plantModel.findOne({ userId: userId, plantName: name});
        if (!data) data = new plantModel({
            userId: userId,
            plantedAt: null
        })
        let lastPlanted = data.plantedAt;
        const currentTime = new Date();
        const elapsedMillis = currentTime - lastPlanted;
        const timeToGrow = 1 * 60 * 1000;
        if (data && lastPlanted) {
            if (elapsedMillis < timeToGrow) {
                const remainingMillis = timeToGrow - elapsedMillis;
                const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
                const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
                const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
                return ful(`- **\`${remainingHours}h ${remainingMinutes}p ${remainingSeconds}s\`**`); 
            } else {
                return ful(` `);
            }
        } else {
            return ful(` `);
        }
    })

    client.checkTimeAnimal = (userId, name) => new Promise(async ful => {
        let data = await feedAnimalModel.findOne({ userId: userId, name: name});
        if (!data) data = new feedAnimalModel({
          userId: userId,
          fedAt: null
        })
        let lastFed = data.fedAt;
        const currentTime = new Date();
        const elapsedMillis = currentTime - lastFed;
        const timeToGrow = 1 * 60 * 1000;
        if (data && lastFed) {
          if (elapsedMillis < timeToGrow) {
            const remainingMillis = timeToGrow - elapsedMillis;
            const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
            return ful(`\`${remainingHours}h ${remainingMinutes}p ${remainingSeconds}s\``); 
          } else {
            return ful(" ");
          }
        } else return ful(" ");
    }) 
}