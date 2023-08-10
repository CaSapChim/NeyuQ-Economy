const banModel = require('../../database/models/banModel')
const { Message, Client } = require('discord.js')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: 'unblacklist',
    aliases: ['unbl'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        if (!ownerId.includes(message.author.id)) return
        let toUnbanUser = message.mentions.users.first()
        if (!toUnbanUser) toUnbanUser = client.users.cache.find(u => u.id == args[0])
        let reason = args.slice(1).join(' ')
        if (!reason) reason = '**vì không vi phạm luật của bot**'
        const banned = await banModel.findOne({ userId: toUnbanUser.id })

        if (banned) {
            message.channel.send(`**Đã xóa <@${toUnbanUser.id}> khỏi danh sách blacklist với lý do** ${reason}`)
            await banned.deleteOne({ userId: toUnbanUser.id })
        } else {
            message.channel.send('Người dùng không có trong blacklist!')
        }
    }
}