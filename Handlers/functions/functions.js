const itemModel = require('../../database/models/itemModel')
const balanceModel = require('../../database/models/balanceModel')
const marryModel = require('../../database/models/marryModel')

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
  ////////////////////////////////////////////////////// Xem level marry
  client.marryLevel = (userId) => new Promise(async ful => {
    const data = await marryModel.findOne({ $or: [{userId1: userId}, {userId2: userId}] });
    if (!data) return ful(0);
    ful(data.level);
  })

  client.addMarryLevel = async(userId, level) => {
    try {
      let data = await marryModel.findOne({ $or: [{userId1: userId}, {userId2: userId}] })

      data.level = data.level + level
    } catch(err) {
      console.log("Lỗi add level marry: ", err)
    }
  }
}