const itemModel = require('../../database/models/itemModel')
const balanceModel = require('../../database/models/balanceModel')
const marryModel = require('../../database/models/marryModel')
const banModel = require('../../database/models/banModel')
const buffMineModel = require('../../database/models/buffMineModel')
const cupModel = require('../../database/models/cupModel')
const khoangSanModel = require('../../database/models/khoangSanModel')
const caModel = require('../../database/models/caModel')
const buffCauCaModel = require('../../database/models/buffCauCaModel')
const toolCauCaModel = require('../../database/models/toolCauCaModel')
const warnModel = require('../../database/models/warnModel')
const xoSoUserModel = require('../../database/models/xoSoUserModel')
const invTTModel = require('../../database/models/eventTrungThu/invTTModel')
const plantModel = require('../../database/models/eventTrungThu/plantModel')
const landModel = require('../../database/models/eventTrungThu/landModel')
const feedAnimalModel = require('../../database/models/eventTrungThu/feedAnimalModel')
const animalModel = require('../../database/models/eventTrungThu/animalModel')

module.exports = (client) => {
  client.item = (userId, name) => new Promise(async ful => {
    const data = await itemModel.findOne({ userId: userId, name: name });
    if (!data) return ful(0);
    ful(data.soLuong);
  })

  client.addItem = async (userId, name, soLuong, type) => {
    try {
      let data = await itemModel.findOne({ userId: userId, name: name})
      if (!data) {
        data = new itemModel({ userId: userId, name: name, soLuong: soLuong, type: type})
      } else {
        data.soLuong = data.soLuong + soLuong
        data.type = type
      }
      await data.save()
    } catch (err) {
      console.log('Lỗi add item: ', err)
    }
  }
  
  client.truItem = async (userId, name, soLuong) => {
    try {
      let data = await itemModel.findOne({ userId: userId, name: name})
      if (data) {
        data.soLuong = data.soLuong - soLuong
      } else {
        return
      }
      await data.save()
    } catch (err) {
      console.log('Lỗi trừ item: ', err)
    }
  }
  
  ///////////////////////////////////////////////////////// KHOÁNG SẢN
  client.khoangsan = (userId, name) => new Promise(async ful => {
    const data = await khoangSanModel.findOne({ userId: userId, name: name })
    if (!data) return ful(0)
    ful(data.soLuong)
  })

  client.addKS = async (userId, name, soLuong) => {
    try {
      let data = await khoangSanModel.findOne({ userId: userId, name: name})
      if (!data) {
        data = new khoangSanModel({
          userId: userId,
          name: name,
          soLuong: soLuong
        })
      } else {
        data.soLuong = data.soLuong + soLuong
      }
      await data.save()
    } catch(err) {
      console.log('Lỗi add ks:', err)
    }
  }

  client.truKS = async (userId, name, soLuong) => {
    try {
      let data = await khoangSanModel.findOne({ userId: userId, name: name})
      if (data) {
        data.soLuong = data.soLuong - soLuong
      } else {
        return
      }
      await data.save()
    } catch(err) {
      console.log('Lỗi add cá:', err)
    }
  }

  ///////////////////////////////////////////////////////// Tiền
  client.xemTien = (userId) => new Promise(async ful => {
    const data = await balanceModel.findOne({ userId: userId });
    if (!data) return ful(0);
    ful(data.coins);
  })
  
  client.addTien = async (userId, coins) => {
    try {
      let data = await balanceModel.findOne({ userId: userId });
  
      if (data) {
        data.coins = data.coins + coins;
      } else {
        data = new balanceModel({ userId: userId, coins: coins });
      }
  
      await data.save();
    } catch (err) {
      console.log('Lỗi add tiền: ', err);
    }
  };
  
  client.truTien = async (userId, coins) => {
    try {
      let data = await balanceModel.findOne({ userId: userId });
  
      if (data) {
        data.coins = data.coins - coins;
      } else {
        data = new balanceModel({ userId: userId, coins: -coins });
      }
  
      await data.save();
    } catch (err) {
      console.log('Lỗi trừ tiền: ', err);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////// Xem level marry
  client.marryLevel = (userId) => new Promise(async ful => {
    const data = await marryModel.findOne({ $or: [{userId1: userId}, {userId2: userId}] });
    if (!data) return ful(0);
    ful(data.level);
  })

  client.addMarryLevel = async(userId1, userId2, level) => {
    try {
      let data = await marryModel.findOne({ $or: [{userId1: userId1}, {userId2: userId1}, {userId1: userId2}, {userId2: userId2}] })

      data.level = data.level + level
      await data.save()
    } catch(err) {
      console.log("Lỗi add level marry: ", err)
    }
  }

  //////////////////////////////////////////////////////////////////////////////// Ban
  client.ban = async (userId, username) => {
    try {
      let data = new banModel({
        username: username,
        userId: userId
      })

      await data.save()
    } catch(err) {
      console.log('Lỗi ban:', err)
    }
  }

  client.warn = async (userId) => new Promise(async ful => {
    const data = await warnModel.findOne({ userId: userId});
    if (!data) return ful(0);
    ful(data.soLuong);
  })

  client.addWarn = async (userId, username, soLuong) => {
    try {
      let data = await warnModel.findOne({
        userId: userId
      })
      if (!data) {
        data = new warnModel({
          userId: userId,
          username: username,
          soLuong: soLuong  
        })
      } else {
        data.soLuong = data.soLuong + soLuong
      }
      await data.save()
    } catch(err) {
      console.log('Lỗi add warn:', err)
    }
  }

  /////////////////////////////////////////////////////////////////////////////BUFF CỦA CÚP
  client.buffMine = (userId, type) => new Promise(async ful => {
    const data = await buffMineModel.findOne({ userId: userId, type: type });
    if (!data) return ful(0);
    ful(data.soLuongBuff);
  })

  client.addBuffMine = async (userId, soLuong, type) => {
    try {
      let data = await buffMineModel.findOne({ userId: userId, type: type})
      if (!data) {
        data = new buffMineModel({
          userId: userId,
          soLuongBuff: soLuong,
          type: type
        })
      } else {
        data.soLuongBuff = data.soLuongBuff + soLuong
      }
      await data.save()
    } catch(err) {
      console.log('Lỗi buff:', err)
    }
  }

  client.truBuffMine = async (userId, soLuong, type) => {
    try {

      let data = await buffMineModel.findOne({ userId: userId, type: type}) 
      data.soLuongBuff = data.soLuongBuff - soLuong
      await data.save()
    } catch(err) {
      console.log('Lỗi buff:', err)
    }
  }

  /////////////////////////////////////////////////////////////////////////////BUFF CỦA FISH
  client.buffCauCa = (userId, type) => new Promise(async ful => {
    const data = await buffCauCaModel.findOne({ userId: userId, type: type });
    if (!data) return ful(0);
    ful(data.soLuongBuff);
  })

  client.addBuffCauCa = async (userId, soLuong, type) => {
    try {
      let data = await buffCauCaModel.findOne({ userId: userId, type: type})
      if (!data) {
        data = new buffCauCaModel({
          userId: userId,
          soLuongBuff: soLuong,
          type: type
        })
      } else {
        data.soLuongBuff = data.soLuongBuff + soLuong
      }
      await data.save()
    } catch(err) {
      console.log('Lỗi buff:', err)
    }
  }

  client.truBuffCauCa = async (userId, soLuong, type) => {
    try {

      let data = await buffCauCaModel.findOne({ userId: userId, type: type}) 
      data.soLuongBuff = data.soLuongBuff - soLuong
      await data.save()
    } catch(err) {
      console.log('Lỗi buff:', err)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////Cúp
  client.cup = (userId, name) => new Promise(async ful => {
    const data = await cupModel.findOne({ userId: userId, name: name });
    if (!data) return ful(0);
    ful(data.soLuong);
  })

  client.addCup = async (userId, name, type, soLuong) => {
    try {
      let data = await cupModel.findOne({
        userId: userId,
        name: name,
      })

      if (!data) {
        data = new cupModel({
          userId: userId,
          name: name,
          type: type,
          soLuong: soLuong
        })
      } else {
        data.soLuong = data.soLuong + soLuong
        data.type = type
      }
      await data.save()

    } catch(err) {
      console.log("Lỗi add cúp: ",err)
    }
  }

  client.truCup = async (userId, name, soLuong) => {
    try {
      let data = await cupModel.findOne({
        userId: userId,
        name: name,
      })

      if (data) {
        data.soLuong = data.soLuong - soLuong
      } else {
        return
      }

      await data.save()

    } catch(err) {
      console.log("Lỗi trừ cúp: ",err)
    }
  }

    ////////////////////////////////////////////////////////////////////////////////////////TOOL FISH
    client.toolCauCa = (userId, name) => new Promise(async ful => {
      const data = await toolCauCaModel.findOne({ userId: userId, name: name });
      if (!data) return ful(0);
      ful(data.soLuong);
    })
  
    client.addToolCC = async (userId, name, type, soLuong) => {
      try {
        let data = await toolCauCaModel.findOne({
          userId: userId,
          name: name,
        })
  
        if (!data) {
          data = new toolCauCaModel({
            userId: userId,
            name: name,
            type: type,
            soLuong: soLuong
          })
        } else {
          data.soLuong = data.soLuong + soLuong
          data.type = type
        }
        await data.save()
  
      } catch(err) {
        console.log("Lỗi add cần câu: ",err)
      }
    }
  
    client.truToolCC = async (userId, name, soLuong) => {
      try {
        let data = await toolCauCaModel.findOne({
          userId: userId,
          name: name,
        })
  
        if (data) {
          data.soLuong = data.soLuong - soLuong
        } else {
          return
        }
  
        await data.save()
  
      } catch(err) {
        console.log("Lỗi trừ tool câu cá: ",err)
      }
    }








    client.nongSan = (userId, name) => new Promise(async ful => {
      const data = await invTTModel.findOne({ userId: userId, name: name });
      if (!data) return ful(0);
      ful(data.soLuong);
    })

    client.addNongSan = async (userId, name, soLuong) => {
      try {
        let data = await invTTModel.findOne({ userId: userId, name: name});
        if (data) {
          data.soLuong += soLuong; 
        } else {
          data = new invTTModel({
            userId: userId,
            name: name,
            soLuong: soLuong
          })
        }
        await data.save();
      } catch(err) {
        console.log('Lỗi add nông sản: ', err);
      }
    }

    client.truNongSan = async (userId, name, soLuong) => {
      try {
        let data = await invTTModel.findOne({ userId: userId, name: name});
        if (data) {
          data.soLuong -= soLuong;
        } else return;
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
            {plantedAt: new Date(), soLuongPlanted: soLuong}
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
      let data = await landModel.findOne({ userId: userId });
      if (!data) {
        data = new landModel({ userId: userId });
        ful(data.soLuong);
      } else { 
       ful(data.soLuong);
      }
    })

    client.addDat = async (userId, soLuong) => {
      try {
        let data = await landModel.findOne({ userId: userId });
        if (!data) {
          data = new landModel({ userId: userId });
          data.soLuong += soLuong;
        } else {
          data.soLuong += soLuong;
        }
        await data.save();
      } catch (err) {
        console.log('Lỗi add đất');
      }
    }

    client.truDat = async (userId, soLuong) => {
      try {
        let data = await landModel.findOne({ userId: userId });
        if (data) {
          data.soLuong -= soLuong;
        } else {
          data = new landModel({
            userId: userId
          })
          data.soLuong -= soLuong;
        }
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

    client.xemAnimal = (userId, name) => new Promise(async ful => {
      let data = await animalModel.findOne({ userId: userId, name: name });
      if (!data) {
        return ful(0);
      }
      ful(data.soLuong);
    })

    client.choAn = async (userId, name, soLuong) => {
      try { 
        let data = await feedAnimalModel.findOne({ userId: userId, name: name})
        if (!data) {
          data = new feedAnimalModel({
            userId: userId,
            name: name,
            soLuong: soLuong,
            fed: true,
            fedAt: new Date()
          })
        } else if (!data.fedAt) {
          await feedAnimalModel.findOneAndUpdate(
            {userId: userId, name: name},
            {fedAt: new Date(), soLuong: soLuong}
          )
        } else {
          data.soLuong += soLuong;
        }
        await data.save();
      } catch(err) {
        console.log('Lỗi cho ăn: ', err);
      }
    }

    client.addAnimal = async(userId, name, soLuong) => {
      try {
        let data = await animalModel.findOne({ userId: userId, name: name});
        if(!data) {
          data = new animalModel({
            userId: userId,
            name: name,
            soLuong: soLuong
          })
        } else data.soLuong += soLuong;
        await data.save();
      } catch(err) {
        console.log('Lỗi add động vật: ', err);
      }
    }

    client.vatSua = async(userId, name) => {
      try {
        let data = await feedAnimalModel.findOne({ userId: userId, name: name});
        if (!data || !data.fedAt) {
          data = new feedAnimalModel({
            userId: userId,
            name: name,
            fed: false,
            fedAt: new Date()
          })
        } else {
          await feedAnimalModel.findOneAndUpdate(
            {userId: userId, name: name},
            {fed: false, soLuong: 0, $unset: {fedAt: 1}}
          )
        }
        await data.save();
      } catch(err) {
        console.log('Lỗi vắt sữa: ', err);
      }
    }

    client.layTrung = async(userId, name) => {
      try {
        let data = await feedAnimalModel.findOne({ userId: userId, name: name});
        if (!data || !data.fedAt) {
          data = new feedAnimalModel({
            userId: userId,
            name: name,
            fed: false,
            fedAt: new Date()
          })
        } else {
          await feedAnimalModel.findOneAndUpdate(
            {userId: userId, name: name},
            {fed: false, soLuong: 0, $unset: {fedAt: 1}}
          )
        }
        await data.save();
      } catch(err) {
        console.log('Lỗi lấy trứng: ', err);
      }
    }

    client.checkTime = async(userId, name) => {
      try {
        let data = await plantModel.findOne({ userId: userId, plantName: name});
        
      } catch(err) {
        console.log('Lỗi check time cây:', err);
      }
    }
}