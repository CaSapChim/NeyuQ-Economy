const Discord = require('discord.js')
const fishData = require('../../data/fish.json')
const buffModel = require('../../database/models/buffModel')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: "cauca",
    aliases: ["fish"],
    description: "Lệnh cho phép member câu cá trong server",
    cooldown: 0,
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {*} args
     * @param {*} userData
     */
    run: async (client, message, args, userData) => {
        if (!ownerId.includes(message.author.id)) return 

        let data = await buffModel.findOne({
            userId: message.author.id
        })

        let rarity = {
            'Very Common': 35,
            'Common': 10,
            'Uncommon': 10,
            'Rare': 4,
            'Very Rare': 1
        }

        let buffMsg = ``

        if (!data) {
            rarity = {
                'Very Common': 35,
                'Common': 10,
                'Uncommon': 10,
                'Rare': 4,
                'Very Rare': 1
            }
            buffMsg += `Bạn đang bắt cá bằng **hai tay**`
        } else {
            let soLuongBuff = data.soLuongBuff
            let type = data.type    

            if (soLuongBuff > 0 && type == 1) {
                rarity = {
                    'Very Common': 40, //85 % cá
                    'Common': 25,       // 15% rác
                    'Uncommon': 10,
                    'Rare': 7,
                    'Very Rare': 3
                }
                client.truBuff(message.author.id, 1, 1)
                buffMsg += `Bạn đang bắt cá bằng **cần câu tre** \`(${soLuongBuff - 1}/25)\``
            } else if (soLuongBuff > 0 && type == 2) {
                rarity = {
                    'Very Common': 30, // 90% cá
                    'Common': 30,
                    'Uncommon': 15,
                    'Rare': 10,
                    'Very Rare': 5
                }
                client.truBuff(message.author.id, 1, 2)
                buffMsg += `Bạn đang bắt cá bằng **cần câu xịn** \`(${soLuongBuff - 1}/50)\``
            } else if (soLuongBuff > 0 && type == 3) {
                rarity = {
                    'Very Common': 25, // 90% cá
                    'Common': 30,
                    'Uncommon': 15,
                    'Rare': 13,
                    'Very Rare': 7
                }
                client.truBuff(message.author.id, 1, 3)
                buffMsg += `Bạn đang bắt cá bằng **lưới** \`(${soLuongBuff - 1}/100)\``
            } else if (soLuongBuff > 0 && type == 4) {
                rarity = {
                    'Very Common': 25, // 95% cá
                    'Common': 25,
                    'Uncommon': 20,
                    'Rare': 20,
                    'Very Rare': 15
                }
                client.truBuff(message.author.id, 1, 4)
                buffMsg += `Bạn đang bắt cá bằng **lưới vip** \`(${soLuongBuff - 1}/200)\``
            } 
        }  


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
        }

        if (result) {
            const fishEmbed = new Discord.EmbedBuilder()
                .setColor('Blue')
                .setTitle(`Bạn đã bắt được \`${result.name}\``)
                .setDescription(`
                    Độ hiếm: **${result.rarity}**
                    Kích thước: **${result.size[Math.floor(Math.random() * result.size.length)]} cm**
                `)
                .setFooter({ text: `${result.catch}`})
                .setThumbnail(`${result.image}`)
            message.reply({ embeds: [fishEmbed], content: `${buffMsg}` })
        } else {
            console.log(result)
            const fail = fishData.fail
            const failEmbed = new Discord.EmbedBuilder()
                .setTitle(`${fail[Math.floor(Math.random() * fail.length)]}`)
                .setTimestamp()
            message.reply({ embeds: [failEmbed], content: `${buffMsg}` })
        }
    }
}