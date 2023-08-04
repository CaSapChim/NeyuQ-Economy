const Discord = require('discord.js');
const ketBanModel = require('../../database/models/ketBanModel');

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
        let currentUser = await ketBanModel.findOne({ userId: message.author.id })
        if (!currentUser) {
            currentUser = new ketBanModel({
                userId: message.author.id,
                username: message.author.username
            })
            await currentUser.save()
        }

        const mentionedUser = message.mentions.users.first()

        let targetUser = await ketBanModel.findOne({ userId: mentionedUser.id });
        if (!targetUser) {
          targetUser = new ketBanModel({
            userId: mentionedUser.id,
            username: mentionedUser.username,
          });
          await targetUser.save();
        }

        if (currentUser.friends.includes(mentionedUser.username)) {
            message.channel.send('Hai bạn đã là bạn của nhau rồi.');
            return;
        }

        const embed = new Discord.EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tình Bạn của 2 cậu bắt đầu từ đâu?')
            .setDescription(`Bạn có muốn trả lời tin nhắn của ${mentionedUser} không?`)
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

        const dongYEmbed = new Discord.EmbedBuilder()
            .setDescription(`${mentionedUser} đã đồng ý kết bạn`)
            .setColor('Green')
            .setThumbnail('https://media1.giphy.com/media/mGo8dkPOF6GLm/giphy.gif?cid=ecf05e47a7p8tksntc8tg5lhdjec6w5wvsxayous69pw5nps&ep=v1_gifs_search&rid=giphy.gif&ct=g')
            .setTimestamp()

        const tuChoiEmbed = new Discord.EmbedBuilder()
            .setDescription(`${mentionedUser} đã từ chối kết bạn`)
            .setColor('Red')
            .setTimestamp()        
            
        if (currentUser.friends.includes(mentionedUser.username)) {
            message.channel.send('Hai bạn đã là bạn của nhau rồi.');
            return;
        }

        const a = await message.channel.send(
            {
                components: [row],
                embeds: [embed]
            }
        )

        var collector = a.createMessageComponentCollector({
            filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
        })

    collector.on('collect', async (interaction) => {
        if (interaction.customId === 'accept') {
            interaction.deferUpdate()
            if (currentUser.friends.includes(mentionedUser.username)) {
                message.channel.send('Hai bạn đã là bạn của nhau rồi.');
                return;
            }

            currentUser.friends.push(mentionedUser.username);
            targetUser.friends.push(message.author.username);
        
            await currentUser.save();
            await targetUser.save();

            a.edit({ embeds: [dongYEmbed], components: []})
        } else if (interaction.customId === 'decline') {
            interaction.deferUpdate()
            a.edit({ embeds: [tuChoiEmbed], components: []})
        }
    });
},
};
