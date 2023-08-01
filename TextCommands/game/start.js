const Discord = require('discord.js')
const userModel = require('../../database/models/userModel.js')

module.exports = {
    name: 'start',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData 
     */
    run: async(client, message, args, userData) => {
        userData = await userModel.create({
            userId: message.author.id,
            username: message.author.username,
            guildId: message.guild.id,
            inventory: [],
            marriedPersonId: ''
        })
        await client.addTien(message.author.id, 50)
        await client.addItem(message.author.id, "Cúp gỗ", 1, 1)

        message.reply('Đã cấu hình thành công tài khoản cho bạn!\nTặng bạn một cây cúp gỗ <:wooden_pickaxe:1134750444854444042> và 50 coins!')
    }
}