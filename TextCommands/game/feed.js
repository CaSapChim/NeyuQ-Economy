const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');
const emoji = require('../../emoji.json');

module.exports = {
    name: 'feed',
    aliases: ['choan'],
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const author = message.author;

        const animalName = args[0];
        let amount = args[1];

        if (parseInt(amount) < 1 || (isNaN(amount) && amount.toLowerCase() !== "all"))
            return message.reply(`${emoji.fail} Phắc du <@${author.id}> sai định dạng rồi`)
            .then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 3000);
            });
        
        const animalObj = {
            "bo": "bò",
            "ga": "gà",
            "heo": "heo",
        }

        const animalEmojiObj = {
            "bo": "<:3331_minecraft_cow:1156555169396428830>",
            "ga": "<:Chicken17:1156557573219168307>",
            "heo": "<:technoblade64:1166408637623844924>",
        }

        let animal = await client.xemAnimal(author.id, animalObj[animalName]);
        if (amount == "all") amount = await client.xemAnimal(author.id, animalObj[animalName]);
        if (animal < parseInt(amount)) amount = await client.xemAnimal(author.id, animalObj[animalName]);

        await client.choAn(author.id, animalObj[animalName], parseInt(amount));
        message.reply(`${emoji.success} Bạn đã cho **${amount} con ${animalObj[animalName]}** ăn thành công ${animalEmojiObj[animalName]}`);
    }
}