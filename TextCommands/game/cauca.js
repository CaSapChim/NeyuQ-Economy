const Discord = require('discord.js')
const fishData = require('../../data/fish.json')
const buffModel = require('../../database/models/buffModel')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: "cauca",
    aliases: ["fish"],
    description: "Lệnh cho phép member câu cá trong server",
    cooldown: 60,
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {*} args
     * @param {*} userData
     */
    run: async (client, message, args, userData) => {
        if (!ownerId.includes(message.author.id)) return

        let rarity = {
            'Very Common': 30,
            'Common': 20,
            'Uncommon': 10,
            'Rare': 7,
            'Very Rare': 3
        }

        let data = await client.buff()



        const veryCommonFish = fishData.fish.filter(fish => fish.rarity === 'Very Common')
        const commonFish = fishData.fish.filter(fish => fish.rarity === 'Common')
        const unCommonFish = fishData.fish.filter(fish => fish.rarity === 'Uncommon')
        const rareFish = fishData.fish.filter(fish => fish.rarity === 'Rare')
        const veryRareFish = fishData.fish.filter(fish => fish.rarity === 'Very Rare')
    
        function getRandomRarity() {
            const randomNum = Math.random() * 100;
            let cumulativeProbability = 0;
            for (const [rarityName, probability] of Object.entries(rarity)) { //Object.entries(rarity): Lấy danh sách các cặp key-value trong đối tượng rarity
                cumulativeProbability += probability;
                if (randomNum <= cumulativeProbability) {
                    return rarityName;
                }
            }
        }

        function getRandomFish(rarityArray) {
            const randomIndex = Math.floor(Math.random() * rarityArray.length);
            return rarityArray[randomIndex];
        }

        const randomRarity = getRandomRarity();
        let result;

        switch (randomRarity) {
            case 'Very Common':
                result = getRandomFish(veryCommonFish);
                break;
            case 'Common':
                result = getRandomFish(commonFish);
                break;
            case 'Uncommon':
                result = getRandomFish(unCommonFish);
                break;
            case 'Rare':
                result = getRandomFish(rareFish);
                break;
            case 'Very Rare':
                result = getRandomFish(veryRareFish);
                break;
            default:
                result = null;
                break;
        }

        const fail = [
            'Bạn câu được... cái nịt',
            'Móc câu của bạn bị móc vào quần bạn',
            'Mẹ gank'
        ]

        if (result != null ) {
            const fishEmbed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle(`Bạn đã bắt được \`${result.name}\``)
                .setDescription(`
                    Độ hiếm: **${result.rarity}**
                    Kích thước: **${result.size[Math.floor(Math.random() * result.size.length)]} cm**

                `)
                .setFooter({ text: `${result.catch}`})
                .setThumbnail(`${result.image}`)
            message.reply({ embeds: [fishEmbed] })
        } else {
            const failEmbed = new Discord.EmbedBuilder()
                .setTitle(`${fail[Math.floor(Math.random() * fail.length)]}`)
            message.reply({ embeds: [failEmbed] })
        }
    }
}