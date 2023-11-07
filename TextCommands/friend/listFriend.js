const Discord = require('discord.js');
const ketBanModel = require('../../database/models/ketBanModel')

module.exports = {
    name: 'listfriend',
    aliases: ["banbe", "rela", "ketbancheck"],
    description: 'Cho phép member xem các bạn bè của nhau',
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData
     */

    run: async (client, message, args, userData) => {
        let currentUser = await ketBanModel.findOne({ userId: message.author.id })
        if (!currentUser) {
            currentUser = new ketBanModel({
                userId: message.author.id,
                username: message.author.username
            })
            await currentUser.save()
        }

        let friendsArr = currentUser.friends

        if (friendsArr.length == 0) {
            const noFriendEmbed = new Discord.EmbedBuilder()
                .setColor('Aqua')
                .setTitle(`**Này ${message.author.username}**, hiện tại bạn chưa có người bạn nào!`)
                .setTimestamp()
            message.channel.send({ embeds: [noFriendEmbed] })
        } else {
            const listFriendsEmbed = new Discord.EmbedBuilder()
                .setColor('Aqua')
                .setTitle(`Danh sách bạn của ${message.author.username}`)
                .setDescription(`${friendsArr.map(id => `<@${id}>`).join('\n')} <:banbe2:1122443390580166676> Bạn Bè`)
                .setThumbnail(`${message.author.displayAvatarURL()}`)
            message.channel.send({ embeds: [listFriendsEmbed] })
        }
    }
}