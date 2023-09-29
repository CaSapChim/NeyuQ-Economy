const Discord = require('discord.js');

module.exports = {
    name: 'shoptt',
    cooldown: 10,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const hatEmbed = new Discord.EmbedBuilder()
            .setTitle("Shop hạt giống")
            .setDescription(`
                <:chamxanh:1124058113742479400> \`1111\` <:seeds97:1155701097806180372> Hạt lúa | \`5,00\` <:O_o:1135831601205481523> coins 
                
                <:chamxanh:1124058113742479400> \`1112\` <:Mokoko42:1155701078306852935> Hạt đậu | \`5,00\` <:O_o:1135831601205481523> coins
                
                <:chamxanh:1124058113742479400> \`1113\` <:gourdpumpkinseedspeeledshellisol:1155704854606532709> Hạt bí | \`5,00\` <:O_o:1135831601205481523> coins
            `)
            .setColor('Green')
            .setImage('https://opengameart.org/sites/default/files/crops-preview-animated.gif')
            .setTimestamp()
            .setFooter({ text: "Chúc bạn Trung Thu vui vẻ <3"})
        
        const animalEmbed = new Discord.EmbedBuilder()
            .setTitle("Shop động vật")
            .setColor("Green")
            .setDescription(` 
                <:chamxanh:1124058113742479400> \`1200\` <:3331_minecraft_cow:1156555169396428830> Con bò | \`10,000\` <:O_o:1135831601205481523> coins

                <:chamxanh:1124058113742479400> \`1201\` <:Chicken17:1156557573219168307> Con gà | \`10,000\` <:O_o:1135831601205481523> coins
            `)
            .setImage('https://media.discordapp.net/attachments/1129012498855636992/1156413823956299878/2ce11169f769ee257dbe2f55d7d2d781.jpg?ex=6514e1cc&is=6513904c&hm=5cf221f79e393f31b9c3000154cf358e814fcef2cfbf33e40fabf8ca2d5a18aa&=&width=481&height=317')
            .setTimestamp()
            .setFooter({ text: "Chúc bạn Trung Thu vui vẻ <3"})

        const giftTrungThu = new Discord.EmbedBuilder()
            .setTitle('Shop quà Trung Thu')
            .setColor('White')
            .setDescription(`
            <:chamxanh:1124058113742479400> \`1300\` <:thoBongTT:1156949943001559120> Thỏ bông | \`15,000\` <:O_o:1135831601205481523> coins
            <:chamxanh:1124058113742479400> \`1301\` <:longDenNgoiSao:1156949930632560701> Lồng đèn | \`20,000\` <:O_o:1135831601205481523> coins
            <:chamxanh:1124058113742479400> \`1302\` <:thoCungTrang:1156964829064597504> Thỏ cung trăng | \`30,000\` <:O_o:1135831601205481523> coins
            `)
            .setTimestamp() 
            .setImage('https://media.discordapp.net/attachments/1138141730928070736/1156963409292710038/Lovepik_com-611175881-Mid-Autumn_Festival_couple_sitting_on_the_moon_png_download.png?ex=6516e1a4&is=65159024&hm=ca3657c78e5d4d5b962668c2c64602dcefc53642db0da79f499168c1958e1157&=&width=702&height=702')
            .setFooter({ text: "Chúc bạn Trung Thu vui vẻ <3"})

        const nguyenLieuEmbed = new Discord.EmbedBuilder()
            .setTitle('Shop nguyên liệu làm bánh')
            .setColor('Aqua')
            .setDescription(`
            <:chamxanh:1124058113742479400> \`1400\` <:lapXuong:1157312775077494794> Lạp xưởng | \`0000\` <:O_o:1135831601205481523> coins
            <:chamxanh:1124058113742479400> \`1401\` <:butter:1157312769234845736> Bơ | \`0000\` <:O_o:1135831601205481523> coins
            `)
            .setTimestamp()

            let embeds = [hatEmbed, nguyenLieuEmbed, animalEmbed, giftTrungThu];
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