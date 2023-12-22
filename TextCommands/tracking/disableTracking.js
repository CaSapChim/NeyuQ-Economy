const Discord = require('discord.js')
const trackingMineModel = require('../../database/models/trackingMineModel')
const trackingCaModel = require('../../database/models/trackingCaModel')
const trackingTuoiCayModel = require('../../database/models/trackingTuoiCayModel');

module.exports = {
    name: 'tat',
    description: "Tắt tính năng nhắc nhở dùng lệnh",
    adminOnly: false,
    cooldown: 10,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let type = args[0]

        if (!type) {
            return message.reply('Cách dùng: `nqg tat <mine|cauca|tuoicay>`')
        }

        let disableEmbed 
        
        if (type === 'mine') {
            let dataMine = await trackingMineModel.findOne({
                userId: message.author.id
            })

            if (!dataMine || dataMine.enable == false) {
              return message.reply('Chưa bật mà đòi tắt, xàm lul +1')
            }    

            dataMine.enable = false

            await dataMine.save()

            disableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã tắt thành công nhắc nhở lệnh `mine`')
            await message.reply({ embeds: [disableEmbed]})
        }

        else if (type === 'cc' || type === 'cauca') {
            let dataCa = await trackingCaModel.findOne({
                userId: message.author.id
            })

            if (!dataCa || dataCa.enable == false) {
              return message.reply('Chưa bật mà đòi tắt, xàm lul +1')
            }    

            dataCa.enable = false

            await dataCa.save()

            disableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã tắt thành công nhắc nhở lệnh `cauca`')
            await message.reply({ embeds: [disableEmbed]})
        }
        else if (type === 'tc' || type === 'tuoicay') {
            let dataTuoiCay = await trackingTuoiCayModel.findOne({
                userId: message.author.id
            })

            if (!dataTuoiCay || dataTuoiCay.enable == false) {
              return message.reply('Chưa bật mà đòi tắt, xàm lul +1')
            }    

            dataTuoiCay.enable = false

            await dataTuoiCay.save()

            disableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã tắt thành công nhắc nhở lệnh `tuoicay`')
            await message.reply({ embeds: [disableEmbed]})
        }
    }
}