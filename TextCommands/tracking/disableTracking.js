const Discord = require('discord.js')
const trackingMineModel = require('../../database/models/trackingMineModel')
const trackingCaModel = require('../../database/models/trackingCaModel')

module.exports = {
    name: 'tat',
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
            return message.reply('Cách dùng: `nqg tat <mine|cauca>`')
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

        if (type === 'cc' || type === 'cauca') {
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
    }
}