const Discord = require('discord.js')

module.exports = {
    name: 'napthe',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`
                NẠP THẺ FREEFIRE...
            `)
            .setTimestamp()
        let buttonRow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('napThe')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Nạp thẻ"),
        )
        const a = await message.reply({ embeds: [embed], components: [buttonRow] });
        var collector = a.createMessageComponentCollector({
            filter: (interaction) =>
              (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) &&
              interaction.message.author.id == client.user.id, time: 60000
          });
        collector.on("collect", async (interaction) => {
            if(interaction.user.id != message.author.id) return interaction.reply({ content: "Hey, nút này không dành cho bạn", ephemeral: true});
            if (interaction.customId == "napThe") {
                const modal = new Discord.ModalBuilder()
                    .setCustomId('napTheModal')
                    .setTitle("NẠP THẺ")
                const menhGiaThe = new Discord.TextInputBuilder()
                    .setCustomId('menhGia')
                    .setLabel("Nhập mệnh giá thẻ")
                    .setStyle(Discord.TextInputStyle.Short)
                const loaiThe = new Discord.TextInputBuilder()
                    .setCustomId('loaiThe')
                    .setLabel("Nhập loại thẻ")
                    .setStyle(Discord.TextInputStyle.Short)
                const maNap = new Discord.TextInputBuilder()
                    .setCustomId('maNap')
                    .setLabel("Nhập mã nạp của thẻ")
                    .setStyle(Discord.TextInputStyle.Short)
                const seriThe = new Discord.TextInputBuilder()
                    .setCustomId('seriThe')
                    .setLabel("Nhập seri của thẻ")
                    .setStyle(Discord.TextInputStyle.Short)
                const firstActionRow = new Discord.ActionRowBuilder().addComponents(menhGiaThe);
                const secondActionRow = new Discord.ActionRowBuilder().addComponents(loaiThe);
                const thirdActionRow = new Discord.ActionRowBuilder().addComponents(maNap);
                const forthActionRow = new Discord.ActionRowBuilder().addComponents(seriThe);
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, forthActionRow);
                await interaction.showModal(modal);
            }
            const filter = (interaction) => interaction.customId === 'napTheModal';
            interaction.awaitModalSubmit({ filter, time: 60_000})
            .then(interaction => {
                let t1, t2, t3, t4;
                    t1 = interaction.fields.getTextInputValue('menhGia');
                    t2 = interaction.fields.getTextInputValue('loaiThe');
                    t3 = interaction.fields.getTextInputValue('maNap');
                    t4 = interaction.fields.getTextInputValue('seriThe');

                    const responeEmbed = new Discord.EmbedBuilder()
                        .setDescription(`
                            **Người nạp:** <@${interaction.user.id}>
                        `)
                        .addFields(
                            {
                                name: "**Mệnh giá: **", value: `\`\`\`${t1}\`\`\``, inline: true
                            },
                            {
                                name: "**Loại thẻ: **", value: `\`\`\`${t2}\`\`\``, inline: true
                            },
                            {
                                name: "**Mã nạp: **", value: `\`\`\`${t3}\`\`\``, inline: false
                            },                            
                            {
                                name: "**Seri thẻ: **", value: `\`\`\`${t4}\`\`\``, inline: true
                            }            
                        )
                        .setColor("Fuchsia")
                        .setTimestamp()
                        .setFooter({ text: `Id: ${interaction.user.id}`})

                interaction.channel.send({ embeds: [responeEmbed] });
                interaction.reply({ content: "Cảm ơn bạn đã ủng hộ bot", ephemeral: true });
            })
            .catch(error => {
                console.error(`Lỗi modal: ${error}`);
            });
        })
    }
}