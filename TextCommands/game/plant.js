const Discord = require('discord.js');
const emoji = require('../../emoji.json');
const plantModel = require('../../database/models/userDataJob/plantModel');
const { thanhTuuUtils } = require('../../Utils/thanhTuuUtils');

module.exports = {
    name: 'plant',
    aliases: ['trongcay'],
    description: "Trồng cây",
    cooldown: 10,
    adminOnly: false,
    run: async (client, message, args) => {
        const idHat = args[0];
        let amount = args[1];
        const author = message.author.id;

        if (!amount) return message.reply("Cách dùng: `nqg plant <id hạt> <số lượng hạt/all>`");

        if (parseInt(amount) < 1 || (isNaN(amount) && amount.toLowerCase() !== "all")) {
            return message.reply(`${emoji.fail} Phắc du <@${author}> sai định dạng rồi`)
                .then(msg => setTimeout(() => msg.delete(), 3000));
        }

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
        let remainingDat = await client.xemDat(author);

        if (amount === "all") amount = soHat;

        if (soHat - amount < 0) {
            return message.reply(`${emoji.fail} Bạn không đủ **${idToHat[idHat]}** để trồng`);
        }

        if (remainingDat - amount < 0) {
            amount = remainingDat;
            //return message.reply(`${emoji.fail} Bạn không đủ đất để trồng **${amount} ${idToHat[idHat]}**`);
        }

        const data = await plantModel.findOne({ userId: author, plantName: idToHat[idHat] });

        if (data && data.soLuongPlanted > 0) {
            const currentTime = new Date();
            const lastPlanted = data.plantedAt;
            const elapsedMillis = currentTime - lastPlanted;
            const timeToGrow = 1 * 60 * 1000;

            if (elapsedMillis > timeToGrow) {
                return message.reply(`${emoji.fail} Cây đã lớn, vui lòng thu hoạch cây trước khi trồng lại cây này!`);
            } else {
                await Promise.all([
                    client.trongCay(author, idToHat[idHat], amount),
                    client.truNongSan(author, idToHat[idHat], amount),
                    client.truDat(author, amount),
                ]);
                message.reply(`${emoji.success} Bạn đã trồng thành công **${amount} ${idToHat[idHat]}** ${emojiHat[idHat]}`);
                await client.addThongKe(author, "farm");
                await thanhTuuUtils(client, message, "farm");
            }
        } else {
            await Promise.all([
                client.trongCay(author, idToHat[idHat], amount),
                client.truNongSan(author, idToHat[idHat], amount),
                client.truDat(author, amount),
            ]);
            await client.addThongKe(author, "farm");
            await thanhTuuUtils(client, message, "farm");
            message.reply(`${emoji.success} Bạn đã trồng thành công **${amount} ${idToHat[idHat]}** ${emojiHat[idHat]}`);
        }
    }
}