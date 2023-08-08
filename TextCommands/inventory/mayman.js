const Discord = require('discord.js')
const dropGiftModel = require('../../database/models/dropGiftModel')

module.exports = {
    name: 'mayman', 
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let data = await dropGiftModel.findOne({ userId: message.author.id })
        if (!data) {
            data = new dropGiftModel({
                userId: message.author.id
            })
        } 
            
        const soRuongMayMan = data.soLuong
        const diemMayMan = data.mayman
        await data.save()
        message.channel.send(`${message.author.username}, bạn đang có **${soRuongMayMan}** rương may mắn.\nĐiểm may mắn hiện tại: **${diemMayMan}**`)
    }
}
