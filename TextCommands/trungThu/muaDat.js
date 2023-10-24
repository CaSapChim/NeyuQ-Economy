const Discord = require('discord.js');

module.exports = {
    name: 'muadat',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let amount = parseInt(args[0]);
        const balance = await client.xemTien(message.author.id);
        let price = 5000;
        if (amount < 0 || !amount) amount = 1;
        if (price * amount > balance) return message.reply(`Bạn không đủ tiền để mua **${amount} mảnh đất** <:hand_with_plant:1155701041329872978>`);
        message.reply(`<:very:1137010214835597424> Bạn đã mua thành công **${amount} mảnh đất <:hand_with_plant:1155701041329872978> với giá ${price * amount} nqg coins** <:O_o:1135831601205481523>`);
        await client.addDat(message.author.id, amount);
        await client.truTien(message.author.id, price * amount);
    }
}