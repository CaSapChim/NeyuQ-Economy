const Discord = require('discord.js')

module.exports = {
    name: 'balance',
    aliases: ['bal', 'cash'],
    adminOnly: false,
    description: 'Xem số tiền của mình đang có',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @returns 
     */
    run: async(client, message, args, userData) => {
        const coins = await client.xemTien(message.author.id)
        let formattedcoins = coins.toLocaleString('en-US');
        await message.channel.send(`<:tiu:1135830334664085554> | **${message.author.username}** hiện đang có **${formattedcoins}** <:O_o:1135831601205481523> Coins`)
    }
}
