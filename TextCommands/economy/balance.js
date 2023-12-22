const Discord = require('discord.js')
const emoji = require("../../emoji.json");

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
        const coins = await client.xemTien(message.author.id);
        const tokens = await client.xemToken(message.author.id);
        let formattedcoins = coins.toLocaleString('en-US');
        let formattedtokens = tokens.toLocaleString('en-US');
        await message.channel.send(`<@${message.author.id}> hiện đang có:\n<:tiu:1135830334664085554> | **${formattedcoins}** ${emoji.coin} Coins.\n<:tiu:1135830334664085554> | **${formattedtokens}** ${emoji.token} Tokens.`);
    }
}
