const Discord = require('discord.js')

module.exports = {
    name: 'add',
    description: "Thêm vật phẩm cho người chơi",
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
            message.channel.send(`**<:tiu:1135830334664085554> | Đã chuyển cho ${toGiveUser} ${amount.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`)
            await client.addTien(toGiveUser.id, amount)
        } 

        else if (type == 'token') {
            message.channel.send(`**<:tiu:1135830334664085554> | Đã chuyển cho ${toGiveUser} ${amount.toLocaleString('En-Us')} <:token:1181941410446979122> tokens**`)
            await client.addToken(toGiveUser.id, amount)
        } 
        
        else if (type == 'bonghoa') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} bông hoa**`)
            await client.addItem(toGiveUser.id, "Bông hoa", amount, 2)
        } 
        
        else if (type == 'bobong') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} bó bông**`)
            await client.addItem(toGiveUser.id, "Bó bông", amount, 2)
        } 
        
        else if (type == 'cuckeo') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} cục kẹo**`)
            await client.addItem(toGiveUser.id, "Cục kẹo", amount, 2)
        } 
        
        else if (type == 'socola') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} socola**`)
            await client.addItem(toGiveUser.id, "Socola", amount, 2)
        } 
        
        else if (type == 'gaubong') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} gấu bông**`)
            await client.addItem(toGiveUser.id, "Gấu bông", amount, 2)
        } 
        
        else if (type == 'ruongbac') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương bạc**`)
            await client.addItem(toGiveUser.id, "Rương bạc", amount, 3)
        } 
        
        else if (type == 'ruongvang') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương vàng**`)
            await client.addItem(toGiveUser.id, "Rương vàng", amount, 3)
        } 
        
        else if (type == 'ruongdacbiet') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} ${amount} rương đặc biệt**`)
            await client.addItem(toGiveUser.id, "Rương đặc biệt", amount, 3)
        }

        else if (type == 'hhty') {
            message.channel.send(`**Đã chuyển cho ${toGiveUser} huy hiệu tình yêu** <:NQG_traitimne:1155502689057259621>`)
            await client.addItem(toGiveUser.id, "Huy Hiệu Tình Yêu", 1, 5)
        }

        else if (type == 'banhttnhandauxanh') {
            message.channel.send(`**Đã chuyển thành công ${amount} bánh trung thu nhân đậu xanh cho ${toGiveUser}.**`)
            await client.addNongSan(toGiveUser.id, "bánh trung thu nhân đậu xanh", amount);
        }

        else if (type == 'banhttnhanthapcam') {
            message.channel.send(`**Đã chuyển thành công ${amount} bánh trung thu nhân thập cẩm cho ${toGiveUser}.**`)
            await client.addNongSan(toGiveUser.id, "bánh trung thu nhân thập cẩm", amount);
        }
    }
}