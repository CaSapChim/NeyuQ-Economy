const Discord = require('discord.js');
const balanceModel = require('../../database/models/balanceModel');
const marryModel = require('../../database/models/marryModel');
const dropGiftModel = require('../../database/models/dropGiftModel')
const caScoreModel = require('../../database/models/caScoreModel')

module.exports = {
    name: 'top',
    aliases: ["top", "lb"],
    adminOnly: false,
    description: 'Xem top tiền và marry',

    run: async (client, message, args, userData) => {
        let type = args[0];
        if (!type) return message.reply('Bạn hãy nhập tên top muốn xem!\nVd **`nqg top <bal/marry>`**');

        // Handle money leaderboard
        if (['money', 'cash', 'coin', 'c', 'bal'].includes(type)) {
            let soluong = parseInt(args[1]) || 10;
            if (soluong > 25) soluong = 25;

            let userCoins = await balanceModel.find().sort({ coins: -1 });
            let leaderboard = userCoins
                .slice(0, soluong)
                .map((user, index) => {
                    const positionEmoji = getMedalEmoji(index);
                    return `${positionEmoji} ${client.users.cache.get(user.userId)} - **${user.coins.toLocaleString('en-US')} <:O_o:1135831601205481523> coins**`;
                })
                .join('\n');

            const embed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle(`TOP ${soluong} COIN`)
                .setDescription(leaderboard)
                .setFooter({text: 'Hãy tiếp tục cày tiền để dành top 1 nha!'})
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        }

        // Handle marry leaderboard
        if (['marry', 'm', 'thanmat', 'diem'].includes(type)) {
            let soluong = parseInt(args[1]) || 5;
            if (soluong > 10) soluong = 10;

            let marryLevel = await marryModel.find().sort({ level: -1 });
            let leaderboard = marryLevel
                .slice(0, soluong)
                .map((user, index) => {
                    const positionEmoji = getMedalEmoji(index);
                    return `${positionEmoji} ${client.users.cache.get(user.userId1)} <:nhancap:1138169115421462620> ${client.users.cache.get(user.userId2)} - ${user.level.toLocaleString('en-US')} điểm thân mật`;
                })
                .join('\n');

            const embed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle(`TOP ${soluong} ĐIỂM THÂN MẬT`)
                .setDescription(leaderboard)
                .setFooter({ text: 'Càng chân thành với nhau thì top 1 càng về gần bạn!'})
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        }

        // if (['mayman', 'mm'].includes(type)) {
        //     let soluong = parseInt(args[1]) || 10
        //     if (soluong > 15) soluong = 15
            
        //     let mayman = await dropGiftModel.find().sort({ soLuong: -1 });
        //     let leaderboard = mayman
        //         .slice(0, soluong)
        //         .map((user, index) => {
        //             const positionEmoji = getMedalEmoji(index);
        //             return `${positionEmoji} ${client.users.cache.get(user.userId)} - ${user.mayman} điểm may mắn <:t_:1138458437559263323>`;
        //         })
        //         .join('\n');

        //     const embed = new Discord.EmbedBuilder()
        //         .setColor('Green')
        //         .setTitle(`TOP ${soluong} ĐIỂM MAY MẮN`)
        //         .setDescription(leaderboard)
        //         .setFooter({ text: 'Chat càng nhiều, cơ hội nhận rương may mắn càng cao!'})
        //         .setTimestamp();

        //     message.channel.send({ embeds: [embed] });
        // }
    },
};

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