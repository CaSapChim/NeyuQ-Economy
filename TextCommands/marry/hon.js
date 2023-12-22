const Discord = require('discord.js')
const marryModel = require('../../database/models/marryModel');
const emoji = require('../../emoji.json');
const coolDownMarryModel = require('../../database/models/marryCooldownModel');

module.exports = {
    name: 'hun',
    adminOnly: false,
    cooldown: 5,
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
        if (toKissUser.id === message.author.id) return message.reply('<:02_facepalm:1137441545499463690> **Bạn không thể hun chính mình...** ')
        let existMarry = await marryModel.findOne({ $or: [{ userId1: toKissUser.id }, { userId2: toKissUser.id }] })
        if (!existMarry)
             return message.reply(`${emoji.fail} **Bạn chỉ có thể hun với người đã kết hôn!**`)
        else {
            let data = await coolDownMarryModel.findOne({ userId: message.author.id });
             if (!data) {
                data = coolDownMarryModel.create({ userId: message.author.id });
             }
    
            const currentTime = new Date();
            const lastHon = data.lastHon;
            const elapsedMillis = currentTime - lastHon;
            const elapsedDays = Math.floor(elapsedMillis / (24 * 60 * 60 * 1000));
    
            if (elapsedDays === 0) {

              const remainingMillis = 5 * 60 * 60 * 1000 - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.channel.send(`Bạn đã hun người này rồi. Hãy quay lại sau ${remainingHours} giờ, ${remainingMinutes} phút và ${remainingSeconds} giây.`);
            }
        }

        let level = 10

        data.lastHon = currentTime;
        await data.save();

        const hon = [
            `> <a:bearkiss:1125365990625124424> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn ngọt ngào`,
            `> <a:bearkisembar:1125365849688117363> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn dịu dàng`,
            `> <a:vanimecouplekiss:1138154878187868180> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn Đậm Đà`,
            `> <a:milkmochajumpkis:1138154864476684319> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn Nồng Cháy`,
            `> <a:Kou_kiss:1138154719970328576> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn Tha Thiết`,
            `> <a:ahhhugs80:1138154860257226786> <@${message.author.id}> đã trao cho <@${toKissUser.id}> một nụ hôn Rực Rỡ`
        ]
        message.channel.send(hon[Math.floor(Math.random() * hon.length)])
        await client.addMarryLevel(message.author.id, toKissUser.id, level)
    }
}