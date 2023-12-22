const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');

module.exports = {
    name: 'vatsua',
    description: "Thu hoạch sữa bò",
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => { 
        const author = message.author.id;
        let data = await feedAnimalModel.findOne({ userId: author, name: "bò"});
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
       
              return message.reply(`Vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để bò cho sữa`);
            } else {

                let result = 0;
                for (let i  = 0; i < data.soLuong; i++) {
                    result += Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
                }

                client.vatSua(author);
                client.addAnimal(author, "bò", data.soLuong);
                client.addSanPham(author, "sữa", result);
                message.reply(`Bạn đã vắt được **${result} xô sữa <:eje_minecraft_milk:1156555171493597204>** từ **${data.soLuong} con bò**`);
            }
        } else {
            message.reply('Bạn chưa cho bò ăn!');
        }
        await data.save();
    }
}