const Discord = require('discord.js');
const emoji = require('../emoji.json');
const random = require("random-number-csprng");

const reward = {
    "300": "thức ăn bò",
    "301": "thức ăn gà",
    "302": "thức ăn heo",
    "306": "bột mì",
    "307": "bơ",
    "308": "bánh mì",
    "309": "shushi",
    "310": "cá đóng hộp",
}

const idSphamPhamObj = {
    "300": "thucAnBo",
    "301": "thucAnGa",
    "302": "thucAnHeo",
    "306": "botMi",
    "307": "butter",
    "308": "banhMi",
    "309": "shushi",
    "310": "caDongHop",
}

const arr = [
    ["300", "301", "302", "306", "307", "308", "309", "310"],
    [100000, 200000, 10000, 10000, 10000, 20000]
];

const dropTreasure = async (client, message) => {
    const rand = (await random(1, 100));
    if (Math.round(rand) <= 10) { // 10%
        let khoBauEmbed = new Discord.EmbedBuilder()
            .setColor(0xfcc603)
            .setDescription(`${emoji.congra} ${emoji.congra} ${emoji.congra} \n**Bạn vừa tìm thấy một hộp kho báu!!!** \n**Ấn nút bên dưới để mở ngay.**`)
            .setTimestamp()
        const btn = new Discord.ButtonBuilder()
            .setCustomId("khoBau")
            .setLabel("Mở hộp")
            .setStyle(Discord.ButtonStyle.Primary)
            .setEmoji("<:treasure1:1175647395128807464>")
        const buttonRow = new Discord.ActionRowBuilder().addComponents(btn);
        const a = await message.channel.send({ content: `<@${message.author.id}> Bạn có 5s để mở hộp`, embeds: [khoBauEmbed], components: [buttonRow] });
        var collector = a.createMessageComponentCollector({
            filter: (interaction) =>
              interaction.isButton() &&
              interaction.message.author.id == client.user.id,
              time: 5000
          });
        let msg = ``;
        collector.on("collect", async i => {
            if (i.user.id !== message.author.id)
            return i.reply({
              content: "Này, nút này không phải dành cho bạn!",
              ephemeral: true,
            });
            const x = Math.floor(Math.random() * arr.length);
            const y = Math.floor(Math.random() * arr[x].length);
            const soLuong = Math.floor(Math.random() * 3) + 1;

            if (i.customId === "khoBau") {
                if (arr[0].includes(arr[x][y])) {
                    await client.addSanPham(i.user.id, reward[arr[x][y]], soLuong);
                    msg += `Bạn mở hộp và nhận được **${soLuong}** ${reward[arr[x][y]]} ${emoji[idSphamPhamObj[arr[x][y]]]}`;
                } else {
                    await client.addTien(i.user.id, arr[x][y]);
                    msg += `Bạn mở hộp và nhận được **${arr[x][y].toLocaleString()} ${emoji.coin}**`;
                }
                khoBauEmbed.setDescription(msg);
                a.edit({ content: `<@${i.user.id}>`, embeds: [khoBauEmbed], components: [] });
            }
        })
        collector.on("end", async (co) => {
            if (co.size === 0) {
                buttonRow.components[0].setDisabled(true);
                khoBauEmbed.setColor("Grey");
                await a.edit({ content: `Đã hết thời gian`, embeds: [khoBauEmbed], components: [buttonRow] });
            }
        });
    }
}

module.exports = { dropTreasure };