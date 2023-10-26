const Discord = require('discord.js');
const emoji = require('../../emoji.json');

module.exports = {
    name: 'plant',
    aliases: ['trongcay'],
    cooldown: 10,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let idHat = args[0];
        let amount = args[1];
        const author = message.author.id;
        let remainingDat = await client.xemDat(author);
        if (amount < 0 || (isNaN(amount) && amount != "all")) 
            return message.reply(`${emoji.fail} Phắc du <@${author}> sai định dạng rồi`)
                .then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
        const idToHat = {
            "250": "hạt lúa",
            "251": "hạt đậu",
            "252": "hạt bí",
            "253": "hạt dưa hấu",
            "254": "khoai tây",
            "255": "cà rốt",
        }

        const emojiHat = {
            "250": "<:seeds97:1155701097806180372>",
            "251": "<:daunh_1:1156608655060381760>",
            "252": "<:gourdpumpkinseedspeeledshellisol:1155704854606532709>",
            "253": "<:Melon62:1166407956791840919>",
            "254": "<:potato45:1166650017264705547>",
            "255": "<:Carrot29:1166650013603090432>",
        }

        const soHat = await client.nongSan(author, idToHat[idHat]);
        if (amount == "all") amount = remainingDat;
        if (remainingDat - amount < 0) return message.reply(`${emoji.fail} Bạn không đủ đất để trồng **${amount} ${idToHat[idHat]}**`);
        if (soHat < amount || amount == 0) return message.reply(`${emoji.fail} Bạn không đủ **${idToHat[idHat]}** để trồng`)
        await client.trongCay(author, idToHat[idHat], amount);
        await client.truNongSan(author, idToHat[idHat], amount); 
        await client.truDat(author, amount);
        await message.reply(`${emoji.success} Bạn đã trồng thành công **${amount} ${idToHat[idHat]}** ${emojiHat[idHat]}`);
    }
}