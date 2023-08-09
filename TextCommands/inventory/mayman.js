const Discord = require('discord.js')
const dropGiftModel = require('../../database/models/dropGiftModel')

module.exports = {
    name: 'mayman', 
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let data = await dropGiftModel.findOne({ userId: message.author.id })
        if (!data) {
            data = new dropGiftModel({
                userId: message.author.id
            })
        } 
            
        const soRuongMayMan = data.soLuong
        const diemMayMan = data.mayman
        await data.save()

        const embed = new Discord.EmbedBuilder()
            .setTitle(message.author.username)
            .setDescription(`
                Bạn đang có **${soRuongMayMan}** <:t_:1138458437559263323>
                Điểm may mắn: **${diemMayMan}**
            `)
            .setColor('Green')
            .setFooter({ text: 'Cách dùng:...'})
        message.reply({ embeds: [embed] })
    }
}
