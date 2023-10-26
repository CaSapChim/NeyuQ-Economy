const Discord = require('discord.js');
const plantModel = require('../../database/models/userDataJob/plantModel');
const emoji = require('../../emoji.json');
                                                                            
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
        if (!type) return message.reply('Sai cú pháp.\nCách dùng: **`nqg thuhoach <id hạt>`**\nVí dụ: **`nqg thuhoach 250`**');

        const idHat = {
            "250": "hạt lúa",
            "251": "hạt đậu",
            "252": "hạt bí",
            "253": "hạt dưa hấu",
            "254": "khoai tây",
            "255": "cà rốt",
        }

        const idHatToEmojiCay = {
            "250": "<:LC_Wheat:1155701062670504037>",
            "251": "<:daunh_1:1156608655060381760>",
            "252": "<:mc_carved_pumpkin45:1155704587462922272>",
            "253": "<:Melon8:1166407706496733284>",
            "254": "<:potato45:1166650017264705547>",
            "255": "<:Carrot29:1166650013603090432>",
        }

        let userPlant = await plantModel.findOne({ userId: message.author.id, plantName: idHat[type] });
        if (userPlant && userPlant.plantedAt) {
            const currentTime = new Date();
            const lastPlanted = userPlant.plantedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 30 * 60 * 1000;
            if (elapsedMillis < timeToGrow) {

              const remainingMillis = timeToGrow - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.reply(`${emoji.fail} Cây chưa lớn, vui lòng quay lại sau **\`${remainingHours}h ${remainingMinutes}p ${remainingSeconds}s\`**`);
            } else {
                
                let result = userPlant.soLuongPlanted * 2;
                message.reply(`${emoji.success} Bạn đã thu hoạch thành công **${result} ${hatSangCay(type)} ${idHatToEmojiCay[type]}**`);
                await client.thuHoach(message.author.id, idHat[type]);
                await client.addNongSan(message.author.id, hatSangCay(type), result);
                await client.addDat(message.author.id, userPlant.soLuongPlanted);
            }
        }  else {
            message.reply('Bạn chưa trồng cây nào');
        }
        function hatSangCay(hat) {
            if (hat == '250') return hat = 'lúa';
            if (hat == '251') return hat = 'đậu';
            if (hat == '252') return hat = 'bí';
            if (hat == '253') return hat = 'dưa hấu';
            if (hat == '254') return hat = 'khoai tây';
            if (hat == '255') return hat = 'cà rốt';
        }
    }
}