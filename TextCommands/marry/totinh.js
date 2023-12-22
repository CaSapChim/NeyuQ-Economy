const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'totinh',
    aliases: ["totinh", 'marry'],
    description: 'Tỏ tình, kết hôn với một người',
    adminOnly: false,
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
            return message.reply('Bạn cần phải đề cập đến một người dùng muốn totinh!');
        }

        if (user2.id === message.author.id) return message.reply('Bạn không thể totinh với chính mình.');

        const existingMarriage = await marryModel.findOne({
            $or: [{ userId1: user1.id }, { userId2: user1.id }, { userId1: user2.id }, { userId2: user2.id }],
          });
      
          if (existingMarriage) {
            return message.channel.send('Quý Khách đã đến muộn, hoa đã có chủ rồi <a:NQG_leuleu:1136579769429925939>');
          }              

        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tình yêu của bạn đến từ ai?')
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
            .setDescription(`${user2} đã đồng ý lời tỏ tình từ bạn`)
            .setColor('Green')
            .setThumbnail('https://www.funimada.com/assets/images/cards/big/love-22.gif')
            .setTimestamp()

        const tuChoiEmbed = new Discord.EmbedBuilder()
            .setDescription(`${user2} đã từ chối lời tỏ tình từ bạn`)
            .setColor('Red')
            .setTimestamp()  

        const a = await message.channel.send({ embeds: [embed], components: [row] });

        
        var collector = a.createMessageComponentCollector({
            filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
        })

collector.on('collect', async (button) => {
    if (button.user.id === user2.id) {
        if (button.customId === 'accept') {
            const newMarriage = new marryModel({
                userId1: user1.id,
                userId2: user2.id,
            });
            await newMarriage.save();
            button.deferUpdate()
            a.edit({ embeds: [dongYEmbed], components: []})
    
        } else if (button.customId === 'decline') {
            button.deferUpdate()
            a.edit({ embeds: [tuChoiEmbed], components: []})
        }
    } else {
        return button.reply({ content: 'Này. nút này không phải dành cho bạn', ephemeral: true})
    }
});

collector.on('end', async () => {
    await sentMessage.edit({ components: [] });
});
},
};
