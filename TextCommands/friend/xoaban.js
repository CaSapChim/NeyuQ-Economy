const Discord = require('discord.js')
const ketBanModel = require('../../database/models/ketBanModel')

module.exports = {
    name: 'xoaban',
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const mentionFriend = message.mentions.users.first()
        if (!mentionFriend) return message.reply('Bạn cần mention một người bạn để xóa khỏi danh sách bạn bè!')
        let currentUser = await ketBanModel.findOne({ userId: message.author.id })
        if (!currentUser) {
            currentUser = new ketBanModel({
                userId: message.author.id,
                username: message.author.username
            })
            await currentUser.save()
        }

        if (!currentUser.friends.includes(mentionFriend.id)) return message.reply('Người này không có trong danh sách bạn bè của bạn')

        let targetUser = await ketBanModel.findOne({ userId: mentionFriend.id})
    
        currentUser.friends = currentUser.friends.filter(id => id !== mentionFriend.id);
        targetUser.friends = targetUser.friends.filter(id => id !== message.author.id);
        
        await targetUser.save()
        await currentUser.save()
        message.reply(`Đã xóa kết bạn thành công`)
    }
}