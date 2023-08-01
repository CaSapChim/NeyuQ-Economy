const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'fa',
    aliases: ["fa", "chiatay"],
    description: 'Cho phép member chiatay nhau',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData
     */
//////////////////////////////////
    run: async (client, message, args, userData) => {
    if (!userData) return message.reply('Hình như chúng tôi chưa cấu hình tài khoản cho bạn. Hãy dùng lệnh `!start`!')
        const user1 = message.author
        const user2 = message.mentions.users.first();
        if (!user2) {
            return message.reply('Bạn cần phải đề cập đến một người dùng muốn chiatay!');
        }

        if (user2.id === message.author.id) return ;

        const existingMarriage = await marryModel.findOne({ $or: [{ userId1: user1.id }, { userId2: user1.id }] });
        if (!existingMarriage) 
          return message.channel.send('Bạn Đã Có Người Yêu Đâu ChiaTay LÊU LÊU~~~');
            
        const filter = (button) => {
            return button.user.id === user2.id;
        };               

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tình yêu của bạn bắt đầu từ đâu, để rồi kết thúc như này?')
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
    try {
        if (button.customId === 'accept') {
            await marryModel.deleteOne({ userId1: user1.id}) 
            await marryModel.deleteOne({ userId2: user2.id})
            await button.reply(`${user2} Đã Chấp Nhận Lời chiatay!`);
        } else if (button.customId === 'decline') {
            await button.reply(`${user2} Đã Từ Chối Lời chiatay!`);
        }
    } catch (err) {
        console.log("Lỗi chiatay: ", err)
    }
});

collector.on('end', async () => {
    await sentMessage.edit({ components: [] });
});
},
};
