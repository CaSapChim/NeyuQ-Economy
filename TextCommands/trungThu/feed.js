const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/eventTrungThu/feedAnimalModel');

module.exports = {
    name: 'feed',
    aliases: ['choan'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const animalArr = ['bo', 'ga'];
        const author = message.author.id;
        const nameAnimal = args[0];
        let soLuong = parseInt(args[1]);
        
        const animalEmoji = {
            'con gà': '<:Chicken17:1156557573219168307>',
            'con bò': '<:3331_minecraft_cow:1156555169396428830>'
        }
        
        let soLuongAnimal = await client.xemAnimal(author, checkAnimal(nameAnimal)); // check số animal trong db
        let dataFed = await feedAnimalModel.findOne({ userId: author, name: checkAnimal(nameAnimal) });
        if (!dataFed) {
            dataFed = new feedAnimalModel({
                userId: author, 
            })
        }
        if (!nameAnimal || !animalArr.includes(nameAnimal)) return message.reply('Sai cú pháp.\nCách dùng: `nqg feed <bo/ga> <số lượng>`');
        if (soLuongAnimal <= 0) return message.reply(`Bạn không có **${checkAnimal(nameAnimal)}** nào trong chuồng`)
        if (!soLuong || soLuong < 0) soLuong = 1;
        if (soLuong > soLuongAnimal) soLuong = soLuongAnimal;
        if (dataFed.soLuong == soLuongAnimal) return message.reply(`Bạn đã cho ${checkAnimal(nameAnimal)} ăn đầy đủ`);

        let foodEmoji = {
            "lúa" : "cây lúa <:LC_Wheat:1155701062670504037>",
            "hạt lúa" : "hạt lúa <:seeds97:1155701097806180372>",
        };

        await client.choAn(author, checkAnimal(nameAnimal), soLuong);
        await client.truNongSan(author, checkFood(nameAnimal), soLuong);
        await message.reply(`Bạn đã cho **${soLuong} ${checkAnimal(nameAnimal)}** ăn thành công **${foodEmoji[checkFood(nameAnimal)]}**`);

        function checkAnimal(animal) {
            if (animal == 'bo') return animal = 'con bò';
            if (animal == 'ga') return animal = 'con gà';
        }

        function checkFood(animal) {
            if (animal == 'bo') return animal = "lúa";
            if (animal == 'ga') return animal = "hạt lúa";
        }
    }
}