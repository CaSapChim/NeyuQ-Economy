const Discord = require('discord.js');

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
            .setDescription(`
                wudgawydwad  
            `)
            .addFields(
                {name: "Thức ăn cho động vật", value: `
                16 <:LC_Wheat:1155701062670504037> => 3 <:04c48f45474c4130a2fb5ff3a3939268:1166927884187877417>
                8 <:daunh_1:1156608655060381760> + 8 <:seeds97:1155701097806180372> => 3 <:chickenFeed:1166927888336027748>
                8 <:Carrot29:1166650013603090432> + 8 <:potato45:1166650017264705547> => 3 <:pigFeed:1166929189681766461>
                `,inline: false},
                {name: `Sản phẩm khác`, value: `
                8 <:LC_Wheat:1155701062670504037> => 2 <:6289_flour:1155701022891704360>
                `, inline: true}
            )
            .setTimestamp()
        let buttonRow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('sanxuat')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Sản xuất vật phẩm"),
        )
        const a = await message.reply({ embeds: [embed], components: [buttonRow] });
        var collector = a.createMessageComponentCollector({
            filter: (interaction) =>
              (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) &&
              interaction.message.author.id == client.user.id, time: 60000
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
                    .setPlaceholder("Vd: 153")
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
            interaction.awaitModalSubmit({ filter, time: 60_000})
            .then(interaction => {
                const t1 = interaction.fields.getTextInputValue("idVatPham");
                const t2 = interaction.fields.getTextInputValue("soLuongVatPham");
            })
        });
    }
}