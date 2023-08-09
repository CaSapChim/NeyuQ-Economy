const Discord = require('discord.js')
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'gift',
    aliases: ['tangqua'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const mention = message.mentions.users.first()
        if (!mention) return 
        if (mention.id === message.author.id) return message.reply('Bạn không thể tự tặng quà cho chính mình!')
        let amount = parseInt(args[2])
        if (!amount) amount = 1
        let type = args[1].toLowerCase()
        
        const a = await client.item(mention.id, "Nhẫn bạc") // Ghi sai chính tả thì có nịt mà lưu db
        const b = await client.item(mention.id, "Nhẫn vàng")
        const c = await client.item(mention.id, "Nhẫn hồng")

        const emoji = {
            'Bông hoa' : '<a:p_flower22:1135636392374960310>',
            'Bó bông' : '<:bbng:1124017699614371890>',
            'Cục kẹo' : '<:ko:1124018356949884928>',
            'Socola' : '<:socola:1124018847511478372>',
            'Gấu bông' : '<:gubng:1124018585275211867>',
            'Nhẫn bạc' : '<:nhnbc:1124056817048240159>',
            'Nhẫn vàng' : '<:Nhnvng:1124056797238534375>',
            'Nhẫn hồng' : '<:nhan:1124415305347780720>'
        }

        const getItem = async (itemName, amount, itemType, level) => {
            let existMarry = await marryModel.findOne({ $or: [{ userId1: mention.id }, { userId2: mention.id }] })
            if (!existMarry) return message.reply('**Bạn chỉ có thể tặng quà với người đã kết hôn!**')

            if (itemType === 4) {
                if (a || b || c) return message.channel.send(`**${message.author.username}**, người nhận đã có **1 trong 3** lại nhẫn rồi!`)
                amount = 1
                await client.addItem(mention.id, itemName, amount, itemType)
                await client.truItem(message.author.id, itemName, amount) 
            } 
            
            else if ( itemType === 2) {   
                let data = await client.item(message.author.id, itemName)
                if (data < amount) return message.channel.send(`**${message.author.username}**, bạn không đủ **${amount} ${emoji[itemName]}** để tặng!`)
                await client.addMarryLevel(message.author.id, mention.id, level * amount)
                await client.truItem(message.author.id, itemName, amount) 
            }

            return message.channel.send(`<@${message.author.id}> đã tặng **${amount} ${emoji[itemName]}** cho <@${mention.id}>`)
        };

        switch (type) {
            case '101':
                getItem("Bông hoa", amount, 2, 20)
                break;
            case '102':
                getItem("Bó bông", amount, 2, 50)
                break;
            case '103':
                getItem("Cục kẹo", amount, 2, 80)
                break;
            case '104':
                getItem("Socola", amount, 2, 120)
                break;
            case '105':
                getItem("Gấu bông", amount, 2, 150)
                break;
            case '106':
                getItem("Nhẫn bạc", amount, 4, null)
                break;
            case '107':
                getItem("Nhẫn vàng", amount, 4, null)
                break;
            case '108':
                getItem("Nhẫn hồng", amount, 4, null)
                break;
            default:
                message.channel.send(`**Không tìm thấy vật phẩm tương ứng!**`)
        }
    }
}