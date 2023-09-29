const Discord = require('discord.js');

module.exports = {
    name: "nguyenlieu",
    aliases: ['nl'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let type = args[0];
        if (!type) return message.reply('`nqg nguyenlieu dauxanh/thapcam`')
        const lua = await client.nongSan(message.author.id, "lúa");
        const dau = await client.nongSan(message.author.id, "đậu");
        const bi = await client.nongSan(message.author.id, "bí");
        const trung = await client.nongSan(message.author.id, "trứng");
        const sua = await client.nongSan(message.author.id, "sữa");
        const botMi = await client.nongSan(message.author.id, "bột mì");
        const nhanDauXanh = await client.nongSan(message.author.id, "nhân đậu xanh");
        const botBanhDauXanh = await client.nongSan(message.author.id, "bột bánh đậu xanh");
        const nhanThapCam = await client.nongSan(message.author.id, "nhân thập cẩm");
        const botBanhThapCam = await client.nongSan(message.author.id, "bột bánh thập cẩm");

        if (type === 'dauxanh') {
            const nguyenLieuEmbed = new  Discord.EmbedBuilder()
            .setTitle('Bảng nguyên liệu làm bánh nhân đậu xanh')
            .setColor('Green')
            .setDescription(`
                32 <:LC_Wheat:1155701062670504037> => 1 <:6289_flour:1155701022891704360>
                16 <:6289_flour:1155701022891704360> + 32 <:Minecraft_Egg:1156555165189550101> + 32 <:eje_minecraft_milk:1156555171493597204> => 1 bột bánh <:botxanhremovebgpreview:1156914386917671032>
                64 <:daunh_1:1156608655060381760> + 16 <:eje_minecraft_milk:1156555171493597204> => 1 nhân đậu xanh <:botxanh2removebgpreview:1156915468267946004>
                2 <:botxanh2removebgpreview:1156915468267946004> + 2 <:botxanhremovebgpreview:1156914386917671032> => 1 <:banhdauxanh_1:1156609030165377035>
            `)
            .setThumbnail('https://media.discordapp.net/attachments/1138141730928070736/1156607690714386432/banhdauxanh_1.png?ex=6515965a&is=651444da&hm=b1d118a6622ae5828cbcf0af8389369e4aa40619d4e7ed5c4e9505c6f6487650&=&width=625&height=625')
            .setTimestamp()
            .setFooter({ text: 'Chọn các nút bên dưới để ghép nguyên liệu'})
            let buttonRow1 = new Discord.ActionRowBuilder()
                .addComponents(
                new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Secondary)
                .setEmoji('<:6289_flour:1155701022891704360>')
                .setCustomId('botMi'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('botBanhDauXanh')
                    .setEmoji('<:botxanhremovebgpreview:1156914386917671032>'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('nhanDauXanh')
                    .setEmoji('<:botxanh2removebgpreview:1156915468267946004>'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('banhTTDauXanh')
                    .setEmoji('<:banhdauxanh_1:1156609030165377035>')
                )  
            const reply = await message.channel.send({embeds: [nguyenLieuEmbed], components: [buttonRow1]});

            var collector = reply.createMessageComponentCollector({
            filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
            })
            collector.on('collect', interaction => {
                if (interaction.user.id !== message.author.id) return interaction.reply({ content: "Bạn không thể dùng nút này!", ephemeral: true })
                if (interaction.customId == 'botMi') {
                    if (lua < 32) return interaction.reply({ content: "Bạn không đủ 32 lúa <:LC_Wheat:1155701062670504037>"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:6289_flour:1155701022891704360>", ephemeral: true});
                    client.addNongSan(message.author.id, "bột mì", 1);
                    client.truNongSan(message.author.id, "lúa", 32);
                }
                else if (interaction.customId == 'botBanhDauXanh') {
                    if (botMi < 16 || sua < 32 || trung < 32) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:botxanhremovebgpreview:1156914386917671032>"});
                    client.addNongSan(message.author.id, "bột bánh đậu xanh", 1);
                    client.truNongSan(message.author.id, "bột mì", 16);
                    client.truNongSan(message.author.id, "sữa", 32);
                    client.truNongSan(message.author.id, "trứng", 32);
                }
                else if (interaction.customId == 'nhanDauXanh') {
                    if (dau < 32 || sua < 16) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:botxanh2removebgpreview:1156915468267946004>"});
                    client.addNongSan(message.author.id, "nhân đậu xanh", 1);
                    client.truNongSan(message.author.id, "sữa", 16);
                    client.truNongSan(message.author.id, "đậu", 32);
                }
                else if (interaction.customId == 'banhTTDauXanh') {
                    if (botBanhDauXanh < 2 || nhanDauXanh < 2) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:banhdauxanh_1:1156609030165377035>"});
                    client.addNongSan(message.author.id, "bánh trung thu nhân đậu xanh", 1);
                    client.truNongSan(message.author.id, "bột bánh đậu xanh", 2);
                    client.truNongSan(message.author.id, "nhân đậu xanh", 2);
                }
            })
        }

        if (type === 'thapcam') {
            const nguyenLieuEmbed = new  Discord.EmbedBuilder()
            .setTitle('Bảng nguyên liệu làm bánh nhân thập cẩm')
            .setColor('Green')
            .setDescription(`
                32 <:LC_Wheat:1155701062670504037> => 1 <:6289_flour:1155701022891704360>
                16 <:6289_flour:1155701022891704360> + 32 <:Minecraft_Egg:1156555165189550101> + 32 <:eje_minecraft_milk:1156555171493597204> => 1 bột bánh <:botBanhThapCAm:1157113151251292230>
                32 <:mc_carved_pumpkin45:1155704587462922272> + 16 <:Minecraft_Egg:1156555165189550101> => 1 nhân thập cẩm <:botxanh2removebgpreview:1156915468267946004>
                2 <:botxanh2removebgpreview:1156915468267946004> + 2 <:botxanhremovebgpreview:1156914386917671032> => 1 <:banhtrungthu_1:1156609035794124870>
            `)
            .setThumbnail('https://media.discordapp.net/attachments/1138141730928070736/1156607714609340496/banhtrungthu_1.png?ex=6516e7df&is=6515965f&hm=4810eb52b545b01da1f77b8fe350e896344fb61369aadd86cd0229bc975e7800&=&width=625&height=625')
            .setTimestamp()
            .setFooter({ text: 'Chọn các nút bên dưới để ghép nguyên liệu'})
            let buttonRow1 = new Discord.ActionRowBuilder()
                .addComponents(
                new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Secondary)
                .setEmoji('<:6289_flour:1155701022891704360>')
                .setCustomId('botMi'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('botBanhThapCam')
                    .setEmoji('<:botBanhThapCAm:1157113151251292230>'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('nhanThapCam')
                    .setEmoji('<:botBanhThapCAm:1157113151251292230>'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId('banhTTThapCam')
                    .setEmoji('<:banhtrungthu_1:1156609035794124870>')
                )  
            const reply = await message.channel.send({embeds: [nguyenLieuEmbed], components: [buttonRow1]});

            var collector = reply.createMessageComponentCollector({
            filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
            })
            collector.on('collect', interaction => {
                if (interaction.user.id !== message.author.id) return interaction.reply({ content: "Bạn không thể dùng nút này!", ephemeral: true })
                if (interaction.customId == 'botMi') {
                    if (lua < 32) return interaction.reply({ content: "Bạn không đủ 32 lúa <:LC_Wheat:1155701062670504037>"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:6289_flour:1155701022891704360>", ephemeral: true});
                    client.addNongSan(message.author.id, "bột mì", 1);
                    client.truNongSan(message.author.id, "lúa", 32);
                }
                else if (interaction.customId == 'botBanhThapCam') {
                    if (botMi < 16 || sua < 32 || trung < 32) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:botxanhremovebgpreview:1156914386917671032>"});
                    client.addNongSan(message.author.id, "bột bánh đậu xanh", 1);
                    client.truNongSan(message.author.id, "bột mì", 16);
                    client.truNongSan(message.author.id, "sữa", 32);
                    client.truNongSan(message.author.id, "trứng", 32);
                }
                else if (interaction.customId == 'nhanThapCam') {
                    if (dau < 32 || sua < 16) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:botxanh2removebgpreview:1156915468267946004>"});
                    client.addNongSan(message.author.id, "nhân đậu xanh", 1);
                    client.truNongSan(message.author.id, "sữa", 16);
                    client.truNongSan(message.author.id, "đậu", 32);
                }
                else if (interaction.customId == 'banhTTThapCam') {
                    if (botBanhDauXanh < 2 || nhanDauXanh < 2) return interaction.reply({ content: "Bạn không đủ nguyên liệu để làm"});
                    interaction.reply({ content: "Bạn đã làm thành công 1 <:banhdauxanh_1:1156609030165377035>"});
                    client.addNongSan(message.author.id, "bánh trung thu nhân đậu xanh", 1);
                    client.truNongSan(message.author.id, "bột bánh đậu xanh", 2);
                    client.truNongSan(message.author.id, "nhân đậu xanh", 2);
                }
            })
        }
    }
}