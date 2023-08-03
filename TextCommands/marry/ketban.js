const Discord = require('discord.js');
const ketbanModel = require('../../database/models/ketbanModel')

module.exports = {
    name: 'ketban',
    aliases: ["ketban"],
    description: 'Cho phép member kết bạn nhau',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData
     */
//////////////////////////////////
    run: async (client, message, args, userData) => {
        const user1 = message.author
        const user2 = message.mentions.users.first();
        if (!user2) {
            return message.reply('Bạn cần phải đề cập đến một người dùng muốn ketban!');
        }

        if (user2.id === message.author.id) return message.reply('Bạn không thể totinh với chính mình.');

        const filter = (button) => {
            return button.user.id === user2.id;
        };               

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tình Bạn của 2 cậu bắt đầu từ đâu?')
            .setDescription(`Bạn có muốn trả lời tin nhắn của ${message.author.username} không?`);

        const acceptButton = new Discord.ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Chấp nhận')
            .setStyle(Discord.ButtonStyle.Success);

        const declineButton = new Discord.ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Từ chối')
            .setStyle(Discord.ButtonStyle.Danger);

        const row = new Discord.ActionRowBuilder()
            .addComponents(acceptButton, declineButton);

        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
////////////////////////////////////////////
collector.on('collect', async (button) => {
    if (button.customId === 'accept') {
        const newKetban = new ketbanModel({
            userId1: user1.id,
            username1: user1.username,
            userId2: user2.id,
            username2: user2.username,
        });
        await newKetban.save();
        await button.reply(`${user2} Đã Chấp Nhận Lời KetBan`);
    } else if (button.customId === 'decline') {
        await button.reply(`${user2} Đã Từ Chối Lời KetBan?`);
    }
});
collector.on('end', async () => {
    await sentMessage.edit({ components: [] });
});
},
};
