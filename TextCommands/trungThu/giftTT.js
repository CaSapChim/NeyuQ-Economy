const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel');

module.exports = {
    name: 'giftt',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const author = message.author.id;
        let typeId = args[1];
        let soLuong = parseInt(args[2]);
        const mention = message.mentions.users.first();
        if (mention.id === message.author.id) return message.reply('Bạn không thể tự tặng quà cho chính mình!')
        if (!mention) return;
        if (!soLuong || soLuong < 0) return;
        
        if (typeId == '1300') getItem(author, mention.id, "lồng đèn", soLuong, 150 * soLuong);
        if (typeId == '1301') getItem(author, mention.id, "thỏ bông", soLuong, 150 * soLuong);
        if (typeId == '1302') getItem(author, mention.id, "thỏ cung trăng", soLuong, 150 * soLuong);
        
        async function getItem(userId1, userId2, item, soLuong, level) {
            let existMarry = await marryModel.findOne({ $or: [{ userId1: mention.id, userId2: message.author.id }, { userId1: message.author.id, userId2: mention.id }] })
            if (!existMarry) return message.reply('Bạn chỉ có thể tặng quà cho người đã kết hôn');
            let data = await client.nongSan(author, item);
            if (data < soLuong) return message.reply("Bạn không đủ món quà để tặng");
            await client.addMarryLevel(userId1, userId2, level);
            const successEmbed = new Discord.EmbedBuilder()
                .setColor('Green')
                .setDescription(`Bạn đã tặng thành công **${soLuong} ${item}** cho ${userId2}`)
                .setTimestamp()
            await message.reply({ embeds: [successEmbed] });
        }
    }
}