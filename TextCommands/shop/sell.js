const Discord = require('discord.js')
const itemModel = require('../../database/models/itemModel')

module.exports = {
    name: 'sell',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @returns 
     */
    run: async(client, message, args) => {
        let id = args[0]
        if (!id) return message.reply('Hãy nhập ID của sản phẩm')
        
        const getItemInfo = async (price, itemName) => {
            let item = await client.item(message.author.id, itemName)
            if (item > 0) {
                await client.truItem(message.author.id, itemName, 1)
                await client.addTien(message.author.id, price)
                message.reply(`<:very:1137010214835597424> **|** Đã bán thành công **${itemName}** với giá **${price.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`)
            } else {
                message.reply(`Bạn không có **${itemName}** nào để bán!`)
            }
        }

        switch(id) {
            case '106':
                getItemInfo(35000, "Nhẫn bạc")
                break;
            case '107':
                getItemInfo(70000, "Nhẫn vàng")
                break;
            case '108':
                getItemInfo(105000, "Nhẫn hồng")
                break;
            default:
                message.channel.send('**Không tìm thấy ID của sản phẩm\nHiện tại chỉ được phép bán nhẫn!**')
        } 
    }
}