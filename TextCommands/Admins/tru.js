const Discord = require('discord.js')

module.exports = {
    name: 'tru',
    description: "Trừ vật phẩm khỏi người chơi",
    adminOnly: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const toGiveUser = message.mentions.users.first()
        if (!toGiveUser) return
        let type = args[1].toLowerCase()
        const amount = parseInt(args[2]) || 1

        if (type == 'coin') {
            message.channel.send(`**<:tiu:1135830334664085554> | Đã trừ ${amount.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins của ${toGiveUser}**`)
            await client.truTien(toGiveUser.id, amount)
        } 
        
        else if (type == 'bonghoa') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} bông hoa**`)
            await client.truItem(toGiveUser.id, "Bông hoa", amount, 2)
        } 
        
        else if (type == 'bobong') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} bó bông**`)
            await client.truItem(toGiveUser.id, "Bó bông", amount, 2)
        } 
        
        else if (type == 'cuckeo') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} cục kẹo**`)
            await client.truItem(toGiveUser.id, "Cục kẹo", amount, 2)
        } 
        
        else if (type == 'socola') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} socola**`)
            await client.truItem(toGiveUser.id, "Socola", amount, 2)
        } 
        
        else if (type == 'gaubong') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} gấu bông**`)
            await client.truItem(toGiveUser.id, "Gấu bông", amount, 2)
        } 
        
        else if (type == 'ruongbac') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương bạc**`)
            await client.truItem(toGiveUser.id, "Rương bạc", amount, 3)
        } 
        
        else if (type == 'ruongvang') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương vàng**`)
            await client.truItem(toGiveUser.id, "Rương vàng", amount, 3)
        } 
        
        else if (type == 'ruongdacbiet') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương đặc biệt**`)
            await client.truItem(toGiveUser.id, "Rương đặc biệt", amount, 3)
        }
    }
}