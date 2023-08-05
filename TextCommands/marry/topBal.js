const Discord = require('discord.js');
const balanceModel = require('../../database/models/balanceModel');
const color = require('colors')

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

            let find = await balanceModel.find().sort({ coins: -1 })
              
            let leaderboard = `Top ${soluong} COINS\n
`;
            find.forEach((user, index) => {
              leaderboard += `${index + 1}. ${client.users.cache.get(user.userId).username} - ${user.coins.toLocaleString('En-Us')} coins\n`;
            });
    
                    message.channel.send('```' + leaderboard + '```');
                }
    }   
}