const Discord = require('discord.js');
const balanceModel = require('../../database/models/balanceModel');
const marryModel = require('../../database/models/marryModel')

module.exports = {
    name: 'top',
    aliases: ["top", "lb"],
    description: 'Cho phép member xem top tiền trong server',// 
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData
     */
    run: async (client, message, args, userData) => {
        let type = args[0]
        if (!type) return message.reply('Bạn hãy nhập tên top muốn xem!')
        if (type == `money` || type == `cash` || type == `coin` || type == `c` || type == `bal`) {
                let soluong = 10
                if (parseInt(args[1])) soluong = parseInt(args[1])
                if (soluong > 25) soluong = 25

            let userCoins = await balanceModel.find().sort({ coins: -1 })
              
            let leaderboard = ``
            userCoins.forEach((user, index) => {
            const positionEmoji = getMedalEmoji(index);
                if (index + 1 === 1) {
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId)} - **${user.coins.toLocaleString('En-us')} <:O_o:1135831601205481523> coins**\n`;
                  } else if (index + 1 === 2) {
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId)} - **${user.coins.toLocaleString('En-us')} <:O_o:1135831601205481523> coins**\n`;
                  } else if (index + 1 === 3) {
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId)} - **${user.coins.toLocaleString('En-us')} <:O_o:1135831601205481523> coins**\n`;
                  } else {
                    leaderboard += `${index + 1}. ${client.users.cache.get(user.userId)} - **${user.coins.toLocaleString('En-us')} <:O_o:1135831601205481523> coins**\n`;
                  }
            });

            const embed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle(`TOP ${soluong} COIN`)
                .setDescription(leaderboard)
                .setFooter({ text: `Hãy tiếp tục cày tiền để dành top 1 nha!`})
                .setTimestamp()
            message.channel.send({ embeds: [embed]})      

        }
        if ( type == 'marry') {
            let soluong = 5
            if (parseInt(args[1])) soluong = parseInt(args[1])
            if (soluong > 10) soluong = 10
            
            let marryLevel = await marryModel.find().sort({ level: -1 })
            let leaderboard = ``
            marryLevel.forEach((user, index) => {
                const positionEmoji = getMedalEmoji(index)
                if (index + 1 === 1) {
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId1)} <:nhancap:1138169115421462620> ${client.users.cache.get(user.userId2)} - ${user.level.toLocaleString('En-us')} điểm thân mật `
                } else if (index + 1 === 2) { 
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId1)} <:nhancap:1138169115421462620> ${client.users.cache.get(user.userId2)} - ${user.level.toLocaleString('En-us')} điểm thân mật `
                } else if (index + 1 === 3) {
                    leaderboard += `${positionEmoji} ${client.users.cache.get(user.userId1)} <:nhancap:1138169115421462620> ${client.users.cache.get(user.userId2)} - ${user.level.toLocaleString('En-us')} điểm thân mật `
                } else {
                    leaderboard += `${positionEmoji} ${index + 1}. ${client.users.cache.get(user.userId1)} <:nhancap:1138169115421462620> ${client.users.cache.get(user.userId2)} - ${user.level.toLocaleString('En-us')} điểm thân mật `
                }
            })

        const embed = new Discord.EmbedBuilder()
            .setColor('Blue')
            .setTitle(`TOP ${soluong} MARRY LEVEL`)
            .setDescription(leaderboard)
            .setFooter({ text: `Càng chân thành với nhau thì top 1 càng về gần bạn!`})
            .setTimestamp()
        message.channel.send({ embeds: [embed]})
            
        }
        function getMedalEmoji(index) {
            switch (index) {
              case 0:
                return '<:NQGTop1:1138175075829428387>';
              case 1:
                return '<:NQGTop2:1138175115130060843>';
              case 2:
                return '<:NQGTop3:1138175169324658849>';
              default:
                return;
            }
        }
    }   
}