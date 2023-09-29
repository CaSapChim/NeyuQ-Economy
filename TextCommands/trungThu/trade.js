const Discord = require('discord.js');

module.exports = {
    name: 'trade',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const author = message.author.id;
        let mention = message.mentions.users.first();
        let item = args[1];

        const checkItem = {
            'lua': 'lúa',
            'dau': 'đậu',
            'bi': 'bí',
            '200': 'sữa',
            '201': 'trứng',
            '202': 'bột mì',
            '203': 'bột bánh đậu xanh',
            '204': 'bột bánh thập cẩm',
            '': 'nhân thập cẩm',
            '205': 'nhân đậu xanh',
            '206': 'bánh trung thu nhân đậu xanh',
            '207': 'bánh trung thu nhân thập cẩm',
        }
        async function trade(author, toGiveUser, item, soLuong) {
            await client.addNongSan(toGiveUser, item, soLuong);
        }
    }
}