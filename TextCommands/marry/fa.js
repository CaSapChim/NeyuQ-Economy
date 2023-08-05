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
        const user1 = message.author
        const user2 = message.mentions.users.first();
        if (!user2) {
            return message.reply('Bạn cần phải đề cập đến một người dùng muốn chiatay!');
        }

        if (user2.id === message.author.id) return ;

        const existingMarriage = await marryModel.findOne({ $or: [{ userId1: user1.id }, { userId2: user1.id }] });
        if (!existingMarriage) 
          return message.channel.send('Bạn Đã Có Người Yêu Đâu Mà ChiaTay LÊU LÊU <a:NQG_leuleu:1136579769429925939><a:NQG_leuleu:1136579769429925939>');
            
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
////////////////////////////////////////////
collector.on('collect', async (button) => {
    try {
        if (button.user.id !== user2.id ) return interaction.reply({ content: "Này, nút này không phải dành cho bạn!", ephemeral: true })
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
