const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'fa',
    aliases: ["fa", "chiatay"],
    adminOnly: false,
    description: 'Ly hôn với người đã kết hôn',
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

        const existingMarriage = await marryModel.findOne({ $or: [{ userId1: user1.id }, { userId2: user1.id }, { userId1: user2.id }, { userId2: user2.id }] });
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

        const dongYEmbed = new Discord.EmbedBuilder()
            .setDescription(`${user2} đã đồng ý chia tay`)
            .setDescription('- **Nếu có duyên mong chúng ta có thể quay lại với nhau nhé**')
            .setColor('Green')
            .setThumbnail('https://i.pinimg.com/originals/fc/35/26/fc3526ea3315b365d1b5838b937ebb6d.gif')
            .setTimestamp()

        const tuChoiEmbed = new Discord.EmbedBuilder()
            .setDescription(`${user2} đã từ chối lời chia tay`)
            .setColor('Red')
            .setDescription(`**Chúng ta bắt đầu như thế nào?\n**
            **Để rồi kết thúc như thế này**`)
            .setTimestamp()

        const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
////////////////////////////////////////////
collector.on('collect', async (button) => {
    try {
        if (button.user.id !== user2.id ) return button.reply({ content: "Này, nút này không phải dành cho bạn!", ephemeral: true })
        if (button.customId === 'accept') {
            await marryModel.deleteOne({ userId1: user1.id}) 
            await marryModel.deleteOne({ userId2: user2.id})
            await sentMessage.edit({ embeds: [dongYEmbed], components: [] })
        } else if (button.customId === 'decline') {
            await sentMessage.edit({ embeds: [tuChoiEmbed], components: [] })
        }
    } catch (err) {
        console.log("Lỗi chiatay: ", err)
    }
});
},
};
