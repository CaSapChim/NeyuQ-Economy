const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');

module.exports = {
    name: 'vatsua',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => { 
        const author = message.author.id;
        let data = await feedAnimalModel.findOne({ userId: author, name: "con bò"});
        let animal = await animalModel.findOne({ userId: author, name: "con bò"});
        if (data && data.fedAt) {
            const currentTime = new Date();
            const lastPlanted = data.fedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 30 * 60 * 1000;
            if (elapsedMillis < timeToGrow) {

              const remainingMillis = timeToGrow - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.reply(`Vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để bò cho sữa`);
            } else {
                let result = data.soLuong + Math.floor(Math.random() * data.soLuong);
                await client.vatSua(author, "con bò");
                await client.addNongSan(author, "sữa", result);
                await message.reply(`Bạn đã vắt được **${result} xô sữa <:eje_minecraft_milk:1156555171493597204>**`);
                animal.soLuong += data.soLuong;
            }
        } else {
            message.reply('Bạn chưa cho bò ăn!');
        }
        await animal.save();
        await data.save();
    }
}