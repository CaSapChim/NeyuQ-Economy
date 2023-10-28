const Discord = require('discord.js');
const feedAnimalModel = require('../../database/models/userDataJob/feedAnimalModel');
const emoji = require('../../emoji.json');

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
        const idAnimal = args[0];
        let amount = args[1];
        const author = message.author;
        if (amount < 0 || (isNan(amount) && amount != "all"))
            return message.reply(`${emoji.fail} Phắc du <@${author.id}> sai định dạng rồi`)
            .then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 3000);
            });
        
        const idAnimalToAnimal = {
            
        }
    }
}