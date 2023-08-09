const Discord = require('discord.js')

module.exports = {
    name: 'give',
    aliases: ['send'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const toGiveUser = message.mentions.users.first()
        const coinsToGive = parseInt(args[1])

        let coins = await client.xemTien(message.author.id)
        if (coins < coinsToGive) return message.reply(`**Nghèo còn bày đặt cho tiền người khác.\nXem lại ví tiền mình đi!**`)
        if (message.author.id === toGiveUser.id) return message.channel.send(`**<:tiu:1135830334664085554> | ${message.author.username}** đã chuyển cho **${toGiveUser.username} ${coinsToGive.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins.** Huh?...Wait what??`)
        message.channel.send(`**<:tiu:1135830334664085554> | ${message.author.username}** đã chuyển cho **${toGiveUser.username} ${coinsToGive.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`)
        await client.truTien(message.author.id, coinsToGive)
        await client.addTien(toGiveUser.id, coinsToGive)
    }
}