const { Message, Client, EmbedBuilder } = require("discord.js");
const xoSoUserModel = require("../../database/models/xoSoUserModel");

module.exports = {
    name: 'veso',
    aliases: ['vs'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let data = await xoSoUserModel.findOne({ userId: message.author.id })
        if (!data) {
            data = new xoSoUserModel({
                userId: message.author.id,
                soLuong: []
            })
        }
        let amount = data.soLuong.length

        let amountEmbed 
        if (amount > 0) {
            amountEmbed = new EmbedBuilder()
                .setTitle(`BẠN ĐANG CÓ ${amount} VÉ SỐ`)
                .setDescription(`${data.soLuong.map((a, index) => `**${index + 1}.** ${a}`).join('\n')}`)
                .setColor('Gold')
                .setTimestamp()
        } else {
            amountEmbed = new EmbedBuilder()
                .setTitle(`BẠN ĐANG CÓ ${amount} VÉ SỐ`)
                .setColor('Gold')
                .setTimestamp()
        }
        await message.reply({ embeds: [amountEmbed] })
    }
}