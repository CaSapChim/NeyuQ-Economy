const banModel = require('../../database/models/banModel')
const { Message, Client } = require('discord.js')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: 'unban',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        if (!ownerId.includes(message.author.id)) return
        const toUnbanUser = message.mentions.users.first()
        let reason = args.slice(1).join(' ')
        if (!reason) reason = '**vì không vi phạm luật của bot**'
        const banned = await banModel.findOne({ userId: toUnbanUser.id })

        if (banned) {
            message.channel.send(`**Đã unban <@${toUnbanUser.id}> với lý do ${reason}**`)
            await banned.deleteOne({ userId: toUnbanUser.id })
        } else {
            message.channel.send('Người dùng chưa bị ban!')
        }
    }
}