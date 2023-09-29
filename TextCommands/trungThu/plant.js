const Discord = require('discord.js');
const plantModel = require('../../database/models/eventTrungThu/plantModel');
const landModel = require('../../database/models/eventTrungThu/plantModel');

module.exports = {
    name: 'plant',
    aliases: ['trongcay'],
    cooldown: 10,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let plantArr = ['lua', 'dau', 'bi'];
        let hatGiong = args[0];
        let soLuong = parseInt(args[1]);
        let remainingLand = await client.xemDat(message.author.id);

        if (remainingLand == 0) return message.reply('Bạn đã hết đất để trồng cây. Vui lòng mua thêm đất để trồng thêm');
        if (remainingLand - soLuong < 0) return message.reply(`<:hand_with_plant:1155701041329872978> Bạn không đủ đất để trồng **${soLuong} ${checkHat(hatGiong)}**. Số đất còn lại của bạn: **${remainingLand} mảnh đất**`)
        if (!plantArr.includes(hatGiong)) return message.reply('Sai cú pháp.\nCách dùng: `nqg plant lua/dau/bi <số lượng>`');
        if (!soLuong || soLuong < 0) soLuong = 1;

        const soLuongHat = await client.nongSan(message.author.id, checkHat(hatGiong));
        const hatEmojis = {
            'hạt lúa': '<:seeds97:1155701097806180372>',
            'hạt đậu': '<:daunh_1:1156608655060381760>',
            'hạt bí': '<:gourdpumpkinseedspeeledshellisol:1155704854606532709>'
        };

        if (soLuongHat < 0 || soLuong > soLuongHat) return message.reply("<:hand_with_plant:1155701041329872978> Bạn không đủ hạt giống để trồng cây này");
        await client.trongCay(message.author.id, checkHat(hatGiong), soLuong);
        await client.truDat(message.author.id, soLuong);
        await client.truNongSan(message.author.id, checkHat(hatGiong), soLuong);
        message.reply(`<:Diamond_Hoe:1155501947995033661> Bạn đã gieo thành công **${soLuong} ${checkHat(hatGiong)} ${hatEmojis[checkHat(hatGiong)]}**`);
        
        function checkHat(hat) {
            if (hat == 'lua') return hat = 'hạt lúa';
            if (hat == 'dau') return hat = 'hạt đậu';
            if (hat == 'bi') return hat = 'hạt bí';
        }
    }
}