const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/eventTrungThu/feedAnimalModel');

module.exports = {
    name: 'laytrung',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => { 
        const author = message.author.id;
        let data = await feedAnimalModel.findOne({ userId: author, name: "con gà"});
        if (data && data.fedAt) {
            const currentTime = new Date();
            const lastPlanted = data.fedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 3 * 60 * 60 * 1000;
            if (elapsedMillis < timeToGrow) {

              const remainingMillis = timeToGrow - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.reply(`Vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để lấy trứng gà`);
            } else {
                let result = data.soLuong + Math.floor(Math.random() * data.soLuong);
                await client.vatSua(author, "con gà");
                await client.addNongSan(author, "trứng", result);
                await message.reply(`Bạn đã thu được **${result} quả trứng <:Minecraft_Egg:1156555165189550101>**`);
            }
        } else {
            message.reply('Bạn chưa cho gà ăn!');
        }
    }
}