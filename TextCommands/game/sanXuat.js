const Discord = require('discord.js');
const data = require('../../data/nguyenLieu.json');
const emoji = require('../../emoji.json');

const am = data.sanPham;

module.exports = {
    name: "sanxuat",
    aliases: ['sx'],
    cooldown: 5,
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("BẢNG NGUYÊN LIỆU")
            .addFields(
                {name: "Thức ăn cho động vật", value: `
                **\`300\`** | ${am.thucAnBo.lua} ${emoji.lua} => 1 ${emoji.thucAnBo}
                **\`301\`** | ${am.thucAnGa.hatDau} ${emoji.hatDau} + ${am.thucAnGa.hatLua} ${emoji.hatLua} => 1 ${emoji.thucAnGa}
                **\`302\`** | ${am.thucAnHeo.caRot} ${emoji.caRot} + ${am.thucAnHeo.khoaiTay} ${emoji.khoaiTay} => 1 ${emoji.thucAnHeo}
                `,inline: false},
                {name: `Sản phẩm 1`, value: `
                **\`306\`** | ${am.botMi.lua} ${emoji.lua} => 1 ${emoji.botMi}
                **\`307\`** | ${am.butter.sua} ${emoji.sua} + ${am.butter.trung} ${emoji.trung} => 1 ${emoji.butter}
                **\`308\`** | ${am.banhMi.botMi} ${emoji.botMi} => 1 ${emoji.banhMi} 
                **\`309\`** | ${am.shushi.lua} ${emoji.lua} + ${am.shushi.veryCommon} ${emoji.veryCommon} => 1 ${emoji.shushi} 
                `, inline: true},
                {name: `Sản phẩm 2`, value: `
                **\`310\`** | ${am.caDongHop.common} ${emoji.common} => 1 ${emoji.caDongHop}
                **\`311\`** | ${am.banhBi.bi} ${emoji.bi} + ${am.banhBi.botMi} ${emoji.botMi} + ${am.banhBi.sua} ${emoji.sua} + ${am.banhBi.trung} ${emoji.trung} => 1 ${emoji.banhBi}
                **\`312\`** | ${am.banhKem.botMi} ${emoji.botMi} + ${am.banhKem.sua} ${emoji.sua} + ${am.banhBi.trung} ${emoji.trung} ${am.banhKem.butter} ${emoji.butter} => 1 ${emoji.banhKem}
                `, inline: false}
            )
            .setTimestamp()
        let buttonRow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('sanxuat')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Sản xuất vật phẩm")
        )
        const a = await message.reply({ embeds: [embed], components: [buttonRow] });
        var collector = a.createMessageComponentCollector({
            filter: (interaction) =>
              (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) &&
              interaction.message.author.id == client.user.id, time: 30000
        });

        collector.on("collect", async (interaction) => {
            if(interaction.user.id != message.author.id) return interaction.reply({ content: "Hey, nút này không dành cho bạn", ephemeral: true});
            if (interaction.customId == "sanxuat") {
                const modal = new Discord.ModalBuilder()
                    .setCustomId('sanxuatmodal')
                    .setTitle("SẢN XUẤT VẬT PHẨM")
                const idVatPham = new Discord.TextInputBuilder()
                    .setCustomId('idVatPham')
                    .setLabel("Nhập id của vật phẩm muốn sản xuất")
                    .setPlaceholder("Vd: 307")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)
                const soLuongVatPham = new Discord.TextInputBuilder()
                    .setCustomId('soLuongVatPham')
                    .setLabel("Nhập số lượng vật phẩm muốn sản xuất")
                    .setPlaceholder("Vd: 12")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)
                const firstActionRow = new Discord.ActionRowBuilder().addComponents(idVatPham);
                const secondActionRow = new Discord.ActionRowBuilder().addComponents(soLuongVatPham);
                modal.addComponents(firstActionRow, secondActionRow);
                await interaction.showModal(modal);
            }
            const filter = (interaction) => interaction.customId == "sanxuatmodal";
            interaction.awaitModalSubmit({ filter, time: 30_000})
            .then(async interaction => {
                let t1 = interaction.fields.getTextInputValue("idVatPham");
                let t2 = interaction.fields.getTextInputValue("soLuongVatPham");

                const idSphamPhamObj = {
                    "300": "thucAnBo",
                    "301": "thucAnGa",
                    "302": "thucAnHeo",
                    "306": "botMi",
                    "307": "butter",
                    "308": "banhMi",
                    "309": "shushi",
                    "310": "caDongHop",
                    "311": "banhBi",
                    "312": "banhKem",
                }

                const nameSP = {
                    "300": "thức ăn bò",
                    "301": "thức ăn gà",
                    "302": "thức ăn heo",
                    "306": "bột mì",
                    "307": "bơ",
                    "308": "bánh mì",
                    "309": "shushi",
                    "310": "cá đóng hộp",
                    "311": "bánh bí",
                    "312": "bánh kem",
                }

                const nameNL = {
                    "lua": "lúa",
                    "hatLua": "hạt lúa",
                    "hatDau": "hạt đậu",
                    "caRot": "cà rốt",
                    "khoaiTay": "khoai tây",
                    "bi": "bí",
                    "trung": "trứng",
                    "sua": "sữa",
                    "botMi": "bột mì",
                    "common": "Common",
                    "veryCommon": "Very Common",
                    "butter": "bơ",
                    "banhMi": "bánh mì",
                    "banhBi": "bánh bí",
                    "banhKem": "bánh kem",
                }

                const property = idSphamPhamObj[t1];
                const dataNguyenLieu = data.sanPham;

                if (typeof idSphamPhamObj[t1] === "undefined") 
                    return interaction.reply({ content: "Bạn không nhập đúng id của món đồ muốn sản xuất", ephemeral: true});

                if (parseInt(t2) < 0) 
                    return interaction.reply({ content: "Bạn không được nhập số âm", ephemeral: true });

                    const obj = {
                        "veryCommon": await client.ca(message.author.id, "Very Common"),
                        "common": await client.ca(message.author.id, "Common"),
                        "hatLua": await client.nongSan(message.author.id, "hạt lúa"),
                        "hatDau": await client.nongSan(message.author.id, "hạt đậu"),
                        "hatDuaHau": await client.nongSan(message.author.id, "hạt dưa hấu"),
                        "khoaiTay": await client.nongSan(message.author.id, "khoai tây"),
                        "caRot": await client.nongSan(message.author.id, "cà rốt"),
                        "lua": await client.nongSan(message.author.id, "lúa"),
                        "bi": await client.nongSan(message.author.id, "bí"),
                        "duaHau": await client.nongSan(message.author.id, "dưa hấu"),
                        "sua": await client.sanPham(message.author.id, "sữa"),
                        "trung": await client.sanPham(message.author.id, "trứng"),
                        "thitHeo": await client.sanPham(message.author.id, "thịt heo"),
                        "botMi": await client.sanPham(message.author.id, "bột mì"),
                        "bo": await client.sanPham(message.author.id, "bơ"), 
                        "banhMi": await client.sanPham(message.author.id, "bánh mì"), 
                        "banhBi": await client.sanPham(message.author.id, "bánh bí"),
                        "banhKem": await client.sanPham(message.author.id, "bánh kem"),
                    }

                for (const key in dataNguyenLieu[property]) {
                    if (obj[key] < 0 || obj[key] < parseInt(t2) * dataNguyenLieu[property][key]) {
                        return interaction.reply({ content: "Bạn không đủ nguyên liệu để là sản phẩm này!", ephemeral: true });
                    }
                }
                
                for (const key in dataNguyenLieu[property]) {
                    await client.truSanPham(interaction.user.id, nameNL[key], parseInt(t2) * dataNguyenLieu[property][key]);
                    await client.truNongSan(interaction.user.id, nameNL[key], parseInt(t2) * dataNguyenLieu[property][key]);
                    await client.truCa(interaction.user.id, nameNL[key], parseInt(t2) * dataNguyenLieu[property][key]);
                }

                await client.addSanPham(interaction.user.id, nameSP[t1], parseInt(t2));

                let successEmbed = new Discord.EmbedBuilder()
                    .setDescription(`Bạn vừa sản xuất thành công ${t2} ${nameSP[t1]} ${emoji[property]}`)
                    .setTimestamp()
                    .setColor("Green")

                return interaction.channel.send({ content: `<@${interaction.user.id}>`, embeds: [successEmbed] });

            }).catch(err => {
                console.log(err);
            });
        });

        collector.on("end", () => {
            buttonRow.components[0].setDisabled(true);
            embed.setColor("Grey");
            a.edit({ content: `Tin nhắn hết hiệu lực`, components: [buttonRow], embeds: [embed] });
        })
    }
}