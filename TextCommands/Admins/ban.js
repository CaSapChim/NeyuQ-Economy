const Discord = require('discord.js')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        if (!ownerId.includes(message.author.id)) return
        let toBanUser = message.mentions.members.first()
        if (!toBanUser) toBanUser = client.users.cache.find(u => u.id == args[0]) 

        await client.ban(toBanUser.id)
        await message.reply(`<a:ban:1131226761594675210> Đã thêm thành công <@${toBanUser.id}> vào blacklist`)
    }
}