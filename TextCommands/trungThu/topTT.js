const Discord = require('discord.js');
const scoreTTModel = require('../../database/models/eventTrungThu/scoreTTModel');

module.exports = {
    name: 'toptt',

    run: async(client, message, args) => {
        let soLuong = parseInt(args[0]) || 10;
        if (soLuong > 10) soLuong = 10;

        let scoreData = await scoreTTModel.findOne({ userId: message.author.id})
        if (!scoreData) scoreData = new scoreTTModel({
            userId: message.author.id
        })

        let scoreTT = await scoreTTModel.find().sort({score: -1});
        let leaderboard = scoreTT
        .slice(0, soLuong)
        .map((user, index) => {
            const positionEmoji = getMedalEmoji(index);
            return `${positionEmoji} ${client.users.cache.get(user.userId)} - ${user.score} điểm :star:`;
        })
        .join('\n');

        const embed = new Discord.EmbedBuilder()
            .setColor('Gold')
            .setTitle(`TOP ${soLuong} ĐIỂM BÁNH TRUNG THU`)
            .setDescription(leaderboard)
            .setFooter({ text: 'Làm bánh càng nhiều, điểm càng cao!'})
            .setTimestamp();

        message.channel.send({ embeds: [embed] });

        function getMedalEmoji(index) {
            switch (index) {
                case 0:
                    return '<:NQGTop1:1138175075829428387>';
                case 1:
                    return '<:NQGTop2:1138175115130060843>';
                case 2:
                    return '<:NQGTop3:1138175169324658849>';
                default:
                    return `${index + 1}.`;
            }
        }
    }
}