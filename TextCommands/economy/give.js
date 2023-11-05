const Discord = require('discord.js');

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
        const toGiveUser = message.mentions.users.first();
        let coinsToGive = args[1];
        if (parseInt(coinsToGive) < 1 || (isNaN(coinsToGive) && coinsToGive.toLowerCase() !== "all"))
            return message.reply(`Phắc du <@${message.author.id}> sai định dạng rồi`)
            .then(msg => setTimeout(() => {
            msg.delete();
            }, 3000));
        if (coinsToGive === 'all') coinsToGive = await client.xemTien(message.author.id);
        if (!toGiveUser) return message.reply('Cách dùng: **`nqg @user <số tiền/all>`**')

        let coins = await client.xemTien(message.author.id)
        if (coins < parseInt(coinsToGive) || parseInt(coinsToGive) == 0) return message.reply(`<a:MH_x:1166534055819485235> **Xem lại ví tiền mình đi!**`)
        if (message.author.id === toGiveUser.id) return message.channel.send(`**<a:check:1166534052510187560> | ${message.author.username}** đã chuyển cho **${toGiveUser.username} ${parseInt(coinsToGive).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins.** Huh?...Wait what??`)
        await message.channel.send(`**<a:check:1166534052510187560> | ${message.author.username}** đã chuyển cho **${toGiveUser.username} ${parseInt(coinsToGive).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`)
        await client.truTien(message.author.id, parseInt(coinsToGive))
        await client.addTien(toGiveUser.id, parseInt(coinsToGive))
    }
}