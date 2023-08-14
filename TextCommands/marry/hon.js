const Discord = require('discord.js')
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'hun',
    cooldown: 18000,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let currentUser = await marryModel.findOne({$or: [{ userId1: message.author.id }, { userId2: message.author.id }] })

        if (!currentUser) return message.reply('Có ny đâu mà đi hun người khác')
        let toKissUser = message.mentions.users.first()
        if (toKissUser.id === message.author.id) return message.reply('**Bạn không thể hun chính mình...**')
        let existMarry = await marryModel.findOne({ $or: [{ userId1: toKissUser.id }, { userId2: toKissUser.id }] })
        if (!existMarry) return message.reply('**Bạn chỉ có thể hun với người đã kết hôn!**')
        let level = 10

        const currentTime = new Date();
        const hours = currentTime.getHours();

        if ( hours < ((hours + 5) % 24) ) {

        }

        const hon = [
            `> <a:bearkiss:1125365990625124424> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn ngọt ngào`,
            `> <a:bearkisembar:1125365849688117363> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn dịu dàng`,
            `> <a:vanimecouplekiss:1138154878187868180> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn Đậm Đà`,
            `> <a:milkmochajumpkis:1138154864476684319> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn Nồng Cháy`,
            `> <a:Kou_kiss:1138154719970328576> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn Tha Thiết`,
            `> <a:ahhhugs80:1138154860257226786> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụt hôn Rực Rỡ`
        ]
        message.channel.send(hon[Math.floor(Math.random() * hon.length)])
        await client.addMarryLevel(message.author.id, toKissUser.id, level)
    }
}