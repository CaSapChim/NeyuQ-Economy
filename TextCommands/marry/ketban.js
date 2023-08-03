const Discord = require('discord.js');
const ketBanModel = require('../../database/models/ketbanModel');

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
            return message.reply('Bạn cần phải đề cập đến một người dùng muốn kết bạn!');
        }

        if (user2.id === message.author.id) return message.reply('Bạn không thể kết bạn với chính mình.');

        const existingFriend = await ketBanModel.findOne({
            $or: [{ userId1: user1.id }, { userId2: user2.id }],
          });
      
          if (existingFriend) {
            return message.channel.send('Bạn đã kết bạn với người dùng này rồi!');
        }

        const filter = (button) => {
            return button.user.id === user2.id;
        };               

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tình Bạn của 2 cậu bắt đầu từ đâu?')
            .setDescription(`Bạn có muốn trả lời tin nhắn của ${message.author.username} không?`)
            .setThumbnail('https://cdn.discordapp.com/emojis/1124400105429155912.webp?size=160&quality=lossless');

        const acceptButton = new Discord.ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Chấp nhận')
            .setEmoji('<:tch:1136673192665161889>')
            .setStyle(Discord.ButtonStyle.Success);

        const declineButton = new Discord.ButtonBuilder()
            .setCustomId('decline')
            .setLabel('Từ chối')
            .setEmoji('<:kotich:1136674388717076581>')
            .setStyle(Discord.ButtonStyle.Danger);

        const row = new Discord.ActionRowBuilder()
            .addComponents(acceptButton, declineButton);

        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

collector.on('collect', async (button) => {
    if (button.customId === 'accept') {
        const newKetban = new ketBanModel({
            userId1: user1.id,
            userId2: user2.id,
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
