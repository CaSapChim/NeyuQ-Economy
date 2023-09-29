const Discord = require('discord.js');
const plantModel = require('../../database/models/eventTrungThu/plantModel');

module.exports = {
    name: 'thuhoach',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const type = args[0];
        if (!type) return message.reply('Sai cú pháp.\nCách dùng: `nqg thuhoach lua/bi/dau`');
        let userPlant = await plantModel.findOne({ userId: message.author.id, plantName: checkHat(type) });
        if (userPlant && userPlant.plantedAt) {
            const currentTime = new Date();
            const lastPlanted = userPlant.plantedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 3 * 60 * 60 * 1000;
            if (elapsedMillis < timeToGrow) {

              const remainingMillis = timeToGrow - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.reply(`Cây chưa lớn, vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để thu hoạch.`);
            } else {
                let cayEmoji = {
                    "lúa" : "cây lúa <:LC_Wheat:1155701062670504037>",
                    "đậu" : "cây đậu <:Mokoko42:1155701078306852935>",
                    "bí" : "trái bí <:mc_carved_pumpkin45:1155704587462922272>"
                };
                let result = userPlant.soLuongPlanted + Math.round(Math.random() * userPlant.soLuongPlanted);
                message.reply(`Bạn đã thu hoạch thành công **${result} ${cayEmoji[hatSangCay(type)]}**`);
                await client.thuHoach(message.author.id, checkHat(type));
                await client.addNongSan(message.author.id, hatSangCay(type), result);
                await client.addDat(message.author.id, userPlant.soLuongPlanted);
            }
        }  else {
            message.reply('Bạn chưa trồng cây nào');
        }

        function checkHat(hat) {
            if (hat == 'lua') return hat = 'hạt lúa';
            if (hat == 'dau') return hat = 'hạt đậu';
            if (hat == 'bi') return hat = 'hạt bí';
        }

        function hatSangCay(hat) {
            if (hat == 'lua') return hat = 'lúa';
            if (hat == 'dau') return hat = 'đậu';
            if (hat == 'bi') return hat = 'bí';
        }
    }
}