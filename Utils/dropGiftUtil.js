async function dropGift(userId) {
    const dropGiftModel = require('../database/models/dropGiftModel')

    
    const tiLe = 1
    const rand = Math.floor(Math.random() * 11)

    try {
        if (tiLe > rand) {
            let recieveGift = '<:t_:1138458437559263323>'

            let data = await dropGiftModel.findOne({
                userId: userId
            })

            if (!data) {
                data = new dropGiftModel({
                    userId: userId
                })
            } else {
                data.soLuong = data.soLuong + 1
                data.mayman = data.mayman + 1
            }
            await data.save()
            return recieveGift
        }
    } catch (err) {
        console.log("Lỗi randGift", err)
    }
}

module.exports = { dropGift }