const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');

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
        let data = await feedAnimalModel.findOne({ userId: author, name: "gà"});
        if (data && data.fedAt) {
            const currentTime = new Date();
            const lastPlanted = data.fedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 1 * 60 * 1000;
            if (elapsedMillis < timeToGrow) {

              const remainingMillis = timeToGrow - elapsedMillis;
              const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
              const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
       
              return message.reply(`Vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để gà cho trứng`);
            } else {
                let result = data.soLuong + Math.floor(Math.random() * data.soLuong);
                await client.vatSua(author);
                await client.addAnimal(author, "gà", data.soLuong);
                message.reply(`Bạn đã vắt được **${result} xô sữa <:eje_minecraft_milk:1156555171493597204>**`);
            }
        } else {
            message.reply('Bạn chưa cho gà ăn!');
        }
        await data.save();
    }
}