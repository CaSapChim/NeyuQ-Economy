const Discord = require('discord.js')
const trackingMineModel = require('../../database/models/trackingMineModel')
const trackingCaModel = require('../../database/models/trackingCaModel')
const trackingTuoiCayModel = require('../../database/models/trackingTuoiCayModel');

module.exports = {
    name: 'bat',
    description: "Bật tính năng nhắc nhở dùng lệnh",
    cooldown: 10,
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let type = args[0]
        let content = args.slice(1).join(" ")

        if (!type) {
            return message.reply('Cách dùng: `nqg bat <mine|cauca|tuoicay> [tin nhắn (tùy chọn)]`')
        }

        let enableEmbed 
        
        if (type === 'mine') {
            let dataMine = await trackingMineModel.findOne({
                userId: message.author.id
            })

            if (!dataMine) {
                dataMine = new trackingMineModel({
                    userId: message.author.id,
                })
            }    
            await dataMine.save()

            if (content) {
                await dataMine.updateOne({
                    userId: message.author.id,
                    text: content
                })
            } else {
                await dataMine.updateOne({
                    userId: message.author.id,
                    text: ''
                })
            }

            dataMine = await trackingMineModel.findOne({ userId: message.author.id })
            dataMine.enable = true

            await dataMine.save()

            enableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã bật thành công nhắc nhở lệnh `mine`')
                .setDescription(`Lời nhắc: ${dataMine.text.length === 0 ? 'Không có' : content}`)
            await message.reply({ embeds: [enableEmbed]})
        }

        else if (type === 'cc' || type === 'cauca') {
            let dataCa = await trackingCaModel.findOne({
                userId: message.author.id
            })
    
            if (!dataCa) {
                dataCa = new trackingCaModel({
                    userId: message.author.id,
                })
            }    
            await dataCa.save()

            if (content) {
                await dataCa.updateOne({
                    userId: message.author.id,
                    text: content
                })
            } else {
                await dataCa.updateOne({
                    userId: message.author.id,
                    text: ''
                })
            }

            dataCa = await trackingCaModel.findOne({ userId: message.author.id })
            dataCa.enable = true

            await dataCa.save()

            enableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã bật thành công nhắc nhở lệnh `cauca`')
                .setDescription(`Lời nhắc: ${dataCa.text.length === 0 ? 'Không có' : content}`)
            await message.reply({ embeds: [enableEmbed]})
        } 
        else if (type === "tc" || type === "tuoicay") {
            let dataTuoiCay = await trackingTuoiCayModel.findOne({
                userId: message.author.id
            })
    
            if (!dataTuoiCay) {
                dataTuoiCay = new trackingTuoiCayModel({
                    userId: message.author.id,
                })
            }    
            await dataTuoiCay.save()

            if (content) {
                await dataTuoiCay.updateOne({
                    userId: message.author.id,
                    text: content
                })
            } else {
                await dataTuoiCay.updateOne({
                    userId: message.author.id,
                    text: ''
                })
            }

            dataTuoiCay = await trackingCaModel.findOne({ userId: message.author.id })
            dataTuoiCay.enable = true

            await dataTuoiCay.save()

            enableEmbed = new Discord.EmbedBuilder()
                .setTitle('<:very:1137010214835597424> Đã bật thành công nhắc nhở `tưới cây`')
                .setDescription(`Lời nhắc: ${dataCa.text.length === 0 ? 'Không có' : content}`)
            await message.reply({ embeds: [enableEmbed]})
        }
    }
}