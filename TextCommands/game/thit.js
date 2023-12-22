const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');

module.exports = {
    name: 'thit',
    description: "Lấy thịt heo",
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => { 
        const author = message.author.id;
        let data = await feedAnimalModel.findOne({ userId: author, name: "heo"});
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
       
              return message.reply(`Vui lòng quay lại sau **${remainingHours} giờ ${remainingMinutes} phút ${remainingSeconds} giây** để heo cho thịt`);
            } else {

                let result = 0;
                for (let i  = 0; i < data.soLuong; i++) {
                    result += Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
                }

                client.thit(author);
                client.addSanPham(author, "thịt heo", result);
                client.addAnimal(author, "heo", data.soLuong);
                message.reply(`Bạn đã thịt **${data.soLuong} con heo** và thu về được **${result} <:rawporkchop76:1166408633622482964>**`);
            }
        } else {
            message.reply('Bạn chưa cho heo ăn!');
        }
        await data.save();
    }
}