const Discord = require('discord.js');

module.exports = {
    name: 'invtt',
    cooldown: 10,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const lua = await client.nongSan(message.author.id, "lúa");
        const dau = await client.nongSan(message.author.id, "đậu");
        const bi = await client.nongSan(message.author.id, "bí");
        const hatLua = await client.nongSan(message.author.id, "hạt lúa");
        const hatDau = await client.nongSan(message.author.id, "hạt đậu");
        const hatBi = await client.nongSan(message.author.id, "hạt bí");
        const sua = await client.nongSan(message.author.id, "sữa");
        const trung = await client.nongSan(message.author.id, "trứng");
        const botMi = await client.nongSan(message.author.id, "bột mì");
        const botBanhDauXanh = await client.nongSan(message.author.id, "bột bánh đậu xanh");
        const botBanhThapCam = await client.nongSan(message.author.id, "bột bánh thập cẩm");
        const nhanDauXanh = await client.nongSan(message.author.id, "nhân đậu xanh");
        const banhTTDauXanh = await client.nongSan(message.author.id, "bánh trung thu nhân đậu xanh");
        const banhTTThapCam = await client.nongSan(message.author.id, "nhân trung thu nhân thập cẩm");
        const longDen = await client.nongSan(message.author.id, "lồng đèn");
        const thoBong = await client.nongSan(message.author.id, "thỏ bông");
        const thoCungTrang = await client.nongSan(message.author.id, "thỏ cung trăng");
        const lapXuong = await client.nongSan(message.author.id, "lạp xưởng");
        const bo = await client.nongSan(message.author.id, "bơ");

        let thumb = 'https://media.discordapp.net/attachments/1104739998193958997/1156559332654186587/school-bag-backpack-pixel-art-icon-isolated-on-white-background-vector-illustration-design-for-stickers-app-and-logo-700-272296124-removebg-preview.png?ex=65156950&is=651417d0&hm=f43070b7ef665a8d6c80f20710988b30f3d44d5dcbee10216594c22afd122fbb&=&width=625&height=625';

        const nongSanEmbed = new Discord.EmbedBuilder()
            .setTitle(`Kho nông sản của ${message.author.username}`)
            .setDescription(`
                <:LC_Wheat:1155701062670504037> Lúa: ${lua}
                <:daunh_1:1156608655060381760> Đậu: ${dau}
                <:mc_carved_pumpkin45:1155704587462922272> Bí: ${bi}
            `)
            .setTimestamp()
            .setColor('Green')
            .setThumbnail(thumb)

        const hatGiongEmbed = new Discord.EmbedBuilder()
            .setTitle(`Túi hạt giống của ${message.author.username}`)
            .setDescription(`
            <:seeds97:1155701097806180372> Hạt lúa: ${hatLua} 
            <:daunh_1:1156608655060381760> Hạt đậu: ${hatDau}
            <:gourdpumpkinseedspeeledshellisol:1155704854606532709> Hạt bí: ${hatBi}
            `)
            .setTimestamp()
            .setColor("Green")
            .setThumbnail(thumb)

        const nguyenLieuEmbed = new Discord.EmbedBuilder()
            .setTitle(`Túi nguyên liệu của ${message.author.username}`)
            .setDescription(`
            \`200\` <:eje_minecraft_milk:1156555171493597204> Sữa: ${sua}
            \`201\` <:Minecraft_Egg:1156555165189550101> Trứng: ${trung}
            \`202\` <:6289_flour:1155701022891704360> Bột mì: ${botMi}
            \`203\` <:botxanhremovebgpreview:1156914386917671032> Bột bánh đậu xanh: ${botBanhDauXanh}
            \`204\` <:botBanhThapCAm:1157113151251292230> Bột bánh thập cẩm: ${botBanhThapCam}
            \`205\` <:botxanh2removebgpreview:1156915468267946004> Nhân đậu xanh: ${nhanDauXanh}
            \`206\` <:banhdauxanh_1:1156609030165377035> Bánh Trung Thu nhân đậu xanh: ${banhTTDauXanh}
            \`207\` <:banhtrungthu_1:1156609035794124870> Bánh Trung Thu nhân thập cẩm: ${banhTTThapCam}
            \`208\` <:lapXuong:1157312775077494794> Lạp xưởng: ${lapXuong}
            \`209\` <:butter:1157312769234845736> Bơ: ${bo}
            `)
            .setTimestamp()
            .setColor("Blue")
            .setThumbnail(thumb)
        
        const giftEmbed = new Discord.EmbedBuilder()
            .setTitle(`Túi quà của ${message.author.username}`)
            .setDescription(`
            \`210\` <:longDenNgoiSao:1156949930632560701> Lồng đèn: ${longDen}
            \`211\` <:thoBongTT:1156949943001559120>  Thỏ bông: ${thoBong}
            \`212\` <:thoCungTrang:1156964829064597504> Thỏ cung trăng: ${thoCungTrang}
            `)

        let embeds = [nongSanEmbed, hatGiongEmbed, nguyenLieuEmbed, giftEmbed];
        let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
        await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))

        async function chuyen_trang(client, message, authorid, embeds) {
            let trangHienTai = 0
            let buttonRow1 = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
              .setStyle(Discord.ButtonStyle.Secondary)
              .setEmoji('<:jjj:1136731747074191440>')
              .setCustomId('back-page1'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId('back-page')
                .setEmoji('⬅'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId('next-page')
                .setEmoji('➡️'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Secondary)
                .setEmoji('<:jj:1136730727610863627>')
                .setCustomId('next-page1')
              )
                if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] })
                const queueEmbed = await message.edit(
                  {
                    content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`,
                    components: [buttonRow1],
                    embeds: [embeds[trangHienTai]]
                  }
                )
                var collector = queueEmbed.createMessageComponentCollector({
                  filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
                })
                collector.on("collect", (interaction) => {
              
                  if (interaction.user.id !== authorid) return interaction.reply({ content: "Bạn không thể dùng nút này!", ephemeral: true })
                  if (interaction.customId == "next-page") {
                    interaction.deferUpdate()
                    if (trangHienTai < embeds.length - 1) {
                      trangHienTai++;
                      queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                    }
                    else {
                      trangHienTai = 0
                      queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                    }
                  }
                  else if (interaction.customId == "back-page") {
                    interaction.deferUpdate()
                    if (trangHienTai !== 0) {
                      --trangHienTai;
                      queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                    } else {
                      trangHienTai = embeds.length - 1
                      queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                    }
                  } else if (interaction.customId == "back-page1") {
                    interaction.deferUpdate()
                    trangHienTai = 0;
                    queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                  }
                  else if (interaction.customId == "next-page1") {
                    interaction.deferUpdate()
                    trangHienTai = embeds.length - 1;
                    queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                  }
                }
            );
        }
    }
}