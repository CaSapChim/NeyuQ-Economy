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
        if (!id) return message.reply('Hãy nhập ID/Tên của sản phẩm')
        const author = message.author.id

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

        if ( id === '106' || id === 'nhanbac'.toLowerCase()) {
            getItemInfo(35000, "Nhẫn bạc")
        } else if ( id === '107' || id === 'nhanvang'.toLowerCase() ) {
            getItemInfo(70000, "Nhẫn vàng")
        } else if ( id === '108' || id === 'nhanhong'.toLowerCase()) {
            getItemInfo(105000, "Nhẫn hồng")
        }

        const emojiKS = {
            "Than": "<:905609870114439208:1134500336862765138>",
            "Sắt": "<:842601384561868810:1134500649548124161>",
            "Vàng": "<:905609869485289482:1134500596871868588>",
            "Kim cương": "<:943215979935187074:1134500706095743150>",
            "Ngọc lục bảo": "<:905609867769839637:1134500619898593380>"
        }

        const getKSInfo = async (author, price, itemName) => {
            let amount = parseInt(args[1]) || 'all'.toLowerCase()
            if (amount === 'all'.toLowerCase()) amount = await client.khoangsan(author, itemName)
            if ( amount < 1 ) return message.reply(`Bạn không có **${itemName}** nào để bán!`)
            await client.truKS(author, itemName, amount)
            await client.addTien(author, amount * price)
            message.reply(`<:very:1137010214835597424> **|** Đã bán thành công **${amount} ${emojiKS[itemName]}** với giá **${price.toLocaleString('En-Us') * amount} <:O_o:1135831601205481523> coins**`)
        }

        if ( id === 'than'.toLowerCase() ) await getKSInfo(author, 5, "Than")
        else if ( id === 'sat'.toLowerCase() ) await getKSInfo(author, 7, "Sắt")
        else if ( id === 'vang'.toLowerCase() ) await getKSInfo(author, 15, "Vàng")
        else if ( id === 'kimcuong'.toLowerCase() || id === 'kc'.toLowerCase() ) await getKSInfo(author, 25, "Kim cương")
        else if ( id === 'ngoclucbao'.toLowerCase() || id === 'nlb'.toLowerCase() ) await getKSInfo(author, 50, "Ngọc lục bảo")
        else {
            message.channel.send('**Không tìm thấy ID của sản phẩm\nHiện tại chỉ được phép bán nhẫn và các loại khoáng sản!**')
        }
    }
}